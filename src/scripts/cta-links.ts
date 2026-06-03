import { PLAY_STORE_URL } from "./store-links";

export const configureCtaLinks = () => {
  if (!/Android/i.test(navigator.userAgent)) return;

  document.querySelectorAll("[data-cta-link]").forEach((el) => {
    if (el instanceof HTMLAnchorElement) {
      el.href = PLAY_STORE_URL;
    }
  });
};
