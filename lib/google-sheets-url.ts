/** Turn a normal Google Sheets browser URL into a CSV fetch URL. */
export function resolveGoogleSheetCsvUrl(input: string): string {
  const trimmed = input.trim();

  if (trimmed.includes("tqx=out:csv") || trimmed.includes("format=csv")) {
    return trimmed;
  }

  const idMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!idMatch) {
    return trimmed;
  }

  const sheetId = idMatch[1];
  const gidMatch = trimmed.match(/[?&#]gid=(\d+)/);
  const gid = gidMatch?.[1] ?? "0";

  // gviz works when the sheet is link-shared (export often needs explicit publish).
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
}
