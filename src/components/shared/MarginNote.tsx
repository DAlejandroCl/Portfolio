import type { Evidence } from '../../content/schemas';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { formatDate } from '../../i18n/utils';

interface MarginNoteProps {
  evidence: Evidence;
  locale: Locale;
  labels: Dictionary['note'];
  /**
   * `note` sits in the margin of a text. `mark` is the highlighter chip used
   * on top of an image, where there is no margin. `bare` is the text alone,
   * for a container that already provides the box.
   */
  variant?: 'note' | 'mark' | 'bare';
}

/**
 * The source of a claim: its status, where it comes from and when it was
 * checked. Status is always written out; it is never conveyed by color alone.
 */
export function MarginNote({ evidence, locale, labels, variant = 'note' }: MarginNoteProps) {
  const styles = {
    mark: 'mark rounded-media bg-mark px-4 py-3 text-note text-on-mark',
    bare: 'text-note',
    note: 'border-l-4 border-mark pl-4 text-note text-ink-muted',
  } as const;
  const style = styles[variant];
  return (
    <div className={style} data-status={evidence.status}>
      <p className={`font-display font-semibold ${variant === 'note' ? 'text-ink' : ''}`}>
        {labels[evidence.status]}
      </p>
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
