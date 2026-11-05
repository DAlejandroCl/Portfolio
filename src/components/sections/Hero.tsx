import type { ReactNode } from 'react';

interface HeroProps {
  firstNames: string;
  lastNames: string;
  jobTitle: string;
  statement: string;
  /** Calls to action under the statement. */
  actions?: ReactNode;
  children?: ReactNode;
}

export function Hero({ firstNames, lastNames, jobTitle, statement, actions, children }: HeroProps) {
  return (
    <section className="pt-12 pb-[var(--space-section)] md:pt-20">
      <h1 className="hero-name text-h1">
        <span className="block">{firstNames}</span> <span className="block">{lastNames}</span>
      </h1>
      <p className="mt-8 font-display text-lede font-semibold">{jobTitle}</p>
      <p className="mt-2 max-w-[68ch] text-lede">{statement}</p>
      {actions && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">{actions}</div>}
      {children}
    </section>
  );
}
