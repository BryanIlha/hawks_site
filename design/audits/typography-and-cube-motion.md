---
title: Design review of src typography, identity, and cube motion
slug: typography-and-cube-motion
panel: [don-norman-designer, jared-spool-designer, dieter-rams-designer]
created: 2026-07-31
target: src
target_lines: 1206
---

# Design review: src typography, identity, and cube motion

## Per-persona verdicts

### Don Norman

**Verdict:** The SVG mark has the right hero role, but scroll, selection, idle rotation, and incomplete radio semantics compete for control of the cube.

**Marked passages:**

- `selectFront()` beside the ScrollTrigger `setProgress()` callback — ~~two controllers that can describe different current states~~ [→ use one shared playhead, or make direct selection the sole controller].
- `role="radiogroup"` with `role="radio"` buttons — ~~radio semantics without roving focus or Arrow-key support~~ [→ use ordinary labelled buttons or implement the complete radio pattern].
- `if (!reducedMotion) frameId = requestAnimationFrame(render); if (!visible) return;` — ~~a scheduled frame loop while the cube is off-screen~~ [→ pause scheduling and resume through the intersection callback].
- `font-family: "Bodoni Moda"` for all major headings — ~~fashion-editorial display type for an operational technology proposition~~ [→ a calmer engineered grotesk].
- The transparent 3.15rem hero mark — [→ retain the transparent role, but scale its loose SVG viewBox so its drawn geometry—not its invisible margin—is larger].

**Hand-off:** Keyboard-test the selector and validate the single-control model before adding cube variants.

### Jared Spool

**Verdict:** The page is distinctive, but its type and puzzle-like cube make Hawks feel more like a creative studio than an operational data/AI partner.

**Marked passages:**

- `Data · AI · Automation` — ~~an English capability list above Portuguese value copy~~ [→ `Dados, IA e Automação` plus a concise operational qualifier].
- `h1, h2 { font-family: "Bodoni Moda" }` — ~~high-contrast editorial voice at every major moment~~ [→ Instrument Sans at 550–650 for display text; keep Manrope for body and controls].
- Hero and contact title clamps — ~~the same oversized editorial gesture at each conversion moment~~ [→ reserve the largest scale for the hero; make sections and contact one step smaller].
- 27 texture maps plus idle rotation — ~~a rich Rubik-like object before a visitor knows what it means~~ [→ make material, light, and the one state transition reinforce the selected front].
- The button selector and pinned playhead — ~~selection that scroll may immediately overwrite~~ [→ one GSAP-controlled playhead, independent of incidental page movement].

**Hand-off:** Run a five-second first-view test, a three-scenario service-selection test, and a Bodoni-versus-Instrument Sans typography test with operations and technology decision-makers.

### Dieter Rams

**Verdict:** Bodoni and the textured, labelled cube compete with the geometric Hawks identity; use one sober grotesk system and one quiet cube object.

**Marked passages:**

- `font-family: "Bodoni Moda", Georgia, serif` — ~~high-contrast serif across every large headline~~ [→ a measured grotesk, such as licensed PP Neue Montreal Variable, for display].
- `cube3-01` through `cube3-27` — ~~27 competing photographic materials~~ [→ three restrained materials: near-black, warm paper, and orange].
- Texture, face labels, and an edges frame — ~~three explanatory layers on one object~~ [→ external selector/readout carry language; the cube carries only form, light, and orientation].
- `root.position.y = Math.sin(...)` — ~~perpetual floating as default character~~ [→ a resting object that moves only to signify a state change].
- The transparent hero-mark box — ~~assuming box size equals apparent mark size~~ [→ compensate for the mark drawing occupying only roughly 56% of its SVG width].

**Hand-off:** Approve the final display type and a brand-material monolith before replacing the existing hero object.

## Where they agree

1. Replace Bodoni Moda with a sober grotesk to align the typography with the geometric mark and the data/AI/automation proposition.
2. The cube needs one explicit controller and one meaningful state-change motion before it needs more animation.
3. The provided transparent mark is correctly used without a white hero tile, but its generous viewBox needs visual scale compensation.

## Where they disagree

The panel selected different typefaces: Instrument Sans is the strongest open-source, implementation-ready choice; PP Neue Montreal, ABC Diatype, and Söhne are premium licensed alternatives. They agree that another expressive serif would preserve the current mismatch.

## Highest-leverage change

Replace Bodoni Moda with Instrument Sans for display typography and simplify the hero to a quiet, brand-colour three-state cube driven by one explicit selection playhead.

## Suggested next step

Run a two-variant typography test (current Bodoni versus Instrument Sans) and implement the chosen cube treatment only after a single-control interaction passes keyboard and first-view testing.
