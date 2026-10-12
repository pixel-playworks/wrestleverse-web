// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wrestleverse.app',
  integrations: [sitemap()],
  build: {
    // Ship CSS inside each page: no render-blocking stylesheet request on the
    // first visit, and a prefetched page arrives with everything it needs.
    inlineStylesheets: 'always',
  },
  image: {
    // Generates a width-based `srcset`/`sizes` for every processed image,
    // including plain `<img>` tags produced from markdown.
    layout: 'constrained',
    // Zero-specificity `:where()` styles so the variants actually scale.
    responsiveStyles: true,
  },
});
