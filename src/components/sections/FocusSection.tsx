import { profile } from '../../data/profile';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { localizedPath } from '../../i18n/utils';
import { Section } from '../shared/Section';

interface FocusSectionProps {
  labels: Dictionary['focus'];
  locale: Locale;
}

/** Each strength links to the case study section that shows it. */
export function FocusSection({ labels, locale }: FocusSectionProps) {
  return (
    <Section id="focus" title={labels.title}>
      <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {labels.items.map((item, index) => {
          const proof = profile.focusProof[index];
          return (
            <li key={item.title}>
              <h3 className="text-h3">{item.title}</h3>
              <p className="mt-2 max-w-[60ch]">{item.text}</p>
              {proof && (
                <p className="mt-2">
                  <a
                    href={`${localizedPath(locale, `/projects/${proof.slug}/`)}#${proof.section}`}
                    className="inline-flex min-h-11 items-center"
                  >
                    {labels.proofLink}
                    <span className="sr-only">: {item.title}</span>
                  </a>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
