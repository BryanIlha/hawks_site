import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import * as THREE from "three";
import { FRONT_STATES, resolveFrontProgress, type FrontId } from "../lib/fronts";

export type HawksCubeHandle = {
  setProgress: (progress: number) => void;
  setFront: (front: FrontId) => void;
};

type HawksCubeProps = {
  reducedMotion: boolean;
  onFrontChange?: (front: FrontId) => void;
};

const CELL_SIZE = 0.94;
const CELL_STEP = 1.03;
const FACE_SIZE = 1024;

function makeFaceTexture(label: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = FACE_SIZE;
  canvas.height = FACE_SIZE;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D context is unavailable.");

  context.clearRect(0, 0, FACE_SIZE, FACE_SIZE);
  context.strokeStyle = "rgba(241, 235, 221, 0.36)";
  context.lineWidth = 8;
  context.strokeRect(30, 30, FACE_SIZE - 60, FACE_SIZE - 60);
  context.fillStyle = accent;
  context.fillRect(76, 78, 176, 12);
  context.fillStyle = "#f5f0e7";
  context.font = '650 92px "Instrument Sans", sans-serif';
  context.fillText(label.toUpperCase(), 76, 610);
  context.fillStyle = "rgba(241, 235, 221, 0.62)";
  context.font = '450 27px "Instrument Sans", sans-serif';
  context.fillText("HAWKS BI / TRÊS FRENTES", 76, 690);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeCellMaterial(index: number, textureLoader: THREE.TextureLoader) {
  const palette = [0x0a0a0a, 0x111210, 0x191816, 0x0d0e0e, 0x151514];
  const material = new THREE.MeshStandardMaterial({
    color: palette[index % palette.length],
    roughness: 0.42 + (index % 3) * 0.04,
    metalness: 0.22,
  });
  textureLoader.load(
    `/assets/cube3/cube3-${String(index + 1).padStart(2, "0")}.webp`,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      material.map = texture;
      material.needsUpdate = true;
    },
    undefined,
    () => undefined,
  );
  return material;
}

function addLabeledFace(
  group: THREE.Group,
  label: string,
  accent: string,
  position: THREE.Vector3,
  rotation: THREE.Euler,
) {
  const geometry = new THREE.PlaneGeometry(3.13, 3.13);
  const texture = makeFaceTexture(label, accent);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.copy(position);
  plane.rotation.copy(rotation);
  group.add(plane);
  return { geometry, material, texture };
}

