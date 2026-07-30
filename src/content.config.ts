import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// `defineCollection` registers a content type that Astro can query at build time.
// The `glob` loader turns every `.md` file under `src/content/news` into a collection entry.
const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  // The schema validates frontmatter and gives us typed `data` in components.
  // `image()` is a helper that resolves local image paths and wires them into
  // Astro's asset pipeline for optimization.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      image: image(),
    }),
});

export const collections = { news };
