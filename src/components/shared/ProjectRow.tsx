import type { ReactNode } from 'react';
import { StatusMarker, type ProjectStatus } from '../ui/StatusMarker';
import { StackList } from './StackList';

export type ProjectRowSize = 'featured' | 'standard' | 'compact';

interface ExtraLink {
  label: string;
  href: string;
}

export interface ProjectImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

interface ProjectRowProps {
  title: string;
  summary: string;
  status: ProjectStatus;
  statusLabel: string;
  stack: readonly string[];
  emphasizedStack: readonly string[];
  /** Where the title goes. The whole panel is clickable through this link. */
  href: string;
  /** Spoken after the title when it leaves the site, e.g. "Repository". */
  destinationLabel?: string;
  extraLinks?: readonly ExtraLink[];
  size: ProjectRowSize;
  image?: ProjectImage;
  children?: ReactNode;
}

const titleSize: Record<ProjectRowSize, string> = {
  featured: 'text-h2',
  standard: 'text-h3',
  compact: 'text-h3',
};

/**
 * A project panel. The featured one lays text and screenshot side by side;
 * the others stack the screenshot above the text. One link on the title; a
 * stretched pseudo-element makes the whole panel clickable.
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
  image,
  children,
}: ProjectRowProps) {
  const isExternal = /^https?:\/\//.test(href);
  const featured = size === 'featured';

  const picture = image && (
    <div className="overflow-hidden bg-line">
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={featured ? '(min-width: 64rem) 40rem, 100vw' : '(min-width: 64rem) 24rem, 100vw'}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.03]"
      />
    </div>
  );

  const text = (
    <div className="flex flex-col p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className={`${titleSize[size]} text-ink`}>
          <a
            href={href}
            {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
            className="text-ink no-underline group-hover:underline after:absolute after:inset-0 after:content-['']"
          >
            {title}
            {destinationLabel && <span className="sr-only"> — {destinationLabel}</span>}
          </a>
        </h3>
        <StatusMarker status={status} label={statusLabel} />
      </div>
      <p className={`mt-3 max-w-[60ch] ${featured ? 'text-lede' : ''}`}>{summary}</p>
      <div className="mt-4">
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
    </div>
  );

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-panel bg-surface lg:col-span-6 lg:grid lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">{text}</div>
        {picture && <div className="lg:col-span-7">{picture}</div>}
      </article>
    );
  }
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-panel bg-surface lg:col-span-2">
      {picture}
      {text}
    </article>
  );
}
