/**
 * English dictionary. It defines the shape that every other dictionary must
 * follow: `es.ts` is typed as `Dictionary`, so a missing or extra key fails
 * type checking.
 */
export const en = {
  site: {
    firstNames: 'Diego Alejandro',
    lastNames: 'Clavijo Ladino',
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
  },
  hero: {
    statement:
      'Building maintainable, accessible and reliable web applications through thoughtful engineering.',
  },
  note: {
    verified: 'Verified',
    target: 'Target',
    stated: 'Stated',
    source: 'Source',
    checkedOn: 'Checked on',
  },
};

export type Dictionary = typeof en;
