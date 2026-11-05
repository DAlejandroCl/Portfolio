---
lang: en
title: Streamline Inventory
kind: full
summary: A full-stack inventory management app with cookie-based JWT authentication, a products and categories API and a layered back end. Under active development.
metaDescription: Case study of Streamline Inventory, a full-stack React and Express inventory app in active development, with its security, tests and known gaps.
status: in-progress
featured: true
order: 2
stack:
  - React
  - TypeScript
  - Node.js
  - Express
  - PostgreSQL
  - Sequelize
  - Zod
  - GitHub Actions
links:
  repo: https://github.com/DAlejandroCl/streamline-inventory
screenshot: ../../../assets/screenshots/streamline-inventory.webp
screenshotAlt: 'Streamline Inventory landing page.'
features:
  - name: Sign in and sign out
    description: Cookie-based session with a JWT; the app area redirects to the login page when there is no session.
    status: implemented
  - name: Product management
    description: Create, edit and delete products, and toggle their availability.
    status: implemented
  - name: Image upload
    description: Product images are checked, resized and stored as WebP.
    status: implemented
  - name: Search and paginated list
    description: The search term lives in the URL, is debounced, and the product list is paginated by the API.
    status: implemented
  - name: Dashboard
    description: Totals for products, availability, inventory value, average price and stock rate, computed from the product list.
    status: implemented
  - name: Categories
    description: A categories API with create, read, update and delete, and category selection on each product.
    status: implemented
  - name: Interactive API documentation
    description: Swagger UI served by the API at /docs.
    status: implemented
  - name: Continuous integration and end-to-end suite
    description: Four GitHub Actions workflows exist and are being hardened; part of the end-to-end suite does not run in CI yet.
    status: in-progress
evidence:
  - id: layers
    claim: The back end is split into routes, controllers, services and models, with configuration and middleware in their own folders.
    source:
      label: backend/src at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/tree/d081e26/backend/src
    verifiedOn: '2026-11-05'
    status: verified
  - id: auth-cookie
    claim: The session token travels in an httpOnly cookie (secure in production, sameSite lax), expires after seven days, and passwords are hashed with bcrypt.
    source:
      label: backend/src/controllers/auth.controllers.ts at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/controllers/auth.controllers.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: route-guard
    claim: Product routes require authentication on the server, and the app area redirects to the login page through a route loader on the client.
    source:
      label: backend/src/routes/product.routes.ts at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/routes/product.routes.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: security-config
    claim: The API sends security headers with Helmet and limits requests to 100 per 15 minutes, and to 10 per 15 minutes on login.
    source:
      label: backend/src/config/security.ts at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/config/security.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: image-pipeline
    claim: Uploaded images are validated by type, resized to 800 by 800 pixels, converted to WebP and stored under a random name.
    source:
      label: backend/src/config/multer.ts at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/config/multer.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: db-sync
    claim: The schema is created with Sequelize's sync in alter mode; versioned migrations are not set up.
    source:
      label: backend/src/config/db.ts at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/config/db.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: seed-admin
    claim: A default administrator account is created on every start of the server if it does not exist.
    source:
      label: backend/src/index.ts at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/index.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: tests-layout
    claim: Tests exist for the API (integration and unit), for pages, actions and components (Vitest), for accessibility (axe) and as five Playwright specs.
    source:
      label: frontend/src/tests at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/tree/d081e26/frontend/src/tests
    verifiedOn: '2026-11-05'
    status: verified
  - id: ci-e2e
    claim: The end-to-end workflow installs Chromium only and runs three of the five Playwright specs.
    source:
      label: e2e.yml at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/.github/workflows/e2e.yml
    verifiedOn: '2026-11-05'
    status: verified
  - id: ci-soft-steps
    claim: Some CI steps are non-blocking, such as the back end type check and the coverage report, which end with a fallback that lets the job pass.
    source:
      label: ci.yml at commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/.github/workflows/ci.yml
    verifiedOn: '2026-11-05'
    status: verified
---

## Overview {#overview}

Streamline Inventory is a full-stack inventory management app: a React single-page app talking to an Express API backed by PostgreSQL. A signed-in user manages products and categories, uploads product images and sees stock metrics on a dashboard.

It is still under development, and this page says so. Each feature below is labeled as implemented or in progress, and the gaps I already know about are listed in their own section rather than hidden.

## Problem and objectives {#problem}

I wanted a project where the whole stack is mine, so I could make and justify decisions on both sides of the API. The objectives:

- A back end with clear layers, so that HTTP concerns, business rules and data access are separate.
- Authentication that does not expose the token to scripts running in the page.
- A front end that uses routing for data loading and mutations, instead of fetching inside effects.
- Tests at several levels, run automatically.

