import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';

interface SectionProps {
  /** Becomes the anchor (`#id`) and the base of the heading id. */
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-8 pb-[var(--space-section)]">
      <SectionHeading id={headingId}>{title}</SectionHeading>
      {children}
    </section>
  );
}
