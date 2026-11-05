import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env['CI']);
const baseURL = 'http://127.0.0.1:4321';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    // The other engines run in CI, where their browsers are installed.
    ...(isCI
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
          { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
        ]
      : []),
  ],
  // Serves the production build, so tests run against what will be deployed.
  // --ignore-lock keeps the server in the foreground: Astro 7 otherwise moves
  // `preview` to the background when it detects an AI agent, and Playwright
  // would think the process had exited.
  webServer: {
    command: 'pnpm exec astro preview --host 127.0.0.1 --port 4321 --ignore-lock',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 60_000,
  },
});
