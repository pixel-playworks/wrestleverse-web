# Development Notes

This document records useful commands, configuration lessons, and engineering
practices discovered while building WrestleVerse.

## Everyday Commands

Run these commands from the project root.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Astro development server. |
| `pnpm check` | Run `astro check` for Astro and TypeScript diagnostics. |
| `pnpm lint` | Run ESLint without modifying files. |
| `pnpm lint:fix` | Run ESLint and apply fixes for rules that support auto-fixing. |
| `pnpm build` | Type-check and create the production build. |
| `pnpm preview` | Serve the production build locally. |
| `pnpm exec tsc --showConfig` | Show the final TypeScript config after inherited presets and local overrides are merged. |

## Formatting With Prettier

The Astro VS Code extension includes Prettier formatting for an open `.astro`
file. In VS Code, use **Format Document** or enable format-on-save to format
files as you edit them.

To format the whole application consistently from the terminal, install the
formatter in the project:

```sh
pnpm add --save-dev --save-exact prettier prettier-plugin-astro
```

Create a `.prettierrc` in the project root:

```json
{
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

Then format all supported project files:

```sh
pnpm exec prettier . --write
```

`--write` changes files in place, so review the diff after the first project-
wide formatting run and keep that formatting-only change separate from feature
work.

## Check Versus Lint Versus Fix

These commands solve related but different problems.

### `astro check`

Checks whether Astro and TypeScript code is valid. It catches type errors such
as assigning a number to a variable declared as a string.

```astro
---
const title: string = 123;
---

