# PRODUCT_REQUIREMENTS — Engineering Portfolio

Phase 1 deliverable, approved by the owner on 2026-11-03 and amended during implementation. Sections 1–11 are the original requirements; where the build differs, section 12 says what changed and section 13 gives the current acceptance status. Inputs: `PROJECT_BRIEF.md` (verified facts and publishing rules) and the owner's master context document.

## 1. Goal

A bilingual (English default, Spanish complete) engineering portfolio that lets a technical reader decide in a few minutes whether Diego is a credible frontend engineer, and lets them verify it. The site is itself evidence: fast, accessible, tested and honest about what is finished.

Primary conversions, in order: understand the positioning, explore the strongest projects, read a case study, open the repositories, download the CV, make contact.

## 2. Audiences

| Audience                          | What they need                                       | How the site serves it                                                          |
| --------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| Technical recruiter               | Role fit in under a minute, a CV they can forward    | Hero with a plain statement, stack summary, CV download in the hero and contact |
| Engineering manager / interviewer | Evidence of engineering judgement, not a skills list | Case studies with decisions, trade-offs, and sourced metrics                    |
| Potential collaborator            | Code they can read, a way to reach Diego             | Repository and demo links on every project, contact links                       |

## 3. Positioning and voice

- Headline role: "Frontend Software Engineer". Specialization: React, TypeScript, frontend architecture and software quality.
- Hero statement: "Building maintainable, accessible and reliable web applications through thoughtful engineering."
- Voice: first person, plain, specific. No superlatives, no "passionate", no "cutting-edge", no invented seniority, clients or commercial results.
- Strength order on the page: Frontend Engineering, Software Quality, Accessibility, Technical Thinking.
- React and TypeScript are presented as the primary stack. Everything else is grouped as supporting and visually quieter.
- Accessibility is stated as "targets WCAG 2.1 AA" unless a manual audit is documented.

## 4. Sitemap and routes

| English                           | Spanish                              | Purpose                                                  |
| --------------------------------- | ------------------------------------ | -------------------------------------------------------- |
| `/`                               | `/es/`                               | Home (single page with sections)                         |
| `/projects/`                      | `/es/projects/`                      | Project archive                                          |
| `/projects/cocktail-lab/`         | `/es/projects/cocktail-lab/`         | Full case study                                          |
| `/projects/streamline-inventory/` | `/es/projects/streamline-inventory/` | Full case study with Implemented / In progress / Planned |
| `/projects/weather-finder/`       | `/es/projects/weather-finder/`       | Short case study                                         |
| `/projects/calorie-tracker/`      | `/es/projects/calorie-tracker/`      | Short case study                                         |
| `/404`                            | n/a                                  | Single not-found page with links in both languages       |

Slugs are identical in both languages. The About content lives in the home page; a separate About page is not created because there is not enough content to justify it.

## 5. Content requirements

### 5.1 Home sections (in order)

The order follows what a recruiter needs first: who, what, proof, background, then contact.

1. **Navigation:** name, About, Projects, Experience, Contact, language switch, theme switch. Skip link first in tab order.
2. **Hero:** name, role, hero statement, three actions (Contact me, View projects, Download CV), a one-line list of the main technologies, one real Cocktail Lab screenshot with a sourced margin note.
3. **About:** short summary adapted from the CV, how I work, languages (Spanish native, English B2), and the four engineering strengths ("Engineering focus"), each linking to the case study section that proves it.
4. **Projects:** Cocktail Lab (large), Streamline Inventory (status label visible), Weather Finder and Calorie Tracker. Panels with screenshots, generated from the content collection, never hand-written per page.
5. **Experience:** independent projects since September 2022, Fundación de Levi (Feb–Aug 2022, institutional website gallery in HTML, CSS and JavaScript), and education (Universidad Católica de Colombia, 2018–2024).
6. **Academic publication:** exact title, IEEE, 2025, two-sentence context, link to the original source. Framed as research and collaboration. No claim of security specialization.
7. **Certifications:** as listed in the CV, with the in-progress course labeled.
8. **Technical expertise:** React and TypeScript first with a short justification each; supporting technologies grouped below. No percentage bars or star ratings.
9. **Contact:** closing panel with email, LinkedIn, GitHub and CV download. The phone number is not published.
10. **Footer:** copyright, language switch, links to the repositories, the source repository of this site.

