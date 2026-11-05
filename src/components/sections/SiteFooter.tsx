import { profile } from '../../data/profile';
import type { Locale } from '../../i18n/config';
import type { Dictionary } from '../../i18n/dictionaries/en';
import { LanguageSwitch } from '../navigation/LanguageSwitch';

interface SiteFooterProps {
  labels: Pick<Dictionary, 'site' | 'footer' | 'nav'>;
  year: number;
  otherLocale: Locale;
  otherLocaleHref: string;
}

const linkClass = 'inline-flex min-h-11 items-center';

export function SiteFooter({ labels, year, otherLocale, otherLocaleHref }: SiteFooterProps) {
  return (
    <footer className="border-t border-line-strong py-8 text-note text-ink-muted">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <p>
          © {year} {labels.site.firstNames} {labels.site.lastNames}. {labels.footer.rights}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6">
          <li>
            <LanguageSwitch
              href={otherLocaleHref}
              label={labels.nav.otherLanguage}
              lang={otherLocale}
            />
          </li>
          <li>
            <a href={profile.links.github} rel="noopener noreferrer" className={linkClass}>
              {labels.footer.githubProfile}
            </a>
          </li>
          <li>
            <a href={profile.links.siteSource} rel="noopener noreferrer" className={linkClass}>
              {labels.footer.siteSource}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
