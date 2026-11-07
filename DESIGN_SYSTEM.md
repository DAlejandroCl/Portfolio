# DESIGN_SYSTEM — Engineering Portfolio

Phase 2 deliverable, approved by the owner on 2026-11-03 and amended during implementation (section 12 lists what changed). The owner approved the "margin notes" direction and delegated the visual decisions. Every choice below states its reason, as required by the master context.

## 1. Design intent

**One memorable idea: every technical claim carries its source in the margin.** A metric, a stack statement or a status label is accompanied by a short note saying where it comes from (a report, a commit, the CV) and when it was checked. This is the product's differentiator and the visual signature of the site. Everything else stays quiet so the notes read as the point.

Reasons this fits the brief:

- The site's job is to be believed. Sourced claims make honesty visible instead of asserted.
- It turns the content rule "never invent metrics" into an interface element that the build enforces (`evidence` schema, see `PRODUCT_REQUIREMENTS.md` 5.4).
- It gives an editorial feel (sidenotes, a measured text column) without ornament, matching "editorial, minimal, technically sophisticated, human".

### Defaults deliberately avoided

| Default                                                          | Why it is avoided here                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Warm cream background with high-contrast serif and a clay accent | Reads as a template; the palette here is cool and neutral              |
| Near-black page with one neon accent                             | Same reason, and neon hurts long-form reading                          |
| Identical rounded cards with the same soft shadow                | Projects are ruled rows whose size reflects importance; no card chrome |
| Small all-caps label above every heading                         | Adds no information; headings stand alone                              |
| Numbered sections (01, 02, 03)                                   | The sections are not a sequence                                        |
| Monospace for small labels                                       | Monospace is reserved for real code                                    |
| Hero with a big number and stat tiles                            | The hero opens with the engineer's name and a real screenshot          |
| Gradient washes, glass, animated backgrounds, fake terminals     | Explicitly excluded by the brief                                       |

## 2. Color tokens

Cool, blue-leaning neutrals plus one cobalt. Cobalt appears in three roles, and each role has its own token so the meaning stays readable:

- **`signal`**: interactive elements (links, buttons, toggles) and the keyboard focus ring. Seeing it means "you can act here".
- **`field`**: large panels filled with cobalt (the hero and the closing contact panel). Text on a field uses `on-field`; the focus ring on a field switches to `mark`.
- **`mark`**: a yellow highlighter used **only** for evidence chips ("this claim has a source"), including the coverage caption on the hero image. It never means anything else.

Status is never conveyed by color (shape and text carry it).

| Token                    | Light     | Dark      | Role                                          |
| ------------------------ | --------- | --------- | --------------------------------------------- |
| `--color-paper`          | `#F7F8FC` | `#090D1C` | Page background                               |
| `--color-surface`        | `#EBEEF8` | `#111733` | Cards and sunken areas                        |
| `--color-ink`            | `#0D1230` | `#ECEEFA` | Primary text                                  |
| `--color-ink-muted`      | `#4A5272` | `#A8B0D0` | Secondary text and notes                      |
| `--color-line`           | `#D9DDEC` | `#242B4D` | Decorative rules and panel borders            |
| `--color-line-strong`    | `#6F7899` | `#6A7396` | Borders of controls                           |
| `--color-signal`         | `#2A35E6` | `#98A0FF` | Links, buttons, focus ring                    |
| `--color-signal-hover`   | `#1E27B8` | `#BCC1FF` | Hover state of signal                         |
| `--color-on-signal`      | `#FFFFFF` | `#090D1C` | Text on a signal-filled button                |
| `--color-field`          | `#2A35E6` | `#161D58` | Cobalt panels (hero, contact)                 |
| `--color-on-field`       | `#FFFFFF` | `#FFFFFF` | Text on a field                               |
| `--color-on-field-muted` | `#DCDFFF` | `#C9CEFA` | Secondary text on a field                     |
| `--color-mark`           | `#FFE27A` | `#FFE27A` | Evidence chip background, focus ring on field |
| `--color-on-mark`        | `#0D1230` | `#0D1230` | Text on the evidence chip                     |

Rationale: the earlier grey-green and violet palette read as dated. The new one keeps one hue family (cobalt) so the page feels like one object, makes the hero and the closing contact block the two loud moments, and spends the yellow only where the page's main promise (every number has a source) is visible.

### Contrast, measured 2026-11-06 with `pnpm check:contrast` (WCAG relative luminance formula)

The script parses every `light-dark()` token and fails the build if a listed pair drops below its minimum. 36 pairs pass.

