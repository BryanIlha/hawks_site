---
title: Design review of cube motion and service language
slug: cube-motion-and-service-language
panel: [don-norman-designer, jared-spool-designer, dieter-rams-designer]
created: 2026-07-31
target: src
target_lines: 1209
---

# Design review: cube motion and service language

No `CLAUDE.md`, README, brand brief, or user-research artifact is present. The panel reviewed the current implementation, prior audits, and the requested shift to Dados, Automação, and Tecnologia.

## Per-persona verdicts

### Don Norman

**Verdict:** The revised three-front offer will be clearer, but the cube must complete its orientation before its quiet float begins; otherwise ongoing movement obscures whether a selection settled.

**Marked passages:**

- `const idle = ...; const desired = targetRotation.clone().multiply(idleQuaternion);` — ~~apply an idle transform on every frame~~ [→ keep the cube still while it slerps, then ramp in a small float after a settled threshold].
- `root.position.y = ... Math.sin(...)` — ~~motion during every state transition~~ [→ a restrained float only after settlement; keep reduced motion static].
- `type FrontId = "dados" | "inteligencia" | "automacao"` plus the face label, selector, readout, fallback, Services card, and cube label — ~~a retired service name~~ [→ rename every occurrence to `Tecnologia`, including its stable ID].
- `Data · AI · Automation` and `inteligência de dados, software sob medida e automações...` — ~~mixed-language, category-first positioning~~ [→ `Dados · Automação · Tecnologia` and a plain statement of what Hawks builds].
- `<img src={logoWordmark} ... />` in `Footer.tsx` — [→ retain: it already resolves to `hawks-bi-wordmark.svg`; enlarge it proportionally instead of introducing another asset].

**Hand-off:** Keyboard-test the front controls and reduced-motion setting after the float gate is added.

### Jared Spool

**Verdict:** The visual system is strong, but the first view describes capability more abstractly than a buyer needs; plainly state that Hawks builds data flows, automations, and software.

**Marked passages:**

- `<span>Data · AI · Automation</span>` — ~~English taxonomy~~ [→ `Dados · Automação · Tecnologia`].
- `Transformamos evidência em ação: inteligência de dados, software sob medida e automações...` — ~~an abstract, extended claim~~ [→ `Construímos fluxos de dados, automações e softwares para a operação.`].
- `label: "Inteligência"` / `addLabeledFace(cube, "Inteligência", ...)` / service card / footer — ~~one capability framed inconsistently~~ [→ `Tecnologia` in every visual and assistive label].
- `const idle = ... Math.sin(...)` and `root.position.y = ... Math.sin(...)` — ~~ambient motion while changing states~~ [→ float only after the quaternion settles, and pause it while another face is selected].
- `.footer-lockup { ... width: 10.4rem; height: 3.68rem; }` — ~~a footer treatment that makes the SVG source less obvious~~ [→ retain the contrast field, keep the SVG source, and increase its scale modestly].

**Hand-off:** Run a five-second first-view test: visitors should name the three areas and repeat that Hawks builds data flows, automations, and software.

### Dieter Rams

**Verdict:** Keep idle motion barely perceptible and only at rest; pair it with the single plain-language proposition, Dados, Automação, and Tecnologia.

**Marked passages:**

- `const idle = ...` and `root.position.y = ...` — ~~a float while the cube is pursuing its target rotation~~ [→ start a small vertical float only after settlement, easing its amplitude in over roughly 900ms].
- `label: "Inteligência"` and `id: "inteligencia"` — ~~an ML framing that suggests a different core service~~ [→ `Tecnologia` and `tecnologia` throughout].
- `addLabeledFace(cube, "Inteligência", ...)` — ~~a cube face that contradicts the revised offer~~ [→ `Tecnologia`, preserving agreement with the external readout].
- `Data · AI · Automation` — ~~a mixed-language tool category~~ [→ `Dados · Automação · Tecnologia`].
- `.nav-brand img { width: 10.3rem }`, `.footer-lockup { width: 10.4rem }`, and `.hero-brandline__mark { width: 3.15rem }` — ~~identity sized by its boxes rather than its role~~ [→ enlarge the existing SVGs modestly and preserve their natural proportions].

**Hand-off:** Verify that the wordmark remains clear at mobile widths and that no raster brand asset is introduced.

## Where they agree

1. The three-front system must read identically as Dados, Automação, and Tecnologia throughout the cube, copy, services, footer, and assistive text.
2. The cube should float only at rest—after a short, smooth delay—and become fully static for reduced-motion users.
3. The header, decorative hero mark, and footer already use the SVG asset map; larger proportional sizing is the correct response, not a raster replacement.

## Where they disagree

Norman prioritizes the selector’s control behavior, Spool prioritizes immediate buyer comprehension, and Rams prioritizes the restraint of the resting motion. All agree those concerns are compatible with the requested update.

## Highest-leverage change

State the offer in one concise sentence—“Construímos fluxos de dados, automações e softwares para a operação.”—then make the cube settle decisively before its subtle idle float begins.

## Suggested next step

Implement the change, then test first-view comprehension, front selection, and reduced motion with a small set of target buyers.
