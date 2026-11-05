---
lang: es
title: Cocktail Lab
kind: full
summary: Aplicación de recetas de cócteles de varias páginas hecha con React 19 y TypeScript, con un generador de recetas con IA y una suite de pruebas automatizadas en varias capas.
metaDescription: Caso de estudio de Cocktail Lab, una app de cócteles en React y TypeScript con generador de recetas con IA, arquitectura por capas y pruebas en varias capas.
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
screenshotAlt: "Página de inicio de Cocktail Lab: el titular 'Find Your Perfect Mix' sobre una barra de búsqueda de ingredientes y categorías, con un degradado suave naranja y azul."
metrics:
  - label: Cobertura de líneas
    value: 89.42%
    evidenceId: line-coverage
evidence:
  - id: line-coverage
    claim: Cobertura de líneas sobre src/ reportada por Vitest con el proveedor v8.
    source:
      label: Cocktail Lab en el commit 5296d93, ejecución de pruebas el 2026-11-03
      url: https://github.com/DAlejandroCl/Cocktail-Lab/tree/5296d93
    verifiedOn: '2026-11-03'
    status: verified
  - id: zod-types
    claim: Los tipos de dominio se infieren de los esquemas de Zod con z.infer en lugar de escribirse a mano.
    source:
      label: src/types/index.ts en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/types/index.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: store-persistence
    claim: Solo se persisten en localStorage los favoritos, su orden y las recetas de IA guardadas; el estado de carga y de generación no.
    source:
      label: src/stores/useAppStore.ts en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/stores/useAppStore.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: lazy-routes
    claim: Las cuatro vistas se cargan de forma diferida y comparten un mismo fallback de Suspense.
    source:
      label: src/router.tsx en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/router.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: browse-strategy
    claim: La vista de exploración pide cada categoría, la limita a 12 bebidas, elimina duplicados y mezcla el resultado.
    source:
      label: src/services/recipeService.ts en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/services/recipeService.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: json-object-reason
    claim: Las notas del proyecto indican que el modelo de Groq usado no acepta el formato de respuesta json_schema, por eso el endpoint pide json_object y exige la forma con Zod.
    source:
      label: docs/architecture.md en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/docs/architecture.md
    verifiedOn: '2026-11-05'
    status: stated
  - id: ai-endpoint
    claim: El endpoint serverless pide JSON a Groq, lo valida con Zod, reintenta con espera exponencial ante límites de uso y una vez ante una salida inválida, y devuelve una receta estática si todo falla.
    source:
      label: api/ai/generate-recipe.ts en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/api/ai/generate-recipe.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: test-matrix
    claim: La configuración de Playwright define cinco proyectos (Chromium, Firefox, WebKit, Pixel 5 e iPhone 13).
    source:
      label: playwright.config.ts en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/playwright.config.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: ci-workflow
    claim: El flujo de CI se ejecuta en push y pull request hacia main, y corre lint, build y la suite completa de pruebas.
    source:
      label: .github/workflows/ci.yml en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/.github/workflows/ci.yml
    verifiedOn: '2026-11-05'
    status: verified
  - id: a11y-notification
    claim: La notificación emergente es una región en vivo, cortés para información y asertiva para errores.
    source:
      label: src/components/Notification.tsx en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/components/Notification.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: a11y-error-focus
    claim: El límite de errores mueve el foco a su encabezado tras capturar un error de renderizado.
    source:
      label: src/components/ErrorBoundary.tsx en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/src/components/ErrorBoundary.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: a11y-target
    claim: WCAG 2.1 AA es el objetivo de accesibilidad declarado del proyecto.
    source:
      label: docs/accessibility.md en el commit 5296d93
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/docs/accessibility.md
    verifiedOn: '2026-11-05'
    status: target
  - id: manual-a11y
    claim: El proyecto documenta revisiones manuales con lector de pantalla, navegación solo con teclado y zoom del navegador.
    source:
      label: docs/accessibility.md, sección 3.4
      url: https://github.com/DAlejandroCl/Cocktail-Lab/blob/5296d93/docs/accessibility.md
    verifiedOn: '2026-11-05'
    status: stated
---

## Resumen {#overview}

Cocktail Lab es una aplicación de recetas de cócteles de varias páginas. Puedes buscar en TheCocktailDB por nombre, ingrediente o categoría, explorar una selección variada de bebidas, guardar favoritos y pedirle a un modelo de IA una receta nueva a partir de los ingredientes que tienes.

