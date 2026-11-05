/**
 * English dictionary. It defines the shape that every other dictionary must
 * follow: `es.ts` is typed as `Dictionary`, so a missing or extra key fails
 * type checking.
 */
export const en = {
  site: {
    firstNames: 'Diego Alejandro',
    lastNames: 'Clavijo Ladino',
    shortName: 'Diego A. Clavijo',
    role: 'Frontend Software Engineer',
  },
  meta: {
    homeTitle: 'Diego Alejandro Clavijo Ladino | Frontend Software Engineer',
    homeDescription:
      'Frontend Software Engineer specializing in React and TypeScript. Case studies with the engineering decisions and the source behind every number.',
  },
  a11y: {
    skipLink: 'Skip to content',
  },
  nav: {
    /** Name of the other language, written in that language. */
    otherLanguage: 'Español',
    label: 'Main',
    homeLink: 'Home',
    menu: 'Menu',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
  },
  theme: {
    toggle: 'Dark theme',
  },
  hero: {
    statement:
      'Building maintainable, accessible and reliable web applications through thoughtful engineering.',
    viewProjects: 'View projects',
  },
  note: {
    verified: 'Verified',
    target: 'Target',
    stated: 'Stated',
    source: 'Source',
    checkedOn: 'Checked on',
    statedOn: 'Provided by the author on',
  },
  status: {
    production: 'Production',
    completed: 'Completed',
    'in-progress': 'In active development',
  },
  projects: {
    title: 'Projects',
    repository: 'Repository',
    liveDemo: 'Live demo',
  },
  caseStudy: {
    breadcrumb: 'Breadcrumb',
    allProjects: 'Projects',
    onThisPage: 'On this page',
    repository: 'Repository',
    liveDemo: 'Live demo',
    stack: 'Stack',
    featureStatus: {
      implemented: 'Implemented',
      'in-progress': 'In progress',
      planned: 'Planned',
    },
    readCaseStudy: 'Read the case study',
    metaTitleSuffix: 'Case study',
  },
  projectsPage: {
    title: 'Projects',
    description:
      'Four frontend projects built with React and TypeScript, each with its stack, status and the source behind its claims.',
    intro: 'Each project has a case study with the decisions behind it.',
  },
  notFound: {
    title: 'This page does not exist.',
    text: 'The address may be wrong, or the page may have moved.',
    home: 'Go to the home page',
    metaTitle: 'Page not found',
  },
  focus: {
    title: 'Engineering focus',
    proofLink: 'See it in Cocktail Lab',
    items: [
      {
        title: 'Frontend engineering',
        text: 'React and TypeScript applications with typed state and API data validated at runtime with Zod.',
      },
      {
        title: 'Software quality',
        text: 'Automated tests at several levels (unit, accessibility, integration and end-to-end) and continuous integration with GitHub Actions.',
      },
      {
        title: 'Accessibility',
        text: 'Semantic HTML, full keyboard operation and automated accessibility audits, working toward WCAG 2.1 AA.',
      },
      {
        title: 'Technical thinking',
        text: 'Architecture and decisions documented with their reasons, so a reader can see why something was built the way it was.',
      },
    ],
  },
  expertise: {
    title: 'Technical expertise',
    primary: [
      {
        name: 'React',
        text: 'The core of every project on this page: component architecture, state management with Zustand and useReducer, and REST API integration.',
      },
      {
        name: 'TypeScript',
        text: 'Used in every project on this page, with Zod validating data at runtime where it enters the application.',
      },
    ],
    supportingTitle: 'Supporting technologies',
    groups: {
      testing: 'Testing and quality',
      data: 'State and data',
      interface: 'Interface',
      backend: 'Back end and databases',
      tooling: 'Tooling and delivery',
    },
  },
  about: {
    title: 'About',
    educationTitle: 'Education',
    education: {
      degree: 'Systems and Computer Engineering',
      school: 'Universidad Católica de Colombia',
      schoolLang: 'es',
      years: '2018–2024',
    },
    experienceTitle: 'Experience',
    experience: [
      {
        name: 'Independent software engineering projects',
        nameLang: 'en',
        period: 'September 2022 – present',
        text: 'Designing, building and documenting the projects shown on this page.',
      },
      {
        name: 'Fundación de Levi',
        nameLang: 'es',
        period: 'February – August 2022',
        text: 'Web developer in a team project: built the gallery section of the institutional website with HTML, CSS and JavaScript.',
      },
    ],
    certificationsTitle: 'Certifications',
    inProgress: 'In progress',
    certifications: [
      {
        name: 'React & Full-Stack Development (MERN/PERN)',
        nameLang: 'en',
        issuer: 'Udemy',
        year: '2026',
        inProgress: true,
      },
      {
        name: 'AI from 0 to Production',
        nameLang: 'en',
        issuer: 'BIG School',
        year: '2026',
        inProgress: false,
      },
      {
        name: 'Advanced CSS and SASS',
        nameLang: 'en',
        issuer: 'Udemy',
        year: '2025',
        inProgress: false,
      },
    ],
    languagesTitle: 'Languages',
    languages: ['Spanish: native', 'English: B2'],
    approachTitle: 'How I work',
    approach:
      'I choose the simplest tool that meets the requirement, test the behavior people depend on, and write down the reason for each decision.',
  },
  publication: {
    title: 'Academic publication',
    readAt: 'Read the paper',
  },
  contact: {
    title: 'Contact',
    text: 'Get in touch by email or LinkedIn. My code is on GitHub.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: {
    label: 'Site',
    rights: 'All rights reserved.',
    githubProfile: 'GitHub profile',
    siteSource: 'Source code of this site',
  },
};

export type Dictionary = typeof en;
