export type ExperienceEntry = {
  title: string;
  organization: string;
  time: string;
  bullets: string[];
  tools: string[];
  /** ISO-ish date for sorting (e.g. 2025-02-01). Newest first when set. */
  startDate?: string;
  /** Optional highlight (unused in UI; same info lives in bullets) */
  highlightHeadline?: string;
  highlightCaption?: string;
};

export type ProjectEntry = {
  title: string;
  status: string;
  description: string;
  tags: string[];
  url?: string;
};

export type LeetCodeTopic = {
  name: string;
  solved: number;
};

export type LeetCodeEntry = {
  stats: ReadonlyArray<readonly [string, string]>;
  /** Accepted problems (LeetCode "All" difficulty count). Bars use this as 100%. */
  totalProblemsSolved: number;
  topics: LeetCodeTopic[];
  languages: string[];
  profileUrl: string;
};
