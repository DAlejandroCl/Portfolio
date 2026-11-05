---
lang: es
title: Weather Finder
kind: short
summary: Aplicación para consultar el clima, hecha con React y TypeScript. Un hook propio obtiene el pronóstico y Zod valida la respuesta de la API antes de que llegue a la interfaz.
metaDescription: Caso de estudio de Weather Finder, app del clima en React y TypeScript que valida cada respuesta de la API con Zod, con sus limitaciones a la vista.
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
screenshotAlt: 'Página de inicio de Weather Finder.'
evidence:
  - id: hook-flow
    claim: El hook del clima hace dos peticiones, una para geolocalizar la ciudad y otra para el clima en esas coordenadas, y analiza cada respuesta con Zod antes de usarla.
    source:
      label: src/hooks/useWeather.ts en el commit 7a5cb88
      url: https://github.com/DAlejandroCl/Weather-finder/blob/7a5cb88/src/hooks/useWeather.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: client-key
    claim: La clave de OpenWeather se lee de una variable de entorno VITE_, que Vite incrusta en el bundle del cliente.
    source:
      label: src/hooks/useWeather.ts en el commit 7a5cb88
      url: https://github.com/DAlejandroCl/Weather-finder/blob/7a5cb88/src/hooks/useWeather.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: no-tests
    claim: El paquete no define un script de pruebas y el repositorio no tiene archivos de prueba.
    source:
      label: package.json en el commit 7a5cb88
      url: https://github.com/DAlejandroCl/Weather-finder/blob/7a5cb88/package.json
    verifiedOn: '2026-11-05'
    status: verified
---

## Resumen {#overview}

Weather Finder consulta el clima actual de una ciudad. Eliges un país, escribes una ciudad y la app muestra temperatura y condiciones en unidades métricas, con un estado de carga y un mensaje legible cuando algo falla.

Es un proyecto pequeño a propósito. Lo uso para mostrar una sola cosa hecha con cuidado: llevar datos de una API externa a una interfaz de React sin confiar en ellos.

## Tecnologías {#stack}

React y TypeScript sobre Vite, Axios para HTTP, Zod para los esquemas, y Tailwind CSS con CSS Modules para los estilos. Los datos vienen de las APIs de geocodificación y de clima de OpenWeather.

## Qué demuestra {#demonstrates}

<!-- evidence: hook-flow -->

- **Flujo de datos en un hook propio.** Un hook se encarga de la petición, el indicador de carga, el error y el resultado, así que los componentes solo muestran estados.
- **Dos peticiones dependientes.** Primero se geolocaliza la ciudad y luego se pide el clima de esas coordenadas.
- **Validación de datos externos.** Ambas respuestas se analizan con Zod y los tipos se infieren de los mismos esquemas.
- **Un formulario con etiquetas.** País y ciudad tienen etiquetas reales, y la búsqueda se valida antes de enviarse.

## Decisión clave {#decision}

Valido las respuestas en lugar de forzar su tipo. Una API puede cambiar o devolver una forma inesperada, y un cast dejaría que eso viaje a la interfaz y falle lejos de su causa. Con un esquema, falla en la frontera, con un mensaje que controlo yo.

## Limitaciones {#limitations}

<!-- evidence: client-key, no-tests -->

- **La clave de la API es visible para los visitantes.** Se lee de una variable `VITE_`, y Vite las incrusta en el bundle del navegador. Para una clave gratuita en una demo es un compromiso conocido; la solución es un pequeño proxy en el servidor que mantenga la clave privada.
- **Sin pruebas automatizadas.** El proyecto no tiene configuración de pruebas. Mi trabajo de pruebas lo muestro en Cocktail Lab.
- **Un único mensaje de error.** Todo fallo muestra el mismo texto, que no indica si conviene reintentar o cambiar la búsqueda.

## Repositorio {#links}

El código es público en [GitHub](https://github.com/DAlejandroCl/Weather-finder). No he verificado una demo en vivo de este proyecto, así que no enlazo ninguna. Las notas al margen apuntan al commit exacto que revisé.
