---
title: HAWKS BI — Design review
slug: hawks-bi-design-review
created: 2026-08-04
target: src/
---

# HAWKS BI — Design review

## Executive summary

The site already has a clear visual point of view: near-black canvas, warm paper surfaces, orange signal color, Instrument Sans, a restrained wordmark, and a 3D cube that expresses Dados, Automação, and Tecnologia. The highest-leverage hero improvement is hierarchy, not a new visual language. The duplicate hero mark has been removed and the headline block has been lifted so the first viewport reads in this order: proposition, explanation, action, system object.

## Key findings

### 1. Hero hierarchy

The hero mark repeated brand recognition immediately below the header and competed with the headline. The header wordmark already provides identification, so the hero now gives the proposition more room and stronger first-view focus.

### 2. Typography and color

Instrument Sans is consistently applied across display, body, navigation, and the cube labels. The black / paper / orange / signal palette is ownable and coherent. No gradient or additional decorative surface is needed.

### 3. Information architecture

The page has a strong sequence: hero, operational result, three service fronts, method, and contact. The three service cards are intentionally differentiated by surface color while keeping one common component structure.

### 4. Motion and interaction

The hero entrance remains sequenced with GSAP and respects reduced motion. The front selector now uses roving focus with Arrow keys plus Home/End, reducing dependence on pointer input. The cube remains a focal object, but the surrounding copy and readout carry the meaning so the 3D layer does not have to explain the whole offer alone.

### 5. Responsive behavior

The copy lift is smaller on tablet and mobile. The hero grid collapses to one column, the selector becomes a vertical stack on narrow screens, and the action button remains full-width where necessary. The header keeps the brand wordmark visible and moves secondary navigation into the existing menu.

## Implications

- Brand recognition is concentrated in the places where visitors expect it: header and footer.
- The first screen has less visual competition and a shorter path to the contact CTA.
- The service system stays recognizable without adding cards, gradients, or decorative chrome.
- The remaining strategic gap is evidence: the site describes the outcome well, but does not yet show a verified constraint, intervention, and measurable result.

## Recommendations

1. Keep the current visual system stable; avoid adding another hero graphic, glow, or background gradient.
2. Add one verified operational example per front when client evidence is available.
3. Test first-view comprehension and the path from a selected front to contact with target operations and technology decision-makers.
4. Preserve reduced-motion and keyboard behavior as acceptance criteria for future cube changes.

## Appendix — implementation inventory

- Hero composition: `src/components/Hero.tsx`
- 3D object and reduced-motion handling: `src/components/HawksCube.tsx`
- Global layout, palette, type, and responsive rules: `src/styles.css`
- Scroll/reveal orchestration: `src/lib/gsap.ts`
- Brand source of truth: `design/HAWKS-BI-VISUAL-IDENTITY.md`

## Validation

`npm run lint` passes after the hero and selector changes. The DOCX template workflow was not executed because the environment has no available document rendering runtime (`soffice`/LibreOffice); the retained references remain unchanged.