export const HawksCube = forwardRef(function HawksCube(
  { reducedMotion, onFrontChange }: HawksCubeProps,
  ref: Ref<HawksCubeHandle>,
) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HawksCubeHandle | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useImperativeHandle(ref, () => ({
    setProgress: (progress) => apiRef.current?.setProgress(progress),
    setFront: (front) => apiRef.current?.setFront(front),
  }), []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 9.15);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "hawks-cube__canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.prepend(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xf5f0e7, 1.9);
    const key = new THREE.DirectionalLight(0xf4a064, 2.05);
    key.position.set(4, 5, 7);
    const fill = new THREE.DirectionalLight(0xf2610a, 1.6);
    fill.position.set(-4, -2, 5);
    scene.add(ambient, key, fill);

    const cube = new THREE.Group();
    scene.add(cube);

    const cellGeometry = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
    const textureLoader = new THREE.TextureLoader();
    const cellMaterials: THREE.MeshStandardMaterial[] = [];
    let index = 0;
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          const material = makeCellMaterial(index, textureLoader);
          const cell = new THREE.Mesh(cellGeometry, material);
          cell.position.set(x * CELL_STEP, y * CELL_STEP, z * CELL_STEP);
          cube.add(cell);
          cellMaterials.push(material);
          index += 1;
        }
      }
    }

    const frameGeometry = new THREE.BoxGeometry(3.16, 3.16, 3.16);
    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(frameGeometry),
      new THREE.LineBasicMaterial({ color: 0xf5f0e7, transparent: true, opacity: 0.24 }),
    );
    cube.add(frame);

    const faceAssets = [
      addLabeledFace(cube, "Dados", "#f5f0e7", new THREE.Vector3(0, 0, 1.61), new THREE.Euler()),
      addLabeledFace(cube, "Automação", "#f2610a", new THREE.Vector3(0, 1.61, 0), new THREE.Euler(-Math.PI / 2, 0, 0)),
      addLabeledFace(cube, "Tecnologia", "#f4a064", new THREE.Vector3(1.61, 0, 0), new THREE.Euler(0, Math.PI / 2, 0)),
    ];

    const targetRotation = FRONT_STATES[0].rotation.clone();
    const currentRotation = targetRotation.clone();
    let currentFront: FrontId = "dados";
    let visible = true;
    let running = true;
    let rendering = false;
    let frameId = 0;
    let lastFrameTime = 0;

    const reportFront = (front: FrontId) => {
      if (front !== currentFront) {
        currentFront = front;
        onFrontChange?.(front);
      }
    };

    const renderStatic = () => {
      currentRotation.copy(targetRotation);
      cube.quaternion.copy(currentRotation);
      renderer.render(scene, camera);
    };

    const setFront = (front: FrontId) => {
      const next = FRONT_STATES.find((candidate) => candidate.id === front);
      if (!next) return;
      targetRotation.copy(next.rotation);
      reportFront(front);
      if (reducedMotion) renderStatic();
      else startRender();
    };

    const setProgress = (progress: number) => {
      const resolved = resolveFrontProgress(progress);
      targetRotation.copy(resolved.rotation);
      reportFront(resolved.active.id);
      if (reducedMotion) renderStatic();
      else startRender();
    };

    apiRef.current = { setFront, setProgress };

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const render = (time: number) => {
      if (!running || !visible || reducedMotion) {
        rendering = false;
        return;
      }

      const deltaSeconds = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.1) : 1 / 60;
      lastFrameTime = time;
      const rotationEase = deltaSeconds ? 1 - Math.exp(-16 * deltaSeconds) : 1;
      currentRotation.slerp(targetRotation, rotationEase);
      cube.quaternion.copy(currentRotation);
      renderer.render(scene, camera);

      if (currentRotation.angleTo(targetRotation) < 0.003) {
        currentRotation.copy(targetRotation);
        cube.quaternion.copy(currentRotation);
        rendering = false;
        renderer.render(scene, camera);
        return;
      }

      frameId = requestAnimationFrame(render);
    };

    const startRender = () => {
      if (!running || !visible || reducedMotion || rendering) return;
      rendering = true;
      lastFrameTime = 0;
      frameId = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        renderer.render(scene, camera);
        startRender();
      } else {
        cancelAnimationFrame(frameId);
        rendering = false;
      }
    }, { threshold: 0.01 });
    intersectionObserver.observe(mount);

    resize();
    if (reducedMotion) renderStatic();
    else startRender();

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.dispose();
      cellGeometry.dispose();
      frameGeometry.dispose();
      (frame.geometry as THREE.EdgesGeometry).dispose();
      (frame.material as THREE.LineBasicMaterial).dispose();
      cellMaterials.forEach((material) => {
        material.map?.dispose();
        material.dispose();
      });
      faceAssets.forEach(({ geometry, material, texture }) => {
        geometry.dispose();
        material.dispose();
        texture.dispose();
      });
      scene.clear();
      apiRef.current = null;
      renderer.domElement.remove();
    };
  }, [onFrontChange, reducedMotion]);

  return (
    <div
      ref={mountRef}
      className="hawks-cube"
      role="img"
      aria-label="Cubo HAWKS BI com as frentes Dados, Automação e Tecnologia"
    >
      {webglUnavailable && (
        <div className="cube-fallback" aria-label="Frentes HAWKS BI">
          {FRONT_STATES.map((front) => <span key={front.id}>{front.label}</span>)}
        </div>
      )}
    </div>
  );
});
