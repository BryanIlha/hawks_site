---
target: src/components/HawksCube.tsx
total_score: 29
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 2
timestamp: 2026-08-06T18-18-48Z
slug: src-components-hawkscube-tsx
---
# HAWKS BI cube animation review

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Active front and readout are visible; texture loading itself has no staged status. |
| 2 | Match System / Real World | 4 | The cube maps directly to Dados, Automação, and Tecnologia and the motion expresses front changes. |
| 3 | User Control and Freedom | 2 | Direct selection and scroll both control the target rotation; scroll can overwrite a manual selection later. |
| 4 | Consistency and Standards | 4 | Direct selection, roving focus, reduced motion, and the existing GSAP motion language are coherent. |
| 5 | Error Prevention | 3 | WebGL fallback exists; there is no loading/error treatment for individual texture failures. |
| 6 | Recognition Rather Than Recall | 4 | Selector labels and the live readout keep the current front legible outside the canvas. |
| 7 | Flexibility and Efficiency | 3 | Three direct choices are efficient, but there is no explicit pause or “manual mode” while scroll control is active. |
| 8 | Aesthetic and Minimalist Design | 3 | Purposeful no-idle motion is a strength; 27 independent image materials add visual noise while loading. |
| 9 | Error Recovery | 3 | Whole-canvas WebGL failure is handled, but partial texture/network failure is silent. |
| 10 | Help and Documentation | n/a | A marketing/experience surface does not need persistent animation documentation. |
| **Total** |  | **29/36** | **Good — distinctive and restrained, with one control-model conflict and one resource-cost risk.** |

## Design Specificity Verdict

Pass. The cube is not interchangeable with a generic 3D hero: its 3x3x3 construction, three branded fronts, Portuguese labels, material assets, and external selector all belong to the HAWKS BI proposition. The strongest decision is that the cube does not idle-spin; it moves only to communicate a selected or revealed front.

## Motion Thesis Review

The current thesis is sound: scroll or selection changes the active front, then the cube eases toward the corresponding quaternion. The interpolation uses frame-rate-independent exponential smoothing, and IntersectionObserver stops the render loop when the object is offscreen. Reduced motion resolves to a stable static state rather than hiding the content.

The weak point is orchestration, not easing. There are two active controllers: `setFront()` from the selector and `setProgress()` from the desktop ScrollTrigger. A manual selection can look correct momentarily, then be replaced by the scroll playhead on the next scroll update. That makes the object feel like it has an argument with the visitor.

## Strengths

- No perpetual idle loop: motion earns its place as a state transition.
- Quaternion slerp plus exponential damping gives the cube a confident, mechanical arrival instead of a generic CSS spin.
- Visibility, resize, reduced-motion, keyboard selection, WebGL fallback, and disposal paths are all present.

## Priority Issues

### [P1] Scroll and direct selection are competing controllers

Why it matters: `Hero.tsx:35-37` calls `setFront()`, while `Hero.tsx:97-100` continuously maps scroll progress through `setProgress()`. After a manual selection, a small scroll can move the cube and live readout back to the scroll-derived state. This breaks user control and weakens the meaning of the selector.

Fix: choose one explicit model. Recommended: direct selection updates the ScrollTrigger playhead to the selected index, so scroll and click share one source of truth. If the user clicks Automação, the page should either move the playhead to 0.5 or temporarily disengage scroll control until the next intentional scroll.

Suggested command: `$impeccable animate`

### [P1] The asset cost is high for a state-change animation

Why it matters: `HawksCube.tsx:136-147` creates 27 materials and starts 27 texture loads. The cube is now gated off on compact viewports, but desktop still pays the full load before the visitor understands the object. On slow connections, the cube can appear to “assemble” through asynchronous texture arrival rather than through authored motion.

Fix: use a small atlas or 3–5 shared materials, preload only the visible front, and load the remaining material set after the first stable render. Track and cancel/ignore late texture callbacks on unmount so disposed materials cannot receive late maps.

Suggested command: `$impeccable optimize`

### [P2] Loading and partial-failure states are silent

Why it matters: `makeCellMaterial()` ignores texture errors at `HawksCube.tsx:55-65`. A slow or failed asset leaves a dark cell with no explanation, which can read as an intentional material choice or a broken cube.

Fix: keep the current dark material as a deliberate skeleton, but add a loaded-cell counter or a single quiet “visual loading” state outside the canvas, and settle into the fallback only when WebGL itself fails.

Suggested command: `$impeccable harden`

### [P2] Reduced motion is correct but loses the state-change cue

Why it matters: `HawksCube.tsx:189-199` jumps directly to the target quaternion when motion is reduced. The content remains usable, but there is no residual indication that a front changed beyond the selector/readout.

Fix: keep the static cube, selector, and readout as-is, and rely on a non-motion state treatment such as an active border or color change; do not reintroduce rotation for reduced-motion users.

Suggested command: `$impeccable animate`

## Persona Red Flags

- **Keyboard visitor:** The radio group and Arrow/Home/End behavior are strong, but a manual selection can still be overwritten by the scroll controller.
- **Slow-connection visitor:** 27 concurrent WebP requests can produce a visually incomplete cube without feedback.
- **Reduced-motion visitor:** State is legible, but the transition has no non-motion acknowledgment beyond the external selector.

## Minor Observations

- `IntersectionObserver` pauses animation correctly, but `resize()` still renders even when the cube is offscreen; this is minor compared with the texture cost.
- `renderer.dispose()` and geometry/material cleanup are present; add late-load guards before adding more cleanup machinery.
- The final detector warning is the intentional Instrument Sans choice and is a false positive against the project’s established identity.

## Questions to Consider

- Should scroll reveal the three fronts, or should the selector be the primary controller with scroll only providing ambient continuity?
- Can the first front be fully ready before the remaining 24 texture assets begin loading?
- What should a visitor see when one material fails: a quiet solid fallback, a retry, or a clearly labeled loading state?
