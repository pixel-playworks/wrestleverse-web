export const APP_STORE_URL =
  "https://apps.apple.com/us/app/wrestleverse-pro-wrestling-gm/id6502738747";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.jtsaeed.cobalt&hl=en";

// Real App Store figures, from
// https://itunes.apple.com/lookup?id=6502738747&country=us (checked 2026-08-31).
// Google requires the rating in our structured data to match what the page
// shows, so the Reviews section and the VideoGame schema both read from here.
// Refresh these when the App Store numbers move.
export const APP_STORE_RATING = {
  value: 4.7,
  count: 98,
  price: "9.99",
  currency: "USD",
} as const;
