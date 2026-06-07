import { PLAY_STORE_URL } from "./store-links";

export const configureCtaLinks = () => {
  const isAndroid = /Android/i.test(navigator.userAgent);

  document.querySelectorAll("[data-cta-link]").forEach((el) => {
    if (el instanceof HTMLAnchorElement) {
      if (isAndroid) {
        el.href = PLAY_STORE_URL;
        el.setAttribute("data-umami-event", "CTA Click (Android)");
      } else {
        el.setAttribute("data-umami-event", "CTA Click (iOS)");
      }
    }
  });
};
