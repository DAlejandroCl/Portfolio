import type { ReactNode } from 'react';
import { StatusMarker, type ProjectStatus } from '../ui/StatusMarker';
import { StackList } from './StackList';

export type ProjectRowSize = 'featured' | 'standard' | 'compact';

interface ExtraLink {
  label: string;
  href: string;
}

interface ProjectRowProps {
  title: string;
  summary: string;
  status: ProjectStatus;
  statusLabel: string;
  stack: readonly string[];
  emphasizedStack: readonly string[];
  /** Where the title goes. The whole row is clickable through this link. */
  href: string;
  /** Spoken after the title when it leaves the site, e.g. "Repository". */
  destinationLabel?: string;
  extraLinks?: readonly ExtraLink[];
  size: ProjectRowSize;
  children?: ReactNode;
}

const titleSize: Record<ProjectRowSize, string> = {
  featured: 'text-h2',
  standard: 'text-h3',
  compact: 'text-h3',
};

const rowPadding: Record<ProjectRowSize, string> = {
  featured: 'py-10',
  standard: 'py-8',
  compact: 'py-6',
};

/**
 * A ruled row. One link on the title; a stretched pseudo-element makes the
 * whole row clickable. Hover underlines the title and nudges it, with no
 * elevation.
 */
export function ProjectRow({
  title,
  summary,
  status,
  statusLabel,
  stack,
  emphasizedStack,
  href,
  destinationLabel,
  extraLinks = [],
  size,
  children,
}: ProjectRowProps) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <article className={`group relative border-t border-line ${rowPadding[size]}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className={`${titleSize[size]} text-ink`}>
          <a
            href={href}
            {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
            className="inline-block text-ink no-underline transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:underline after:absolute after:inset-0 after:content-['']"
          >
            {title}
            {destinationLabel && <span className="sr-only"> — {destinationLabel}</span>}
          </a>
        </h3>
        <StatusMarker status={status} label={statusLabel} />
      </div>
      <p className={`mt-3 max-w-[68ch] ${size === 'featured' ? 'text-lede' : ''}`}>{summary}</p>
      <div className="mt-3">
        <StackList items={stack} emphasized={emphasizedStack} />
      </div>
      {extraLinks.length > 0 && (
        <ul className="relative z-10 mt-4 flex flex-wrap gap-x-6">
          {extraLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center"
              >
                {link.label}
                <span className="sr-only"> — {title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {children}
    </article>
  );
}
