import { portfolioStatic } from "@/data/portfolio";
import type { LeetCodeEntry } from "@/data/types";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const USER_PROFILE_QUERY = `query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    submitStats: submitStatsGlobal {
      acSubmissionNum { difficulty count }
    }
    profile { ranking }
    tagProblemCounts {
      advanced { tagName problemsSolved }
      intermediate { tagName problemsSolved }
      fundamental { tagName problemsSolved }
    }
    languageProblemCount { languageName problemsSolved }
  }
}`;

type AcSubmission = { difficulty: string; count: number };
type TagCount = { tagName: string; problemsSolved: number };
type LanguageCount = { languageName: string; problemsSolved: number };

type LeetCodeApiUser = {
  submitStats?: { acSubmissionNum: AcSubmission[] };
  profile?: { ranking: number | null };
  tagProblemCounts?: {
    advanced: TagCount[];
    intermediate: TagCount[];
    fundamental: TagCount[];
  };
  languageProblemCount?: LanguageCount[];
};

function fallbackLeetCode(): LeetCodeEntry {
  const { leetcode } = portfolioStatic;
  return {
    stats: [...leetcode.stats],
    totalProblemsSolved: 0,
    topics: leetcode.topics.map((name) => ({ name, solved: 0 })),
    languages: [...leetcode.languages],
    profileUrl: "",
  };
}

function countByDifficulty(nums: AcSubmission[], difficulty: string): number {
  return nums.find((n) => n.difficulty === difficulty)?.count ?? 0;
}

function displayLanguageName(name: string): string {
  if (name === "Python3") return "Python";
  return name;
}

function buildFromUser(username: string, user: LeetCodeApiUser): LeetCodeEntry {
  const ac = user.submitStats?.acSubmissionNum ?? [];
  const total = countByDifficulty(ac, "All");
  const easy = countByDifficulty(ac, "Easy");
  const medium = countByDifficulty(ac, "Medium");
  const hard = countByDifficulty(ac, "Hard");

  const contestStat =
    user.profile?.ranking != null
      ? `#${user.profile.ranking.toLocaleString("en-US")}`
      : "—";
  const contestLabel = "global rank";

  const tagGroups = user.tagProblemCounts;
  const allTags: TagCount[] = tagGroups
    ? [...tagGroups.fundamental, ...tagGroups.intermediate, ...tagGroups.advanced]
    : [];

  const topics = allTags
    .filter((t) => t.problemsSolved > 0)
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, 8)
    .map((t) => ({ name: t.tagName, solved: t.problemsSolved }));

  const languages = (user.languageProblemCount ?? [])
    .filter((l) => l.problemsSolved > 0)
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .map((l) => displayLanguageName(l.languageName));

  return {
    stats: [
      [String(total), "problems solved"],
      [`${easy} / ${medium} / ${hard}`, "easy / medium / hard"],
      [contestStat, contestLabel],
    ],
    totalProblemsSolved: total,
    topics: topics.length > 0 ? topics : fallbackLeetCode().topics,
    languages: languages.length > 0 ? languages : fallbackLeetCode().languages,
    profileUrl: `https://leetcode.com/u/${username}/`,
  };
}

export async function fetchLeetCodeProfile(): Promise<LeetCodeEntry> {
  const username = process.env.LEETCODE_USERNAME?.trim();
  if (!username) {
    return fallbackLeetCode();
  }

  const isDev = process.env.NODE_ENV === "development";
  const fetchOptions: RequestInit = isDev
    ? { cache: "no-store" }
    : { next: { revalidate: 3600 } };

  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      ...fetchOptions,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "portfolio-site",
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username },
      }),
    });

    if (!res.ok) {
      console.warn(`[leetcode] fetch failed (${res.status}), using fallback`);
      return fallbackLeetCode();
    }

    const json = (await res.json()) as {
      data?: { matchedUser: LeetCodeApiUser | null };
      errors?: { message: string }[];
    };

    const user = json.data?.matchedUser;
    if (!user) {
      const msg = json.errors?.[0]?.message ?? "user not found";
      console.warn(`[leetcode] ${msg}, using fallback`);
      return fallbackLeetCode();
    }

    return buildFromUser(username, user);
  } catch (err) {
    console.warn("[leetcode] fetch error, using fallback", err);
    return fallbackLeetCode();
  }
}