| Pair                                    | Minimum | Light | Dark  |
| --------------------------------------- | ------- | ----- | ----- |
| ink on paper                            | 4.5     | 17.26 | 16.74 |
| ink on surface                          | 4.5     | 15.81 | 15.22 |
| ink-muted on paper                      | 4.5     | 7.22  | 9.01  |
| ink-muted on surface                    | 4.5     | 6.61  | 8.19  |
| signal on paper (links)                 | 4.5     | 7.19  | 8.11  |
| signal on surface                       | 4.5     | 6.59  | 7.38  |
| signal-hover on paper                   | 4.5     | 9.71  | 11.24 |
| on-signal on signal (button label)      | 4.5     | 7.64  | 8.11  |
| on-field on field                       | 4.5     | 7.64  | 15.55 |
| on-field-muted on field                 | 4.5     | 5.83  | 10.14 |
| field on on-field (button on the field) | 4.5     | 7.64  | 15.55 |
| on-mark on mark (evidence chip)         | 4.5     | 14.32 | 14.32 |
| line-strong on paper (control borders)  | 3.0     | 4.10  | 4.15  |
| signal on paper (focus ring)            | 3.0     | 7.19  | 8.11  |
| mark on field (focus ring on a field)   | 3.0     | 5.97  | 12.15 |

## 4. Space, borders, radius, shadows, breakpoints

| Group               | Tokens                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spacing (4 px base) | Tailwind's default 4 px scale through its utilities; the only custom token is `--space-section`                                                                                             |
| Section rhythm      | `--space-section: clamp(4rem, 3rem + 5vw, 8rem)`                                                                                                                                            |
| Gutter              | `1rem` on mobile, `2rem` from `md`                                                                                                                                                          |
| Borders             | 1px rules in `line` (`border-line`) and 1px control borders in `line-strong` (`border-line-strong`), as utilities                                                                           |
| Radius              | `--radius-control: 8px` (buttons, inputs); `--radius-media: 12px` (screenshots, menu); `--radius-panel: 24px` (hero, project panels, contact panel). Radius follows the role of the element |
| Shadows             | None. No shadow token exists; focus never uses a shadow                                                                                                                                     |
| Breakpoints         | `sm 40rem`, `md 48rem`, `lg 64rem`, `xl 80rem` (content max width 80rem)                                                                                                                    |

Tailwind CSS 4 is configured CSS-first: these tokens live in `@theme` in `src/styles/global.css`; there is no `tailwind.config` file. Dark mode uses a `data-theme` attribute on `<html>`, with the system preference as the default.

## 5. Layout

Left-aligned throughout. Twelve-column grid at `lg` and above.

- **Prose pages (case studies):** main text in columns 1–7, **margin column** in columns 9–12 for notes. Each note sits level with the claim it supports.
- **Home:** from `lg`, each section is a 12-column grid with a sticky heading in columns 1–3 and the content in columns 4–12. Projects is the exception (`wide`): full width, a bento of panels, with Cocktail Lab across the whole row and the other three in equal columns below.
- **Motion:** one moment on purpose (the hero name widening on load) plus a slow scale on project screenshots on hover, both under `prefers-reduced-motion: no-preference`. Page changes use the CSS-only `@view-transition { navigation: auto; }`, so no script is added.
- **Below `lg`:** one column. Margin notes appear directly under the paragraph they belong to, set in the secondary text color with a left rule, never hidden.

DOM order puts each note immediately after its claim, so screen-reader and no-CSS reading order are natural; the grid only moves notes sideways visually.

### Home, desktop (wireframe)

```
+------------------------------------------------------------------+
| Skip to content                                                  |
| Diego A. Clavijo        Projects  About  Contact     EN | ES  (o)|
+------------------------------------------------------------------+
|                                                                  |
|  (cobalt field panel)   Diego Alejandro                          |
|  Clavijo Ladino                                                  |
|                                                                  |
|  Frontend Software Engineer. Building maintainable, accessible   |
|  and reliable web applications through thoughtful engineering.   |
|                                                                  |
|  [ Contact me ] [ View projects ] Download CV (PDF)  Works with: |
|                                                                  |
|  +-----------------------------------+  Coverage                 |
|  |   Cocktail Lab screenshot         |  89.42% of lines, measured|
|  |                                   |  2026-11-03               |
|  +-----------------------------------+  Source: coverage report  |
+------------------------------------------------------------------+
|  Projects                                                        |
|  ---------------------------------------------------------------- |
|  Cocktail Lab                         [filled] Production        |
|  Multi-page recipe app with an AI     React, TypeScript, Zustand |
|  recipe generator...                                             |
|  +-------------------------------------------+                   |
|  |            screenshot                      |                  |
|  +-------------------------------------------+                   |
|  ---------------------------------------------------------------- |
|  Streamline Inventory                 [half] In active development|
|  ---------------------------------------------------------------- |
|  Weather Finder            Calorie Tracker   (compact rows)      |
+------------------------------------------------------------------+
|  About (summary, how I work, languages) + Engineering focus      |
|  Experience (+ Education)   Academic publication   Certifications|
|  Technical expertise                                             |
|  [ cobalt panel ] Contact: Email, LinkedIn, GitHub, CV           |
+------------------------------------------------------------------+
|  Footer: copyright, EN | ES, repositories, source of this site    |
+------------------------------------------------------------------+
```

