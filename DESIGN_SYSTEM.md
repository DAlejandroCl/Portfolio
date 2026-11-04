# DESIGN_SYSTEM — Engineering Portfolio

Phase 2 deliverable. Status: draft for owner review. The owner approved the "margin notes" direction and delegated the visual decisions. Every choice below states its reason, as required by the master context.

## 1. Design intent

**One memorable idea: every technical claim carries its source in the margin.** A metric, a stack statement or a status label is accompanied by a short note saying where it comes from (a report, a commit, the CV) and when it was checked. This is the product's differentiator and the visual signature of the site. Everything else stays quiet so the notes read as the point.

Reasons this fits the brief:

- The site's job is to be believed. Sourced claims make honesty visible instead of asserted.
- It turns the content rule "never invent metrics" into an interface element that the build enforces (`evidence` schema, see `PRODUCT_REQUIREMENTS.md` 5.4).
- It gives an editorial feel (sidenotes, a measured text column) without ornament, matching "editorial, minimal, technically sophisticated, human".

### Defaults deliberately avoided

| Default | Why it is avoided here |
|---|---|
| Warm cream background with high-contrast serif and a clay accent | Reads as a template; the palette here is cool and neutral |
| Near-black page with one neon accent | Same reason, and neon hurts long-form reading |
| Identical rounded cards with the same soft shadow | Projects are ruled rows whose size reflects importance; no card chrome |
| Small all-caps label above every heading | Adds no information; headings stand alone |
| Numbered sections (01, 02, 03) | The sections are not a sequence |
| Monospace for small labels | Monospace is reserved for real code |
| Hero with a big number and stat tiles | The hero opens with the engineer's name and a real screenshot |
| Gradient washes, glass, animated backgrounds, fake terminals | Explicitly excluded by the brief |

## 2. Color tokens

Neutral, cool-leaning palette plus one accent. The accent is used **only** for interactive elements and the keyboard focus ring, so seeing it always means "you can act here". Status is never conveyed by color (shape and text carry it).

| Token | Light | Dark | Role |
|---|---|---|---|
| `--color-paper` | `#F3F4F1` | `#0F1420` | Page background |
| `--color-surface` | `#E9EBE6` | `#161C2B` | Sunken areas (screenshot frames, code) |
| `--color-ink` | `#1B2233` | `#E8EAF0` | Primary text |
| `--color-ink-muted` | `#4B5363` | `#A6ADBD` | Secondary text and margin notes |
| `--color-line` | `#D6D9DF` | `#2A3245` | Decorative rules between sections and rows |
| `--color-line-strong` | `#7B8393` | `#6C7589` | Borders of controls |
| `--color-signal` | `#3A33D1` | `#A5A0FF` | Links, buttons, focus ring |
| `--color-signal-hover` | `#2B25B0` | `#C2BEFF` | Hover state of signal |
| `--color-on-signal` | `#FFFFFF` | `#0F1420` | Text on a signal-filled button |

Rationale: a slightly green-grey light paper avoids the cream cliché and sits well next to the orange and blue of the Cocktail Lab screenshots, which carry the color on the page. Ink is a deep blue-slate, not pure black, to reduce harshness against the paper. The accent is an ultramarine violet that is distinct from the orange and blue of the featured apps.

### Contrast, measured 2026-11-03 with a script (WCAG relative luminance formula)

| Pair | Minimum | Light | Dark |
|---|---|---|---|
| ink on paper | 4.5 | 14.38 | 15.30 |
| ink on surface | 4.5 | 13.22 | 14.14 |
| ink-muted on paper | 4.5 | 7.00 | 8.18 |
| ink-muted on surface | 4.5 | 6.44 | 7.56 |
| signal on paper (links) | 4.5 | 7.39 | 7.95 |
| signal on surface | 4.5 | 6.79 | 7.35 |
| signal-hover on paper | 4.5 | 9.54 | 10.61 |
| on-signal on signal (button label) | 4.5 | 8.16 | 7.95 |
| line-strong on paper (control borders) | 3.0 | 3.45 | 3.98 |
| signal on paper (focus ring) | 3.0 | 7.39 | 7.95 |

All pairs pass. `--color-line` is decorative (it separates content and does not identify a control), so it is exempt from the 3:1 rule. The script moves to `scripts/check-contrast.mjs` in Phase 3 and runs in CI (acceptance criterion AC-05); a token change that fails a pair breaks the build.

