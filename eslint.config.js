// @ts-check
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import jsxA11yX from 'eslint-plugin-jsx-a11y-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores([
    'dist/',
    '.astro/',
    'node_modules/',
    'coverage/',
    'playwright-report/',
    'test-results/',
  ]),
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // `any` needs a documented reason; there is no escape hatch by default.
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    extends: [jsxA11yX.configs.recommended],
  },
  astro.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
);
