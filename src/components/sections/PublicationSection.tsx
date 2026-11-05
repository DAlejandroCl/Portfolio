import type { Evidence, Publication } from '../../content/schemas';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { MarginNote } from '../shared/MarginNote';
import { Section } from '../shared/Section';

interface PublicationSectionProps {
  publication: Pick<Publication, 'title' | 'titleLang' | 'venue' | 'year' | 'context'> & {
    evidence: Evidence;
  };
  locale: Locale;
  labels: Pick<Dictionary, 'publication' | 'note'>;
}

/** Prose in the main column; the source sits level with it in the margin. */
export function PublicationSection({ publication, locale, labels }: PublicationSectionProps) {
  return (
    <Section id="publication" title={labels.publication.title}>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="text-h3">
            <a
              href={publication.evidence.source.url}
              rel="noopener noreferrer"
              lang={publication.titleLang === locale ? undefined : publication.titleLang}
            >
              {publication.title}
            </a>
          </h3>
          <p className="mt-2 text-note text-ink-muted">
            {publication.venue}, {publication.year}
          </p>
          <p className="mt-4 max-w-[68ch]">{publication.context}</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <MarginNote evidence={publication.evidence} locale={locale} labels={labels.note} />
        </div>
      </div>
    </Section>
  );
}
