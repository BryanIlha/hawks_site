import * as THREE from "three";
import type { CubeSurface } from "../components/HawksCube";
import type { FrontId } from "./fronts";

// The selected Atlas study, kept independent of the local comparison gallery.
const hash = (x: number, y: number) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
};
const smooth = (value: number) => value * value * (3 - 2 * value);
function noise(x: number, y: number) {
  const ix = Math.floor(x), iy = Math.floor(y), a = smooth(x - ix), b = smooth(y - iy);
  return THREE.MathUtils.lerp(
    THREE.MathUtils.lerp(hash(ix, iy), hash(ix + 1, iy), a),
    THREE.MathUtils.lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), a), b,
  );
}

function ceramicMaps() {
  const size = 384, color = new Uint8Array(size * size * 4);
  const height = new Uint8Array(color.length), roughness = new Uint8Array(color.length);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const fine = hash(x, y), soft = noise(x / size * 14, y / size * 14);
    const value = .055 + soft * .025 + fine * .009;
    const h = .48 + fine * .04, r = .82 + fine * .12, index = (y * size + x) * 4;
    color.set([value * 255, value * 255, value * 255, 255], index);
    height.set([h * 255, h * 255, h * 255, 255], index);
    roughness.set([r * 255, r * 255, r * 255, 255], index);
  }
  const map = (data: Uint8Array<ArrayBuffer>, srgb = false) => {
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.anisotropy = 4;
    if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  };
  return { map: map(color, true), bumpMap: map(height), roughnessMap: map(roughness) };
}

function reflectionMap() {
  const width = 256, height = 128, data = new Float32Array(width * height * 4);
  const panel = (u: number, v: number, x: number, y: number, w: number, h: number) => {
    const du = Math.min(Math.abs(u - x), 1 - Math.abs(u - x));
    return (1 - THREE.MathUtils.smoothstep(du, w * .46, w * .5))
      * (1 - THREE.MathUtils.smoothstep(Math.abs(v - y), h * .46, h * .5));
  };
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const u = x / width, v = y / height;
    const white = panel(u, v, .08, .46, .1, .58) * 5
      + panel(u, v, .5, .35, .24, .12) * 4
      + panel(u, v, .69, .57, .05, .45) * 7;
    const base = .015 + Math.pow(Math.sin(v * Math.PI), 2) * .025;
    data.set([base + white, base + white, base + white, 1], (y * width + x) * 4);
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;
  return texture;
}

type Canvas = CanvasRenderingContext2D;
const light = "#d7d8cf", mid = "#8d948d";
function dot(c: Canvas, x: number, y: number, r: number) {
  c.fillStyle = light; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
}
function ring(c: Canvas, x: number, y: number, r: number, color = light) {
  c.strokeStyle = color; c.lineWidth = 3; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
}
function label(c: Canvas, value: string, x: number, y: number, size: number) {
  c.font = `600 ${size}px Manrope, sans-serif`; c.textAlign = "left"; c.textBaseline = "middle";
  const width = c.measureText(value).width;
  c.save(); c.globalCompositeOperation = "destination-out";
  c.fillRect(x - 12, y - size * .7, width + 24, size * 1.4); c.restore();
  c.fillStyle = light; c.fillText(value, x, y);
}

function drawAtlas(c: Canvas, kind: FrontId, column: number, row: number) {
  const nodes = [[92, 142], [466, 93], [956, 183], [221, 526], [690, 423], [1065, 606], [113, 889], [562, 936], [944, 986]];
  const edges = kind === "dados"
    ? [[0, 1], [0, 3], [1, 4], [2, 4], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [7, 8]]
    : kind === "inteligencia"
      ? [[0, 4], [1, 4], [2, 4], [3, 4], [4, 5], [4, 6], [4, 7], [4, 8]]
      : [[0, 1], [1, 2], [2, 5], [5, 4], [4, 3], [3, 6], [6, 7], [7, 8]];
  c.save(); c.translate(-column * 384, -row * 384);
  for (const [from, to] of edges) {
    const a = nodes[from], b = nodes[to], middle = (a[0] + b[0]) / 2;
    c.strokeStyle = from === 4 ? light : mid; c.lineWidth = from === 4 ? 9 : 5;
    c.beginPath(); c.moveTo(a[0], a[1]);
    c.bezierCurveTo(middle, a[1], middle, b[1], b[0], b[1]); c.stroke();
  }
  nodes.forEach(([x, y], index) => {
    dot(c, x, y, index === 4 ? 28 : 8);
    if (index === 4) ring(c, x, y, 69);
    else if (index % 3 === 1) ring(c, x, y, 17, mid);
  });
  const center = kind === "inteligencia" ? "INFERIR" : kind === "automacao" ? "EXECUTAR" : "CONVERGIR";
  for (const [index, text] of [[0, "ORIGEM"], [4, center], [8, "DESTINO"]] as const) {
    label(c, text, nodes[index][0] - 35, nodes[index][1] + 65, 25);
  }
  label(c, { dados: "DADOS", inteligencia: "INTELIGÊNCIA", automacao: "AUTOMAÇÃO" }[kind], 53, 1099, 30);
  c.restore();
}

const atlasArtwork: NonNullable<CubeSurface["faceArtwork"]> = (kind, column, row) => {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 384;
  const context = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4;
  const repaint = () => {
    context.clearRect(0, 0, 384, 384); context.lineCap = "round"; context.lineJoin = "round";
    drawAtlas(context, kind, column, row); texture.needsUpdate = true;
  };
  repaint();
  const geometry = new THREE.PlaneGeometry(.89, .89);
  const material = new THREE.MeshStandardMaterial({
    color: 0xd4d1c9, emissive: 0xb9b4a8, emissiveIntensity: .15,
    map: texture, bumpMap: texture, bumpScale: -.002, roughness: .8, metalness: .02,
    transparent: true, alphaTest: .03, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1,
  });
  return { mesh: new THREE.Mesh(geometry, material), geometry, material, texture, repaint, update: () => undefined };
};

export function createAtlasSurface(): CubeSurface {
  return {
    color: 0xffffff, roughness: .52, metalness: 0, neutralLighting: true, continuousSurface: true,
    envMap: reflectionMap(), envMapIntensity: .48, ...ceramicMaps(), bumpScale: .007,
    physical: { clearcoat: .3, clearcoatRoughness: .4 }, faceArtwork: atlasArtwork,
  };
}

export function disposeAtlasSurface(surface: CubeSurface) {
  new Set([surface.map, surface.bumpMap, surface.roughnessMap, surface.envMap]).forEach(texture => texture?.dispose());
}
