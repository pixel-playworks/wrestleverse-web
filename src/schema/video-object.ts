import { organizationRef } from "@schema/organization";
import type { YouTubeVideo } from "../data/videos";

// The iframe is mounted by client JS, so crawlers never see it. This declares
// the video to search engines, which is also what makes it eligible for video
// results.
export const videoObject = (site: URL | undefined, video: YouTubeVideo) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: video.name,
  description: video.description,
  thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
  uploadDate: video.uploadDate,
  embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
  contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
  publisher: organizationRef(site),
});
