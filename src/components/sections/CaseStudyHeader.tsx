import type { Evidence } from '../../content/schemas';
import { MarginNote } from '../shared/MarginNote';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { localizedPath } from '../../i18n/utils';
import { profile } from '../../data/profile';
import { StackList } from '../shared/StackList';
import { StatusMarker, type ProjectStatus } from '../ui/StatusMarker';
import type { ReactNode } from 'react';

export interface HeaderMetric {
  label: string;
  value: string;
  evidence: Evidence;
}

export interface SectionLink {
  id: string;
  title: string;
}

interface CaseStudyHeaderProps {
  title: string;
  summary: string;
  status: ProjectStatus;
  stack: readonly string[];
  repo: string;
  demo?: string | undefined;
  sections: readonly SectionLink[];
  metrics?: readonly HeaderMetric[];
  locale: Locale;
  labels: Pick<Dictionary, 'caseStudy' | 'status' | 'note'>;
  children?: ReactNode;
}

const linkClass = 'inline-flex min-h-11 items-center';

export function CaseStudyHeader({
  title,
  summary,
  status,
  stack,
  repo,
  demo,
  sections,
  metrics = [],
  locale,
  labels,
  children,
}: CaseStudyHeaderProps) {
  return (
    <header className="pt-8 pb-12 md:pt-14">
      <nav aria-label={labels.caseStudy.breadcrumb}>
        <ol className="flex items-center gap-2 text-note text-ink-muted">
          <li>
            <a href={localizedPath(locale, '/projects/')} className={linkClass}>
              {labels.caseStudy.allProjects}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1 className="mt-4 text-h1">{title}</h1>
      <div className="mt-5">
        <StatusMarker status={status} label={labels.status[status]} />
      </div>
      <p className="mt-6 max-w-[60ch] text-lede">{summary}</p>
      <div className="mt-5">
        <StackList items={stack} emphasized={profile.primarySkills} />
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-8">
        <li>
          <a
            href={repo}
            rel="noopener noreferrer"
            className={`${linkClass} font-display font-semibold`}
          >
            {labels.caseStudy.repository}
          </a>
        </li>
        {demo && (
          <li>
            <a
              href={demo}
              rel="noopener noreferrer"
              className={`${linkClass} font-display font-semibold`}
            >
              {labels.caseStudy.liveDemo}
            </a>
          </li>
        )}
      </ul>
      {metrics.length > 0 && (
        <ul className="mt-8 space-y-4">
          {metrics.map((metric) => (
            <li key={metric.label} className="max-w-[40ch]">
              <p className="font-display text-h3">
                {metric.label}: {metric.value}
              </p>
              <div className="mt-2">
                <MarginNote evidence={metric.evidence} locale={locale} labels={labels.note} />
              </div>
            </li>
          ))}
        </ul>
      )}
      {children}
      <nav aria-label={labels.caseStudy.onThisPage} className="mt-10">
        <p className="font-display text-note font-semibold text-ink-muted">
          {labels.caseStudy.onThisPage}
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-0">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className={linkClass}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
