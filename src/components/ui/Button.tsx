import type { ReactNode } from 'react';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

const base = 'inline-flex min-h-11 items-center font-display font-semibold';

const variants = {
  primary:
    'rounded-control bg-signal px-5 text-on-signal no-underline hover:bg-signal-hover hover:text-on-signal',
  secondary: 'px-1 underline',
} as const;

/** A link styled as a button. The label is a verb: "View projects". */
export function Button({ href, variant = 'primary', children }: ButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}
