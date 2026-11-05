---
lang: en
title: Weather Finder
kind: short
summary: A weather lookup app built with React and TypeScript. A custom hook fetches the forecast, and Zod validates the API response before it reaches the interface.
metaDescription: Case study of Weather Finder, a React and TypeScript weather app that validates every API response with Zod, with its limitations stated plainly.
status: completed
featured: false
order: 3
stack:
  - React
  - TypeScript
  - Vite
  - Axios
  - Zod
  - Tailwind CSS
  - CSS Modules
links:
  repo: https://github.com/DAlejandroCl/Weather-finder
screenshot: ../../../assets/screenshots/weather-finder.webp
screenshotAlt: 'Weather Finder home page.'
evidence:
  - id: hook-flow
    claim: The weather hook makes two requests, one to geocode the city and one for the weather at those coordinates, and parses each response with Zod before using it.
    source:
      label: src/hooks/useWeather.ts at commit 7a5cb88
      url: https://github.com/DAlejandroCl/Weather-finder/blob/7a5cb88/src/hooks/useWeather.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: client-key
    claim: The OpenWeather key is read from a VITE_ environment variable, which Vite embeds in the client bundle.
    source:
      label: src/hooks/useWeather.ts at commit 7a5cb88
      url: https://github.com/DAlejandroCl/Weather-finder/blob/7a5cb88/src/hooks/useWeather.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: no-tests
    claim: The package defines no test script and the repository has no test files.
    source:
      label: package.json at commit 7a5cb88
      url: https://github.com/DAlejandroCl/Weather-finder/blob/7a5cb88/package.json
    verifiedOn: '2026-11-05'
    status: verified
---

## Overview {#overview}

Weather Finder looks up the current weather for a city. You pick a country, type a city, and the app shows temperature and conditions in metric units, with a loading state and a readable message when something fails.

It is a small project on purpose. I use it to show one thing done carefully: getting data from an external API into a React interface without trusting it.

## Technical stack {#stack}

React and TypeScript on Vite, Axios for HTTP, Zod for schemas, and Tailwind CSS with CSS Modules for styles. The data comes from the OpenWeather geocoding and weather APIs.

## What it demonstrates {#demonstrates}

<!-- evidence: hook-flow -->

- **Data flow in a custom hook.** One hook owns the request, the loading flag, the error and the result, so components only render states.
- **Two dependent requests.** The city is geocoded first, then the weather is requested for those coordinates.
- **Validation of external data.** Both responses are parsed with Zod, and the types are inferred from the same schemas.
- **A labeled form.** Country and city have real labels, and the search is validated before it is sent.

## Key decision {#decision}

I validate the responses instead of casting them. An API can change or return an unexpected shape, and a cast would let that travel into the interface and fail somewhere far from its cause. With a schema, it fails at the boundary, with a message I control.

## Limitations {#limitations}

<!-- evidence: client-key, no-tests -->

- **The API key is visible to visitors.** It is read from a `VITE_` variable, and Vite embeds those in the browser bundle. For a free key on a demo this is a known trade-off; the fix is a small server-side proxy that keeps the key private.
- **No automated tests.** The project has no test setup. Cocktail Lab is where I show my testing work.
- **One generic error message.** Every failure shows the same text, which does not tell a person whether to retry or to change their search.

## Repository {#links}

The code is public on [GitHub](https://github.com/DAlejandroCl/Weather-finder). I have not verified a live demo for this project, so I do not link one. The margin notes point at the exact commit I checked.
