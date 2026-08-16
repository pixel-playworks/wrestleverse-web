const EMBED_ORIGIN = "https://www.youtube-nocookie.com";

const loadEmbed = (player: HTMLElement) => {
  const { videoId, videoTitle } = player.dataset;
  if (!videoId) return;

  const iframe = document.createElement("iframe");
  iframe.src = `${EMBED_ORIGIN}/embed/${videoId}?autoplay=1`;
  iframe.title = videoTitle ?? "";
  iframe.allow =
    "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;

  player.replaceChildren(iframe);
  iframe.focus();
};

// Warm up the connection on intent so the click still feels instant.
const preconnect = () => {
  for (const href of [EMBED_ORIGIN, "https://www.google.com"]) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    document.head.append(link);
  }
};

export const mountVideoFacades = () => {
  document.querySelectorAll<HTMLElement>("[data-video-id]").forEach((player) => {
    const trigger = player.querySelector("button");
    if (!trigger) return;

    trigger.addEventListener("pointerenter", preconnect, { once: true });
    trigger.addEventListener("click", () => loadEmbed(player));
  });
};
