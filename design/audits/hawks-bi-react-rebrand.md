---
title: "Design review: HAWKS BI React rebrand"
slug: hawks-bi-react-rebrand
date: 2026-07-30
panel:
  - Don Norman
  - Jared Spool
  - Dieter Rams
target: "React + Vite implementation in work/hawks-bi-rebranding"
---

# Consolidated design review

## Executive verdict

The implementation has a strong, distinctive editorial direction: the exact Hawks BI logo is treated as the identity anchor, the three-front proposition is easy to recognize, and the palette gives the site a credible data/automation character without falling into generic SaaS gradients. The main opportunity is now evidentiary rather than decorative: make the path from a visitor's operational problem to a credible reason to contact Hawks BI more explicit.

## Panel readout

### Don Norman — cognitive load

- The hero currently communicates one concept at a time through the cube, caption, counter, and selector.
- The selector is modeled as one radio group, while the desktop scroll sequence and direct selection share the same front state.
- Reduced-motion and WebGL fallback states preserve the same readable service information.
- Keep the fixed navigation offset and visible focus treatment under real keyboard and mobile testing.

### Jared Spool — evidence and conversion

- The hierarchy and three-front story are compelling enough to earn exploration.
- The proof section should eventually contain one or two verifiable case signals, such as the starting problem, measured operational change, and client context.
- “Entre em contato.” is visually consistent and intentionally low-pressure, but a later iteration could test role-specific contact language or a short intake path while preserving the brand voice.

### Dieter Rams — restraint and system

- The dark surfaces, restrained borders, and limited accent colors form a coherent visual system.
- The 3×3×3 cube is memorable, but can read as a generic puzzle/Rubik object if the surrounding composition becomes too ornamental.
- The implementation keeps the supplied cube behavior because it is part of the requested reference; future refinement should make the cube feel more like the Hawks BI mark and less like an independent illustration.

## Agreement

1. The “Três frentes. Um sistema.” proposition is the strongest organizing idea and should remain the site’s spine.
2. Cube rotation, active front label, caption, counter, and service emphasis must remain one synchronized state.
3. Motion should reveal the system, not compete with the logo, headline, or contact action.
4. The next meaningful improvement is proof and conversion clarity, not additional decorative effects.

## Deliberate trade-off

The panel’s most conservative recommendation is to simplify the cube treatment further. This build keeps the supplied 3×3×3 Three.js construction, readable face labels, Bodoni Moda display typography, and exact logo assets because those are explicit requirements of the approved direction. The compromise is to keep the rest of the interface quiet: no generic gradients, no decorative AI imagery, and no competing card-grid treatment.

## Highest-leverage next change

Add a small proof-backed case-study route before expanding the motion system: one case for Dados, one for Inteligência, and one for Automação, each with the operational constraint, intervention, and measured outcome. Link the relevant front state to that evidence and test the resulting contact flow with Brazilian operations and technology decision-makers.

