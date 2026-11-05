interface ThemeToggleProps {
  label: string;
}

/**
 * Markup only. A small inline script in the layout reveals the button and
 * wires it up, so the React runtime is not shipped for a single toggle.
 * Without JavaScript the button stays hidden and the system preference rules.
 */
export function ThemeToggle({ label }: ThemeToggleProps) {
  return (
    <button
      type="button"
      data-theme-toggle=""
      aria-pressed="false"
      hidden
      className="min-h-11 rounded-control border border-line-strong px-3 font-display text-note font-semibold text-ink aria-pressed:bg-ink aria-pressed:text-paper"
    >
      {label}
    </button>
  );
}
