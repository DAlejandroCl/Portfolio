import type { ReactNode } from 'react';
import type { Evidence } from '../../content/schemas';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { MarginNote } from './MarginNote';

interface CaseStudySectionProps {
  id: string;
  title: string;
  /** Rendered Markdown from the content collection (trusted, authored here). */
  html: string;
  notes: readonly Evidence[];
  locale: Locale;
  labels: Dictionary['note'];
  /** Shown after the prose, e.g. the feature list. */
  children?: ReactNode;
}

/**
 * Prose in columns 1-7, notes in columns 9-12 from `lg`. In the markup the
 * notes follow the prose, so reading order is natural without the grid and
 * on small screens the notes sit directly under the text they support.
 */
export function CaseStudySection({
  id,
  title,
  html,
  notes,
  locale,
  labels,
  children,
}: CaseStudySectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="grid scroll-mt-8 gap-x-8 gap-y-6 border-t border-line-strong py-10 lg:grid-cols-12"
    >
      <div className="lg:col-span-7">
        <h2 id={headingId} className="mb-5 text-h2">
          {title}
        </h2>
        <div className="case-prose" dangerouslySetInnerHTML={{ __html: html }} />
        {children}
      </div>
      {notes.length > 0 && (
        <div className="space-y-6 lg:col-span-4 lg:col-start-9 lg:pt-14">
          {notes.map((evidence) => (
            <MarginNote key={evidence.id} evidence={evidence} locale={locale} labels={labels} />
          ))}
        </div>
      )}
    </section>
  );
}
