---
title: Design review of typography and SVG identity
slug: typography-and-svg-identity
panel: [don-norman-designer, jared-spool-designer, dieter-rams-designer]
created: 2026-07-31
target: src
target_lines: 1209
---

# Design review: typography and SVG identity

No `CLAUDE.md`, README, brand brief, or user-research artifact is present, so the panel evaluated the implementation and the supplied brand assets only.

## Per-persona verdicts

### Don Norman

**Verdict:** The SVG identity is consistently sourced, but the Bodoni display face and sub-11px utility text weaken quick reading and make navigation and the three-front control harder to parse.

**Marked passages:**

- `h1, h2 { font-family: "Bodoni Moda", Georgia, serif; ... line-height: 0.9; }` — ~~a high-contrast editorial face for an operational message~~ [→ Instrument Sans Variable at 600–650 with a 0.96–1.02 line-height].
- `.nav-links a, .menu-trigger__label { font-size: 0.68rem; letter-spacing: 0.17em; }` — ~~small, widely tracked uppercase navigation~~ [→ minimum `0.75rem` / 12px with `0.10–0.12em` tracking].
- `role="radiogroup"` with each selector `<button role="radio">` — ~~radio semantics without roving focus or Arrow-key navigation~~ [→ ordinary labelled buttons with `aria-pressed`, or the complete radio pattern].
- `src={logoWordmark}` in `Header.tsx` and `Footer.tsx`, plus `src={logoMarkLight}` in `Hero.tsx` — [→ retain: every visible logo resolves through the SVG-only brand map; the hero mark is correctly decorative].

**Hand-off:** Keyboard-test the menu and front selector at 200% zoom after the type change.

### Jared Spool

**Verdict:** The SVG identity is coherent and the type can become visibly more direct, but visitors still need tested evidence that the first-view mechanism maps to their operational problem.

**Marked passages:**

- `h1, h2 { font-family: "Bodoni Moda", Georgia, serif; ... line-height: 0.9; }` — ~~a delicate, compressed editorial voice at every decision point~~ [→ use Instrument Sans at 600–650 for display, body, and Canvas labels].
- `.nav-links a ... font-size: 0.68rem; letter-spacing: 0.17em;` and `.footer-base { font-size: 0.63rem; }` — ~~10–11px widely tracked utility copy~~ [→ raise essential labels to at least `0.75rem` and reduce tracking to about `0.1em`].
- `<span>Data · AI · Automation</span>` — ~~an English taxonomy above Portuguese value copy~~ [→ `Dados · IA · Automação`, keeping the promise scannable].
- `<img src={logoWordmark} alt="HAWKS BI" />` in header and footer, plus `<img src={logoMarkLight} alt="" />` in the hero — [→ retain: all rendered logo placements are supplied SVGs; `logoMark` is simply unused].

**Hand-off:** Test Instrument Sans against the former display face with Brazilian operations and technology decision-makers, measuring first-view comprehension and contact intent.

### Dieter Rams

**Verdict:** The SVG identity is consistently sourced in the UI, but Bodoni’s decorative contrast and the footer’s paper tile make the otherwise spare data/AI system less direct than it should be.

**Marked passages:**

- `font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;` alongside `h1, h2 { font-family: "Bodoni Moda", Georgia, serif; }` — ~~two unrelated type voices~~ [→ use Instrument Sans Variable across body and display, differentiating only through weight and spacing].
- `.cube-readout__detail { ... font-family: "Bodoni Moda", Georgia, serif; ... }` — ~~a second decorative voice inside an information-dense object~~ [→ inherit the restrained sans system].
- `<img src={logoWordmark} alt="HAWKS BI" />` in both `Header.tsx` and `Footer.tsx` — [→ retain: both resolve to `hawks-bi-wordmark.svg`; no raster logo is rendered].
- `.footer-lockup { ... background: var(--paper); }` — ~~a paper plaque used to support a dark-only wordmark~~ [→ retain the SVG but request a dedicated reverse SVG wordmark before removing the contrast field].

**Hand-off:** Document approved weights and light/dark SVG lockups before any future brand-asset expansion.

## Where they agree

1. Replace Bodoni Moda with a sober grotesk: Instrument Sans is clear, concise, and a better fit for the geometric data/AI identity.
2. Essential wayfinding and utility text needs a small increase in size and a reduction in letter spacing to remain readable without becoming verbose.
3. The header wordmark, decorative hero mark, and footer wordmark already use the supplied SVG assets. The two PNG exports are unused and should remain out of future visual placements.

## Where they disagree

The panel agrees about the typography and SVG change, but differs on next priorities: Norman emphasizes complete selector keyboard behavior, Spool calls for tested proof and conversion language, and Rams recommends a dedicated reverse SVG wordmark before simplifying the footer plate.

## Highest-leverage change

Use Instrument Sans across the interface, with 600–650 display weights and readable 12px-plus utility labels, while preserving the existing SVG-only wordmark and hero-mark routes.

## Suggested next step

Implement the change, then run a quick zoom and keyboard pass on the navigation and front selector.
