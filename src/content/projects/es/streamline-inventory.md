---
lang: es
title: Streamline Inventory
kind: full
summary: Aplicación full-stack de gestión de inventario con autenticación JWT en cookies, una API de productos y categorías y un back end por capas. En desarrollo activo.
metaDescription: Caso de estudio de Streamline Inventory, app de inventario full-stack con React y Express en desarrollo, con su seguridad, pruebas y carencias conocidas.
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
screenshotAlt: 'Página de inicio de Streamline Inventory.'
features:
  - name: Inicio y cierre de sesión
    description: Sesión en una cookie con un JWT; el área de la app redirige a la página de acceso cuando no hay sesión.
    status: implemented
  - name: Gestión de productos
    description: Crear, editar y eliminar productos, y cambiar su disponibilidad.
    status: implemented
  - name: Subida de imágenes
    description: Las imágenes de los productos se validan, se redimensionan y se guardan como WebP.
    status: implemented
  - name: Búsqueda y lista paginada
    description: El término de búsqueda vive en la URL, se aplica con retardo (debounce) y la API pagina la lista de productos.
    status: implemented
  - name: Panel de control
    description: Totales de productos, disponibilidad, valor del inventario, precio promedio y tasa de stock, calculados a partir de la lista de productos.
    status: implemented
  - name: Categorías
    description: Una API de categorías con crear, leer, actualizar y eliminar, y selección de categoría en cada producto.
    status: implemented
  - name: Documentación interactiva de la API
    description: Swagger UI servido por la API en /docs.
    status: implemented
  - name: Integración continua y suite de extremo a extremo
    description: Existen cuatro flujos de GitHub Actions que se están endureciendo; parte de la suite de extremo a extremo todavía no se ejecuta en CI.
    status: in-progress
evidence:
  - id: layers
    claim: El back end se divide en rutas, controladores, servicios y modelos, con la configuración y los middlewares en sus propias carpetas.
    source:
      label: backend/src  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/tree/d081e26/backend/src
    verifiedOn: '2026-11-05'
    status: verified
  - id: auth-cookie
    claim: El token de sesión viaja en una cookie httpOnly (secure en producción, sameSite lax), caduca a los siete días y las contraseñas se cifran con bcrypt.
    source:
      label: backend/src/controllers/auth.controllers.ts  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/controllers/auth.controllers.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: route-guard
    claim: Las rutas de productos exigen autenticación en el servidor, y el área de la app redirige a la página de acceso mediante un loader de ruta en el cliente.
    source:
      label: backend/src/routes/product.routes.ts  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/routes/product.routes.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: security-config
    claim: La API envía cabeceras de seguridad con Helmet y limita las peticiones a 100 cada 15 minutos, y a 10 cada 15 minutos en el inicio de sesión.
    source:
      label: backend/src/config/security.ts  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/config/security.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: image-pipeline
    claim: Las imágenes subidas se validan por tipo, se redimensionan a 800 por 800 píxeles, se convierten a WebP y se guardan con un nombre aleatorio.
    source:
      label: backend/src/config/multer.ts  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/config/multer.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: db-sync
    claim: El esquema se crea con sync de Sequelize en modo alter; no hay migraciones versionadas configuradas.
    source:
      label: backend/src/config/db.ts  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/config/db.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: seed-admin
    claim: Se crea una cuenta de administrador por defecto en cada arranque del servidor si no existe.
    source:
      label: backend/src/index.ts  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/backend/src/index.ts
    verifiedOn: '2026-11-05'
    status: verified
  - id: tests-layout
    claim: Existen pruebas para la API (integración y unitarias), para páginas, actions y componentes (Vitest), para accesibilidad (axe) y como cinco specs de Playwright.
    source:
      label: frontend/src/tests  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/tree/d081e26/frontend/src/tests
    verifiedOn: '2026-11-05'
    status: verified
  - id: ci-e2e
    claim: El flujo de extremo a extremo instala solo Chromium y ejecuta tres de los cinco specs de Playwright.
    source:
      label: e2e.yml  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/.github/workflows/e2e.yml
    verifiedOn: '2026-11-05'
    status: verified
  - id: ci-soft-steps
    claim: Algunos pasos de CI no bloquean, como la comprobación de tipos del back end y el informe de cobertura, que terminan con un recurso que deja pasar el trabajo.
    source:
      label: ci.yml  en el commit d081e26
      url: https://github.com/DAlejandroCl/streamline-inventory/blob/d081e26/.github/workflows/ci.yml
    verifiedOn: '2026-11-05'
    status: verified