### 5.2 Project page sections (Cocktail Lab and Streamline)

Overview; Problem and objectives; Features; Technical stack; Architecture; Engineering decisions; Challenges and solutions; Testing strategy; Accessibility and performance; Lessons learned; Demo and repository. Content explains reasoning and does not copy README text.

Streamline additionally labels every feature as Implemented, In progress or Planned, and does not mention pnpm, Turborepo, monorepo tooling or Docker until the repository supports them.

### 5.3 Short case studies (Weather Finder, Calorie Tracker)

Overview, stack, what it demonstrates, key decision, limitations (including "no automated tests yet"), demo and repository.

### 5.4 Content model

Astro Content Collections validated with Zod (`src/content/schemas.ts` is the source of truth):

- `projects` (one Markdown file per language): `lang`, `title`, `kind` (`full | short`, decides which sections the page needs), `summary` (up to 280 characters), `metaDescription` (50–160 characters), `status` (`production | completed | in-progress`; `completed` is used where a live deployment has not been verified), `featured`, `order`, `stack[]`, `links { repo, demo? }`, `screenshot`, `screenshotAlt`, `features[]` (`name`, `description`, `status`: `implemented | in-progress | planned`), `metrics[]` (`label`, `value`, `evidenceId`) and `evidence[]`. The case study is the Markdown body.
- `evidence[]` item: `id`, `claim`, `source { label, url }` (an https URL), `verifiedOn` (date) and `status` (`verified | target | stated`).
- `publications`: `lang`, `title`, `titleLang`, `venue`, `year`, `context` and a single `evidence` item whose source is the original page.
- Typed data modules for links and technology names (`src/data/profile.ts`); dictionaries for interface strings (`src/i18n/dictionaries/`).
- **Rule enforced by the build:** any metric rendered on the site must reference an `evidence` item with a source and a date; a missing reference fails the build.

## 6. Functional requirements

| ID    | Requirement                                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------------------------- |
| FR-01 | Language switch keeps the user on the equivalent page in the other language                                           |
| FR-02 | Theme switch (light, dark) respects the system preference by default and persists the choice                          |
| FR-03 | CV download works in both languages; links to the CV file that matches the page language                              |
| FR-04 | Every metric shows its margin note (source, verification date); on small screens the note appears under the paragraph |
| FR-05 | Project cards and pages are rendered from content collections                                                         |
| FR-06 | All external links open with `rel="noopener noreferrer"` and have a clear accessible name                             |
| FR-07 | Essential content and navigation work without JavaScript; JavaScript only enhances (theme switch)                     |
| FR-08 | A not-found page offers links home in both languages                                                                  |

## 7. Non-functional requirements

**Accessibility (WCAG 2.1 AA target):** semantic landmarks, one `h1` per page and ordered headings, visible focus using the accent, full keyboard operation, accessible names for icon-only controls, `prefers-reduced-motion` respected, contrast validated by script for every token pair in both themes, text resizable to 200 percent without loss. Automated checks are necessary but not sufficient: a keyboard-only and a screen-reader pass are part of QA.

**Performance targets (to be measured, not assumed):** LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms (field metric; lab runs use Total Blocking Time as a proxy). Lighthouse targets >= 95 in all four categories on the home and on one case study, mobile profile. Images in modern formats with explicit dimensions; self-hosted fonts with `font-display` and subsetting; no third-party scripts.

**SEO:** unique title and description per page and language, canonical URL, `hreflang` pairs plus `x-default`, `<html lang>`, Open Graph and Twitter metadata, sitemap, `robots.txt`, structured data limited to `Person` and `ScholarlyArticle` with no ratings.

**Security and privacy:** no secrets in the repository, no `.env` committed, dependency audit in CI, no analytics or tracking at launch, phone number never published.

**Internationalization:** no mixed-language content unintentionally; metadata, accessibility labels, buttons and footer are translated; the two languages are kept factually identical.

## 8. Acceptance criteria

