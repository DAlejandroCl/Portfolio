import type { Evidence } from '../../content/schemas';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { formatDate } from '../../i18n/utils';

interface MarginNoteProps {
  evidence: Evidence;
  locale: Locale;
  labels: Dictionary['note'];
}

/**
 * The source of a claim: its status, where it comes from and when it was
 * checked. Status is always written out; it is never conveyed by color alone.
 */
export function MarginNote({ evidence, locale, labels }: MarginNoteProps) {
  return (
    <div
      className="border-l border-line-strong pl-4 text-note text-ink-muted"
      data-status={evidence.status}
    >
      <p className="font-display font-semibold text-ink">{labels[evidence.status]}</p>
      <p>
        {labels.source}:{' '}
        <a href={evidence.source.url} rel="noopener noreferrer">
          {evidence.source.label}
        </a>
      </p>
      <p>
        {evidence.status === 'stated' ? labels.statedOn : labels.checkedOn}{' '}
        <time dateTime={evidence.verifiedOn}>{formatDate(evidence.verifiedOn, locale)}</time>
      </p>
    </div>
  );
}
