import type { ReactNode } from 'react';

interface SectionProps {
  /** Becomes the anchor (`#id`) and the base of the heading id. */
  id: string;
  title: string;
  children: ReactNode;
  /** The content takes the full width, under the heading (projects). */
  wide?: boolean;
}

/**
 * From `lg` the heading sits in its own column and stays in view while the
 * section scrolls (CSS only); below that it stacks above the content.
 */
export function Section({ id, title, children, wide = false }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-8 pb-[var(--space-section)] ${wide ? '' : 'lg:grid lg:grid-cols-12 lg:gap-x-8'}`}
    >
      <h2
        id={headingId}
        className={`mb-8 text-h2 ${wide ? 'lg:mb-10' : 'lg:sticky lg:top-6 lg:col-span-3 lg:mb-0 lg:self-start'}`}
      >
        {title}
      </h2>
      <div className={wide ? '' : 'lg:col-span-9'}>{children}</div>
    </section>
  );
}