---

## Resumen {#overview}

Streamline Inventory es una aplicación full-stack de gestión de inventario: una aplicación de una sola página en React que habla con una API en Express respaldada por PostgreSQL. Una persona autenticada gestiona productos y categorías, sube imágenes de producto y ve métricas de stock en un panel.

Todavía está en desarrollo y esta página lo dice. Cada funcionalidad de abajo está marcada como implementada o en curso, y las carencias que ya conozco aparecen en su propia sección en lugar de esconderse.

## Problema y objetivos {#problem}

Quería un proyecto donde todo el stack fuera mío, para poder tomar y justificar decisiones a ambos lados de la API. Los objetivos:

- Un back end con capas claras, que separe lo que es HTTP, las reglas de negocio y el acceso a datos.
- Una autenticación que no exponga el token a los scripts que corren en la página.
- Un front end que use el enrutador para cargar datos y hacer mutaciones, en lugar de pedir datos dentro de efectos.
- Pruebas en varios niveles, ejecutadas automáticamente.

## Funcionalidades {#features}

<!-- features -->

## Tecnologías {#stack}

React 19, TypeScript y Vite en el front end, con React Router 7 como enrutador de datos, Zod para los esquemas de formularios y datos, y Tailwind CSS. Express 5 y TypeScript en el back end, con Sequelize sobre PostgreSQL, Multer y Sharp para las imágenes, Helmet y express-rate-limit como protección y Swagger para la documentación. GitHub Actions para la automatización.

## Arquitectura {#architecture}

<!-- evidence: layers, route-guard -->

El back end sigue una estructura por capas. Las rutas declaran los endpoints y le añaden middleware. Los controladores traducen HTTP a llamadas y de vuelta. Los servicios contienen las reglas de negocio y hablan con los modelos de Sequelize. La configuración (base de datos, entorno, seguridad, subidas) y los middlewares (autenticación, validación, errores) tienen sus propias carpetas, y un único tipo de error lleva el estado HTTP.

El front end usa el enrutador como capa de datos. Los loaders de ruta obtienen lo que necesita una página y las actions de ruta realizan las mutaciones, como crear, editar y eliminar un producto. Las páginas reciben sus datos ya cargados, y la protección del área de la app es un loader que redirige a la página de acceso cuando falla la comprobación de sesión. Los proveedores de contexto guardan solo estado transversal: el usuario actual, las notificaciones, el tema y los ajustes.

## Decisiones de ingeniería {#decisions}

<!-- evidence: auth-cookie, image-pipeline -->

**Token en una cookie httpOnly.** El JWT nunca es legible desde JavaScript, así que un script inyectado en la página no puede robarlo. La cookie es `secure` en producción y `sameSite: lax`. Primero probé `strict`, que bloqueaba la cookie cuando el front end y la API corrían en orígenes distintos en desarrollo y en CI, así que `lax` es un compromiso documentado y no un valor por defecto.

**Procesar las imágenes en el servidor.** Las subidas se validan por tipo, se redimensionan, se convierten a WebP y se guardan con un nombre aleatorio. El navegador nunca decide el formato final ni el nombre del archivo.

**Las rutas como capa de datos.** Los loaders y las actions mantienen la obtención y la modificación de datos fuera de los componentes, lo que simplifica las páginas y permite que las pruebas rendericen una página con un enrutador en memoria y la red simulada.

**Un límite aparte y más estricto para el acceso.** La API limita todas las peticiones, y el inicio de sesión tiene su propio límite más bajo, porque es el endpoint al que vale la pena atacar por fuerza bruta.

