import { organizationRef } from "@schema/organization";

// The iframe is mounted by client JS, so crawlers never see it. This declares
// the video to search engines, which is also what makes it eligible for video
// results.
export const videoObject = (site: URL | undefined, videoId: string) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "WrestleVerse: Pro Wrestling GM",
  description:
    "What if you ran your own wrestling promotion? WrestleVerse is a Pro Wrestling GM game where you book matches, build rivalries, and run your own promotion.",
  thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  uploadDate: "2026-02-16T02:38:05-08:00",
  embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
  contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
  publisher: organizationRef(site),
});
