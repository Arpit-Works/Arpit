import { cache } from "react";
import { portfolioStatic } from "@/data/portfolio";
import type { ExperienceEntry, LeetCodeEntry, ProjectEntry } from "@/data/types";
import { fetchExperienceFromGoogleSheet } from "./experience-from-sheet";
import { fetchLeetCodeProfile } from "./leetcode-from-api";
import { fetchProjectsFromGitHub } from "./projects-from-github";

export type PortfolioData = Omit<typeof portfolioStatic, "leetcode"> & {
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  leetcode: LeetCodeEntry;
};

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const [experience, projects, leetcode] = await Promise.all([
    fetchExperienceFromGoogleSheet(),
    fetchProjectsFromGitHub(),
    fetchLeetCodeProfile(),
  ]);

  const { leetcode: _staticLeetcode, ...rest } = portfolioStatic;

  return {
    ...rest,
    experience,
    projects,
    leetcode,
  };
});
