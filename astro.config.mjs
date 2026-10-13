// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wrestleverse.app',
  integrations: [mdx(), sitemap()],
  // Pages are served at `/about/`; Netlify 301-redirects `/about` there,
  // costing a round trip per click. `always` makes `astro dev` 404 on
  // slashless internal links so they get caught before deploy.
  trailingSlash: 'always',
  // Fetch internal pages as soon as their links scroll into view, so clicking
  // a nav link or news card loads from cache instead of waiting on the network.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  experimental: {
    // In Chromium, fully render prefetched pages in the background so they
    // appear instantly on click. Other browsers fall back to prefetch.
    clientPrerender: true,
  },
  image: {
    // Generates a width-based `srcset`/`sizes` for every processed image,
    // including plain `<img>` tags produced from markdown.
    layout: 'constrained',
    // Zero-specificity `:where()` styles so the variants actually scale.
    responsiveStyles: true,
  },
});
