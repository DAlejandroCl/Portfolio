# PRODUCT_REQUIREMENTS — Engineering Portfolio

Phase 1 deliverable. Status: draft for owner review. Inputs: `PROJECT_BRIEF.md` (verified facts and publishing rules) and the owner's master context document.

## 1. Goal

A bilingual (English default, Spanish complete) engineering portfolio that lets a technical reader decide in a few minutes whether Diego is a credible frontend engineer, and lets them verify it. The site is itself evidence: fast, accessible, tested and honest about what is finished.

Primary conversions, in order: understand the positioning, explore the strongest projects, read a case study, open the repositories, download the CV, make contact.

## 2. Audiences

| Audience | What they need | How the site serves it |
|---|---|---|
| Technical recruiter | Role fit in under a minute, a CV they can forward | Hero with a plain statement, stack summary, CV download in the hero and contact |
| Engineering manager / interviewer | Evidence of engineering judgement, not a skills list | Case studies with decisions, trade-offs, and sourced metrics |
| Potential collaborator | Code they can read, a way to reach Diego | Repository and demo links on every project, contact links |

## 3. Positioning and voice

- Headline role: "Frontend Software Engineer". Specialization: React, TypeScript, frontend architecture and software quality.
- Hero statement: "Building maintainable, accessible and reliable web applications through thoughtful engineering."
- Voice: first person, plain, specific. No superlatives, no "passionate", no "cutting-edge", no invented seniority, clients or commercial results.
- Strength order on the page: Frontend Engineering, Software Quality, Accessibility, Technical Thinking.
- React and TypeScript are presented as the primary stack. Everything else is grouped as supporting and visually quieter.
- Accessibility is stated as "targets WCAG 2.1 AA" unless a manual audit is documented.

## 4. Sitemap and routes

| English | Spanish | Purpose |
|---|---|---|
| `/` | `/es/` | Home (single page with sections) |
| `/projects/` | `/es/projects/` | Project archive |
| `/projects/cocktail-lab/` | `/es/projects/cocktail-lab/` | Full case study |
| `/projects/streamline-inventory/` | `/es/projects/streamline-inventory/` | Full case study with Implemented / In progress / Planned |
| `/projects/weather-finder/` | `/es/projects/weather-finder/` | Short case study |
| `/projects/calorie-tracker/` | `/es/projects/calorie-tracker/` | Short case study |
| `/404` | n/a | Single not-found page with links in both languages |

Slugs are identical in both languages. The About content lives in the home page; a separate About page is not created because there is not enough content to justify it.

## 5. Content requirements

### 5.1 Home sections (in order)

1. **Navigation:** name, Projects, About, Contact, language switch, theme switch. Skip link first in tab order.
2. **Hero:** name, role, hero statement, two actions (View projects, Download CV), one real Cocktail Lab screenshot with a sourced margin note.
3. **Featured projects:** Cocktail Lab (large), Streamline Inventory (medium, status label visible), Weather Finder and Calorie Tracker (compact). Cards are generated from the content collection, never hand-written per page.
4. **Engineering focus:** the four strengths, each linking to the case study section that proves it.
5. **Technical expertise:** React and TypeScript first with a short justification each; supporting technologies grouped below. No percentage bars or star ratings.
6. **About:** education (Universidad Católica de Colombia, 2018–2024), independent projects since September 2022, Fundación de Levi (Feb–Aug 2022, institutional website gallery in HTML, CSS and JavaScript), certifications as listed in the CV with the in-progress course labeled, languages (Spanish native, English B2), engineering approach in one short paragraph.
7. **Academic publication:** exact title, IEEE, 2025, two-sentence context, link to the original source. Framed as research and collaboration. No claim of security specialization.
8. **Contact:** GitHub, LinkedIn, email link and CV download. The phone number is not published.
9. **Footer:** copyright, language switch, links to the repositories, the source repository of this site.

### 5.2 Project page sections (Cocktail Lab and Streamline)

Overview; Problem and objectives; Features; Technical stack; Architecture; Engineering decisions; Challenges and solutions; Testing strategy; Accessibility and performance; Lessons learned; Demo and repository. Content explains reasoning and does not copy README text.

Streamline additionally labels every feature as Implemented, In progress or Planned, and does not mention pnpm, Turborepo, monorepo tooling or Docker until the repository supports them.

### 5.3 Short case studies (Weather Finder, Calorie Tracker)

Overview, stack, what it demonstrates, key decision, limitations (including "no automated tests yet"), demo and repository.

### 5.4 Content model

Astro Content Collections validated with Zod:

