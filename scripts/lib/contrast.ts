/** WCAG 2.1 contrast helpers and the token pairs the design system declares. */

export type Theme = 'light' | 'dark';
export type TokenTable = Record<string, Record<Theme, string>>;

export interface Pair {
  foreground: string;
  background: string;
  /** 4.5 for text, 3 for large text and UI components. */
  minimum: number;
  usage: string;
}

export interface PairResult {
  theme: Theme;
  pair: Pair;
  ratio: number;
  passes: boolean;
}

function expandHex(hex: string): string {
  const value = hex.replace('#', '').toLowerCase();
  if (/^[0-9a-f]{3}$/.test(value)) {
    return value.replace(/./g, '$&$&');
  }
  if (/^[0-9a-f]{6}$/.test(value)) {
    return value;
  }
  throw new Error(`Unsupported color "${hex}". Use #rgb or #rrggbb.`);
}

function linearChannel(full: string, start: number): number {
  const value = parseInt(full.slice(start, start + 2), 16) / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const full = expandHex(hex);
  return (
    0.2126 * linearChannel(full, 0) +
    0.7152 * linearChannel(full, 2) +
    0.0722 * linearChannel(full, 4)
  );
}

export function contrastRatio(first: string, second: string): number {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => b - a,
  );
  return ((lighter ?? 0) + 0.05) / ((darker ?? 0) + 0.05);
}

const TOKEN =
  /--color-([a-z0-9-]+)\s*:\s*light-dark\(\s*(#[0-9a-fA-F]+)\s*,\s*(#[0-9a-fA-F]+)\s*\)/g;

/** Reads `--color-name: light-dark(light, dark)` declarations from the stylesheet. */
export function parseTokens(css: string): TokenTable {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const tokens: TokenTable = {};
  for (const match of withoutComments.matchAll(TOKEN)) {
    const [, name, light, dark] = match;
    if (name !== undefined && light !== undefined && dark !== undefined) {
      tokens[name] = { light, dark };
    }
  }
  return tokens;
}

/**
 * The pairs that appear in the interface. A new combination of colors must be
 * added here before it is used, so every pairing is measured.
 */
export const requiredPairs: readonly Pair[] = [
  { foreground: 'ink', background: 'paper', minimum: 4.5, usage: 'body text' },
  { foreground: 'ink', background: 'surface', minimum: 4.5, usage: 'text on surface' },
  { foreground: 'ink-muted', background: 'paper', minimum: 4.5, usage: 'secondary text and notes' },
  {
    foreground: 'ink-muted',
    background: 'surface',
    minimum: 4.5,
    usage: 'secondary text on surface',
  },
  { foreground: 'signal', background: 'paper', minimum: 4.5, usage: 'links' },
  { foreground: 'signal', background: 'surface', minimum: 4.5, usage: 'links on surface' },
  { foreground: 'signal-hover', background: 'paper', minimum: 4.5, usage: 'link hover' },
  {
    foreground: 'signal-hover',
    background: 'surface',
    minimum: 4.5,
    usage: 'link hover on surface',
  },
  { foreground: 'on-signal', background: 'signal', minimum: 4.5, usage: 'button label' },
  {
    foreground: 'on-signal',
    background: 'signal-hover',
    minimum: 4.5,
    usage: 'button label on hover',
  },
  { foreground: 'paper', background: 'ink', minimum: 4.5, usage: 'pressed toggle' },
  { foreground: 'on-field', background: 'field', minimum: 4.5, usage: 'text on the cobalt field' },
  {
    foreground: 'on-field-muted',
    background: 'field',
    minimum: 4.5,
    usage: 'secondary text on the field',
  },
  { foreground: 'field', background: 'on-field', minimum: 4.5, usage: 'primary button on the field' },
  { foreground: 'on-mark', background: 'mark', minimum: 4.5, usage: 'evidence chip' },
  { foreground: 'mark', background: 'field', minimum: 3, usage: 'focus ring on the field' },
  { foreground: 'line-strong', background: 'paper', minimum: 3, usage: 'control borders' },
  { foreground: 'signal', background: 'paper', minimum: 3, usage: 'focus ring' },
];

export function checkPairs(tokens: TokenTable, pairs: readonly Pair[]): PairResult[] {
  const results: PairResult[] = [];
  for (const theme of ['light', 'dark'] as const) {
    for (const pair of pairs) {
      const foreground = tokens[pair.foreground]?.[theme];
      const background = tokens[pair.background]?.[theme];
      if (foreground === undefined || background === undefined) {
        throw new Error(
          `Token --color-${pair.foreground} or --color-${pair.background} is missing from the stylesheet.`,
        );
      }
      const ratio = contrastRatio(foreground, background);
      results.push({ theme, pair, ratio, passes: ratio >= pair.minimum });
    }
  }
  return results;
}
