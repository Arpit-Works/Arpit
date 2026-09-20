import type { ExperienceEntry } from "@/data/types";

const MONTHS: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function monthYearToTimestamp(monthStr: string, yearStr: string): number {
  const key = monthStr.toLowerCase().replace(/\./g, "").slice(0, 3);
  const month = MONTHS[monthStr.toLowerCase()] ?? MONTHS[key];
  const year = Number.parseInt(yearStr, 10);
  if (month === undefined || Number.isNaN(year)) return 0;
  return new Date(year, month, 1).getTime();
}

/** Higher = more recent (for descending sort). */
export function experienceSortKey(job: ExperienceEntry): number {
  if (job.startDate) {
    const parsed = Date.parse(job.startDate);
    if (!Number.isNaN(parsed)) {
      return parsed + (/\bpresent\b/i.test(job.time) ? 1_000_000_000_000 : 0);
    }
  }

  const time = job.time;
  if (/\bpresent\b/i.test(time)) {
    const match = time.match(/\b([A-Za-z]{3,9})\s+(\d{4})\b/);
    if (match) {
      return Math.max(monthYearToTimestamp(match[1], match[2]), Date.now() - 86400000);
    }
    return Date.now();
  }

  const match = time.match(/\b([A-Za-z]{3,9})\s+(\d{4})\b/);
  if (match) {
    return monthYearToTimestamp(match[1], match[2]);
  }

  return 0;
}

export function sortExperienceNewestFirst(jobs: ExperienceEntry[]): ExperienceEntry[] {
  return [...jobs].sort((a, b) => experienceSortKey(b) - experienceSortKey(a));
}
