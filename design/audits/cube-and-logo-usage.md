---
title: Design review of src
slug: cube-and-logo-usage
panel: [don-norman-designer, jared-spool-designer, dieter-rams-designer]
created: 2026-07-31
target: src
target_lines: 1395
---

# Design review: src

## Per-persona verdicts

### Don Norman

**Verdict:** The three-front proposition is understandable, but the hero gives its two selection methods conflicting rules.

**Marked passages:**

- `selectFront()` beside the scroll timeline’s `setProgress()` — ~~two independent cube controllers~~ [→ make direct selection seek the same playhead, or remove the pinned scroll controller].
- `role="radiogroup"` with button radios — ~~radio semantics without roving tabindex or arrow-key handling~~ [→ implement the radio pattern or use labelled buttons].
- `Toque para explorar cada frente` — ~~touch-only instruction~~ [→ “Escolha uma frente para explorar”].
- The cube’s texture-loading error callback — ~~silent asset/context failure~~ [→ present the existing three-front fallback if WebGL or its textures fail].
- The hero’s empty-alt mark plus wordmarked header/footer — [→ retain this semantic split when using the supplied SVGs; the mark is decorative in the hero and the wordmark identifies the site].

**Hand-off:** Test whether an operations lead can choose a front, explain its outcome, and contact Hawks BI without relying on scroll.

### Jared Spool

**Verdict:** The interaction and identity are memorable, but prospective clients see capability claims before concrete proof of relevance.

**Marked passages:**

- `orange-hawks-bi-*.png` — ~~raster identity files~~ [→ supplied `hawks-bi-mark.svg` for the compact hero mark and `hawks-bi-wordmark.svg` for the header/footer].
- `cube3-01.webp` through `cube3-27.webp` — [→ treat them as the materials of one 27-cell cube, not 27 service choices].
- The three `addLabeledFace()` calls — [→ expose Dados, Inteligência, and Automação as the understandable cube choices].
- The broad hero capability statement — ~~claim alone~~ [→ add a short verified result or case signal to each front in a subsequent content pass].
- `Discutir escopo` — ~~generic handoff~~ [→ consider a service-specific contact prompt].

**Hand-off:** Run short moderated sessions with operations and technology decision-makers before adding further cube motion.

### Dieter Rams

**Verdict:** The editorial base is disciplined, yet the current hero cube combines unrelated visual languages where one brand-colour object would be stronger.

**Marked passages:**

- `makeCellMaterial()` loading the 27 WebPs — ~~photographic texture variety as the default~~ [→ retain 3×3×3 geometry but consider restrained near-black materials with the three brand-derived accents].
- Textured cells, full-face labels, and wireframe — ~~three competing explanatory layers~~ [→ keep the cube quiet and let the external readout name the selected front].
- The old PNG exports — ~~raster lockups~~ [→ use the provided scalable mark and wordmark at their natural proportions].
- The clipped, rounded hero mark container — ~~arbitrary app-icon treatment~~ [→ use the whole mark as a small, square, neutral stamp].
- The supplied wordmark’s 2.83:1 viewBox inside former 4:1 frames — ~~mismatched sizing~~ [→ size the header/footer artwork to its actual aspect ratio].

**Hand-off:** A brand-identity review can assess a future move to a material-only cube; do not introduce decorative cube variants first.

## Where they agree

1. The supplied SVG wordmark and mark have distinct, correct roles: wordmark for primary identification and mark for compact decoration.
2. The three named orientations are the usable cube choices. The 27 WebPs do not represent separate components or offers.
3. The cube should communicate the three-front system rather than become extra visual decoration.

## Where they disagree

Rams recommends removing the photographic WebP materials from the default hero cube, while Norman and Spool prioritize keeping the current interaction understandable and validating it with users first. Both paths require the selected front and readout to remain synchronized.

## Highest-leverage change

Make the cube a single brand-led object: preserve its 3×3×3 geometry and Dados / Inteligência / Automação orientations, but stop treating the 27 texture files as cube variants. Pair that clarification with the supplied SVG identity system.

## Suggested next step

Implement a restrained brand-material cube after validating the three-front selection path with real users.
