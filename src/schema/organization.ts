import { APP_STORE_URL, PLAY_STORE_URL } from "@scripts/store-links";

/** The `@id` every other schema points at as publisher/author. */
export const organizationRef = (site: URL | undefined) => ({
  "@id": new URL("/#organization", site).href,
});

// Declares the WrestleVerse brand entity to search and AI engines.
export const organization = (site: URL | undefined, logoUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  ...organizationRef(site),
  name: "WrestleVerse",
  url: site?.href,
  logo: new URL(logoUrl, site).href,
  email: "james@pixelplay.works",
  sameAs: [
    "https://www.instagram.com/wrestleverse.app",
    "https://www.facebook.com/wrestleverseapp",
    "https://www.youtube.com/@wrestleverse-app",
    "https://x.com/WrestleVerseApp",
    "https://discord.com/invite/GKbXVpS3jD",
    APP_STORE_URL,
    PLAY_STORE_URL,
  ],
});
