import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  checkPairs,
  contrastRatio,
  parseTokens,
  relativeLuminance,
  requiredPairs,
} from '../../scripts/lib/contrast';

describe('contrastRatio', () => {
  it('is 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('is 1 for the same color', () => {
    expect(contrastRatio('#3a33d1', '#3a33d1')).toBeCloseTo(1, 5);
  });

  it('does not depend on the order of the colors', () => {
    expect(contrastRatio('#1b2233', '#f3f4f1')).toBeCloseTo(
      contrastRatio('#f3f4f1', '#1b2233'),
      10,
    );
  });

  it('matches the published value for #777777 on white', () => {
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
  });

  it('treats #rgb and #rrggbb alike', () => {
    expect(relativeLuminance('#fff')).toBe(relativeLuminance('#ffffff'));
  });

  it('rejects colors it cannot measure', () => {
    expect(() => relativeLuminance('red')).toThrow('Unsupported color');
    expect(() => relativeLuminance('#12345678')).toThrow('Unsupported color');
  });
});

describe('parseTokens', () => {
  it('reads light-dark pairs and ignores commented-out tokens', () => {
    const css = `
      /* --color-old: light-dark(#000000, #ffffff); */
      @theme { --color-paper: light-dark(#f3f4f1, #0f1420); }
    `;
    expect(parseTokens(css)).toEqual({ paper: { light: '#f3f4f1', dark: '#0f1420' } });
  });
});

describe('design tokens in src/styles/global.css', () => {
  // Vitest runs from the project root; import.meta.url is not a file URL under happy-dom.
  const css = readFileSync(join(process.cwd(), 'src/styles/global.css'), 'utf8');
  const tokens = parseTokens(css);

  it('meets the minimum contrast ratio for every declared pair in both themes', () => {
    const failures = checkPairs(tokens, requiredPairs).filter((result) => !result.passes);
    expect(failures.map((f) => `${f.theme}: ${f.pair.foreground} on ${f.pair.background}`)).toEqual(
      [],
    );
  });

  it('detects a pair that falls below its minimum', () => {
    const weakened = { ...tokens, 'ink-muted': { light: '#a0a0a0', dark: '#2a2a2a' } };
    const failures = checkPairs(weakened, requiredPairs).filter((result) => !result.passes);
    expect(failures.length).toBeGreaterThan(0);
  });

  it('fails loudly when a token is missing', () => {
    expect(() => checkPairs({}, requiredPairs)).toThrow('missing from the stylesheet');
  });
});
