import { manualProjects } from "@/data/manual-projects";
import type { ProjectEntry } from "@/data/types";

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  language: string | null;
  topics?: string[];
};

function dedupeTags(tags: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const tag of tags) {
    const key = tag.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(tag.trim());
  }
  return out.slice(0, 8);
}

function repoToProject(repo: GitHubRepo): ProjectEntry {
  const topicTags = repo.topics?.length ? repo.topics : [];
  const languageTags =
    repo.language &&
    !topicTags.some((t) => t.trim().toLowerCase() === repo.language!.trim().toLowerCase())
      ? [repo.language]
      : [];

  const tags = dedupeTags([...topicTags, ...languageTags]);

  const status = repo.homepage?.trim() ? "live" : "repo";

  return {
    title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    status,
    description: repo.description?.trim() || "Open-source project on GitHub.",
    tags: tags.length > 0 ? tags : ["GitHub"],
    url: repo.homepage?.trim() || repo.html_url,
  };
}

function excludedRepoNames(): Set<string> {
  const raw = process.env.GITHUB_REPO_EXCLUDE ?? "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

function manualGithubSlugs(): Set<string> {
  return new Set(
    manualProjects
      .map((p) => p.title.toLowerCase().replace(/\s+/g, "-"))
      .filter(Boolean),
  );
}

async function enrichRepoFromGitHub(
  repo: GitHubRepo,
  username: string,
  fetchOptions: RequestInit,
): Promise<GitHubRepo> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}`,
      fetchOptions,
    );
    if (!res.ok) return repo;

    const full = (await res.json()) as GitHubRepo;
    return {
      ...repo,
      description: full.description ?? repo.description,
      topics: full.topics?.length ? full.topics : repo.topics,
      homepage: full.homepage ?? repo.homepage,
      language: full.language ?? repo.language,
    };
  } catch {
    return repo;
  }
}

export async function fetchProjectsFromGitHub(): Promise<ProjectEntry[]> {
  const username = process.env.GITHUB_USERNAME?.trim();
  if (!username) {
    return [...manualProjects];
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const isDev = process.env.NODE_ENV === "development";
  const fetchOptions: RequestInit =
    isDev && token
      ? { headers, cache: "no-store" }
      : { headers, next: { revalidate: isDev ? 900 : 3600 } };

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&type=owner`,
      fetchOptions,
    );

    if (!res.ok) {
      const hint =
        res.status === 403 && !token
          ? " — add GITHUB_TOKEN in .env.local (rate limit); optional per-repo enrich needs a token too"
          : "";
      console.warn(
        `[projects] GitHub fetch failed (${res.status}), using manual projects only${hint}`,
      );
      return [...manualProjects];
    }

    const repos = (await res.json()) as GitHubRepo[];
    const exclude = excludedRepoNames();
    const manualSlugs = manualGithubSlugs();

    const filtered = repos
      .filter((r) => !r.fork && !r.archived)
      .filter((r) => !exclude.has(r.name.toLowerCase()))
      .filter((r) => !manualSlugs.has(r.name.toLowerCase()));

    const reposForProjects = token
      ? await Promise.all(
          filtered.map((repo) => enrichRepoFromGitHub(repo, username, fetchOptions)),
        )
      : filtered;

    const fromGitHub = reposForProjects.map(repoToProject);

    return [...manualProjects, ...fromGitHub];
  } catch (err) {
    console.warn("[projects] GitHub fetch error, using manual projects only", err);
    return [...manualProjects];
  }
}
