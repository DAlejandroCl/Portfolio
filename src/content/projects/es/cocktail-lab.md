---
lang: es
title: Cocktail Lab
summary: Aplicación multipágina de recetas de cócteles construida con React 19 y TypeScript, con un generador de recetas con IA y una suite de pruebas automatizadas en varias capas.
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
screenshotAlt: "Página de inicio de Cocktail Lab: el titular 'Find Your Perfect Mix' sobre una barra de búsqueda por ingredientes y categorías, con un degradado suave de naranja y azul."
metrics:
  - label: Cobertura de líneas
    value: 89.42%
    evidenceId: line-coverage
evidence:
  - id: line-coverage
    claim: Cobertura de líneas sobre src/ reportada por Vitest con el proveedor v8.
    source:
      label: Cocktail Lab en el commit 5296d93, ejecución de pruebas del 3 de noviembre de 2026
      url: https://github.com/DAlejandroCl/Cocktail-Lab/tree/5296d93
    verifiedOn: '2026-11-03'
    status: verified
---
