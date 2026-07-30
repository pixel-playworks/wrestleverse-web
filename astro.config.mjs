// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  image: {
    // Generates a width-based `srcset`/`sizes` for every processed image,
    // including plain `<img>` tags produced from markdown.
    layout: 'constrained',
    // Zero-specificity `:where()` styles so the variants actually scale.
    responsiveStyles: true,
  },
});
