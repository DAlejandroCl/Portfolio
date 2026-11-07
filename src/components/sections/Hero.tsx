import type { ReactNode } from 'react';

interface HeroProps {
  firstNames: string;
  lastNames: string;
  jobTitle: string;
  statement: string;
  /** Calls to action under the statement. */
  actions?: ReactNode;
  /** Technologies and their label, shown under the actions. */
  stack?: { label: string; items: readonly string[] };
  /** The image and its evidence chip, beside the text on wide screens. */
  children?: ReactNode;
}

/**
 * The first thing a recruiter reads: who, what role, how to get in touch.
 * It sits on the cobalt field; the product screenshot overlaps its lower edge.
 */
export function Hero({
  firstNames,
  lastNames,
  jobTitle,
  statement,
  actions,
  stack,
  children,
}: HeroProps) {
  return (
    <section className="on-field relative mb-[var(--space-section)] overflow-hidden rounded-panel bg-field px-6 pt-12 pb-10 text-on-field md:px-12 md:pt-16 lg:pb-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h1 className="hero-name text-h1 lg:text-[clamp(3rem,1.5rem+3.4vw,4.75rem)]">
            <span className="block">{firstNames}</span> <span className="block">{lastNames}</span>
          </h1>
          <p className="mt-8 font-display text-lede font-semibold">{jobTitle}</p>
          <p className="mt-2 max-w-[56ch] text-lede text-on-field-muted">{statement}</p>
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
          {stack && (
            <p className="mt-8 max-w-[56ch] text-note text-on-field-muted">
              <span className="font-display font-semibold text-on-field">{stack.label}:</span>{' '}
              {stack.items.join(', ')}
            </p>
          )}
        </div>
        {children && <div className="lg:col-span-5">{children}</div>}
      </div>
    </section>
  );
}
