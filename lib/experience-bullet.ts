export type ParsedExperienceBullet = {
  category?: string;
  lead?: string;
  text: string;
  raw: string;
};

export function parseExperienceBullet(raw: string): ParsedExperienceBullet {
  let working = raw.replace(/\*\*/g, "").trim();

  let category: string | undefined;
  const categoryMatch = working.match(/^([^:]+)::\s*(.+)$/);
  if (categoryMatch) {
    category = categoryMatch[1].trim();
    working = categoryMatch[2].trim();
  }

  const emMatch = working.match(/^(.{1,52}?)\s+[—–]\s+(.+)$/);
  if (emMatch) {
    const lead = emMatch[1].trim();
    if (!lead.includes(".") && lead.split(/\s+/).length <= 8) {
      return {
        category,
        lead,
        text: emMatch[2].trim(),
        raw,
      };
    }
  }

  return { category, text: working, raw };
}

export function categoryFilters(bullets: ParsedExperienceBullet[]): { id: string; label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const bullet of bullets) {
    if (!bullet.category) continue;
    counts.set(bullet.category, (counts.get(bullet.category) ?? 0) + 1);
  }
  if (counts.size === 0) return [];

  const filters = [{ id: "all", label: "All", count: bullets.length }];
  for (const [name, count] of counts) {
    filters.push({ id: name, label: name, count });
  }
  return filters;
}
