import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { ProjectList, type ProjectItem } from '../shared/ProjectList';
import { Section } from '../shared/Section';

export type { ProjectItem };

interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
  locale: Locale;
  labels: Pick<Dictionary, 'projects' | 'caseStudy' | 'status'>;
}

export function ProjectsSection({ projects, locale, labels }: ProjectsSectionProps) {
  return (
    <Section id="projects" title={labels.projects.title} wide>
      <ProjectList projects={projects} locale={locale} labels={labels} />
    </Section>
  );
}