| ID    | Criterion                                                                                  | How it is verified                                 |
| ----- | ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| AC-01 | All routes in section 4 exist in both languages and return 200                             | E2E crawl of the sitemap                           |
| AC-02 | Every rendered metric has an evidence item with source and date                            | Build-time schema check (negative test included)   |
| AC-03 | No axe violations on any route, both languages, both themes                                | Playwright + axe-core                              |
| AC-04 | Keyboard-only walkthrough completes hero, projects, case study, contact and CV download    | Playwright test plus manual pass                   |
| AC-05 | Contrast >= 4.5:1 for text and >= 3:1 for large text and UI components in every token pair | Script in CI                                       |
| AC-06 | Lighthouse >= 95 in four categories on home and Cocktail Lab page, mobile profile          | Lighthouse CI report attached to the PR            |
| AC-07 | Core Web Vitals targets met in lab measurement, results recorded in the repository         | Report in `docs/`                                  |
| AC-08 | `hreflang`, canonical and `lang` are correct and reciprocal on every page                  | Unit and E2E tests                                 |
| AC-09 | Site works with JavaScript disabled for reading and navigation                             | Playwright with JS disabled                        |
| AC-10 | Streamline page lists no tooling the repository does not contain                           | Manual review against `PROJECT_BRIEF.md` section 3 |
| AC-11 | `astro check`, lint, unit tests, E2E and production build pass in CI                       | GitHub Actions                                     |
| AC-12 | CV download works in both languages                                                        | E2E                                                |

## 9. Testing scope

Vitest for utilities (i18n helpers, schema validation, link rules) and React components with Testing Library; Playwright for navigation, language switch, theme persistence, CV download and JavaScript-disabled reading; axe-core on every route, both themes and both languages.

## 10. Out of scope at launch

Blog or articles, contact form, analytics, CMS, comments, animated backgrounds, a separate About page. The articles collection from the master context is deferred.

## 11. Open items that affect content

Status on 2026-11-06.

1. **CV files.** Resolved on 2026-11-06: the owner supplied phone-free CVs in English and Spanish, in an ATS and a visual version. The site offers the ATS version of the page's language (plain text that screen readers and parsers read). See section 12 for the open discrepancy.
2. **Email.** Resolved: it is published only as a `mailto:` link, never as plain text or in structured data.
3. **Screenshots.** Resolved for the landing page of each of the four apps (`src/assets/screenshots/`). Dark-mode and inner-page captures were not made.
4. **CV discrepancies** listed in `PROJECT_BRIEF.md`. The owner chose to leave them as they are for now, so the publishing rules in that document apply.
5. **Live demos and the IEEE page** have not been opened and verified by the owner. Only the verified ones are linked.

## 12. Changes made during implementation

- **Phase 4 (2026-11-05).** The project `status` gained `completed` (shown as "Completed") for Weather Finder and Calorie Tracker, whose live demos have not been opened and verified. `production` stays for Cocktail Lab, as stated in the CV.
- The CV download (hero action, contact link, FR-03, AC-12) is postponed until phone-free CV files are provided. Until then the hero has one action.
- **Phase 5 (2026-11-05).** A case study is the body of the project file, split into sections with `## Title {#id}`. Each section can place evidence items in the margin with `<!-- evidence: id, id -->`, and the build fails if a required section is missing or cites evidence that does not exist. Full case studies (Cocktail Lab, Streamline Inventory) have eleven sections; short ones (Weather Finder, Calorie Tracker) have six. Project rows link to the case study, and each "Engineering focus" item links to the section that proves it.
- Streamline Inventory has no "Planned" features yet: the list contains only what exists or is in progress. Planned items need the owner's input and are not invented. Its page lists known gaps (default admin account, no migrations, non-strict CI) because they were found in the code.
- Test counts are not quoted for any project, and Lighthouse figures are not published for projects that have not been measured.
- Weather Finder and Calorie Tracker link no live demo, because none has been verified.
- **Phase 6 (2026-11-06).** Text in another language than the page (the English course names and paper title on the Spanish page, the Spanish institution names on the English page) carries a `lang` attribute (WCAG 3.1.2); the publication schema requires `titleLang`. Numbers follow the language (`89.42 %` and `89,42 %`) and a test checks that they are the same figure. The sitemap has 12 URLs: the home, the project list and four case studies, in two languages.
- **Phase 7 (2026-11-06).** Structured data is on the home pages only. The paper is linked as `contributor`, not `author`, because the author is a co-author, and `datePublished` holds only the year. The email and phone are not in the structured data. `robots.txt` is generated so its `Sitemap` line uses `SITE_URL`. The social image is one language-neutral card (name and role) generated by `pnpm og`. The no-JavaScript guard still allows two scripts; JSON-LD blocks are data and are not counted.
- **CV (2026-11-06).** `public/cv/` holds the English (`..._Resume.pdf`) and Spanish (`..._CV.pdf`) ATS CVs, linked in the hero and in Contact for the language of the page. The visual versions are not published. The absence of the phone number was checked by extracting the text, metadata and link annotations of both files (`pdftotext`, `pypdf`); the tests only check that the files are served. The email appears as plain text inside the PDFs, as in the owner's CV. **Known conflict:** the CVs state claims that the site deliberately does not publish (Streamline as a "pnpm + Turborepo monorepo" with Docker, "1,003 tests, 100% passing in CI", "WCAG 2.1 AA validated"), which `PROJECT_BRIEF.md` found unverified or contradicted. The owner chose to leave this as it is; a reader who compares the CV with the case studies will see the difference. The PDFs also show an empty separator where the phone number was ("| |" in the header line).
- **Phase 8 (2026-11-06).** Vercel configuration and a deployment guide were added, and the site was deployed on the free Hobby plan at https://devacl.vercel.app. No domain was bought: `devacl.com` would cost money, and the requirement was that everything be free. Production was deployed by hand from the branch `feat/cv-download` (commit e2d56db) because the code is not merged into `main` yet, and the project's production branch is `main`. After the merge, every push to `main` deploys automatically.
- **Redesign (2026-11-06).** Visual refresh and reading order (branch `feat/redesign`): cobalt hero and contact panels, yellow evidence chips, bento project panels with screenshots, sticky section headings. Section order changed to §5.1. Two adjustments to the owner's proposed order: "Engineering focus" moved inside About (it is the evidence for the summary, and a separate section split the story), and Technical expertise sits after Certifications, with Contact as a closing call to action (the hero already carries a Contact action). The new About summary is adapted from the CV text and needs the owner's review. Tests were updated to the new structure; 367 pass.

