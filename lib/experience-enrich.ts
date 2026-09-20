import { fallbackExperience } from "@/data/portfolio";
import type { ExperienceEntry } from "@/data/types";

function matchKey(title: string): string {
  return title.trim().toLowerCase();
}

/** Fill missing tools/highlight from local fallback when the sheet row omits them. */
export function enrichExperienceEntries(entries: ExperienceEntry[]): ExperienceEntry[] {
  const fallbackByTitle = new Map(
    fallbackExperience.map((entry) => [matchKey(entry.title), entry]),
  );

  return entries.map((entry) => {
    const fallback = fallbackByTitle.get(matchKey(entry.title));
    if (!fallback) return entry;

    return {
      ...entry,
      tools: entry.tools.length > 0 ? entry.tools : fallback.tools,
      highlightHeadline: entry.highlightHeadline ?? fallback.highlightHeadline,
      highlightCaption: entry.highlightCaption ?? fallback.highlightCaption,
      startDate: entry.startDate ?? fallback.startDate,
    };
  });
}
