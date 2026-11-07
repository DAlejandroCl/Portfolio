import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { Section } from '../shared/Section';
import { langOf } from './ExperienceSection';

interface CertificationsSectionProps {
  labels: Dictionary['certifications'];
  locale: Locale;
}

export function CertificationsSection({ labels, locale }: CertificationsSectionProps) {
  return (
    <Section id="certifications" title={labels.title}>
      <ul className="grid gap-4 md:grid-cols-3">
        {labels.items.map((item) => (
          <li key={item.name} className="rounded-media bg-surface p-6">
            <p className="font-display font-semibold" lang={langOf(item.nameLang, locale)}>
              {item.name}
            </p>
            <p className="mt-2 text-note text-ink-muted">
              {item.issuer}, {item.year}
              {item.inProgress ? ` (${labels.inProgress})` : ''}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
