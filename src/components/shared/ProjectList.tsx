import { profile } from '../../data/profile';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { localizedPath } from '../../i18n/utils';
import type { ProjectStatus } from '../ui/StatusMarker';
import { ProjectRow, type ProjectImage, type ProjectRowSize } from './ProjectRow';

export interface ProjectItem {
  /** The bare slug, the same in every language. */
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  stack: readonly string[];
  repo: string;
  demo?: string | undefined;
  image?: ProjectImage | undefined;
}

interface ProjectListProps {
  projects: readonly ProjectItem[];
  locale: Locale;
  labels: Pick<Dictionary, 'caseStudy' | 'status'>;
}

/** The first project leads, the second is standard, the rest are compact. */
function sizeFor(index: number): ProjectRowSize {
  if (index === 0) return 'featured';
  if (index === 1) return 'standard';
  return 'compact';
}

/** Each row opens its case study; the repository and the demo sit beside it. */
export function ProjectList({ projects, locale, labels }: ProjectListProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-6">
      {projects.map((project, index) => (
        <ProjectRow
          key={project.slug}
          title={project.title}
          summary={project.summary}
          status={project.status}
          statusLabel={labels.status[project.status]}
          stack={project.stack}
          emphasizedStack={profile.primarySkills}
          href={localizedPath(locale, `/projects/${project.slug}/`)}
          extraLinks={[
            { label: labels.caseStudy.repository, href: project.repo },
            ...(project.demo ? [{ label: labels.caseStudy.liveDemo, href: project.demo }] : []),
          ]}
          size={sizeFor(index)}
          {...(project.image ? { image: project.image } : {})}
        />
      ))}
    </div>
  );
}
