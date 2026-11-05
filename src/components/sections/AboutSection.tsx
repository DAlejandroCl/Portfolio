import type { Dictionary } from '../../i18n/dictionaries/en';
import { Section } from '../shared/Section';

interface AboutSectionProps {
  labels: Dictionary['about'];
}

export function AboutSection({ labels }: AboutSectionProps) {
  return (
    <Section id="about" title={labels.title}>
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        <div>
          <h3 className="text-h3">{labels.educationTitle}</h3>
          <p className="mt-2 font-semibold">{labels.education.degree}</p>
          <p>
            {labels.education.school}, {labels.education.years}
          </p>
        </div>
        <div>
          <h3 className="text-h3">{labels.languagesTitle}</h3>
          <ul className="mt-2">
            {labels.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-h3">{labels.experienceTitle}</h3>
          <ul className="mt-2 space-y-4">
            {labels.experience.map((item) => (
              <li key={item.name}>
                <p className="font-semibold">{item.name}</p>
                <p className="text-note text-ink-muted">{item.period}</p>
                <p className="mt-1">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-h3">{labels.certificationsTitle}</h3>
          <ul className="mt-2 space-y-3">
            {labels.certifications.map((item) => (
              <li key={item.name}>
                <p className="font-semibold">{item.name}</p>
                <p className="text-note text-ink-muted">
                  {item.issuer}, {item.year}
                  {item.inProgress ? ` (${labels.inProgress})` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 max-w-[68ch]">
        <h3 className="text-h3">{labels.approachTitle}</h3>
        <p className="mt-2">{labels.approach}</p>
      </div>
    </Section>
  );
}
