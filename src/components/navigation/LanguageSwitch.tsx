import type { Locale } from '../../i18n/config';

interface LanguageSwitchProps {
  /** Path of the same page in the other language. */
  href: string;
  /** Name of the other language, written in that language. */
  label: string;
  lang: Locale;
}

/** A plain link, so switching language needs no JavaScript. */
export function LanguageSwitch({ href, label, lang }: LanguageSwitchProps) {
  return (
    <a
      href={href}
      hrefLang={lang}
      lang={lang}
      className="inline-flex min-h-11 min-w-11 items-center font-display font-semibold"
    >
      {label}
    </a>
  );
}
