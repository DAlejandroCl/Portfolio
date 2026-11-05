import type { Dictionary } from '../../i18n/dictionaries/en';
import { Section } from '../shared/Section';

interface FocusSectionProps {
  labels: Dictionary['focus'];
}

export function FocusSection({ labels }: FocusSectionProps) {
  return (
    <Section id="focus" title={labels.title}>
      <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {labels.items.map((item) => (
          <li key={item.title}>
            <h3 className="text-h3">{item.title}</h3>
            <p className="mt-2 max-w-[60ch]">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
