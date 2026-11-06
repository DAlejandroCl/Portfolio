# Portfolio — Diego Alejandro Clavijo Ladino

Bilingual (EN default, ES under `/es/`) engineering portfolio of a frontend software engineer. Static site built with Astro, React components, TypeScript and Tailwind CSS 4.

Its idea is that every technical claim carries its source: each metric is shown with where it comes from and when it was checked, and the build fails if a metric has no source.

**Status:** built and tested locally; not deployed yet. Done: the home page, the project list, four case studies and a 404 page in both languages, structured data, `robots.txt`, favicon and social image, and the Vercel configuration. Pending: choosing the domain and deploying (see [DEPLOYMENT.md](DEPLOYMENT.md)), the CV download (it needs CV files without the phone number) and the owner's review of the written copy. Acceptance status per requirement is in [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md#13-acceptance-status); the CI workflow has not run on GitHub yet.

## Principles

- **Evidence rule.** Every published metric references an evidence item (source URL, verification date, status). A metric without one fails the build.
- **No JavaScript required.** Content, navigation and the language switch work without it. Two small inline scripts handle the theme.
- **Accessibility.** Target WCAG 2.1 AA, checked with axe in both themes and both languages, and with a contrast script. It is a target: no manual audit is documented.
- **Same facts in both languages.** Tests fail if numbers, links, sources or sections differ between EN and ES.

## Requirements

Node 22.23.4 or newer (see `.nvmrc`) and pnpm 10.

```bash
pnpm install
pnpm dev
```

## Scripts

| Script                | What it does                                                        |
| --------------------- | ------------------------------------------------------------------- |
| `pnpm dev`            | Start the dev server                                                |
| `pnpm build`          | Build the static site into `dist/`                                  |
| `pnpm preview`        | Serve the built site                                                |
| `pnpm check`          | Type-check Astro, TypeScript and content                            |
| `pnpm lint`           | ESLint (type-aware, a11y rules)                                     |
| `pnpm format:check`   | Prettier check (`pnpm format` to fix)                               |
| `pnpm test`           | Unit tests (Vitest)                                                 |
| `pnpm test:e2e`       | Build, then Playwright + axe end-to-end tests                       |
| `pnpm check:contrast` | WCAG contrast ratios for every declared token pair                  |
| `pnpm audit:deps`     | Fail on high or critical dependency advisories                      |
| `pnpm og`             | Regenerate `public/og.png` after changing the name, role or palette |

Locally, Playwright runs Chromium and a Pixel 5 profile; CI adds Firefox, WebKit and an iPhone 13 profile. CI (`.github/workflows/ci.yml`) runs on pull requests and on pushes to `main`.

## Configuration

`SITE_URL` is the production origin (for example `https://devacl.com`). Canonical URLs, hreflang, the sitemap, `robots.txt`, the social image URL and the structured data use it. Without it the build falls back to `http://localhost:4321`.

## Content

Projects and the publication are Markdown files with validated frontmatter, one per language: `src/content/projects/{en,es}/<slug>.md` and `src/content/publications/{en,es}/`. A case study is the body of the project file, split into sections with `## Title {#id}`. Evidence items sit in the frontmatter, and a section places them in the margin with `<!-- evidence: id, id -->`. The build fails if a required section or a referenced evidence item is missing. To add a project, copy an existing pair of files and keep both languages factually identical. Interface text lives in `src/i18n/dictionaries/`.

## Structure

```
src/
  assets/       Project screenshots
  components/   navigation/, sections/, shared/, ui/ (React rendered to static HTML)
  content/      Collections: projects and publications (en/, es/), schemas, evidence and section rules
  data/         Links and technology names shared by both languages
  i18n/         Locales, dictionaries, path helpers
  layouts/      Base layout (SEO, hreflang, skip link, scripts)
  pages/        Routes (/ and /es/), robots.txt
  seo/          Structured data (Person, ScholarlyArticle)
  styles/       Design tokens and base styles
public/         Favicon and social image
scripts/        Contrast checker, social image generator
tests/          unit/ (Vitest) and e2e/ (Playwright)
```

## Documents

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md): scope, verified claims and publishing rules (a dated record of the discovery phase).
- [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md): requirements, acceptance status and changes made during implementation.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): visual language, tokens and components.
- [DEPLOYMENT.md](DEPLOYMENT.md): deploying to Vercel and choosing the domain.

## Branches

The work was done in phase branches, each stacked on the previous one (`docs/phase-1-2-…`, `feat/phase-3-…` to `feat/phase-8-deploy`, then `docs/audit-documentation`, the latest). `main` holds the project brief and a short README until the latest branch is merged through a pull request (see [DEPLOYMENT.md](DEPLOYMENT.md)). Commits follow Conventional Commits, each file change is its own commit, and history is never rewritten.

## Known notes

- `pnpm audit` reports one moderate advisory in `minimatch`, pulled in by ESLint. It is a development dependency and is not shipped.
- Colors use CSS `light-dark()`, which needs a current browser (Safari 17.5+, Chrome 123+, Firefox 120+).
- No license has been chosen yet, so all rights are reserved until one is added.
