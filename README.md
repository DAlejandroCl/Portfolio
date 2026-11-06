# Portfolio — Diego Alejandro Clavijo Ladino

Bilingual (English and Spanish) engineering portfolio of a frontend software engineer, built with Astro, React components, TypeScript and Tailwind CSS 4. The site's idea is that every technical claim carries its source: each metric on a page is shown with where it comes from and when it was checked, and the build fails if a metric has no source.

## Where the code is

The work is organised in phases and each phase lives in its own branch. The branches are stacked: every branch contains the previous ones, so the most recent branch holds the complete project. Nothing has been merged into `main` yet, which is why `main` only holds this file and the project brief.

| Phase | Branch                                   | Adds                                                              |
| ----- | ---------------------------------------- | ----------------------------------------------------------------- |
| 0     | `main`                                   | Project brief: verified facts about each repository and the rules |
| 1–2   | `docs/phase-1-2-requirements-and-design` | Product requirements and design system                            |
| 3     | `feat/phase-3-infrastructure`            | Astro, TypeScript, Tailwind, lint, tests, CI                      |
| 4     | `feat/phase-4-home-page`                 | Home page, tokens, theme and language switch                      |
| 5     | `feat/phase-5-case-studies`              | Content collections, four case studies, the evidence rule         |
| 6     | `feat/phase-6-i18n`                      | Full English and Spanish parity, language of parts                |
| 7     | `feat/phase-7-seo-assets`                | Structured data, robots.txt, favicon, social image                |
| 8     | `feat/phase-8-deploy`                    | Vercel configuration and deployment guide                         |

To run the project, use the latest branch:

```bash
git clone https://github.com/DAlejandroCl/Portfolio.git
cd Portfolio
git checkout feat/phase-8-deploy
pnpm install
pnpm dev
```

It needs Node 22.23.4 or newer and pnpm 10. The full README, with scripts and structure, is on that branch.

## What is in it

- A home page and a project list, and one case study for each of four projects: Cocktail Lab, Streamline Inventory, Weather Finder and Calorie Tracker.
- English at `/` and Spanish at `/es/`, with the same facts in both languages (a test fails if they differ).
- Light and dark themes, a language switch and navigation that work without JavaScript.
- Accessibility target WCAG 2.1 AA, checked with axe in both themes and both languages, and a contrast script.

## Status

The site is built and tested locally and has not been deployed yet. Pending: choosing the domain and deploying (Phase 8), the CV download (it needs CV files without the phone number), and the owner's review of the written copy.

## Documents

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md): scope, verified claims and publishing rules.
- Product requirements, design system and deployment guide are on the latest branch: [PRODUCT_REQUIREMENTS.md](https://github.com/DAlejandroCl/Portfolio/blob/feat/phase-8-deploy/PRODUCT_REQUIREMENTS.md), [DESIGN_SYSTEM.md](https://github.com/DAlejandroCl/Portfolio/blob/feat/phase-8-deploy/DESIGN_SYSTEM.md), [DEPLOYMENT.md](https://github.com/DAlejandroCl/Portfolio/blob/feat/phase-8-deploy/DEPLOYMENT.md).

## Links

- GitHub: https://github.com/DAlejandroCl
- LinkedIn: https://www.linkedin.com/in/dalejandrocl/

No license has been chosen yet, so all rights are reserved until one is added.
