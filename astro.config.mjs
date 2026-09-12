// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// News posts are written with `#` headings, but the article title is already
// the page's H1 — demote markdown H1s to H2s so each page has a single H1.
const demoteMarkdownH1 = {
  name: 'demote-markdown-h1',
  /**
   * @param {{ depth: number }} node
   * @param {{ setProperty: (node: any, key: string, value: any) => void }} ctx
   */
  heading(node, ctx) {
    if (node.depth === 1) ctx.setProperty(node, 'depth', 2);
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://wrestleverse.app',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ mdastPlugins: [demoteMarkdownH1] }),
  },
  image: {
    // Generates a width-based `srcset`/`sizes` for every processed image,
    // including plain `<img>` tags produced from markdown.
    layout: 'constrained',
    // Zero-specificity `:where()` styles so the variants actually scale.
    responsiveStyles: true,
  },
});
