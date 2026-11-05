import type { Dictionary } from './en';

export const es: Dictionary = {
  site: {
    firstNames: 'Diego Alejandro',
    lastNames: 'Clavijo Ladino',
    shortName: 'Diego A. Clavijo',
    role: 'Ingeniero de Software Frontend',
  },
  meta: {
    homeTitle: 'Diego Alejandro Clavijo Ladino | Ingeniero de Software Frontend',
    homeDescription:
      'Ingeniero de Software Frontend especializado en React y TypeScript. Casos de estudio con las decisiones de ingeniería y la fuente de cada cifra.',
  },
  a11y: {
    skipLink: 'Saltar al contenido',
  },
  nav: {
    otherLanguage: 'English',
    label: 'Principal',
    homeLink: 'Inicio',
    menu: 'Menú',
    projects: 'Proyectos',
    about: 'Acerca de mí',
    contact: 'Contacto',
  },
  theme: {
    toggle: 'Tema oscuro',
  },
  hero: {
    statement:
      'Construyo aplicaciones web mantenibles, accesibles y confiables a través de una ingeniería cuidadosa.',
    viewProjects: 'Ver proyectos',
  },
  note: {
    verified: 'Verificado',
    target: 'Objetivo',
    stated: 'Declarado',
    source: 'Fuente',
    checkedOn: 'Comprobado el',
    statedOn: 'Información aportada por el autor el',
  },
  status: {
    production: 'En producción',
    completed: 'Terminado',
    'in-progress': 'En desarrollo activo',
  },
  projects: {
    title: 'Proyectos',
    repository: 'Repositorio',
    liveDemo: 'Demo en vivo',
  },
  focus: {
    title: 'Enfoque de ingeniería',
    items: [
      {
        title: 'Ingeniería frontend',
        text: 'Aplicaciones en React y TypeScript con estado tipado y datos de API validados en tiempo de ejecución con Zod.',
      },
      {
        title: 'Calidad de software',
        text: 'Pruebas automatizadas en varios niveles (unitarias, de accesibilidad, de integración y de extremo a extremo) e integración continua con GitHub Actions.',
      },
      {
        title: 'Accesibilidad',
        text: 'HTML semántico, operación completa con teclado y auditorías de accesibilidad automatizadas, con WCAG 2.1 AA como objetivo.',
      },
      {
        title: 'Pensamiento técnico',
        text: 'Arquitectura y decisiones documentadas con sus razones, para que quien lea vea por qué algo se construyó de esa manera.',
      },
    ],
  },
  expertise: {
    title: 'Experiencia técnica',
    primary: [
      {
        name: 'React',
        text: 'El núcleo de cada proyecto de esta página: arquitectura de componentes, gestión de estado con Zustand y useReducer, e integración con APIs REST.',
      },
      {
        name: 'TypeScript',
        text: 'Presente en todos los proyectos de esta página, con Zod validando los datos en tiempo de ejecución donde entran a la aplicación.',
      },
    ],
    supportingTitle: 'Tecnologías de apoyo',
    groups: {
      testing: 'Pruebas y calidad',
      data: 'Estado y datos',
      interface: 'Interfaz',
      backend: 'Back end y bases de datos',
      tooling: 'Herramientas y despliegue',
    },
  },
  about: {
    title: 'Acerca de mí',
    educationTitle: 'Educación',
    education: {
      degree: 'Ingeniería de Sistemas y Computación',
      school: 'Universidad Católica de Colombia',
      years: '2018–2024',
    },
    experienceTitle: 'Experiencia',
    experience: [
      {
        name: 'Proyectos independientes de ingeniería de software',
        period: 'Septiembre de 2022 – actualidad',
        text: 'Diseño, construcción y documentación de los proyectos que se muestran en esta página.',
      },
      {
        name: 'Fundación de Levi',
        period: 'Febrero – agosto de 2022',
        text: 'Desarrollador web en un proyecto en equipo: construí la sección de galería del sitio web institucional con HTML, CSS y JavaScript.',
      },
    ],
    certificationsTitle: 'Certificaciones',
    inProgress: 'En curso',
    certifications: [
      {
        name: 'React & Full-Stack Development (MERN/PERN)',
        issuer: 'Udemy',
        year: '2026',
        inProgress: true,
      },
      { name: 'AI from 0 to Production', issuer: 'BIG School', year: '2026', inProgress: false },
      { name: 'Advanced CSS and SASS', issuer: 'Udemy', year: '2025', inProgress: false },
    ],
    languagesTitle: 'Idiomas',
    languages: ['Español: nativo', 'Inglés: B2'],
    approachTitle: 'Cómo trabajo',
    approach:
      'Elijo la herramienta más simple que cumpla el requisito, pruebo el comportamiento del que depende la gente y dejo por escrito la razón de cada decisión.',
  },
  publication: {
    title: 'Publicación académica',
    readAt: 'Leer el artículo',
  },
  contact: {
    title: 'Contacto',
    text: 'Escríbeme por correo o por LinkedIn. Mi código está en GitHub.',
    email: 'Correo',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    label: 'Sitio',
    rights: 'Todos los derechos reservados.',
    githubProfile: 'Perfil de GitHub',
    siteSource: 'Código fuente de este sitio',
  },
};