## 3. Typography

Two clearly different families, both open-licensed (SIL Open Font License; confirm when installing), self-hosted to avoid third-party requests.

| Role | Family | Use |
|---|---|---|
| Display and interface | Archivo (variable: weight and width axes) | Name, headings, navigation, buttons, numbers (tabular figures) |
| Reading | Source Serif 4 (variable) | Body text, case-study prose |

Rationale: Archivo's width axis gives the headline personality without decoration and powers the single motion moment (section 7). Source Serif 4 is a text serif designed for long reading at screen sizes. Serif body gets a larger line height than a sans would.

| Token | Value | Notes |
|---|---|---|
| `--font-display` | `"Archivo Variable", system-ui, sans-serif` | |
| `--font-text` | `"Source Serif 4 Variable", Georgia, serif` | |
| `--text-note` | `0.875rem` / 1.5 | Margin notes, captions |
| `--text-body` | `1.125rem` / 1.65 | Body, 18 px at the default root size |
| `--text-lede` | `1.375rem` / 1.5 | Introductory paragraphs |
| `--text-h3` | `1.5rem` / 1.3, weight 650 | |
| `--text-h2` | `clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)` / 1.15, weight 650 | |
| `--text-h1` | `clamp(2.75rem, 1.5rem + 5vw, 5.5rem)` / 1.05, weight 700, letter-spacing -0.02em | Hero name only |
| Measure | `max-width: 68ch` for prose | Under 80 characters |

Rules: sentence case everywhere, no uppercase transforms, no tracked-out labels. Interface labels use Archivo semibold at `0.9375rem`. Monospace appears only inside real code. Fonts are subset to the Latin ranges that cover English and Spanish (including á, é, í, ó, ú, ñ, ¿, ¡), loaded with `font-display: swap`, and the display font used above the fold is preloaded.

Install check for Phase 3: confirm that the chosen package exposes Archivo's width axis. If it does not, the hero motion is dropped and the headline uses a fixed width; nothing else depends on it.

## 4. Space, borders, radius, shadows, breakpoints

| Group | Tokens |
|---|---|
| Spacing (4 px base) | `0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8` rem as `--space-1 … --space-10` |
| Section rhythm | `--space-section: clamp(4rem, 3rem + 5vw, 8rem)` |
| Gutter | `1rem` on mobile, `2rem` from `md` |
| Borders | `--border-rule: 1px solid var(--color-line)`; `--border-control: 1px solid var(--color-line-strong)` |
| Radius | `--radius-control: 2px` (buttons, inputs); `--radius-media: 6px` (screenshot frames). Rules and rows have no radius. Two values on purpose: radius follows the role of the element, not a global style |
| Shadows | None on content. `--shadow-popover` is reserved for a future menu; focus never uses a shadow |
| Breakpoints | `sm 40rem`, `md 48rem`, `lg 64rem`, `xl 80rem` (content max width 80rem) |

Tailwind CSS 4 is configured CSS-first: these tokens live in `@theme` in `src/styles/global.css`; there is no `tailwind.config` file. Dark mode uses a `data-theme` attribute on `<html>`, with the system preference as the default.

## 5. Layout

Left-aligned throughout. Twelve-column grid at `lg` and above.

- **Prose pages (case studies):** main text in columns 1–7, **margin column** in columns 9–12 for notes. Each note sits level with the claim it supports.
- **Home:** sections alternate between full-width content (project rows, expertise) and the prose-plus-notes layout (About, Publication).
- **Below `lg`:** one column. Margin notes appear directly under the paragraph they belong to, set in the secondary text color with a left rule, never hidden.

DOM order puts each note immediately after its claim, so screen-reader and no-CSS reading order are natural; the grid only moves notes sideways visually.

### Home, desktop (wireframe)

