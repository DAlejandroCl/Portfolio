import { profile } from '../../data/profile';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { Section } from '../shared/Section';

interface ContactSectionProps {
  labels: Dictionary['contact'];
}

export function ContactSection({ labels }: ContactSectionProps) {
  const links = [
    { label: labels.email, href: profile.links.email, external: false },
    { label: labels.linkedin, href: profile.links.linkedin, external: true },
    { label: labels.github, href: profile.links.github, external: true },
  ];

  return (
    <Section id="contact" title={labels.title}>
      <p className="max-w-[60ch]">{labels.text}</p>
      <ul className="mt-4 flex flex-wrap gap-x-8">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              {...(link.external ? { rel: 'noopener noreferrer' } : {})}
              className="inline-flex min-h-11 items-center font-display font-semibold"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
