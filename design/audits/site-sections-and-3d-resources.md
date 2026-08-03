---
title: Design review of site sections and 3D resources
slug: site-sections-and-3d-resources
panel: [don-norman-designer, jared-spool-designer, dieter-rams-designer]
created: 2026-07-31
target: src
target_lines: 1209
---

# Design review: site sections and 3D resources

## Per-persona verdicts

### Don Norman

**Verdict:** The reverse hero mark fixes the contrast issue, but the cube still asks visitors to reconcile scroll, selection, idle rotation, and incomplete radio semantics.

**Marked passages:**

- `selectFront()` beside ScrollTrigger’s `setProgress()` — ~~two controller models~~ [→ one timeline/playhead with named Dados, Inteligência, and Automação stops].
- `role="radiogroup"` and `role="radio"` — ~~radio semantics without roving focus or Arrow-key support~~ [→ ordinary labelled buttons with `aria-pressed`, or the complete radio pattern].
- The off-screen render branch — ~~scheduling frames while no pixels are drawn~~ [→ pause the frame loop outside the IntersectionObserver region].
- `Toque para explorar cada frente` — ~~touch-only instruction~~ [→ “Escolha uma frente para explorar”].
- The light mark’s empty alt — [→ retain it: the header wordmark identifies the brand, while the hero mark is decorative].
- Textures, face labels, a wireframe, readout, and selector — ~~multiple explanations of a three-state concept~~ [→ object for form/light, selector/readout for language].

**Hand-off:** Validate a single, keyboard-accessible controller before adding another cube interaction.

### Jared Spool

**Verdict:** The three-front story earns attention, but the site needs verified evidence and a lower-friction route into a conversation more than it needs added visual complexity.

**Marked passages:**

- `Data · AI · Automation` — ~~English category list above Portuguese value copy~~ [→ Portuguese operational promise, such as “Dados, IA e automação para decisões que precisam acontecer na operação”].
- The cube’s 27 textures, labels, wireframe, idle motion, scroll, and selector — ~~five ways to explain one system~~ [→ one quiet object plus selected service/readout].
- `Role para revelar o sistema` beside selector buttons — ~~unclear primary interaction~~ [→ direct front selection as primary; scroll can move that same playhead secondarily].
- `O resultado não é uma tela bonita` — ~~proof claim without a verifiable signal~~ [→ one compact case per front: constraint, intervention, observed result].
- Service capability inventories — ~~technology-first scan path~~ [→ lead with a recognisable business decision or bottleneck].
- `HAWKS BI / DOUTRINA` — ~~internal branded label~~ [→ explain buyer inputs, deliverables, rhythm, and post-launch ownership].
- Repeated `Entre em contato.` CTAs — ~~one generic action at each awareness stage~~ [→ service-specific middle actions and a bounded final diagnostic conversation].

**Hand-off:** Test whether a visitor can select the relevant front, recall a supporting proof point, and start contact without using the cube.

### Dieter Rams

**Verdict:** The dark–paper–orange foundation is strong, but the fashion serif, textured cube, and repeated ruled grids dilute a more precise Hawks identity.

**Marked passages:**

- `logoMarkLight` — [→ retain the warm-white/orange reverse mark; it fixes the dark-hero contrast without becoming a generic white glyph].
- `font-family: "Bodoni Moda"` — ~~fashion-editorial display voice across a technical proposition~~ [→ Instrument Sans Variable for headings, retaining Manrope for body and utility text].
- `cube3-01` through `cube3-27` — ~~unrelated photographic material events~~ [→ near-black body, warm-paper plane, and orange signal plane].
- Cube labels, texture planes, and edges — ~~multiple layers of explanation~~ [→ cube carries only volume, orientation, and light].
- Perpetual `Math.sin()` bob — ~~default motion without meaning~~ [→ a resting object with one response per selected front].
- Almost-equal service card columns — ~~conventional equal-weight product grid~~ [→ one lead service or sequential editorial chapters].
- Footer logo plate — ~~a necessary but visually heavy paper tile~~ [→ prepare a dedicated reverse wordmark before removing its contrast field].

**Hand-off:** Approve the final display type and brand-material cube treatment before rebuilding the hero object.

## Where they agree

1. The hero now needs a light/orange reverse mark, a quieter object, and one comprehensible controller.
2. Proof is the site’s highest conversion opportunity; verified results matter more than another animated effect.
3. Keep native Three.js for the current single cube, reserving other tools for a clear production need.

## Where they disagree

The panel differs on the right future cube form—trihedral monolith, three strata, voxel assembly, or signal path—but agrees that free rotation, Rubik-like turns, and perpetual animation should be excluded.

## Highest-leverage change

Add one verified operational case signal per front and make the selector the hero’s single explicit cube controller before expanding the motion system.

## Suggested next step

Implement the brand-material monolith with an explicit selector, then run a short service-selection and proof-recall usability test.