Es mi caso de estudio principal porque es donde apliqué más práctica de ingeniería en un solo lugar: una arquitectura por capas, validación en tiempo de ejecución de cada respuesta de la API, un endpoint de IA diseñado alrededor de sus modos de fallo y una suite de pruebas automatizadas con una etapa para cada tipo de riesgo.

## Problema y objetivos {#problem}

Una app de recetas parece sencilla hasta que llegan los datos. La API pública devuelve datos de ingredientes que no siempre son consistentes, y un modelo de IA puede devolver algo que parece correcto y no lo es. Los objetivos que me puse fueron:

- Mantener la interfaz independiente de la forma de la API, validando los datos donde entran a la aplicación.
- Hacer segura la función de IA: la persona nunca ve una salida inválida, y un fallo nunca la deja sin resultado.
- Que cada capa se pueda probar por separado.
- Trabajar hacia WCAG 2.1 AA desde el principio y no al final.

## Funcionalidades {#features}

- Búsqueda por nombre, ingrediente o categoría, por separado o combinadas.
- Una vista de exploración con ordenamiento, scroll infinito y marcadores de carga (skeletons) mientras llegan los datos.
- Favoritos guardados en el navegador, con su propia página y ordenamiento.
- Un generador con IA: añade los ingredientes que tienes, obtén una receta y pide una variación de ella.
- «Mis creaciones», donde las recetas generadas se pueden guardar junto a los favoritos.
- Detalle de la receta en un modal, temas claro y oscuro, y una página de error 404 con la identidad de la app.

## Tecnologías {#stack}

React 19 y TypeScript con Vite; React Router 7 para las cuatro rutas; Zustand 5 para el estado; Zod 4 para la validación; Tailwind CSS 4 y Headless UI para la interfaz. La función de IA se ejecuta como una función serverless en Vercel que llama al SDK de Groq. Las pruebas usan Vitest, React Testing Library, MSW, jest-axe y Playwright.

## Arquitectura {#architecture}

<!-- evidence: zod-types, store-persistence, lazy-routes -->

La app está organizada por capas y los datos fluyen en un solo sentido. Las vistas son componentes de nivel de ruta que componen componentes más pequeños y leen el estado mediante selectores. Los componentes reciben datos por props y emiten eventos. El estado vive en slices de Zustand (recetas, favoritos, notificaciones, generación con IA) combinados en un solo store. Los servicios hablan con la API con `fetch` y validan cada respuesta con Zod. Nada por encima de la capa de servicios ve datos sin validar.

Los tipos no se escriben a mano: se infieren de los esquemas de Zod, así que el tipo y la comprobación en tiempo de ejecución no pueden divergir. Solo se persisten los datos que a una persona le molestaría perder (favoritos, su orden y las creaciones guardadas); el estado transitorio, como los indicadores de carga, se deja fuera a propósito.

Las cuatro vistas se cargan de forma diferida detrás de un mismo marcador de carga. El detalle de una receta se abre como modal y no como ruta, lo que mantiene en el mismo flujo de código a las recetas creadas con IA, que no tienen id en la API pública.

La función de IA cruza el cliente y el servidor: el cliente llama a una función serverless, la función pide una receta a Groq, la valida con Zod y busca en la base de datos de cócteles una imagen que se parezca a la bebida.

## Decisiones de ingeniería {#decisions}

<!-- evidence: json-object-reason, browse-strategy -->

**Validar en la frontera e inferir los tipos.** Un esquema describe cada respuesta de la API y el tipo de TypeScript sale de él. Hay una única fuente de verdad.

**Ordenar fuera del store.** Ordenar es un asunto de presentación, así que vive en funciones puras con estado local del componente. El store se mantiene pequeño y las funciones de orden son triviales de probar.

**Guardar el orden de los favoritos en un registro paralelo.** El tipo de receta sale de un esquema de Zod. Añadirle una marca de tiempo implicaría cambiar el esquema, así que el orden se guarda en un registro aparte indexado por id.

**Reiniciar la paginación con una `key`, no con un efecto.** Cuando cambian los datos o el orden, la cuadrícula se vuelve a montar y su conteo visible empieza de nuevo. Evita una cadena de actualizaciones de estado dentro de un efecto.

**Llamar al SDK de Groq directamente y pedir JSON.** Las notas del proyecto indican que el modelo que usé no acepta el formato de respuesta `json_schema` en Groq. El endpoint pide `json_object` y exige la forma exacta con Zod, lo que hace explícita la validación en lugar de darla por hecha.

