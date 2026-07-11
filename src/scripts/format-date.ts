// Shared formatter so cards and detail pages show dates consistently,
// e.g. "24 Feb 2026".
export function formatNewsDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