<h1>{title}</h1>
```

`astro check` reports that `number` cannot be assigned to `string`.

### `eslint .`

Checks whether files obey configured code-quality and accessibility rules. For
example, it may report an unused variable:

```ts
const unused = "not used anywhere";
```

ESLint is rule-based. It does not automatically report every possible
TypeScript or Astro issue unless a relevant rule is configured.

### `eslint . --fix`

Runs ESLint and automatically repairs issues that have safe fixes. It does not
fix type errors and it cannot repair lint rules that require a human decision.

For example, with an appropriate formatting rule it could change:

```ts
const greeting = "hello"
```

to:

```ts
const greeting = "hello";
```

## Astro And TypeScript Configuration

The project TypeScript configuration starts from Astro's strict preset:

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

An `extends` entry means the visible `tsconfig.json` is not the whole config.
Astro's preset contributes settings, and this project's `compilerOptions`
override or add to them.

Use this command when an editor error and the command-line checks disagree:

```sh
pnpm exec tsc --showConfig
```

It prints the resolved configuration actually used by TypeScript.

### Importing TypeScript Components

This project currently overrides Astro's default and disallows import paths
ending in `.ts` or `.tsx`:

```json
{
  "compilerOptions": {
    "allowImportingTsExtensions": false
  }
}
```

Use extensionless imports for local TypeScript modules:

```astro
---
import CountdownTimer from "../components/CountdownTimer";
---
```

This is conventional with Astro/Vite module resolution and avoids editor
diagnostics about `.ts` import extensions.

### Import Types Explicitly

Types exist only during TypeScript checking; they are not runtime JavaScript.
Use `import type` for imports used only as types in `.astro`, `.ts`, and `.tsx`
files:

```ts
import { createStore } from "./store";
import type { StoreState } from "./store";
```

For a module containing both runtime values and types, inline notation is also
valid:

```ts
import { formatWrestlerName, type Wrestler } from "./wrestler";
```

Benefits:

- Tells Astro and the bundler that the import must disappear from runtime code.
- Prevents attempts to load a type-only export as if it were JavaScript.
- Avoids runtime export errors caused by erased TypeScript interfaces or types.
- Makes it obvious which imports affect the application bundle.
- Matches strict TypeScript behavior such as `verbatimModuleSyntax`.

Summary: use normal `import` for code that runs, and `import type` for names
used only in annotations, interfaces, or generic type positions.

### Prefer Type Guards Over Type Casting

When narrowing DOM element types (e.g., matching a selector like `[data-cta-link]`), prefer runtime type guards over compile-time casting:

* **Type Guard (`instanceof HTMLAnchorElement`)**:
  * **Safe at Runtime**: Confirms the browser actually has an `<a>` element before mutating its properties (like `.href`). Prevents page script crashes if elements are modified incorrectly in markup later.
  * **Automatic Narrowing**: TypeScript automatically recognizes this condition and narrows the type within the block.
* **Type Casting (`as HTMLAnchorElement` or `<HTMLAnchorElement>el`)**:
  * **Compile-Time Only**: It has no effect at runtime (the cast code compiles away completely). If the element ends up not being an anchor, the script will crash or throw errors silently at runtime.

## Astro Islands With Preact

Interactive Preact components can be rendered as Astro islands. The hydration
directive controls when browser JavaScript is loaded and executed.

| Directive | Use when |
| --- | --- |
| `client:load` | The interaction is immediately important, such as a live countdown. |
| `client:idle` | The component can wait until the browser is less busy. |
| `client:visible` | The component is below the fold and only needs hydration when seen. |

Example:

```astro
<CountdownTimer client:load />
<RosterFilter client:idle />
<FightPoll client:visible />
```

Prefer the least eager hydration mode that still gives users the expected
experience. Static Astro markup ships less JavaScript than hydrating every
component immediately.

## Astro Interactivity

This project currently does not use a UI framework integration. Prefer static
Astro markup and small browser scripts in `src/scripts/` for simple interactions
such as the CTA link rewrite or mobile menu behavior. Add a framework integration
only when the interaction grows beyond what a focused script can handle cleanly.

## Static Astro Page Sections

Keep route files such as `src/pages/index.astro` focused on composing the page.
Static sections like navigation and hero content can live in
`src/components/*.astro` without adding browser-side JavaScript. Keep local
section data and section-specific `<style>` rules in the owning component.

Astro component styles are scoped by default: a style in `Navbar.astro` does
not apply to similarly named markup rendered by a footer or another component.
When a visual element becomes genuinely shared, extract that element or make
the shared styling explicit rather than relying on parent component styles.

For a simple mobile navigation toggle, a native `<details>` with a styled
`<summary>` supplies disclosure state and keyboard activation without a
framework island. When close-on-selection and `Escape` behavior is mobile-only,
keep it in a dynamically imported module guarded by the matching mobile
`matchMedia()` query. A tiny gate still runs on desktop so resizing into the
mobile layout can load the enhancement.
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details

### Decorative Media And Icons

Use `aria-hidden="true"` for decorative SVGs or images when the surrounding
element already has an accessible name. For example, an app-store link can use
`aria-label="Download WrestleVerse for iOS on Apple App Store"` while its Apple
SVG icon is hidden from assistive tech. This prevents screen readers from
announcing duplicate or unhelpful content such as "image" or an icon name.

General convention:

- You should use aria-hidden="true" whenever an element on your screen is purely
  decorative or redundant, meaning a visually impaired user gains absolutely zero
  value from hearing it read aloud.
- Hidden from screen readers, not from the human user.

### Screen-Reader-Only Text

Use `.sr-only` when visible UI is icon-only or visually obvious but still needs
an accessible text label. In the header, the mobile menu `<summary>` shows three
hamburger lines, but those lines do not describe the control to a screen reader.
The hidden `<span class="sr-only">Navigation menu</span>` gives the control a useful accessible name without adding visible text.
Another valid option would be putting aria-label="Navigation menu"
directly on the <summary>, but the .sr-only text pattern is common and clear.

Do not replace this with `display: none`, because that hides the text from
assistive tech too. The `.sr-only` pattern visually clips the text to a tiny
area while keeping it available to screen readers.

## Web Typography

Custom web fonts used by global CSS live in `public/fonts/` and are referenced
with root-relative URLs such as `/fonts/SFPro-Display-Bold.woff2`. Keep the
`@font-face` declarations in `src/styles/global.css`, then map components
through the existing CSS variables:

- `--font-display` for display headings and hero text.
- `--font-body` for general site copy and navigation.
- `--font-rounded` for rounded UI text such as CTA buttons.

Multiple `@font-face` rules can share the same `font-family` name. The family
name identifies the typeface, while `font-weight` and `font-style` select the
specific file. For example, both Display Medium and Display Bold use
`font-family: "SF Pro Display"`, but the browser chooses between them based on
whether the element asks for `font-weight: 500` or `font-weight: 700`.

If a component does not specify `font-weight`, normal text defaults to `400` or
inherits from its parent. If there is no matching `@font-face` for that weight,
the browser chooses the closest available face or synthesizes the missing
weight, which can look inconsistent across browsers. Set `font-weight`
explicitly where the design spec matters, and add the matching `.woff2` plus an
`@font-face` rule when an exact weight is required.

`font-style: normal` marks these files as upright rather than italic or oblique.
`font-display: swap` lets fallback text render immediately and swaps in the
custom font after it loads, avoiding invisible text during font loading.

For a lightweight body font that feels native on each platform, use:

```css
--font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
  sans-serif;
```

- `system-ui` uses the operating system's interface font, including SF on
  Apple devices, without shipping a font file.
- `"SF Pro Icons"` is an icon font, not a suitable fallback for body text.
- Naming `"SF Pro Display"` alone does not provide SF Pro to Windows, Android,
  or browsers where that font is not installed.
- For identical branded typography across devices, choose a separately
  licensed web font and serve optimized `woff2` files instead.

## Security and External Links

### `rel="noopener"` and `rel="noreferrer"`

When linking to external sites using `target="_blank"`, follow security best practices:

* **`rel="noopener"`**: Prevents the newly opened tab from accessing the originating page's `window.opener` object. This blocks potential "tabnabbing" phishing attacks where an external page alters the original tab's location.
  * *What is Tabnabbing?* A phishing vector where an untrusted target page uses `window.opener.location = "https://fake-login..."` to silently redirect the background tab (your original site) to a malicious page while the user's focus is on the new tab. When the user returns to the original tab, they see a fake login page and enter their credentials.
* **`rel="noreferrer"`**: Implements all the protections of `noopener` and additionally prevents the browser from sending the `Referer` HTTP header to the destination site, protecting user privacy/origin info.

#### Are they required explicitly?

* **Modern Browsers**: Since 2021, all major modern browsers (Chrome 88+, Firefox 79+, Safari 12.1+) **implicitly apply `noopener` behavior** by default whenever `target="_blank"` is used.
* **Best Practice**: Explicitly declaring `rel="noopener"` or `rel="noreferrer"` is still recommended if you need to support legacy browsers, satisfy strict automated security scanners (e.g., SonarQube, Lighthouse audit rules), or want to hide the HTTP referrer header (`noreferrer`).

https://elementor.com/blog/noopener-noreferrer/
https://css-tricks.com/targetblank/ -> Cool trick the new tab to be linked to the first tab. So once a new tab is opened, any updates via the original homepage will just update this newly opened tab.

## Engineering Practices

### Use The Right Tool For The Question

- Use `astro check` for Astro and TypeScript correctness.
- Use `eslint` for configured code-quality and accessibility rules.
- Use `tsc --showConfig` when inheritance or editor behavior is confusing.
- Use `pnpm build` before publishing because it verifies the production path.

### Verify Effective Configuration

A config file may extend another preset, and an editor may use stale settings
or a different TypeScript service. Before changing code to satisfy a confusing
diagnostic, inspect the resolved configuration and run the repository checks.

### Keep Runtime Dependencies Focused

Packages used only during development, linting, or checking belong in
`devDependencies`. Packages needed by the application at runtime, such as
Astro and Sharp's build-time image optimizer, belong in `dependencies`.

### Make Small, Purposeful Commits

Separate tooling/configuration changes from UI implementation when practical.
Small commits are easier to review, revert, and reason about later.

### Validate Before Pushing

For normal application work, a useful minimum loop is:

```sh
pnpm check
pnpm lint
pnpm build
```

If one fails, fix the cause and rerun it before committing or pushing.

### Validate Before Committing

Husky runs the repository's `.husky/pre-commit` hook whenever `git commit` is
attempted:

```sh
pnpm lint
pnpm check
```

If either command fails, Git does not create the commit. The `prepare` script
in `package.json` installs the hook configuration after `pnpm install`, so it
is shared with developers who clone the repository and install dependencies.
Use `git commit --no-verify` only for an intentional exceptional case, because
it skips this protection.

Other useful Husky hooks, if the project needs them later:

| Hook | Typical command or purpose | When it is worth adding |
| --- | --- | --- |
| `commit-msg` | Validate a commit message convention, such as Conventional Commits. | When changelogs or release automation depend on structured messages. |
| `pre-push` | Run `pnpm exec astro build` or tests before pushing. | When a slower check should block remote updates, not every local commit. |
| `pre-commit` with staged formatting | Run Prettier or staged-file lint fixes. | Once project-wide Prettier configuration has been adopted. |

Avoid putting slow or auto-modifying tasks into `pre-commit` without a clear
benefit. Fast checks encourage developers to keep hooks enabled; production
build validation remains covered by pull request CI.

### Pull Request Validation

GitHub Actions validates every pull request with three checks:

```sh
pnpm lint
pnpm check
pnpm exec astro build
```

- `pnpm lint` catches configured quality and accessibility rule violations.
- `pnpm check` catches Astro and TypeScript diagnostics.
- `pnpm exec astro build` proves the site can generate a production build
  without rerunning the check already reported as its own CI step.

The project also explicitly allows the install scripts required by Astro's
transitive build tooling in `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  esbuild: true
  sharp: true
```

With pnpm 11, an unreviewed dependency install script fails installation by
default. Keep this allowlist narrow: if a future install reports another
package, review why it needs to run a script before approving it.

## Notes To Add Later

- Environment variable conventions once external services are introduced.
- Content collection patterns if the project adds editorial content.
- Test strategy when interactions or business logic grow.
- Deployment and adapter decisions if the site moves beyond static output.
