import { cache } from "react";
import { portfolioStatic } from "@/data/portfolio";
import type { ExperienceEntry, LeetCodeEntry, ProjectEntry } from "@/data/types";
import { fetchExperienceFromGoogleSheet } from "./experience-from-sheet";
import { fetchLeetCodeProfile } from "./leetcode-from-api";
import { fetchProjectsFromGitHub } from "./projects-from-github";

export type PortfolioContact = Omit<(typeof portfolioStatic)["contact"], "github" | "resume"> & {
  github: string;
  resume: string;
};

export type PortfolioData = Omit<typeof portfolioStatic, "leetcode" | "contact"> & {
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  leetcode: LeetCodeEntry;
  contact: PortfolioContact;
};

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const [experience, projects, leetcode] = await Promise.all([
    fetchExperienceFromGoogleSheet(),
    fetchProjectsFromGitHub(),
    fetchLeetCodeProfile(),
  ]);

  const { leetcode: _staticLeetcode, contact: staticContact, ...rest } = portfolioStatic;

  const githubUser = process.env.GITHUB_USERNAME?.trim();
  const resumeUrl = process.env.RESUME_URL?.trim();
  const contact: PortfolioContact = {
    ...staticContact,
    github: githubUser ? `https://github.com/${githubUser}` : staticContact.github,
    resume: resumeUrl || staticContact.resume,
  };

  return {
    ...rest,
    contact,
    experience,
    projects,
    leetcode,
  };
});
