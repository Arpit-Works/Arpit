import type { ExperienceEntry } from "@/data/types";
import { fallbackExperience } from "@/data/portfolio";
import { resolveGoogleSheetCsvUrl } from "./google-sheets-url";
import { parseCsv } from "./parse-csv";

const BULLET_SEP = "||";

function normalizeHeader(cell: string): string {
  return cell.replace(/^\uFEFF/, "").trim().toLowerCase().replace(/\s+/g, "_");
}

function parseBullets(raw: string): string[] {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const parts = normalized.includes(BULLET_SEP)
    ? normalized.split(BULLET_SEP)
    : normalized.split("\n");

  return parts.map((b) => b.trim()).filter(Boolean);
}

function rowsToExperience(rows: string[][]): ExperienceEntry[] {
  if (rows.length < 2) return [];

  const header = rows[0].map(normalizeHeader);
  const idx = {
    title: header.indexOf("title"),
    organization: header.indexOf("organization"),
    time: header.indexOf("time"),
    bullets: header.indexOf("bullets"),
  };

  if (idx.title < 0 || idx.time < 0 || idx.bullets < 0) {
    console.warn(
      "[experience] Google Sheet must include columns: title, organization, time, bullets. Found:",
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

    jobs.push({
      title,
      organization: idx.organization >= 0 ? (row[idx.organization] ?? "").trim() : "",
      time: row[idx.time]?.trim() ?? "",
      bullets,
    });
  }

  return jobs;
}

export async function fetchExperienceFromGoogleSheet(): Promise<ExperienceEntry[]> {
  const url = process.env.GOOGLE_SHEETS_EXPERIENCE_CSV_URL?.trim();
  if (!url) {
    return fallbackExperience;
  }

  try {
    const csvUrl = resolveGoogleSheetCsvUrl(url);
    const res = await fetch(csvUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`[experience] Sheet fetch failed (${res.status}), using fallback`);
      return fallbackExperience;
    }

    const text = await res.text();
    if (text.trimStart().startsWith("<!DOCTYPE") || text.trimStart().startsWith("<html")) {
      console.warn(
        "[experience] Sheet returned HTML, not CSV. Share the sheet as Anyone with the link (Viewer) and use a Sheets URL or CSV export link in GOOGLE_SHEETS_EXPERIENCE_CSV_URL.",
      );
      return fallbackExperience;
    }

    const rows = parseCsv(text);
    const parsed = rowsToExperience(rows);

    return parsed.length > 0 ? parsed : fallbackExperience;
  } catch (err) {
    console.warn("[experience] Sheet fetch error, using fallback", err);
    return fallbackExperience;
  }
}
