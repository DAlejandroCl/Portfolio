# Deployment (Vercel)

The site is static: `pnpm build` writes `dist/`, and Vercel serves it.

## Before the first deploy: merge into `main`

The code lives in stacked phase branches and `main` holds only the README and the project brief. Vercel deploys the production branch, so deploying `main` now would publish no site. Open one pull request from the latest branch (`docs/audit-documentation` today; it contains every earlier branch and `main`), let CI run on it and merge it. This is also the first time the workflow in `.github/workflows/ci.yml` runs on GitHub.

## First deploy

1. In Vercel, choose **Add New → Project** and import `DAlejandroCl/Portfolio`. The settings come from `vercel.json`.
2. Under **Environment Variables**, add `SITE_URL` for the Production environment. Use the origin without a trailing path, for example `https://devacl.com`.
3. Deploy. Production is the `main` branch; every other branch gets a preview URL.

`SITE_URL` feeds the canonical links, hreflang, the sitemap, `robots.txt`, the social image URL and the structured data. If it is wrong, those point at the wrong place, so set it before the first public deploy and again if the domain changes.

## Domain

- **Custom domain** (`devacl.com`): buy or confirm it at a registrar, then in the project go to **Settings → Domains**, add it and follow the DNS records Vercel shows. Use the same value in `SITE_URL`.
- **Default domain** (`<project>.vercel.app`): works at once, with no purchase. Use that URL as `SITE_URL` until the custom domain is ready, then change `SITE_URL` and redeploy.

## After deploying

- Open `/robots.txt` and `/sitemap-index.xml` and check that the origin is the real one.
- Check the page in the Rich Results Test and a social-card preview.
- Open both CV links (`/cv/...pdf`) on the live site.
