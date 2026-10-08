export type SpringState = { value: number; velocity: number };

/** Exact critically damped motion: preserves velocity when the user reverses direction. */
export function advanceSpring(state: SpringState, target: number, seconds: number, response: number) {
  const offset = state.value - target;
  const momentum = state.velocity + response * offset;
  const decay = Math.exp(-response * seconds);
  state.value = target + (offset + momentum * seconds) * decay;
  state.velocity = (state.velocity - response * momentum * seconds) * decay;
  if (Math.abs(state.value - target) < 0.0001 && Math.abs(state.velocity) < 0.001) {
    state.value = target;
    state.velocity = 0;
  }
}

// Influence is confined to the pointer's neighborhood on the closed cube.
export function localInfluence(grid: { x: number; y: number; z: number }, point: { x: number; y: number; z: number }) {
  const distance = Math.hypot(grid.x * 1.03 - point.x, grid.y * 1.03 - point.y, grid.z * 1.03 - point.z);
  const t = Math.max(0, Math.min(1, (1.6 - distance) / 1.25));
  return t * t * (3 - 2 * t);
}