## 13. Acceptance status

Status on 2026-11-06. "Met" means a test or measurement exists and passes locally.

| ID    | Status  | Evidence and gaps                                                                                                                                                                                                                                 |
| ----- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | Met     | `tests/e2e/crawl.spec.ts` loads every URL of the sitemap (12) and expects 200.                                                                                                                                                                    |
| AC-02 | Met     | Schema refinement and `resolveMetrics`, with negative tests in `tests/unit/schemas.test.ts` and `evidence.test.ts`; the build throws.                                                                                                             |
| AC-03 | Met     | `accessibility.spec.ts` runs axe on every route in both languages, both themes, plus the open menu. Automated checks do not prove conformance.                                                                                                    |
| AC-04 | Partial | `keyboard.spec.ts` covers the skip link, tab order and focus ring. The CV download is not in the walk-through, and the manual keyboard and screen-reader pass was not done.                                                                       |
| AC-05 | Met     | `pnpm check:contrast` runs in CI and in `tests/unit/contrast.test.ts`.                                                                                                                                                                            |
| AC-06 | Partial | Lighthouse 12, mobile profile, local build, 2026-11-06: home EN performance 98 and ES 99; accessibility, best practices and SEO 100 in both. The Cocktail Lab page was not measured, and no report is stored in the repository.                   |
| AC-07 | Partial | Lab measurement of the hero (CLS 0 desktop, 0.0016 mobile, LCP unchanged) is recorded in `DESIGN_SYSTEM.md` section 12. No field data and no other pages.                                                                                         |
| AC-08 | Met     | `crawl.spec.ts` and `seo-i18n.spec.ts` check `lang`, canonical, reciprocal `hreflang` and `x-default` on every page.                                                                                                                              |
| AC-09 | Met     | `no-javascript.spec.ts` reads and navigates every page with JavaScript off and guards against external scripts.                                                                                                                                   |
| AC-10 | Met     | The Streamline case study mentions no pnpm, Turborepo, monorepo tooling or Docker in either language (checked by search on 2026-11-06).                                                                                                           |
| AC-11 | Partial | Type check, lint, Prettier, unit, contrast and E2E pass locally and the build succeeds. The workflow in `.github/workflows/ci.yml` has not run on GitHub: it triggers on pull requests and pushes to `main`, and no pull request has been opened. |
| AC-12 | Met     | `cv.spec.ts` checks that each page links its language's CV and that the PDF is served.                                                                                                                                                            |
