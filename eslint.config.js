import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  // Astro recommended — sets up the Astro parser for *.astro files
  ...eslintPluginAstro.configs.recommended,

  // Astro a11y rules
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],

  // TypeScript rules, scoped only to .ts / .tsx (not .astro)
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),

  // Ignore build output and deps
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },
];
