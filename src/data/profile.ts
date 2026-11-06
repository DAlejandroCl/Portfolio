/**
 * Facts that do not change with the language: links and the technology
 * names, which are proper nouns. Translated copy lives in the dictionaries.
 *
 * The phone number is deliberately absent. Publishing it is an owner
 * decision and the default is to keep it off the site.
 */
export const profile = {
  links: {
    github: 'https://github.com/DAlejandroCl',
    linkedin: 'https://www.linkedin.com/in/dalejandrocl/',
    email: 'mailto:alejandro1clavijo3@gmail.com',
    siteSource: 'https://github.com/DAlejandroCl/Portfolio',
  },
  /**
   * The CV for each language: the ATS version, which is plain text that screen
   * readers and parsers can read. The files have no phone number.
   */
  cv: {
    en: '/cv/Diego_Alejandro_Clavijo_Ladino_Resume.pdf',
    es: '/cv/Diego_Alejandro_Clavijo_Ladino_CV.pdf',
  },
  /** Where each engineering strength is shown, in the same order as the dictionary items. */
  focusProof: [
    { slug: 'cocktail-lab', section: 'architecture' },
    { slug: 'cocktail-lab', section: 'testing' },
    { slug: 'cocktail-lab', section: 'accessibility-performance' },
    { slug: 'cocktail-lab', section: 'decisions' },
  ],
  /** React and TypeScript lead; everything else is supporting. */
  primarySkills: ['React', 'TypeScript'],
  supportingSkills: {
    testing: ['Vitest', 'React Testing Library', 'Playwright', 'MSW', 'jest-axe'],
    data: ['Zustand', 'Zod', 'Axios'],
    interface: ['HTML5', 'CSS3', 'Tailwind CSS', 'CSS Modules'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
    tooling: ['Vite', 'Git', 'GitHub Actions', 'Vercel'],
  },
} as const;

export type SupportingSkillGroup = keyof typeof profile.supportingSkills;