```
+------------------------------------------------------------------+
| Skip to content                                                  |
| Diego A. Clavijo        Projects  About  Contact     EN | ES  (o)|
+------------------------------------------------------------------+
|                                                                  |
|  Diego Alejandro                                                 |
|  Clavijo Ladino                                                  |
|                                                                  |
|  Frontend Software Engineer. Building maintainable, accessible   |
|  and reliable web applications through thoughtful engineering.   |
|                                                                  |
|  [ View projects ]  Download CV                                  |
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
|  Engineering focus   ...   Technical expertise   ...             |
|  About (prose + notes)     Publication (prose + notes)           |
|  Contact                                                         |
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

| Component | Behavior and specification |
|---|---|
| `SkipLink` | First focusable element; visible on focus; jumps to `<main>` |
| `SiteHeader` / `Nav` | Landmark `nav` with `aria-label`; current page marked with `aria-current`; at small widths the links collapse into a native `details` disclosure with a text label, which works with a keyboard and without JavaScript |
| `LanguageSwitch` | A plain link to the equivalent page, with `hreflang` and `lang`, not a script |
| `ThemeToggle` | Button with `aria-pressed`. Implemented with a small inline script, not a hydrated React component, so a toggle does not pull the React runtime into every page. A second inline script in `<head>` sets the theme before first paint to avoid a flash; the choice is stored |
| `Hero` | Name in `--text-h1`, statement in `--text-lede`, two actions, one screenshot with its margin note |
| `MarginNote` | Paragraph with a left rule. Three lines: status word (Verified, Target or Stated), the claim's source as a link, the date. No icons. Status is text, never color |
| `Figure` | Screenshot in `--radius-media` on `--color-surface`, explicit width and height, meaningful `alt`, optional note |
| `ProjectRow` | Ruled row; one link on the title (the whole row becomes clickable through a stretched pseudo-element); hover underlines the title and offsets it, no elevation. Sizes: featured, standard, compact |
| `StatusMarker` | Shape plus text: filled square (Production or Implemented), half-filled square (In progress), outline square (Planned). SVG is `aria-hidden`; the word is always visible |
| `StackList` | Plain comma-separated list; React and TypeScript first and set in the heavier weight, supporting technologies in regular weight. No pill chips |
| `SectionHeading` | `h2` with the section's rule above it; no label, no number |
| `Button` | Primary (signal fill, `--color-on-signal` label) and secondary (text link with underline); minimum target 44 by 44 px; label is a verb ("View projects", "Download CV") |
| `ExternalLink` | Underlined, `rel="noopener noreferrer"`, accessible name includes the destination; opens in the same tab unless the owner decides otherwise |
| `Table` | Real `<table>` with `<caption>` and header cells, used for the testing layers and stack tables |
| `Footer` | Landmark `contentinfo` |

Copy rules inside components: sentence case; one job per piece of text; the same action keeps the same name everywhere; the 404 and the JavaScript-off states say what happened and what to do next ("This page does not exist. Go to the home page.").

## 7. Motion

Non-user-triggered motion is limited to **one moment**: on first load, the width axis of the hero name eases from condensed to its final width over about 700 ms, once. It is CSS-only and is disabled under `prefers-reduced-motion`. Everything else is static; user-triggered feedback (hover underline offset, disclosure opening) lasts 120–200 ms.

| Token | Value |
|---|---|
| `--duration-fast` | `120ms` |
| `--duration-base` | `200ms` |
| `--duration-hero` | `700ms` |
| `--ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` |

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

| Asset | Source | Status |
|---|---|---|
| Screenshots of Cocktail Lab, Streamline, Weather Finder, Calorie Tracker | Live demos or local builds, captured at one consistent width, WebP or AVIF with fallback | Not yet captured |
| Favicon and social image | Generated from the name set in Archivo | To design in Phase 4 |
| CV files in Spanish and English | Owner (Spanish received; English pending) | English missing |

## 10. Design QA checklist (used in Phase 7)

- Every text and UI color pair passes the contrast script in both themes.
- Nothing relies on color alone, including status and links.
- Layout holds at 320, 375, 768, 1024 and 1440 px.
- No horizontal scroll at any width; no content hidden on mobile that is visible on desktop.
- The margin note is present next to every metric on every page and language.
- The hero motion is absent with reduced motion enabled.
- Spanish strings fit the layout (they run longer than English).

## 11. Mapping to code (Phase 3)

`src/styles/global.css` holds the tokens in `@theme` and the dark-theme overrides; `src/components/ui/` the primitives; `src/components/projects/` the rows and markers; `src/components/shared/` the margin note and figure. Pages, layouts and content live in Astro files; components are TSX files; a client directive is added only when interaction justifies hydration.
