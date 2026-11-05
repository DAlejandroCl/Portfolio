---
lang: en
title: Cocktail Lab
kind: full
summary: A multi-page cocktail recipe app built with React 19 and TypeScript, with an AI recipe generator and a multi-layer automated test suite.
metaDescription: Case study of Cocktail Lab, a React and TypeScript cocktail app with an AI recipe generator, layered architecture and a multi-layer test suite.
status: production
featured: true
order: 1
stack:
  - React
  - TypeScript
  - Zustand
  - Zod
  - Vitest
  - React Testing Library
  - Playwright
  - MSW
  - jest-axe
  - Groq
  - Vercel
links:
  repo: https://github.com/DAlejandroCl/Cocktail-Lab
  demo: https://cocktail-lab-devacl.vercel.app
screenshot: ../../../assets/screenshots/cocktail-lab.webp
screenshotAlt: "Cocktail Lab home page: the headline 'Find Your Perfect Mix' above a search bar for ingredients and categories, over a soft orange and blue gradient."
metrics:
  - label: Line coverage
    value: 89.42%
    evidenceId: line-coverage
evidence:
  - id: line-coverage
    claim: Line coverage over src/ reported by Vitest with the v8 provider.
    source:
      label: Cocktail Lab at commit 5296d93, test run on 2026-11-03
      url: https://github.com/DAlejandroCl/Cocktail-Lab/tree/5296d93
    verifiedOn: '2026-11-03'
    status: verified
  - id: zod-types
    claim: Domain types are inferred from the Zod schemas with z.infer instead of being written by hand.
    source:
      label: src/types/index.ts at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/types/index.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: store-persistence
    claim: Only favorites, their order and the saved AI recipes are persisted to localStorage; loading and generation state is not.
    source:
      label: src/stores/useAppStore.ts at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/stores/useAppStore.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: lazy-routes
    claim: The four views are loaded lazily and share one Suspense fallback.
    source:
      label: src/router.tsx at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/router.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: browse-strategy
    claim: The browse view fetches each category, caps it at 12 drinks, removes duplicates and shuffles the result.
    source:
      label: src/services/recipeService.ts at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/services/recipeService.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: json-object-reason
    claim: The project notes record that the Groq model used does not accept the json_schema response format, which is why the endpoint requests json_object and enforces the shape with Zod.
    source:
      label: docs/architecture.md at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/docs/architecture.md
    verifiedOn: '2026-11-05'
    status: stated
  - id: ai-endpoint
    claim: The serverless endpoint asks Groq for JSON, validates it with Zod, retries on rate limits with exponential backoff and on invalid output once, and returns a static recipe if everything fails.
    source:
      label: api/ai/generate-recipe.ts at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/api/ai/generate-recipe.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: test-matrix
    claim: The Playwright configuration defines five projects (Chromium, Firefox, WebKit, Pixel 5 and iPhone 13).
    source:
      label: playwright.config.ts at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/playwright.config.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: ci-workflow
    claim: The CI workflow runs on pushes and pull requests to main, and runs lint, build and the full test suite.
    source:
      label: .github/workflows/ci.yml at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/.github/workflows/ci.yml
    verifiedOn: '2026-11-05'
    status: verified
  - id: a11y-notification
    claim: The notification toast is a live region, polite for information and assertive for errors.
    source:
      label: src/components/Notification.tsx at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/components/Notification.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: a11y-error-focus
    claim: The error boundary moves focus to its heading after catching a rendering error.
    source:
      label: src/components/ErrorBoundary.tsx at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/components/ErrorBoundary.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: a11y-target
    claim: WCAG 2.1 AA is the declared accessibility target of the project.
    source:
      label: docs/accessibility.md at commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/docs/accessibility.md
    verifiedOn: '2026-11-05'
    status: target
  - id: manual-a11y
    claim: The project documents manual checks with a screen reader, keyboard-only navigation and browser zoom.
    source:
      label: docs/accessibility.md, section 3.4
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/docs/accessibility.md
    verifiedOn: '2026-11-05'
    status: stated
---

## Overview {#overview}

Cocktail Lab is a multi-page cocktail recipe app. You can search TheCocktailDB by name, ingredient or category, browse a mixed selection of drinks, keep favorites, and ask an AI model for a new recipe built from the ingredients you have.

It is my main case study because it is where I applied the most engineering practice in one place: a layered architecture, runtime validation of every API response, an AI endpoint that is designed around its failure modes, and an automated test suite with a stage for each kind of risk.

## Problem and objectives {#problem}

A recipe app looks simple until the data arrives. The public API returns ingredient data that is not always consistent, and an AI model can return something that looks right and is not. The objectives I set myself were:

- Keep the interface independent of the shape of the API, by validating data where it enters the app.
- Make the AI feature safe: the user never sees invalid output, and a failure never leaves them with nothing.
- Keep every layer testable on its own.
- Work toward WCAG 2.1 AA from the start rather than at the end.

## Features {#features}

- Search by name, ingredient or category, alone or combined.
- A browse view with sorting, infinite scroll and skeleton placeholders while data loads.
- Favorites, saved in the browser, with their own page and sorting.
- An AI generator: add the ingredients you have, get a recipe, and ask for a variation of it.
- "My creations", where generated recipes can be saved next to the favorites.
- Recipe detail in a modal, light and dark themes, and a branded not-found page.

## Technical stack {#stack}

