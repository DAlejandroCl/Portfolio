import { profile } from '../../data/profile';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { localizedPath } from '../../i18n/utils';

interface FocusSectionProps {
  labels: Dictionary['focus'];
  locale: Locale;
}

/** Each strength links to the case study section that shows it. Lives inside About. */
export function FocusSection({ labels, locale }: FocusSectionProps) {
  return (
    <div id="focus" className="mt-14">
      <h3 className="text-h3">{labels.title}</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {labels.items.map((item, index) => {
          const proof = profile.focusProof[index];
          return (
            <li key={item.title} className="rounded-media bg-surface p-6">
              <h4 className="font-display text-lede font-semibold">{item.title}</h4>
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
    </div>
  );
}
