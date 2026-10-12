import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  type APP_STORE_RATING,
} from "@scripts/store-links";
import { organizationRef } from "@schema/organization";

// Declares the game itself as an entity for search and AI engines.
export const videoGame = (
  site: URL | undefined,
  rating: typeof APP_STORE_RATING,
) => ({
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "WrestleVerse: Pro Wrestling GM",
  url: site?.href,
  description:
    "A premium mobile pro wrestling booking & management simulator. Book matches, create rivalries, run your own promotion, and experience live-called commentary.",
  genre: ["Sports Management", "Simulation"],
  gamePlatform: ["iOS", "iPadOS", "macOS", "Android"],
  applicationCategory: "Game",
  operatingSystem: "iOS, iPadOS, macOS, Android",
  publisher: organizationRef(site),
  sameAs: [APP_STORE_URL, PLAY_STORE_URL],
  // Must mirror the rating shown in the Reviews section: Google does not accept
  // structured data describing content users can't see on the page.
  // https://developers.google.com/search/docs/appearance/structured-data/sd-policies#structured-data-guidelines
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: rating.value,
    ratingCount: rating.count,
  },
});