React 19 and TypeScript with Vite; React Router 7 for the four routes; Zustand 5 for state; Zod 4 for validation; Tailwind CSS 4 and Headless UI for the interface. The AI feature runs as a serverless function on Vercel that calls the Groq SDK. Tests use Vitest, React Testing Library, MSW, jest-axe and Playwright.

## Architecture {#architecture}

<!-- evidence: zod-types, store-persistence, lazy-routes -->

The app is layered, with data flowing one way. Views are route-level components that compose smaller components and read state through selectors. Components receive data by props and emit events. State lives in Zustand slices (recipes, favorites, notifications, AI generation) combined into one store. Services talk to the API with `fetch` and validate every response with Zod. Nothing above the service layer sees unvalidated data.

Types are not written by hand: they are inferred from the Zod schemas, so the type and the runtime check cannot drift apart. Only the data a user would be upset to lose is persisted (favorites, their order and saved creations); transient state such as loading flags is deliberately left out.

All four views are loaded lazily behind one skeleton fallback. A recipe's detail opens as a modal rather than a route, which keeps AI-created recipes, which have no id in the public API, on the same code path.

The AI feature crosses the client and the server: the client calls a serverless function, the function asks Groq for a recipe, validates it with Zod, and looks up an image from the cocktail database that matches the drink.

## Engineering decisions {#decisions}

<!-- evidence: json-object-reason, browse-strategy -->

**Validate at the boundary and infer the types.** One schema describes each API response, and the TypeScript type comes from it. There is a single source of truth.

**Sort outside the store.** Sorting is a presentation concern, so it lives in pure functions with local component state. The store stays small and the sort functions are trivial to test.

**Keep favorite order in a parallel record.** The recipe type comes from a Zod schema. Adding a timestamp to it would mean changing the schema, so the order is kept in a separate record keyed by id.

**Reset pagination with a `key`, not an effect.** When the data or the sort changes, the grid remounts and its visible count starts over. It avoids a chain of state updates inside an effect.

**Call the Groq SDK directly and ask for JSON.** The project notes record that the model I used does not accept the `json_schema` response format on Groq. The endpoint asks for `json_object` and enforces the exact shape with Zod, which makes validation explicit instead of assumed.

**Browse by category, not by random.** The random endpoint returns one drink per call, so many parallel calls produced many duplicates. Fetching each category, capping it, removing duplicates and shuffling gives a consistent, varied set.

## Challenges and solutions {#challenges}

<!-- evidence: ai-endpoint -->

**Unreliable model output.** A model can return malformed JSON, a valid JSON with the wrong shape, or an error when it is rate limited. The endpoint parses and validates every answer, retries once when the output is invalid, retries with exponential backoff when it is rate limited, and returns a static recipe if nothing works. The person asking always gets a result, and the interface only ever receives data that passed validation.

**Variations without hidden state.** Asking for a different version of a recipe needs the previous recipe as context, while a first request should have none. I made them two separate actions instead of one action with conditions, so each is easy to read and to test.

**AI recipes that do not exist in the API.** Opening one of them by id would fail, because the public API has never heard of it. The modal can be opened from a recipe object already in memory, so those recipes never trigger a fetch.

## Testing strategy {#testing}

<!-- evidence: test-matrix, ci-workflow -->

The suite has five stages, each with its own tools and its own rule about what is allowed to be mocked:

1. **Store unit tests.** Each Zustand slice is tested alone, with nothing mocked.
2. **Component, service and utility unit tests.** Components are rendered with Testing Library and queried the way a user would find things (by role and label first). Services are tested with `fetch` replaced.
3. **Accessibility audits.** jest-axe checks components and full pages for missing labels, broken heading order and invalid ARIA.
4. **Integration tests.** A real store with MSW answering every HTTP request, covering whole flows such as adding ingredients, generating a recipe and saving it.
5. **End-to-end tests.** Playwright runs the user journeys with the network mocked, on five browser and device configurations, using page objects.

The rule of thumb is to test behavior rather than implementation, so a test breaks when what a user sees changes and not when a function is renamed. CI runs lint, the build and the full suite on every push and pull request to the main branch.

## Accessibility and performance {#accessibility-performance}

<!-- evidence: a11y-target, a11y-notification, a11y-error-focus, manual-a11y -->

Accessibility is a target, and I describe it as one. The app aims for WCAG 2.1 AA, and automated audits cannot prove conformance; they find a part of the problems.

What is built in: semantic landmarks and a skip link; native buttons for actions; a search form with a real label; a modal that traps focus and closes with Escape; notifications announced through a live region; and an error boundary that moves focus to its message so a screen reader user is told something went wrong.

The project documents manual passes with a screen reader, keyboard only and zoom. I list that as stated by me, because it is not something a reader can re-run.

On performance, every route is split into its own chunk and loading states use skeleton placeholders. I have not published Lighthouse or Core Web Vitals figures for this project because I have not measured them yet.

## Lessons learned {#lessons}

- Deciding what a test layer may mock, and keeping to it, made the suite faster to write and easier to trust.
- An AI feature should be designed from its failure modes first. The happy path was the easy part.
- Inferring types from schemas removed a whole class of mismatches between what the code believes and what the API sends.
- Next time I would measure performance from the first version and keep a budget, instead of leaving it for the end.

## Demo and repository {#links}

The code is public on [GitHub](https://github.com/DAlejandroCl/Cocktail-Lab) and the app is deployed on [Vercel](https://cocktail-lab-devacl.vercel.app). The source for every claim on this page is linked in the margin and points at the exact commit I checked.
