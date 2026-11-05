---
lang: en
title: Cocktail Lab
summary: A multi-page cocktail recipe app built with React 19 and TypeScript, with an AI recipe generator and a multi-layer automated test suite.
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
---
