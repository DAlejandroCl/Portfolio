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
