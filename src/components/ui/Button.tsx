import type { ReactNode } from 'react';

interface ButtonProps {
  href: string;
  /** `field` and `field-outline` are for use on the cobalt field. */
  variant?: 'primary' | 'secondary' | 'field' | 'field-outline';
  children: ReactNode;
}

const base = 'inline-flex min-h-11 items-center font-display font-semibold';

const variants = {
  primary:
    'rounded-control bg-signal px-5 text-on-signal no-underline hover:bg-signal-hover hover:text-on-signal',
  secondary: 'px-1 underline',
  // `!` beats the link color that `.on-field a` sets for plain links.
  field:
    'rounded-control bg-on-field px-5 !text-field no-underline hover:bg-on-field-muted hover:!text-field',
  'field-outline':
    'rounded-control border-2 border-on-field px-5 text-on-field no-underline hover:bg-on-field hover:!text-field',
} as const;

/** A link styled as a button. The label is a verb: "View projects". */
export function Button({ href, variant = 'primary', children }: ButtonProps) {
  return (
    <a
      href={href}
      {...(/^https?:\/\//.test(href) ? { rel: 'noopener noreferrer' } : {})}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
