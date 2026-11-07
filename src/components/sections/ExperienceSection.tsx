import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { Section } from '../shared/Section';

interface ExperienceSectionProps {
  labels: Dictionary['experience'];
  locale: Locale;
}

/** Marks a phrase written in another language than the page (WCAG 3.1.2). */
export const langOf = (written: string, page: Locale): string | undefined =>
  written === page ? undefined : written;

/** Work first, then the degree, in the order a recruiter reads a CV. */
export function ExperienceSection({ labels, locale }: ExperienceSectionProps) {
  return (
    <Section id="experience" title={labels.title}>
      <ul className="space-y-8">
        {labels.items.map((item) => (
          <li
            key={item.name}
            className="border-t-2 border-line pt-4 md:grid md:grid-cols-12 md:gap-x-8"
          >
            <p className="text-note text-ink-muted md:col-span-4">{item.period}</p>
            <div className="md:col-span-8">
              <h3 className="font-display text-h3" lang={langOf(item.nameLang, locale)}>
                {item.name}
              </h3>
              <p className="mt-1 max-w-[60ch]">{item.text}</p>
            </div>
          </li>
        ))}
        <li className="border-t-2 border-line pt-4 md:grid md:grid-cols-12 md:gap-x-8">
          <p className="text-note text-ink-muted md:col-span-4">{labels.education.years}</p>
          <div className="md:col-span-8">
            <h3 className="font-display text-h3">{labels.educationTitle}</h3>
            <p className="mt-1 font-semibold">{labels.education.degree}</p>
            <p lang={langOf(labels.education.schoolLang, locale)}>{labels.education.school}</p>
          </div>
        </li>
      </ul>
    </Section>
  );
}
