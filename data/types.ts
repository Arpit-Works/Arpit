export type ExperienceEntry = {
  title: string;
  organization: string;
  time: string;
  bullets: string[];
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
  topics: LeetCodeTopic[];
  languages: string[];
  profileUrl: string;
};