- `projects`: `slug`, `lang`, `title`, `summary`, `status` (`production | in-progress`), `featured`, `order`, `stack[]`, `links { repo, demo? }`, `sections` (per page type), `evidence[]`.
- `evidence[]` item: `claim`, `value`, `source` (URL or commit reference), `verifiedAt` (date), `status` (`verified | target | stated`).
- `publications`: `title`, `venue`, `year`, `url`, `context`, `lang`.
- Typed data modules for profile, skills and experience; dictionaries for interface strings.
- **Rule enforced by the build:** any metric rendered on the site must reference an `evidence` item with a source and date; a missing source fails the build.

## 6. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Language switch keeps the user on the equivalent page in the other language |
| FR-02 | Theme switch (light, dark) respects the system preference by default and persists the choice |
| FR-03 | CV download works in both languages; links to the CV file that matches the page language |
| FR-04 | Every metric shows its margin note (source, verification date); on small screens the note appears under the paragraph |
| FR-05 | Project cards and pages are rendered from content collections |
| FR-06 | All external links open with `rel="noopener noreferrer"` and have a clear accessible name |
| FR-07 | Essential content and navigation work without JavaScript; JavaScript only enhances (theme switch) |
| FR-08 | A not-found page offers links home in both languages |

## 7. Non-functional requirements

**Accessibility (WCAG 2.1 AA target):** semantic landmarks, one `h1` per page and ordered headings, visible focus using the accent, full keyboard operation, accessible names for icon-only controls, `prefers-reduced-motion` respected, contrast validated by script for every token pair in both themes, text resizable to 200 percent without loss. Automated checks are necessary but not sufficient: a keyboard-only and a screen-reader pass are part of QA.

**Performance targets (to be measured, not assumed):** LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms (field metric; lab runs use Total Blocking Time as a proxy). Lighthouse targets >= 95 in all four categories on the home and on one case study, mobile profile. Images in modern formats with explicit dimensions; self-hosted fonts with `font-display` and subsetting; no third-party scripts.

**SEO:** unique title and description per page and language, canonical URL, `hreflang` pairs plus `x-default`, `<html lang>`, Open Graph and Twitter metadata, sitemap, `robots.txt`, structured data limited to `Person` and `ScholarlyArticle` with no ratings.

**Security and privacy:** no secrets in the repository, no `.env` committed, dependency audit in CI, no analytics or tracking at launch, phone number never published.

**Internationalization:** no mixed-language content unintentionally; metadata, accessibility labels, buttons and footer are translated; the two languages are kept factually identical.

## 8. Acceptance criteria

| ID | Criterion | How it is verified |
|---|---|---|
| AC-01 | All routes in section 4 exist in both languages and return 200 | E2E crawl of the sitemap |
| AC-02 | Every rendered metric has an evidence item with source and date | Build-time schema check (negative test included) |
| AC-03 | No axe violations on any route, both languages, both themes | Playwright + axe-core |
| AC-04 | Keyboard-only walkthrough completes hero, projects, case study, contact and CV download | Playwright test plus manual pass |
| AC-05 | Contrast >= 4.5:1 for text and >= 3:1 for large text and UI components in every token pair | Script in CI |
| AC-06 | Lighthouse >= 95 in four categories on home and Cocktail Lab page, mobile profile | Lighthouse CI report attached to the PR |
| AC-07 | Core Web Vitals targets met in lab measurement, results recorded in the repository | Report in `docs/` |
| AC-08 | `hreflang`, canonical and `lang` are correct and reciprocal on every page | Unit and E2E tests |
| AC-09 | Site works with JavaScript disabled for reading and navigation | Playwright with JS disabled |
| AC-10 | Streamline page lists no tooling the repository does not contain | Manual review against `PROJECT_BRIEF.md` section 3 |
| AC-11 | `astro check`, lint, unit tests, E2E and production build pass in CI | GitHub Actions |
| AC-12 | CV download works in both languages | E2E |

## 9. Testing scope

Vitest for utilities (i18n helpers, schema validation, link rules) and React components with Testing Library; Playwright for navigation, language switch, theme persistence, CV download and JavaScript-disabled reading; axe-core on every route, both themes and both languages.

## 10. Out of scope at launch

Blog or articles, contact form, analytics, CMS, comments, animated backgrounds, a separate About page. The articles collection from the master context is deferred.

## 11. Open items that affect content

1. English CV: both CVs are in Spanish. The English site needs an English CV; until it exists, the English site links the Spanish CV with a labeled note.
2. Whether the owner publishes the email address as a link.
3. Screenshots: real captures of the four apps (light and dark where applicable) are needed; they can be taken from the live demos once reachable.
4. Resolution of the CV discrepancies listed in `PROJECT_BRIEF.md` before any contradicted claim is published.