**Explorar por categoría, no al azar.** El endpoint aleatorio devuelve una bebida por llamada, así que muchas llamadas en paralelo producían muchos duplicados. Pedir cada categoría, limitarla, eliminar duplicados y mezclar da un conjunto consistente y variado.

## Retos y soluciones {#challenges}

<!-- evidence: ai-endpoint -->

**Salida poco fiable del modelo.** Un modelo puede devolver JSON mal formado, un JSON válido con la forma equivocada, o un error cuando se supera su límite de uso. El endpoint analiza y valida cada respuesta, reintenta una vez cuando la salida es inválida, reintenta con espera exponencial cuando se supera el límite de uso y devuelve una receta estática si nada funciona. La persona siempre recibe un resultado, y la interfaz solo recibe datos que pasaron la validación.

**Variaciones sin estado oculto.** Pedir otra versión de una receta necesita la receta anterior como contexto, mientras que una primera petición no debe tener ninguno. Las hice dos acciones separadas en lugar de una acción con condiciones, para que cada una sea fácil de leer y de probar.

**Recetas de IA que no existen en la API.** Abrir una por id fallaría, porque la API pública no la conoce. El modal se puede abrir desde un objeto de receta que ya está en memoria, así que esas recetas nunca provocan una petición.

## Estrategia de pruebas {#testing}

<!-- evidence: test-matrix, ci-workflow -->

La suite tiene cinco etapas, cada una con sus propias herramientas y su propia regla sobre qué se puede simular (mock):

1. **Pruebas unitarias de los stores.** Cada slice de Zustand se prueba solo, sin simular nada.
2. **Pruebas unitarias de componentes, servicios y utilidades.** Los componentes se renderizan con Testing Library y se consultan como los encontraría una persona (primero por rol y etiqueta). Los servicios se prueban reemplazando `fetch`.
3. **Auditorías de accesibilidad.** jest-axe revisa componentes y páginas completas en busca de etiquetas ausentes, orden de encabezados roto y ARIA inválido.
4. **Pruebas de integración.** Un store real con MSW respondiendo cada petición HTTP, que cubren flujos completos como añadir ingredientes, generar una receta y guardarla.
5. **Pruebas de extremo a extremo.** Playwright ejecuta los recorridos de usuario con la red simulada, en cinco configuraciones de navegador y dispositivo, usando page objects.

La regla general es probar el comportamiento y no la implementación, de modo que una prueba falle cuando cambia lo que ve la persona y no cuando se renombra una función. El CI ejecuta lint, la compilación y la suite completa en cada push y pull request hacia la rama principal.

## Accesibilidad y rendimiento {#accessibility-performance}

<!-- evidence: a11y-target, a11y-notification, a11y-error-focus, manual-a11y -->

La accesibilidad es un objetivo y la describo como tal. La app apunta a WCAG 2.1 AA, y las auditorías automáticas no pueden demostrar conformidad; encuentran una parte de los problemas.

Lo que está construido: regiones semánticas y un enlace para saltar al contenido; botones nativos para las acciones; un formulario de búsqueda con una etiqueta real; un modal que atrapa el foco y se cierra con Escape; notificaciones anunciadas mediante una región en vivo; y un límite de errores que mueve el foco a su mensaje para que quien usa un lector de pantalla sepa que algo falló.

El proyecto documenta revisiones manuales con lector de pantalla, solo teclado y zoom. Lo indico como declarado por mí, porque no es algo que quien lee pueda volver a ejecutar.

En cuanto al rendimiento, cada ruta se divide en su propio fragmento y los estados de carga usan marcadores (skeletons). No he publicado cifras de Lighthouse ni de Core Web Vitals de este proyecto porque todavía no las he medido.

## Lecciones aprendidas {#lessons}

- Decidir qué puede simular cada capa de pruebas, y respetarlo, hizo la suite más rápida de escribir y más fácil de creer.
- Una función de IA conviene diseñarla empezando por sus modos de fallo. El camino feliz fue lo fácil.
- Inferir los tipos de los esquemas eliminó toda una clase de desajustes entre lo que cree el código y lo que envía la API.
- La próxima vez mediría el rendimiento desde la primera versión y mantendría un presupuesto, en lugar de dejarlo para el final.

## Demo y repositorio {#links}

El código es público en [GitHub](https://github.com/DAlejandroCl/Cocktail-Lab) y la app está desplegada en [Vercel](https://cocktail-lab-devacl.vercel.app). La fuente de cada afirmación de esta página está enlazada en el margen y apunta al commit exacto que revisé.
