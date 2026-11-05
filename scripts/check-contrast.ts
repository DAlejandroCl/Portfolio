import { readFileSync } from 'node:fs';
import { checkPairs, parseTokens, requiredPairs } from './lib/contrast.ts';

const stylesheet = new URL('../src/styles/global.css', import.meta.url);
const results = checkPairs(parseTokens(readFileSync(stylesheet, 'utf8')), requiredPairs);

for (const { theme, pair, ratio, passes } of results) {
  const status = passes ? 'PASS' : 'FAIL';
  console.log(
    `${status}  ${theme.padEnd(5)} ${ratio.toFixed(2).padStart(5)} (min ${pair.minimum})  ${pair.foreground} on ${pair.background}  [${pair.usage}]`,
  );
}

const failures = results.filter((result) => !result.passes);
if (failures.length > 0) {
  console.error(`\n${failures.length} color pair(s) below the required contrast ratio.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${results.length} color pairs meet their minimum contrast ratio.`);
}
