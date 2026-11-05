import { profile, type SupportingSkillGroup } from '../../data/profile';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { Section } from '../shared/Section';

interface ExpertiseSectionProps {
  labels: Dictionary['expertise'];
}

const groupOrder = Object.keys(profile.supportingSkills) as SupportingSkillGroup[];

/** React and TypeScript first, with a reason each. Everything else is secondary. */
export function ExpertiseSection({ labels }: ExpertiseSectionProps) {
  return (
    <Section id="expertise" title={labels.title}>
      <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {labels.primary.map((skill) => (
          <li key={skill.name}>
            <h3 className="text-h3">{skill.name}</h3>
            <p className="mt-2 max-w-[60ch]">{skill.text}</p>
          </li>
        ))}
      </ul>
      <h3 className="mt-14 mb-6 text-lede font-semibold text-ink-muted">
        {labels.supportingTitle}
      </h3>
      <dl className="grid gap-x-12 gap-y-4 text-note md:grid-cols-[minmax(0,14rem)_1fr]">
        {groupOrder.map((group) => (
          <div key={group} className="contents">
            <dt className="font-display font-semibold">{labels.groups[group]}</dt>
            <dd className="text-ink-muted">{profile.supportingSkills[group].join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
