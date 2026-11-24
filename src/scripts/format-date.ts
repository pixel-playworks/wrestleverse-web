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
  // Compare calendar days, not elapsed time. Frontmatter dates ("2026-11-24")
  // parse to UTC midnight, so read the post's day in UTC and today's day in the
  // viewer's local time. Rounding elapsed hours instead turns a post from
  // earlier today into "yesterday" once more than 12 hours have passed.
  const now = new Date();
  const postDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((postDay - today) / 86_400_000); // 86_400_000 ms per day

  if (Math.abs(days) < 7) return rtf.format(days, "day");
  if (Math.abs(days) < 30) return rtf.format(Math.round(days / 7), "week");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}
