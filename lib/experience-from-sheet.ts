import type { ExperienceEntry } from "@/data/types";
import { fallbackExperience } from "@/data/portfolio";
import { enrichExperienceEntries } from "./experience-enrich";
import { sortExperienceNewestFirst } from "./experience-sort";
import { resolveGoogleSheetCsvUrl } from "./google-sheets-url";
import { parseCsv } from "./parse-csv";

const BULLET_SEP = "||";
const TOOL_SEP = /[|,;]/;

function columnIndex(header: string[], names: string[]): number {
  for (const name of names) {
    const index = header.indexOf(name);
    if (index >= 0) return index;
  }
  return -1;
}

function normalizeHeader(cell: string): string {
  return cell.replace(/^\uFEFF/, "").trim().toLowerCase().replace(/\s+/g, "_");
}

function parseBullets(raw: string): string[] {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  let parts: string[];
  if (normalized.includes(BULLET_SEP)) {
    parts = normalized.split(BULLET_SEP);
  } else if (normalized.includes("\n")) {
    parts = normalized.split("\n");
  } else if (/[•·\u2022]/.test(normalized)) {
    parts = normalized.split(/[•·\u2022]\s*/);
  } else {
    parts = [normalized];
  }

  return parts
    .map((b) => b.trim().replace(/^[-*]\s+/, ""))
    .filter(Boolean);
}

function parseHighlight(raw: string): { headline?: string; caption?: string } {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return {};

  const [headline, caption] = normalized.includes(BULLET_SEP)
    ? normalized.split(BULLET_SEP)
    : normalized.split("\n");

  return {
    headline: headline?.trim() || undefined,
    caption: caption?.trim() || undefined,
  };
}

function parseTools(raw: string): string[] {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const parts = normalized.includes(BULLET_SEP)
    ? normalized.split(BULLET_SEP)
    : TOOL_SEP.test(normalized)
      ? normalized.split(TOOL_SEP)
      : normalized.split(/\s{2,}/);

  return parts.map((t) => t.trim()).filter(Boolean);
}

function readTools(row: string[], header: string[]): string[] {
  const toolsIdx = columnIndex(header, [
    "tools",
    "tech",
    "tech_stack",
    "stack",
    "technologies",
    "skills",
    "used",
  ]);

  if (toolsIdx < 0) return [];

  return parseTools(row[toolsIdx] ?? "");
}

function rowsToExperience(rows: string[][]): ExperienceEntry[] {
  if (rows.length < 2) return [];

  const header = rows[0].map(normalizeHeader);
  const idx = {
    title: header.indexOf("title"),
    organization: header.indexOf("organization"),
    time: header.indexOf("time"),
    bullets: header.indexOf("bullets"),
    startDate: header.indexOf("start_date"),
    highlight: header.indexOf("highlight"),
  };

  if (idx.title < 0 || idx.time < 0 || idx.bullets < 0) {
    console.warn(
      "[experience] Google Sheet must include columns: title, organization, time, bullets. Optional: tools, start_date, highlight. Found:",
      header.join(", "),
    );
    return [];
  }

  const jobs: ExperienceEntry[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const title = row[idx.title]?.trim();
    if (!title) continue;

    const bullets = parseBullets(row[idx.bullets] ?? "");

    const startDate =
      idx.startDate >= 0 ? (row[idx.startDate] ?? "").trim() : undefined;
    const highlight =
      idx.highlight >= 0 ? parseHighlight(row[idx.highlight] ?? "") : {};

    jobs.push({
      title,
      organization: idx.organization >= 0 ? (row[idx.organization] ?? "").trim() : "",
      time: row[idx.time]?.trim() ?? "",
      bullets,
      tools: readTools(row, header),
      startDate: startDate || undefined,
      highlightHeadline: highlight.headline,
      highlightCaption: highlight.caption,
    });
  }

  return enrichExperienceEntries(sortExperienceNewestFirst(jobs));
}

export async function fetchExperienceFromGoogleSheet(): Promise<ExperienceEntry[]> {
  const url = process.env.GOOGLE_SHEETS_EXPERIENCE_CSV_URL?.trim();
  if (!url) {
    return enrichExperienceEntries(sortExperienceNewestFirst(fallbackExperience));
  }

  try {
    const csvUrl = resolveGoogleSheetCsvUrl(url);
    const res = await fetch(csvUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`[experience] Sheet fetch failed (${res.status}), using fallback`);
      return enrichExperienceEntries(sortExperienceNewestFirst(fallbackExperience));
    }

    const text = await res.text();
    if (text.trimStart().startsWith("<!DOCTYPE") || text.trimStart().startsWith("<html")) {
      console.warn(
        "[experience] Sheet returned HTML, not CSV. Share the sheet as Anyone with the link (Viewer) and use a Sheets URL or CSV export link in GOOGLE_SHEETS_EXPERIENCE_CSV_URL.",
      );
      return enrichExperienceEntries(sortExperienceNewestFirst(fallbackExperience));
    }

    const rows = parseCsv(text);
    const parsed = rowsToExperience(rows);

    return parsed.length > 0
      ? parsed
      : enrichExperienceEntries(sortExperienceNewestFirst(fallbackExperience));
  } catch (err) {
    console.warn("[experience] Sheet fetch error, using fallback", err);
    return enrichExperienceEntries(sortExperienceNewestFirst(fallbackExperience));
  }
}