### Case study, desktop (wireframe)

```
|  Cocktail Lab                                   [filled] Production|
|  Lede paragraph (serif, larger)                                   |
|                                                                   |
|  Testing strategy                                                 |
|  Prose in columns 1-7 ................   | Status: Verified       |
|  .....................................   | Source: coverage       |
|  .....................................   | report, 2026-11-03     |
|                                           |                       |
|  Table of test layers (real <table>)      | Status: Stated         |
|                                           | Source: README         |
```

### Mobile (wireframe)

```
| Diego A. Clavijo   Menu |
| Diego Alejandro         |
| Clavijo Ladino          |
| Frontend Software ...   |
| [View projects]         |
| +---------------------+ |
| |  screenshot         | |
| +---------------------+ |
| | Coverage 89.42% of  | |
| | lines, measured ... | |
| | Source: ...         | |
```

## 6. Components

All components have visible focus, hover and disabled states where applicable. Components are written in React and TypeScript and rendered to static HTML at build time by Astro, so they ship no JavaScript. Only a component given a client directive hydrates; none is planned at launch, and one would be added only when interaction justifies loading the React runtime.

| Component            | Behavior and specification                                                                                                                                                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SkipLink`           | First focusable element; visible on focus; jumps to `<main>`                                                                                                                                                                                                                 |
| `SiteHeader` / `Nav` | Landmark `nav` with `aria-label`; current page marked with `aria-current`; at small widths the links collapse into a native `details` disclosure with a text label, which works with a keyboard and without JavaScript                                                       |
| `LanguageSwitch`     | A plain link to the equivalent page, with `hreflang` and `lang`, not a script                                                                                                                                                                                                |
| `ThemeToggle`        | Button with `aria-pressed`. Implemented with a small inline script, not a hydrated React component, so a toggle does not pull the React runtime into every page. A second inline script in `<head>` sets the theme before first paint to avoid a flash; the choice is stored |
| `Hero`               | Name in `--text-h1`, statement in `--text-lede`, two actions (View projects as a button, Download CV as a text link), one screenshot with its margin note                                                                                                                    |
| `MarginNote`         | Paragraph with a left rule. Three lines: status word (Verified, Target or Stated), the claim's source as a link, the date. No icons. Status is text, never color                                                                                                             |
| `Figure`             | Screenshot in `--radius-media` on `--color-surface`, explicit width and height, meaningful `alt`, optional note                                                                                                                                                              |
| `ProjectRow`         | Ruled row; one link on the title (the whole row becomes clickable through a stretched pseudo-element); hover underlines the title and offsets it, no elevation. Sizes: featured, standard, compact                                                                           |
| `StatusMarker`       | Shape plus text: filled square (Production or Implemented), half-filled square (In progress), outline square (Planned). SVG is `aria-hidden`; the word is always visible                                                                                                     |
| `StackList`          | Plain comma-separated list; React and TypeScript first and set in the heavier weight, supporting technologies in regular weight. No pill chips                                                                                                                               |
| `SectionHeading`     | `h2` with the section's rule above it; no label, no number                                                                                                                                                                                                                   |
| `Button`             | Primary (signal fill, `--color-on-signal` label) and secondary (text link with underline); minimum target 44 by 44 px; label is a verb ("View projects", "Download CV")                                                                                                      |
| `ExternalLink`       | Underlined, `rel="noopener noreferrer"`, accessible name includes the destination; opens in the same tab unless the owner decides otherwise                                                                                                                                  |
| `Table`              | Real `<table>` with `<caption>` and header cells, used for the testing layers and stack tables                                                                                                                                                                               |
| `Footer`             | Landmark `contentinfo`                                                                                                                                                                                                                                                       |

Differences in the build: there is no separate `Figure`, `ExternalLink` or `Table` component. Screenshots are an Astro `Image` inside a `figure` (hero and case-study header), external links are plain anchors with `rel="noopener noreferrer"`, and no table has been needed yet. The case-study pages add `CaseStudySection`, `FeatureList` and `ProjectList`, and `Footer` is `SiteFooter`.

Copy rules inside components: sentence case; one job per piece of text; the same action keeps the same name everywhere; the 404 and the JavaScript-off states say what happened and what to do next ("This page does not exist. Go to the home page.").

## 7. Motion

Non-user-triggered motion is limited to **one moment**: on first load, the width axis of the hero name eases from condensed to its final width over about 700 ms, once. It is CSS-only and is disabled under `prefers-reduced-motion`. Everything else is static; user-triggered feedback (hover underline offset, disclosure opening) lasts 120–200 ms.

| Token             | Value                            |
| ----------------- | -------------------------------- |
| `--duration-fast` | `120ms`                          |
| `--duration-base` | `200ms`                          |
| `--duration-hero` | `700ms`                          |
| `--ease-out`      | `cubic-bezier(0.2, 0.7, 0.2, 1)` |

Risk and guard: changing glyph widths could cause layout shift or delay the largest paint. The name sits in a block with fixed dimensions so nothing around it moves, and the hero screenshot is the preloaded LCP candidate. If lab measurement shows CLS above 0.1 or an LCP regression (acceptance criterion AC-07), the animation is removed; the design does not depend on it.

## 8. Accessibility specification

- Focus: `outline: 2px solid var(--color-signal)` with `outline-offset: 3px`, never removed; contrast measured above (7.39 light, 7.95 dark).
- Links inside prose are underlined, not distinguished by color alone.
- Minimum target size 44 by 44 px for buttons, switches and menu controls.
- Heading hierarchy: one `h1` per page, sections `h2`, subsections `h3`, no skipped levels.
- Margin notes are in reading order after their claim; they are not landmarks, so there are no extra `aside` regions to navigate.
- Text scales to 200 percent without horizontal scrolling; layout is verified at 320 px width.
- Reduced motion removes the hero animation and any transition longer than the fast token.
- Automated axe runs are required in both themes and both languages, and a keyboard-only and a screen-reader pass are part of QA.

## 9. Assets needed

Status on 2026-11-06.

| Asset                                                                    | Source                                                            | Status                                                                |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| Screenshots of Cocktail Lab, Streamline, Weather Finder, Calorie Tracker | Landing page of each app, WebP, in `src/assets/screenshots/`      | Captured (landing pages only; no dark-mode or inner-page captures)    |
| Favicon                                                                  | `public/favicon.svg`, a drawn "D" that follows the system theme   | Done (Phase 7)                                                        |
| Social image                                                             | `public/og.png`, name and role in Archivo, generated by `pnpm og` | Done (Phase 7)                                                        |
| CV files in Spanish and English, without the phone number                | Owner                                                             | Done: ATS CVs in English and Spanish in `public/cv/`, no phone number |

## 10. Design QA checklist

- Every text and UI color pair passes the contrast script in both themes.
- Nothing relies on color alone, including status and links.
- Layout holds at 320, 375, 768, 1024 and 1440 px.
- No horizontal scroll at any width; no content hidden on mobile that is visible on desktop.
- The margin note is present next to every metric on every page and language.
- The hero motion is absent with reduced motion enabled.
- Spanish strings fit the layout (they run longer than English).

Status on 2026-11-06: contrast, absence of horizontal scroll at 320, 375, 768, 1024 and 1440 px (`layout.spec.ts`), the hero motion under reduced motion (`motion.spec.ts`) and the margin note beside each metric are checked by tests. Not checked: Spanish string fit by eye, text zoom to 200 percent and the screen-reader pass.

## 11. Mapping to code

`src/styles/global.css` holds the tokens in `@theme` and the theme selectors; `src/components/ui/` the primitives (button, skip link, status marker); `src/components/navigation/` the header, language switch and theme toggle; `src/components/shared/` the margin note, project rows, stack list and case-study pieces; `src/components/sections/` the home sections and the case-study content. Pages, layouts and content live in Astro files; components are TSX files; a client directive is added only when interaction justifies hydration.

## 12. Implementation notes

- **Phase 4 (2026-11-05).**
- **Browser support.** Color tokens use CSS `light-dark()`, which needs Chrome 123, Firefox 120 or Safari 17.5. Older browsers ignore the declaration; the site is not designed for them.
- **Hero animation, measured.** Lab runs on the built site (Chromium, 5 runs each, mobile profile with 4x CPU throttling and slow 4G): CLS 0 on desktop and 0.0016 on mobile, identical with and without the animation; LCP unchanged within noise (about 60 ms desktop, about 630 ms mobile profile, localhost). Acceptance criterion AC-07 is met. Guards in place: the animation is disabled under `prefers-reduced-motion` and below `sm` (40rem), where both name lines always fit and wrapping cannot change, and the Archivo and Source Serif latin files are preloaded to avoid a font-swap shift.
- **Small-screen menu.** The links appear twice in the markup (row on `md` and up, native `details` below), and only one is displayed at a time, so assistive technology never reads them twice. The panel is anchored to the right edge of the header.
- **Theme toggle.** The button is `hidden` until the inline script runs, so without JavaScript the system preference decides and no dead control is shown.
- **Project rows** are text-only in Phase 4; screenshots are used in the hero and will be used in the case study pages.
- **Phase 7 (2026-11-06).** The favicon follows the system theme through a media query inside the SVG, and the social image is a single language-neutral card (name and role) on the light paper color.
