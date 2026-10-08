import * as THREE from "three";
import type { FrontId } from "./fronts";

const SIZE = 512;

function drawSymbol(context: CanvasRenderingContext2D, kind: FrontId, opening: number) {
  context.lineWidth = 12;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#fff";
  const dot = (x: number, y: number, radius = 15) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  };
  const line = (points: number[][]) => {
    context.beginPath();
    points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
    context.stroke();
  };

  if (kind === "dados") {
    // Dispersed records settle into a matrix as the block opens.
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const drift = (1 - opening) * 15;
        const x = 148 + column * 108 + Math.sin(row * 3 + column) * drift;
        const y = 148 + row * 108 + Math.cos(column * 3 + row) * drift;
        context.globalAlpha = row === column ? 1 : 0.68;
        context.fillRect(x - 25, y - 25, 50, 50);
      }
    }
    context.globalAlpha = 1;
  } else if (kind === "inteligencia") {
    // Several observations converge on one decision.
    context.globalAlpha = 0.65;
    for (const y of [142, 256, 370]) line([[118, y], [286, 256]]);
    line([[286, 256], [400, 256]]);
    context.globalAlpha = 1;
    for (const y of [142, 256, 370]) {
      dot(118, y);
      dot(118 + 168 * opening, y + (256 - y) * opening, 11);
    }
    context.beginPath();
    context.moveTo(286, 225); context.lineTo(317, 256);
    context.lineTo(286, 287); context.lineTo(255, 256);
    context.closePath(); context.fill();
    line([[380, 238], [400, 256], [380, 274]]);
  } else {
    // One closed route, with an activation marker that travels through its stages.
    context.globalAlpha = 0.7;
    context.beginPath();
    context.roundRect(148, 148, 216, 216, 36);
    context.stroke();
    context.globalAlpha = 1;
    line([[243, 126], [265, 148], [243, 170]]);
    line([[269, 342], [247, 364], [269, 386]]);
    dot(148, 256); dot(364, 256);
    const angle = -Math.PI / 2 + opening * Math.PI * 2;
    const radius = 108 / Math.max(Math.abs(Math.cos(angle)), Math.abs(Math.sin(angle)));
    dot(256 + Math.cos(angle) * radius, 256 + Math.sin(angle) * radius, 19);
  }
}

export function makeCubeInscription(
  label: string,
  position: THREE.Vector3,
  rotation: THREE.Euler,
  symbol?: FrontId,
) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const context = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  let lastOpening = -1;
  const repaint = (opening = 0) => {
    context.clearRect(0, 0, SIZE, SIZE);
    context.fillStyle = "#fff";
    if (symbol) drawSymbol(context, symbol, opening);
    else {
      context.textAlign = "center";
      context.textBaseline = "middle";
      let size = 132;
      context.font = `700 ${size}px "Manrope", sans-serif`;
      const width = context.measureText(label).width;
      if (width > 456) size *= 456 / width;
      context.font = `700 ${size}px "Manrope", sans-serif`;
      context.fillText(label, SIZE / 2, 176);
    }
    texture.needsUpdate = true;
  };
  repaint();
  // Every inscription fits entirely on its own physical block.
  const geometry = new THREE.PlaneGeometry(0.88, 0.88);
  const material = new THREE.MeshStandardMaterial({
    color: 0xc9c1b2, map: texture, bumpMap: texture, bumpScale: -0.006,
    roughness: 0.92, metalness: 0.08, transparent: true, alphaTest: 0.02,
    depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  mesh.rotation.copy(rotation);
  return {
    mesh, geometry, material, texture, repaint,
    update(opening: number) {
      if (!symbol) return;
      // Only upload a texture when the local spring visibly changes; no extra loop.
      const step = Math.round(THREE.MathUtils.clamp(opening, 0, 1) * 40);
      if (step === lastOpening) return;
      lastOpening = step;
      repaint(step / 40);
    },
  };
}
