import type { ReactNode } from 'react';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { Section } from '../shared/Section';

interface AboutSectionProps {
  labels: Dictionary['about'];
  /** The engineering focus, shown under the summary. */
  children?: ReactNode;
}

/** The short version of the profile: who I am, how I work, which languages. */
export function AboutSection({ labels, children }: AboutSectionProps) {
  return (
    <Section id="about" title={labels.title}>
      <p className="max-w-[60ch] font-display text-lede font-medium">{labels.summary}</p>
      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        <div>
          <h3 className="text-h3">{labels.approachTitle}</h3>
          <p className="mt-2 max-w-[60ch]">{labels.approach}</p>
        </div>
        <div>
          <h3 className="text-h3">{labels.languagesTitle}</h3>
          <ul className="mt-2">
            {labels.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </Section>
  );
}
