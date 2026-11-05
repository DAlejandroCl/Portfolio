/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig reuses the Astro config (React, Tailwind, path aliases), so
// components are compiled in tests exactly as they are in the build.
export default getViteConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/setup.ts'],
  },
});
