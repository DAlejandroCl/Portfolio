# Portfolio — Diego Alejandro Clavijo Ladino

Bilingual (EN default, ES under `/es/`) portfolio of a frontend software engineer. Static site built with Astro, React components and Tailwind CSS 4.

**Status:** Phase 4 (home page) complete. Case study pages, the CV download and the final copy review come next (see the phases in PRODUCT_REQUIREMENTS.md).

## Principles

- **Evidence rule.** Every published metric must reference an evidence item (source URL, verification date, status). A metric without one fails the build.
- **No JavaScript required.** Content, navigation and the language switch work without it.
- **Accessibility.** Target WCAG 2.1 AA, checked with axe in both color schemes and with a contrast script.
- **Same facts in both languages.** A unit test fails if numbers, links or sources differ between EN and ES.

## Requirements

Node 22.23.4 or newer (see `.nvmrc`) and pnpm 10.

## Scripts

| Script                | What it does                                       |
| --------------------- | -------------------------------------------------- |
| `pnpm dev`            | Start the dev server                               |
| `pnpm build`          | Build the static site into `dist/`                 |
| `pnpm preview`        | Serve the built site                               |
| `pnpm check`          | Type-check Astro, TypeScript and content           |
| `pnpm lint`           | ESLint (type-aware, a11y rules)                    |
| `pnpm format:check`   | Prettier check (`pnpm format` to fix)              |
| `pnpm test`           | Unit tests (Vitest)                                |
| `pnpm test:e2e`       | Build, then Playwright + axe end-to-end tests      |
| `pnpm check:contrast` | WCAG contrast ratios for every declared token pair |
| `pnpm audit:deps`     | Fail on high or critical dependency advisories     |

Set `SITE_URL` to the production origin before building for deployment; canonical URLs and the sitemap use it.

## Structure

```
src/
  components/   React components rendered to static HTML
  data/         Links and technology names shared by both languages
  content/      Projects and publications (en/, es/) and schemas
  i18n/         Locales, dictionaries, path helpers
  layouts/      Base layout (SEO, hreflang, skip link)
  pages/        Routes (/ and /es/)
  styles/       Design tokens and base styles
scripts/        Contrast checker
tests/          unit/ (Vitest) and e2e/ (Playwright)
```

## Documents

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md) — scope, verified claims, publishing rules
- [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md) — requirements
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — visual language and tokens

## Known notes

- `pnpm audit` reports one moderate advisory in `minimatch`, pulled in by ESLint. It is a development dependency and is not shipped.
- Colors use CSS `light-dark()`, which needs a current browser (Safari 17.5+, Chrome 123+, Firefox 120+).
