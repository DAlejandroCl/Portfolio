# PROJECT_BRIEF — Diego Alejandro Clavijo Ladino, Engineering Portfolio

Phase 0 (Discovery) deliverable. Status: **awaiting approval**. Nothing has been implemented.
Verification date: 2026-11-03. Method: shallow clones of each repository, local test run for Cocktail Lab, review of workflows and documentation.

## 1. Decisions

### 1.1 Positioning
"Frontend Software Engineer" (React, TypeScript, frontend architecture and software quality). The professional history stays identical to the CV: independent projects since September 2022, Fundación de Levi (Feb–Aug 2022), IEEE co-authored publication as research evidence. No seniority, clients or commercial results are implied.

### 1.2 Stack: Astro with React islands (approved by the owner, 2026-11-03)

The owner asked for React unless Astro is clearly the better fit. Astro is the better fit **for this specific site**, for four reasons:

1. **Performance targets.** The brief sets Lighthouse >= 95 in all four categories, LCP <= 2.5 s and CLS <= 0.1. Astro ships no JavaScript by default; a React SPA sends the runtime to every visitor, including those who only read static text.
2. **Bilingual SEO.** Every route needs its own server-rendered `<title>`, canonical URL, `hreflang` and Open Graph tags, which social previews and crawlers read without running JavaScript. Astro provides i18n routing and sitemap generation natively. In plain React this requires adding a prerendering framework (Next.js or React Router framework mode), which is more machinery than a content site needs.
3. **Evidence checks at build time.** The site's differentiator is that every technical claim carries a source and a verification date. Astro Content Collections validate this with Zod during the build, so an unsourced metric fails the build.
4. **React is still used.** Interactive pieces and reusable UI are written as React + TypeScript components and hydrated only where interaction justifies it. The same tooling applies: TypeScript strict, Zod, Vitest, Testing Library, Playwright.

Trade-off, stated honestly: the portfolio repository will contain less React than a pure React app. The React evidence lives in Cocktail Lab, Streamline, Weather Finder and Calorie Tracker. Choosing the right tool for a static content site is itself a demonstration of the "Technical Thinking" strength.

If the owner prefers a React-only site, the alternative is React Router 7 (framework mode with prerendering) plus Tailwind, at the cost of a heavier JavaScript payload and more configuration for i18n and sitemap.

### 1.3 Working method
Conventional Commits; each file change in its own commit; feature branches; no force pushes; no secrets committed.

## 2. Source inventory and claim verification

Status values: **Verified**, **Discrepancy**, **Unverified**.

### 2.1 Cocktail Lab (primary case study) — last commit 2026-04-20

| Claim (CV / README) | Evidence | Status |
|---|---|---|
| React 19, TypeScript, Zustand, Zod, Vitest, RTL, Playwright, MSW, jest-axe, Groq, Vercel Functions, GitHub Actions | `package.json`, `api/ai/generate-recipe.ts`, `.github/workflows/ci.yml` | Verified |
| 42 test files | 21 unit + 9 accessibility + 8 integration + 4 E2E | Verified |
| 1,003 automated tests | Vitest executed 504 tests (docs say 503). 500 E2E derived from 100 specs x 5 projects, not executed. Sum = 1,004 | Discrepancy (off by 1) |
| 100% passing in CI | Local run: 503 passed, 1 failed (`tests/unit/router.test.tsx`, route `/favorites`; the store mock lacks AI state, so `FavoritesPage` throws `reading 'length'`). GitHub Actions status not accessible | Discrepancy |
| 89% line coverage | Measured 89.42% lines, 87.81% statements, 88.54% functions, 81.34% branches (failing test included) | Verified |
| 5 browser/device engines | `playwright.config.ts`: Chromium, Firefox, WebKit, Pixel 5, iPhone 13 | Verified |
| WCAG 2.1 AA | Declared as a target in README and `docs/accessibility.md`; 82 jest-axe audits. No in-browser contrast audit verified | Verified as target only |
| Production app | `https://cocktail-lab-devacl.vercel.app` could not be opened from the research environment | Unverified |

### 2.2 Streamline Inventory (secondary case study) — last commit 2026-07-16

| Claim | Evidence | Status |
|---|---|---|
| PERN, strict typing, layered architecture | Express 5, Sequelize, React 19, TypeScript; controllers / services / models separation | Verified |
| Monorepo, pnpm, Turborepo | Two independent npm packages (`backend/`, `frontend/`), a `package-lock.json` in each, no workspace file, no `turbo.json` | Discrepancy |
| Docker | No Dockerfile or compose file in the repository | Discrepancy |
| GitHub Actions CI/CD | 4 workflows exist. Backend typecheck and coverage use `|| true` (non-blocking). E2E workflow installs only Chromium and runs 3 of 5 spec files | Verified, partial |
| Automated tests | `docs/TESTING.md` declares 312 automated tests and 35 E2E specs. Not executed | Unverified |
| Implemented scope | JWT cookie auth, products and categories API, helmet / rate limit / CORS, Swagger, migrations, image upload (multer + sharp), frontend pages: landing, login, dashboard, products CRUD, settings | Verified (code present) |

The repository README is outdated (describes product CRUD only, calls itself "production-grade"). It must not be used as a source for the case study.

### 2.3 Weather Finder — last commit 2026-01-30

