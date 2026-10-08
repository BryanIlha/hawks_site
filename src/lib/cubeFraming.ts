import { MathUtils, Quaternion, Vector3 } from "three";

const corner = new Vector3();

/** Fit every corner of the rotated, expanded cube inside the perspective view. */
export function cubeCameraDistance(rotation: Quaternion, halfExtent: number, aspect: number, fov: number, fill: number) {
  const vertical = Math.tan(MathUtils.degToRad(fov / 2)) * fill;
  const horizontal = vertical * Math.max(aspect, 0.01);
  let distance = 0;
  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      for (const z of [-1, 1]) {
        corner.set(x * halfExtent, y * halfExtent, z * halfExtent).applyQuaternion(rotation);
        distance = Math.max(distance, corner.z + Math.abs(corner.x) / horizontal, corner.z + Math.abs(corner.y) / vertical);
      }
    }
  }
  return distance;
}
