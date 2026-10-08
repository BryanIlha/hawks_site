/** Seconds between the end of a local pulse and the next one. */
export const nextPulseDelay = (random = Math.random) => 11 + random() * 10;

const smoothstep = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

export function pulseStrength(progress: number) {
  return 0.82 * smoothstep(progress / 0.26) * (1 - smoothstep((progress - 0.56) / 0.44));
}

export function ambientPose(seconds: number) {
  return {
    x: Math.sin(seconds * 0.31) * 0.018,
    y: Math.sin(seconds * 0.62) * 0.065,
    pitch: Math.sin(seconds * 0.28) * 0.024,
    yaw: Math.sin(seconds * 0.22) * 0.045,
    roll: Math.sin(seconds * 0.37) * 0.012,
  };
}
