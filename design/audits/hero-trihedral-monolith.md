---
title: Design review of src/components/Hero.tsx + src/components/HawksStrata.tsx
slug: hero-trihedral-monolith
panel: [don-norman-designer, jared-spool-designer, dieter-rams-designer]
created: 2026-08-06
target: src/components/Hero.tsx + src/components/HawksStrata.tsx
target_lines: 357
---

# Design review: src/components/Hero.tsx + src/components/HawksStrata.tsx

## Per-persona verdicts

### Don Norman

**Verdict:** Replace the strata with one quiet trihedral monolith: the current visual is legible as layers, not as the integrated three-orientation system the visitor is being asked to control.

**Marked passages:**

- `"o cubo traduzem estrutura e integração"` — ~~three separated slabs~~ [→ one continuous, three-faced volume].
- `"A interface deve nomear apenas as três frentes externas"` — ~~geometry that must be interpreted as a service~~ [→ external selector and readout name the state; the object only shows orientation].
- `aria-label="Sistema visual de três camadas operacionais HAWKS BI"` — ~~“camadas” mental model~~ [→ “um sistema com três orientações”].
- `Role para compor o sistema` — ~~scroll as an ambiguous second interaction~~ [→ “Role para mudar a orientação” and make it advance the same three-stop playhead as the selector].
- `artifactRef.current?.setFront(front.id);` followed by `window.scrollTo(...)` — ~~two visible control actions~~ [→ selector seeks the single scroll playhead; the monolith reacts only to that source of truth].
- `front-selector` with `role="radiogroup"` and arrow/Home/End handling — [→ retain: it gives the three states a clear, keyboard-accessible controller].
- `"Movimento revela relação."` — ~~constant ornamental movement~~ [→ a 900–1100ms orientation transition, then a fully settled object; static under reduced motion].

**Hand-off:** Preserve the existing selector/readout contract; replace only the object and align scroll copy with the explicit orientation model.

### Jared Spool

**Verdict:** The strata read as a technical diagram, not an integrated cube-like system, so they do not earn the hero’s visual complexity in the first five seconds.

**Marked passages:**

- `O cubo 3×3×3 é a metáfora visual de um sistema composto por unidades que funcionam juntas.` [→ retain the single-object metaphor.]
- `aria-label="Sistema visual de três camadas operacionais HAWKS BI"` — ~~three independent layers~~ [→ one trihedral operational monolith with three readable orientations.]
- `<path className="hawks-strata__slab hawks-strata__slab--data" ... />` plus two separate slab paths — ~~stacked-process diagram~~ [→ connected faces of one volume; the seams should explain structure, not separation.]
- `for (let x = -1; x <= 1; x += 1)` — [→ preserve the cube’s 3×3×3 logic as restrained engraved indices, never 27 selectable cells.]
- `makeCellMaterial(index, textureLoader)` — ~~27 competing photographic materials~~ [→ warm-black mass, paper reading face, and a narrow orange signal plane.]
- `A seleção direta e o scroll precisam representar o mesmo estado` — [→ keep the existing shared playhead, but make the selector the obvious primary control.]
- `O cubo pode flutuar suavemente depois de chegar ao estado` — ~~continuous decorative movement~~ [→ a decisive 0.9–1.1s orientation change, then stillness or an almost imperceptible resting drift.]

**Hand-off:** Validate with five-second tests: an operations lead should say “data, automation, and software for operations,” identify three related fronts, and understand that the selector changes the same system rather than three separate products.

### Dieter Rams

**Verdict:** Replace the strata with a single restrained trihedral monolith; it restores the identity’s cube metaphor without turning the hero into a decorative 3D demo.

**Marked passages:**

- `O cubo 3×3×3 é a metáfora visual de um sistema composto por unidades que funcionam juntas.` [→ retain the cube’s systemic meaning, not its 27-cell literalism.]
- `aria-label="Sistema visual de três camadas operacionais HAWKS BI"` — ~~three separate slabs~~ [→ one continuous cube-like body with three readable orientations.]
- `.hawks-strata__slab--automation { fill: var(--orange); }` — ~~an entire orange plane~~ [→ one orange signal edge, inset, or route; orange remains a state indicator.]
- `makeCellMaterial()` loading `cube3-01.webp`…`cube3-27.webp` — ~~varied photographic surfaces~~ [→ warm-black mass, paper reading face, and a controlled orange signal detail.]
- `addLabeledFace(cube, "Dados"…)` — ~~language printed onto the object~~ [→ keep all naming in the external readout and selector.]
- `"three": "^0.171.0"` — [→ keep the existing renderer; no additional animation or 3D library is warranted.]

**Hand-off:** Remove the strata, WebP texture mosaic, on-object labels, and extra route markers; retain the selector and readout as the only explanatory interface.

## Where they agree

1. The hero needs one continuous cube-like object, not a stack of independent layers or a 27-cell Rubik puzzle.
2. The object should show volume, orientation, and state; the selector and readout alone should name Dados, Automação, and Tecnologia.
3. Direct selection and scroll must seek one three-stop playhead. The object settles after each transition and becomes fully static under reduced motion.

## Where they disagree

The panel does not disagree on the direction. Spool would retain subtle engraved 3×3 structure to preserve the system metaphor, while Rams would minimize it until it is barely an index; the implementation should use flush, low-contrast seams rather than separated tiles.

## Highest-leverage change

Replace `HawksStrata` with a **Trihedral State Monolith**: one near-black cube-like volume with a warm-paper reading plane and one thin orange operational seam. Dados, Automação, and Tecnologia are three settled oblique poses of the same object. Scroll and selection seek the same pose; all explanatory language remains in the existing selector and readout.

## Suggested next step

Implement the change.
