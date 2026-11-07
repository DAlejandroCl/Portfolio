import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from './ThemeToggle';

interface SiteHeaderProps {
  labels: Pick<Dictionary, 'site' | 'nav' | 'theme'>;
  homeHref: string;
  otherLocale: Locale;
  otherLocaleHref: string;
}

const linkClass = 'inline-flex min-h-11 items-center text-ink no-underline hover:underline';

/**
 * Wide screens show the links in a row. Narrow screens show a native
 * `details` disclosure, which works with a keyboard and without JavaScript.
 * Only one of the two lists is displayed at a time, so assistive technology
 * never meets the links twice.
 */
export function SiteHeader({ labels, homeHref, otherLocale, otherLocaleHref }: SiteHeaderProps) {
  const links = [
    { href: `${homeHref}#about`, label: labels.nav.about },
    { href: `${homeHref}#projects`, label: labels.nav.projects },
    { href: `${homeHref}#experience`, label: labels.nav.experience },
    { href: `${homeHref}#contact`, label: labels.nav.contact },
  ];

  return (
    <header className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
      <a href={homeHref} className={`${linkClass} font-display font-semibold`}>
        {labels.site.shortName}
      </a>
      <div className="flex items-center gap-3 md:gap-6">
        <nav aria-label={labels.nav.label}>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <details data-menu="" className="md:hidden">
            <summary className="inline-flex min-h-11 cursor-pointer items-center font-display font-semibold">
              {labels.nav.menu}
            </summary>
            <ul className="absolute top-full right-0 z-20 min-w-44 rounded-media border border-line-strong bg-paper p-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </nav>
        <LanguageSwitch
          href={otherLocaleHref}
          label={labels.nav.otherLanguage}
          lang={otherLocale}
        />
        <ThemeToggle label={labels.theme.toggle} />
      </div>
    </header>
  );
}
