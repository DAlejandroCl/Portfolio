---
lang: en
title: Calorie Tracker
kind: short
summary: A calorie and activity tracker built with React and TypeScript. State is managed with a reducer, derived totals use memoization, and data persists in the browser.
metaDescription: Case study of Calorie Tracker, a React and TypeScript app that manages state with a typed reducer and derives its totals, with its limitations stated plainly.
status: completed
featured: false
order: 4
stack:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
links:
  repo: https://github.com/DAlejandroCl/Calorie-tracker
screenshot: ../../../assets/screenshots/calorie-tracker.webp
screenshotAlt: 'Calorie Tracker home page.'
evidence:
  - id: reducer
    claim: State is managed by a reducer with five typed actions (add, remove, select, update and restart).
    source:
      label: src/reducers/activity-reducer.ts at commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/src/reducers/activity-reducer.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: persistence
    claim: Activities are written to localStorage in an effect whenever they change, and read back when the app starts.
    source:
      label: src/App.tsx at commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/src/App.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: raw-parse
    claim: The stored activities are read with JSON.parse and are not validated.
    source:
      label: src/reducers/activity-reducer.ts at commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/src/reducers/activity-reducer.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: no-tests
    claim: The package defines no test script.
    source:
      label: package.json at commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/package.json
    verifiedOn: '2026-11-05'
    status: verified
---

## Overview {#overview}

Calorie Tracker logs food and exercise for the day. You add an activity with a category, a description and its calories, edit or remove it, and the app shows calories consumed, burned and the net total. Your list is still there when you come back.

## Technical stack {#stack}

React and TypeScript on Vite, Tailwind CSS for styles and Heroicons for icons. There is no back end: the data stays in the browser.

## What it demonstrates {#demonstrates}

<!-- evidence: reducer, persistence -->

- **A reducer with typed actions.** Every change to the list goes through one reducer, and the actions are a TypeScript discriminated union, so the compiler knows which payload each action carries.
- **Derived state.** Consumed, burned and net calories are computed from the list and memoized, not stored as separate state that could fall out of sync.
- **Persistence.** The list is saved in the browser whenever it changes and restored when the app opens.
- **A form that cannot submit nonsense.** The submit button stays disabled until the activity is valid.

## Key decision {#decision}

The totals are derived, not stored. There is one source of truth, the list of activities, and everything on screen is calculated from it. That removes a whole class of bugs where a total and the list disagree.

## Limitations {#limitations}

<!-- evidence: raw-parse, no-tests -->

- **Stored data is trusted.** The saved list is read with `JSON.parse` and not validated. If the stored value were edited or corrupted, the app could fail on start. Validating it with a schema, as I do with API data in other projects, is the fix.
- **No automated tests.** The project has no test script.
- **Single device.** Data lives in one browser, with no account or sync.

## Repository {#links}

The code is public on [GitHub](https://github.com/DAlejandroCl/Calorie-tracker). I have not verified a live demo for this project, so I do not link one. This project may be replaced on this site by a more advanced one later. The margin notes point at the exact commit I checked.