## Retos y soluciones {#challenges}

**Probar un formulario con un campo de archivo.** Al enviar el formulario de producto en las pruebas, la capa de red simulada se quedaba colgada intentando leer el campo de archivo vacío. La solución provisional está documentada en el repositorio: el componente de imagen se simula en las pruebas de integración de las páginas, y las actions del formulario se prueban directamente con un `fetch` simulado en lugar de pasar por todo el enrutador. Funciona, y significa que la ruta de subida de archivos queda menos cubierta de extremo a extremo de lo que me gustaría.

**Pruebas sin un servidor de base de datos.** Las pruebas de la API corren sobre una base SQLite en memoria que se crea y se limpia en cada suite, de modo que el pipeline no necesita PostgreSQL. A cambio, las pruebas corren sobre un motor distinto al de producción.

**Cookies entre orígenes.** Mantener la sesión en una cookie mientras el front end y la API corren en orígenes distintos exigió configuración explícita entre orígenes y la política `lax` descrita arriba.

## Estrategia de pruebas {#testing}

<!-- evidence: tests-layout, ci-e2e, ci-soft-steps -->

Las pruebas están por capas. En la API hay pruebas de integración (productos, categorías y una suite de seguridad) y pruebas unitarias del servicio de productos y del middleware de errores, con el ejecutor de pruebas nativo de Node y Supertest, con un inicio de sesión real en cada suite. En el front end, Vitest con React Testing Library y MSW cubre páginas (renderizadas con un enrutador real en memoria), actions, componentes y esquemas, y una suite con vitest-axe audita la accesibilidad. Cinco specs de Playwright cubren los recorridos principales de extremo a extremo.

No cito un número de pruebas en esta página, porque la cifra de mi propia documentación es algo que no he vuelto a ejecutar ni a confirmar.

La automatización es donde el proyecto está menos terminado, y quiero que eso se vea. Hay cuatro flujos de GitHub Actions. Algunos pasos son no bloqueantes a propósito, así que un error de tipos en el back end no detiene el pipeline. El flujo de extremo a extremo instala solo Chromium y ejecuta tres de los cinco specs. Cerrar esas brechas es el trabajo actual.

## Accesibilidad y rendimiento {#accessibility-performance}

El front end tiene una suite automatizada de accesibilidad (axe mediante vitest-axe) y un spec de accesibilidad de extremo a extremo, pero ese spec es uno de los que todavía no se ejecutan en CI. No he hecho una auditoría manual con tecnologías de asistencia en este proyecto y no he medido el rendimiento, así que no afirmo nada de accesibilidad ni de rendimiento más allá de la existencia de esas pruebas.

## Carencias conocidas y lecciones {#lessons}

<!-- evidence: db-sync, seed-admin -->

Estas son limitaciones reales del estado actual, escritas para que nadie tenga que encontrarlas:

- **Se crea una cuenta de administrador por defecto en cada arranque**, en todos los entornos. Es cómodo en desarrollo e inaceptable en producción; tiene que convertirse en un paso de configuración explícito y de una sola vez.
- **No hay migraciones versionadas.** El esquema se sincroniza con `sync({ alter: true })`, que sirve para explorar y es arriesgado con datos de producción.
- **El CI todavía no es estricto.** Algunos pasos no pueden hacer fallar la compilación y parte de la suite de extremo a extremo no se ejecuta.
- **Otra deuda técnica** figura en las notas de pruebas del repositorio, por ejemplo un DTO parcial en el endpoint PATCH.

Lo que me llevo: escribir las carencias es útil en sí mismo, porque las convierte en una lista de trabajo, y el siguiente paso más valioso no es una funcionalidad nueva sino lograr que el pipeline falle cuando debe fallar.

## Repositorio {#links}

El código es público en [GitHub](https://github.com/DAlejandroCl/streamline-inventory). No hay demo en vivo, porque el proyecto no está desplegado. Las notas al margen enlazan al commit exacto que revisé.