React, TypeScript, Vite, Axios, Zod, Tailwind CSS, CSS Modules, custom `useWeather` hook, OpenWeatherMap. Live demo: `https://weather-finder-devacl.vercel.app` (from README, not opened). ~311 lines of TS in `src/`. **No automated tests, no CI.** Matches the CV stack. Status: Verified (code), Unverified (live demo).

### 2.4 Calorie Tracker — last commit 2026-01-30

React, TypeScript, Vite, Tailwind CSS, `useReducer` for centralized state, `useMemo`, `localStorage` persistence, uuid. Live demo: `https://calorie-tracker-devacl.vercel.app` (from README, not opened). ~511 lines of TS in `src/`. **No automated tests, no CI.** Status: Verified (code), Unverified (live demo).

### 2.5 ReadLog and Valorant Profile Explorer

Both are server-rendered Node.js + Express + EJS applications (ReadLog also PostgreSQL and the Open Library covers API; Valorant uses the Riot Games API and requires an API key). Neither is React, neither has a live demo, tests or CI. Last commits: 2025-03-14 and 2025-02-27.

### 2.6 Fourth project decision (approved; the owner expects to replace it with a more advanced project later)

**Calorie Tracker** is the supporting project: it is React + TypeScript, shows reducer-based state management that complements Weather Finder's API focus, and has a live demo. ReadLog and Valorant are not featured as projects (they do not support the React positioning and cannot be demoed). They remain reachable through the GitHub link. Valorant does not appear in the CV; the owner decides whether it is mentioned at all.

### 2.7 Other facts

| Item | Status |
|---|---|
| IEEE publication 10854835 (title, year, coauthorship) | Unverified: page not reachable from the research environment; data comes from the owner's context document |
| Fundación de Levi (Feb–Aug 2022, gallery in HTML/CSS/JS) | Unverified: CV only |
| CV (ATS and visual versions) | Received 2026-11-03. Both versions carry the same content (see 2.8) |
| LinkedIn `https://www.linkedin.com/in/dalejandrocl/`, GitHub `https://github.com/DAlejandroCl` | Provided by the owner, not opened |
| Email | Present in both CVs. Publishing it is an owner decision (confirm before launch) |
| Phone number | Present in both CVs. **Not published** on the site unless the owner opts in (spam and privacy risk on a public page) |
| Photo | Missing; optional |
| Portfolio repository `DAlejandroCl/Portfolio` | Public and empty (cloned 2026-11-03). Pushing from this session is not possible until the GitHub account is linked, so work is committed locally and the owner pushes |

### 2.8 CV cross-check

Both CV versions (ATS and visual) were read and contain the same claims.

| CV statement | Evidence | Status |
|---|---|---|
| Streamline: "monorepo (pnpm + Turborepo)" | Not present in the repository (see 2.2) | Discrepancy, appears in both CVs |
| Skills: Docker | No Docker usage found in Streamline; other repositories were not checked for it | Unverified |
| Cocktail Lab: "1,003 tests ... 100% passing in CI", "WCAG 2.1 AA validated with axe-core" | See 2.1. Automated axe audits do not prove WCAG conformance, so the site will say "targets WCAG 2.1 AA" | Discrepancy |
| Certifications: React and Full-Stack Development (MERN/PERN), Udemy, in progress, 2026; AI from 0 to Production, BIG School, 2026; Advanced CSS and SASS, Udemy, 2025 | Stated in the CV; no credential links provided | Unverified (listed as stated; the in-progress course is labeled as in progress) |
| Role title "Junior Frontend React Developer" for independent projects | CV wording | Kept as is; the site headline uses "Frontend Software Engineer" as agreed |

## 3. Publishing rules derived from the audit

Until the discrepancies are resolved (owner decision: leave as is for now):

- Cocktail Lab: publish "89% line coverage" with its measurement date, "five browser and device engines in the Playwright configuration" and "WCAG 2.1 AA target". Do **not** publish "100% passing in CI" or the exact "1,003 tests".
- Streamline: do **not** mention pnpm, Turborepo, monorepo tooling or Docker. Separate Implemented / In progress / Planned. CI is described as present with non-blocking steps in progress of hardening.
- Weather Finder and Calorie Tracker: no testing claims. Their pages are short case studies rather than the eleven-section format, which is reserved for Cocktail Lab and Streamline.
- IEEE: present as research and collaboration, never as cybersecurity specialization, and only after the page is verified.

## 4. Assumptions

- English is the default language; Spanish is a full alternative.
- Contact is by links only (email, LinkedIn, GitHub, CV); no form and no analytics.
- Light and dark themes are supported if contrast can be validated.
- Copy is drafted in English by the assistant and reviewed by the owner.

## 5. Open items for the owner

1. Link the GitHub account if pushes from the session are wanted; otherwise the owner pushes the branches.
2. Confirm the public email and decide whether the phone number stays off the site (default: off).
3. Decide whether Valorant is mentioned at all (default: only reachable through the GitHub profile).
4. Decide, when convenient, how to resolve the discrepancies in 2.1, 2.2 and 2.8. Until then the publishing rules in section 3 apply.
5. Open the three live demos and the IEEE page once and confirm they work (they could not be reached from the research environment).

Closed on 2026-11-03: stack (Astro with React islands), fourth project (Calorie Tracker), design direction ("margin notes", the assistant decides the visual details).

## 6. Next

Phase 1 (`PRODUCT_REQUIREMENTS.md`) and Phase 2 (`DESIGN_SYSTEM.md`) are drafted on branch `docs/phase-1-2-requirements-and-design`. Phase 3 (scaffolding) starts after the owner reviews them.
