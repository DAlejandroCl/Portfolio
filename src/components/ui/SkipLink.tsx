interface SkipLinkProps {
  label: string;
}

/** First focusable element on every page; it is visible only while focused. */
export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-control focus:bg-signal focus:px-4 focus:font-display focus:font-semibold focus:text-on-signal focus:no-underline"
    >
      {label}
    </a>
  );
}
