import { profile } from '../../data/profile';
import type { Dictionary } from '../../i18n/dictionaries/en';
import type { ProjectStatus } from '../ui/StatusMarker';
import { ProjectRow, type ProjectRowSize } from '../shared/ProjectRow';
import { Section } from '../shared/Section';

export interface ProjectItem {
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  stack: readonly string[];
  repo: string;
  demo?: string | undefined;
}

interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
  labels: Pick<Dictionary, 'projects' | 'status'>;
}

/** The first project leads, the second is standard, the rest are compact. */
function sizeFor(index: number): ProjectRowSize {
  if (index === 0) return 'featured';
  if (index === 1) return 'standard';
  return 'compact';
}

export function ProjectsSection({ projects, labels }: ProjectsSectionProps) {
  return (
    <Section id="projects" title={labels.projects.title}>
      <div className="border-b border-line">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            title={project.title}
            summary={project.summary}
            status={project.status}
            statusLabel={labels.status[project.status]}
            stack={project.stack}
            emphasizedStack={profile.primarySkills}
            href={project.repo}
            destinationLabel={labels.projects.repository}
            extraLinks={
              project.demo ? [{ label: labels.projects.liveDemo, href: project.demo }] : []
            }
            size={sizeFor(index)}
          />
        ))}
      </div>
    </Section>
  );
}
