import { profile } from '../../data/profile';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { Button } from '../ui/Button';

interface ContactSectionProps {
  labels: Dictionary['contact'];
  /** The CV file for the language of the page. */
  cvHref: string;
}

/** The closing call to action: the same cobalt field the page opened with. */
export function ContactSection({ labels, cvHref }: ContactSectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="on-field scroll-mt-8 rounded-panel bg-field px-6 py-12 text-on-field md:px-12 md:py-16"
    >
      <h2 id="contact-heading" className="text-h2">
        {labels.title}
      </h2>
      <p className="mt-4 max-w-[52ch] text-lede text-on-field-muted">{labels.text}</p>
      <ul className="mt-8 flex flex-wrap gap-3">
        <li>
          <Button href={profile.links.email} variant="field">
            {labels.email}
          </Button>
        </li>
        <li>
          <Button href={profile.links.linkedin} variant="field-outline">
            {labels.linkedin}
          </Button>
        </li>
        <li>
          <Button href={profile.links.github} variant="field-outline">
            {labels.github}
          </Button>
        </li>
        <li>
          <Button href={cvHref} variant="field-outline">
            {labels.cv}
          </Button>
        </li>
      </ul>
    </section>
  );
}
