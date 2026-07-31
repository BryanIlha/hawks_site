---
title: "Design review: HAWKS BI visual and motion refinement"
slug: hawks-bi-react-rebrand-visual-motion
panel:
  - Don Norman
  - Jared Spool
  - Dieter Rams
created: 2026-07-31
target: "React + Vite implementation in work/hawks-bi-rebranding"
---

# Design review: HAWKS BI visual and motion refinement

## Per-persona verdicts

### Don Norman

**Verdict:** The three-front story is clear, but selection, scroll progression, and mobile navigation needed a tighter mental model.

**Marked passages:**

- “role=\"radiogroup\"” → keep the stateful selector, but make it behave like direct selection rather than a page jump.
- “trigger.scroll(...)” → direct front selection keeps the cube and label synchronized without moving the user unexpectedly.
- “aria-expanded={open}” → focus now moves into the opened menu, Escape closes it, and focus returns to the trigger.
- “min-height: 185svh” → reduced-motion layouts now remove the unexplained scroll tunnel.

**Hand-off:** Jared Spool should validate whether the active-front detail and contact path explain enough value before adding more motion.

### Jared Spool

**Verdict:** The brand and mechanism are memorable, but the experience must make the operational value legible before asking for contact.

**Marked passages:**

- “Três frentes. Um sistema.” → preserve the headline while pairing it with the operational promise.
- “cube-readout” → include each front’s detail line so the animation communicates an outcome, not only a category.
- “O resultado não é uma tela bonita.” → keep the claim restrained and reserve future iterations for verified case evidence.
- “Role para revelar o sistema” → keep the scroll sequence short and optional through direct selector interaction.

**Hand-off:** Run a proof-first conversion test with operations and technology decision-makers.

### Dieter Rams

**Verdict:** The identity became more coherent when the supplied logo’s orange and near-black palette governed the interface and one motion system governed the page.

**Marked passages:**

- “--cyan / --orange” → replaced the unrelated cyan/brown pairing with orange, warm signal orange, cream, and near-black.
- “motion/react” alongside GSAP → section reveals and menu choreography now use scoped GSAP timelines and ScrollTrigger.
- “logoIcon + typed HAWKS BI” → the footer now uses the supplied lockup as one indivisible signature.
- “service-card:nth-child(2)” → removed staggered card offsets and reduced hover displacement to keep one calm baseline.

**Hand-off:** Keep the cube quiet and let future polish follow the logo rather than introduce additional accent colors.

## Where they agree

1. The supplied logo should remain the identity anchor.
2. Motion should explain the three-front system rather than compete with it.
3. The next content-level opportunity is concrete proof, not additional decoration.

## Where they disagree

The panel differed on whether the hero should carry more explicit outcome copy now or remain editorial and restrained until verified case evidence is available. The implementation keeps a concise active-front detail line and leaves measurable claims for a proof-backed iteration.

## Highest-leverage change

Make the logo-led orange/black system and the GSAP playhead the single visual and motion grammar across the experience.

## Suggested next step

Add one verified case signal per front, then test whether users can name the relevant front, understand its outcome, and start a conversation without relying on the cube animation alone.