## Features {#features}

<!-- features -->

## Technical stack {#stack}

React 19, TypeScript and Vite on the front end, with React Router 7 as a data router, Zod for form and data schemas, and Tailwind CSS. Express 5 and TypeScript on the back end, with Sequelize on PostgreSQL, Multer and Sharp for images, Helmet and express-rate-limit for protection, and Swagger for documentation. GitHub Actions for automation.

## Architecture {#architecture}

<!-- evidence: layers, route-guard -->

The back end follows a layered structure. Routes declare the endpoints and attach middleware. Controllers translate HTTP into calls and back. Services hold the business rules and talk to the Sequelize models. Configuration (database, environment, security, uploads) and middleware (authentication, validation, errors) have their own folders, and a single error type carries the HTTP status.

The front end uses the router as its data layer. Route loaders fetch what a page needs and route actions perform mutations such as creating, editing and deleting a product. Pages receive their data already loaded, and the guard for the app area is a loader that redirects to the login page when the session check fails. Context providers hold only cross-cutting state: the current user, notifications, theme and settings.

## Engineering decisions {#decisions}

<!-- evidence: auth-cookie, image-pipeline -->

**Token in an httpOnly cookie.** The JWT is never readable from JavaScript, so a script injected into the page cannot steal it. The cookie is `secure` in production and `sameSite: lax`. I first tried `strict`, which blocked the cookie when the front end and the API ran on different origins in development and in CI, so `lax` is a documented trade-off, not a default.

**Process images on the server.** Uploads are checked by type, resized, converted to WebP and stored under a random name. The browser never decides the final format or the file name.

**Routes as the data layer.** Loaders and actions keep fetching and mutating outside components, which makes pages simple and lets tests render a page with a memory router and a mocked network.

**A separate, stricter limit for login.** The API limits all requests, and login has its own lower limit, because that is the endpoint worth brute forcing.

## Challenges and solutions {#challenges}

**Testing a form with a file input.** Submitting the product form under test made the mock network layer hang while it tried to read the empty file field. The workaround is documented in the repository: the image component is mocked in the page integration tests, and the form actions are tested directly with a stubbed `fetch` instead of through the whole router. It works, and it means the file upload path is covered less end to end than I would like.

**Tests without a database server.** The API tests run against an in-memory SQLite database that is created and cleaned for each suite, so the pipeline does not need PostgreSQL. The trade-off is that tests run on a different engine than production.

**Cookies across origins.** Keeping the session in a cookie while the front end and the API run on different origins needed explicit cross-origin settings and the `lax` policy described above.

## Testing strategy {#testing}

<!-- evidence: tests-layout, ci-e2e, ci-soft-steps -->

Tests are layered. On the API there are integration tests (products, categories and a security suite) and unit tests for the product service and the error middleware, using the native Node test runner and Supertest with a real login for each suite. On the front end, Vitest with React Testing Library and MSW covers pages (rendered with a real memory router), actions, components and schemas, and a vitest-axe suite audits accessibility. Five Playwright specs cover the main journeys end to end.

I do not quote a number of tests on this page, because the count in my own documentation is something I have not re-run and confirmed.

Automation is where the project is least finished, and I want that to be visible. There are four GitHub Actions workflows. Some steps are intentionally non-blocking, so a type error in the back end does not stop the pipeline. The end-to-end workflow installs only Chromium and runs three of the five specs. Closing those gaps is the current work.

## Accessibility and performance {#accessibility-performance}

The front end has an automated accessibility suite (axe through vitest-axe) and an end-to-end accessibility spec, but the spec is among those that do not run in CI yet. I have not run a manual audit with assistive technology on this project, and I have not measured performance, so I make no accessibility or performance claims beyond the existence of those tests.

## Known gaps and lessons {#lessons}

<!-- evidence: db-sync, seed-admin -->

These are real limitations of the current state, listed so nobody has to find them:

- **A default administrator account is created at every start**, in every environment. That is convenient in development and unacceptable in production; it needs to become an explicit, one-time setup step.
- **No versioned migrations.** The schema is synchronized with `sync({ alter: true })`, which is fine for exploration and risky for production data.
- **CI is not strict yet.** Some steps cannot fail the build and part of the end-to-end suite is not executed.
- **Other technical debt** is listed in the repository's testing notes, for example a partial DTO on the PATCH endpoint.

What I take from this: writing the gaps down is useful in itself, because it turns them into a list of work, and the most valuable next step is not a new feature but making the pipeline fail when it should.

## Repository {#links}

The code is public on [GitHub](https://github.com/DAlejandroCl/streamline-inventory). There is no live demo, because the project is not deployed. The margin notes link to the exact commit I checked.
