---
lang: es
title: Calorie Tracker
kind: short
summary: Registro de calorías y actividades hecho con React y TypeScript. El estado se gestiona con un reducer, los totales derivados usan memoización y los datos persisten en el navegador.
metaDescription: Caso de estudio de Calorie Tracker, app en React y TypeScript con un reducer tipado y totales derivados, con sus limitaciones a la vista.
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
screenshotAlt: 'Página de inicio de Calorie Tracker.'
evidence:
  - id: reducer
    claim: El estado lo gestiona un reducer con cinco acciones tipadas (añadir, eliminar, seleccionar, actualizar y reiniciar).
    source:
      label: src/reducers/activity-reducer.ts en el commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/src/reducers/activity-reducer.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: persistence
    claim: Las actividades se escriben en localStorage en un efecto cada vez que cambian, y se leen de nuevo cuando arranca la app.
    source:
      label: src/App.tsx en el commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/src/App.tsx
    verifiedOn: '2026-11-05'
    status: verified
  - id: raw-parse
    claim: Las actividades guardadas se leen con JSON.parse y no se validan.
    source:
      label: src/reducers/activity-reducer.ts en el commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/src/reducers/activity-reducer.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: no-tests
    claim: El paquete no define un script de pruebas.
    source:
      label: package.json en el commit d32dc77
      url: https://github.com/DAlejandroCl/Calorie-tracker/blob/d32dc77/package.json
    verifiedOn: '2026-11-05'
    status: verified
---

## Resumen {#overview}

Calorie Tracker registra comida y ejercicio del día. Añades una actividad con una categoría, una descripción y sus calorías, la editas o la eliminas, y la app muestra las calorías consumidas, quemadas y el total neto. Tu lista sigue ahí cuando vuelves.

## Tecnologías {#stack}

React y TypeScript sobre Vite, Tailwind CSS para los estilos y Heroicons para los iconos. No hay back end: los datos se quedan en el navegador.

## Qué demuestra {#demonstrates}

<!-- evidence: reducer, persistence -->

- **Un reducer con acciones tipadas.** Todo cambio en la lista pasa por un único reducer, y las acciones son una unión discriminada de TypeScript, así que el compilador sabe qué carga útil lleva cada acción.
- **Estado derivado.** Las calorías consumidas, quemadas y netas se calculan a partir de la lista y se memoizan, en lugar de guardarse como estado aparte que podría desincronizarse.
- **Persistencia.** La lista se guarda en el navegador cada vez que cambia y se restaura al abrir la app.
- **Un formulario que no deja enviar disparates.** El botón de envío permanece deshabilitado hasta que la actividad es válida.

## Decisión clave {#decision}

Los totales se derivan, no se almacenan. Hay una única fuente de verdad, la lista de actividades, y todo lo que se ve en pantalla se calcula a partir de ella. Eso elimina toda una clase de errores en los que un total y la lista no coinciden.

## Limitaciones {#limitations}

<!-- evidence: raw-parse, no-tests -->

- **Se confía en los datos guardados.** La lista guardada se lee con `JSON.parse` y no se valida. Si el valor almacenado se editara o se corrompiera, la app podría fallar al arrancar. La solución es validarlo con un esquema, como hago con los datos de API en otros proyectos.
- **Sin pruebas automatizadas.** El proyecto no tiene script de pruebas.
- **Un solo dispositivo.** Los datos viven en un navegador, sin cuenta ni sincronización.

## Repositorio {#links}

El código es público en [GitHub](https://github.com/DAlejandroCl/Calorie-tracker). No he verificado una demo en vivo de este proyecto, así que no enlazo ninguna. Este proyecto podría sustituirse más adelante en este sitio por uno más avanzado. Las notas al margen apuntan al commit exacto que revisé.
