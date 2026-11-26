// YouTube videos embedded on the site. `name`, `description` and `uploadDate`
// feed the VideoObject schema, so copy them from the video's YouTube page.
export interface YouTubeVideo {
  id: string;
  // Accessible name for the embed's section and iframe.
  label: string;
  name: string;
  description: string;
  uploadDate: string;
}

// https://www.youtube.com/watch?v=ZE8O1UCUIfY
export const gameplayVideo: YouTubeVideo = {
  id: "ZE8O1UCUIfY",
  label: "WrestleVerse gameplay video",
  name: "WrestleVerse: Pro Wrestling GM",
  description:
    "What if you ran your own wrestling promotion? WrestleVerse is a Pro Wrestling GM game where you book matches, build rivalries, and run your own promotion.",
  uploadDate: "2026-02-16T02:38:05-08:00",
};

// https://www.youtube.com/watch?v=F8Q3b1M9i8Y
export const wv2RevealTrailer: YouTubeVideo = {
  id: "F8Q3b1M9i8Y",
  label: "WrestleVerse 2 reveal trailer",
  name: "WrestleVerse 2 — Reveal Trailer [iOS, Android, Windows, Mac, Linux]",
  description:
    "Pixel Playworks has revealed WrestleVerse 2, a wrestling management simulator that puts fans in charge of building the roster, shaping the rivalries and deciding who becomes the next main-event star.",
  uploadDate: "2026-11-26T05:06:38-08:00",
};
