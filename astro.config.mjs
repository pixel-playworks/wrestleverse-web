// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

// News posts are written with `#` headings, but the article title is already
// the page's H1 — demote markdown H1s to H2s so each page has a single H1.
function demoteMarkdownH1() {
  /** @param {any} tree */
  return (tree) => {
    visit(tree, 'heading', (/** @type {any} */ node) => {
      if (node.depth === 1) node.depth = 2;
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://wrestleverse.app',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [demoteMarkdownH1],
  },
  image: {
    // Generates a width-based `srcset`/`sizes` for every processed image,
    // including plain `<img>` tags produced from markdown.
    layout: 'constrained',
    // Zero-specificity `:where()` styles so the variants actually scale.
    responsiveStyles: true,
  },
});
