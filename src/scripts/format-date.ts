// Shared formatter so cards and detail pages show dates consistently,
// e.g. "24 Feb 2026".
export function formatNewsDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Relative formatter for cards, e.g. "3 days ago", "2 weeks ago", "2 months ago".
// Always UK English. Rendered at build time as a fallback, then re-computed in
// the browser (see NewsCard's client script) so "ago" stays fresh between deploys.
export function formatRelativeDate(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
  const days = Math.round((date.getTime() - Date.now()) / 86_400_000); // 86_400_000 ms per day

  if (Math.abs(days) < 7) return rtf.format(days, "day");
  if (Math.abs(days) < 30) return rtf.format(Math.round(days / 7), "week");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}
