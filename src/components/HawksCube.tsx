import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import * as THREE from "three";
import { FRONT_STATES, type FrontId } from "../lib/fronts";
import { createCubeGlow } from "../lib/cubeGlow";
import { cubeCameraDistance } from "../lib/cubeFraming";
import { ambientPose, nextPulseDelay, pulseStrength } from "../lib/cubeAmbient";
import { advanceSpring, localInfluence } from "../lib/cubeMotion";
import { makeCubeInscription } from "../lib/cubeInscription";

export type HawksCubeHandle = {
  setFront: (front: FrontId) => void;
  setExpanded: (expanded: boolean) => void;
  setMotionPaused: (paused: boolean) => void;
};

type HawksCubeProps = {
  reducedMotion: boolean;
  expanded: boolean;
  motionPaused?: boolean;
  front: FrontId;
  onFrontChange: (front: FrontId) => void;
};

const CELL_SIZE = 0.94;
const CELL_STEP = 1.03;
const EXPANSION = 0.24;
export const HawksCube = forwardRef(function HawksCube(
  { reducedMotion, expanded, motionPaused = false, front, onFrontChange }: HawksCubeProps,
  ref: Ref<HawksCubeHandle>,
) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HawksCubeHandle | null>(null);
  const frontRef = useRef<FrontId>(front);
  frontRef.current = front;
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;
  const pausedRef = useRef(motionPaused);
  pausedRef.current = motionPaused;
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useImperativeHandle(ref, () => ({
    setFront: (front) => apiRef.current?.setFront(front),
    setExpanded: (value) => apiRef.current?.setExpanded(value),
    setMotionPaused: (value) => apiRef.current?.setMotionPaused(value),
  }), []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "default" });
    } catch {
      setWebglUnavailable(true);
      return;
    }
    setWebglUnavailable(false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.matchMedia("(max-width: 899px)").matches ? 1.4 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "hawks-cube__canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const ambient = new THREE.AmbientLight(0xf5f0e7, 1.9);
    const key = new THREE.DirectionalLight(0xf4a064, 2.05);
    key.position.set(4, 5, 7);
    const fill = new THREE.DirectionalLight(0xf2610a, 1.6);
    fill.position.set(-4, -2, 5);
    scene.add(ambient, key, fill);

    const floatRig = new THREE.Group();
    const cube = new THREE.Group();
    floatRig.add(cube);
    scene.add(floatRig);
    const geometry = new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, CELL_SIZE);
    const palette = [0x0a0a0a, 0x111210, 0x191816, 0x0d0e0e, 0x151514];
    const textureLoader = new THREE.TextureLoader();
    const cellMaterials: THREE.MeshStandardMaterial[] = [];
    const interiorMaterials: THREE.MeshStandardMaterial[] = [];
    const glowOccluder = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const glowColor = new THREE.Color(0xf2610a);
    let disposed = false;
    const cells: { mesh: THREE.Mesh; grid: THREE.Vector3; direction: THREE.Vector3; interior: THREE.MeshStandardMaterial; glowMaterial: THREE.MeshBasicMaterial; surface: THREE.Material[]; mask: THREE.Material[]; spring: { value: number; velocity: number } }[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const index = cells.length;
          const material = new THREE.MeshStandardMaterial({
            color: palette[index % palette.length],
            roughness: 0.42 + (index % 3) * 0.04,
            metalness: 0.22,
          });
          // The original outer faces stay dark; only exposed inner faces emit orange.
          const interior = material.clone();
          interior.emissive.set(0xf2610a);
          interior.emissiveIntensity = 0;
          interiorMaterials.push(interior);
          textureLoader.load(`/assets/cube3/cube3-${String(index + 1).padStart(2, "0")}.webp`, (texture) => {
            if (disposed) {
              texture.dispose();
              return;
            }
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map = texture;
            interior.map = texture;
            material.needsUpdate = true;
            interior.needsUpdate = true;
            // Texture loads also redraw the static, reduced-motion view.
            invalidate();
          }, undefined, () => undefined);
          cellMaterials.push(material);
          const surface = [
            x === 1 ? material : interior, x === -1 ? material : interior,
            y === 1 ? material : interior, y === -1 ? material : interior,
            z === 1 ? material : interior, z === -1 ? material : interior,
          ];
          const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const mask = surface.map((face) => face === interior ? glowMaterial : glowOccluder);
          const mesh = new THREE.Mesh(geometry, surface);
          const grid = new THREE.Vector3(x, y, z);
          mesh.position.copy(grid).multiplyScalar(CELL_STEP);
          cells.push({ mesh, grid, direction: grid.clone().normalize(), interior, glowMaterial, surface, mask, spring: { value: 0, velocity: 0 } });
          cube.add(mesh);
        }
      }
    }
    // Corner marks belong to the corner blocks and travel with them.
    const cornerMaterial = new THREE.LineBasicMaterial({ color: 0x8c8273, transparent: true, opacity: 0.28 });
    const cornerMarks: THREE.LineSegments[] = [];
    for (const { mesh, grid } of cells) {
      if (!grid.x || !grid.y || !grid.z) continue;
      const corner = grid.clone().multiplyScalar(CELL_SIZE / 2 + 0.002);
      const points: THREE.Vector3[] = [];
      for (const axis of ["x", "y", "z"] as const) {
        const end = corner.clone();
        end[axis] -= grid[axis] * 0.17;
        points.push(corner.clone(), end);
      }
      const mark = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), cornerMaterial);
      mesh.add(mark);
      cornerMarks.push(mark);
    }
    const faceDefinitions = [
      { id: "dados" as const, label: "Dados", grid: new THREE.Vector3(0, 0, 1), rotation: new THREE.Euler() },
      { id: "inteligencia" as const, label: "Inteligência", grid: new THREE.Vector3(1, 0, 0), rotation: new THREE.Euler(0, Math.PI / 2, 0) },
      { id: "automacao" as const, label: "Automação", grid: new THREE.Vector3(0, 1, 0), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) },
    ];
    const markings = faceDefinitions.map(({ id, label, grid, rotation }) => {
      const position = grid.clone().multiplyScalar(CELL_SIZE / 2 + 0.003);
      const cell = cells.find((candidate) => candidate.grid.equals(grid))!;
      const below = grid.clone().add(new THREE.Vector3(0, -1, 0).applyEuler(rotation)).round();
      const symbol = makeCubeInscription(label, position, rotation, id);
      const name = makeCubeInscription(label, position, rotation);
      cell.mesh.add(symbol.mesh);
      cells.find((candidate) => candidate.grid.equals(below))!.mesh.add(name.mesh);
      return { symbol, name, cell };
    });
    const faces = markings.flatMap(({ symbol, name }) => [symbol, name]);
    const glow = createCubeGlow(renderer, scene, camera, cells, [...cornerMarks, ...faces.map(({ mesh }) => mesh)]);
    const orientations = FRONT_STATES.map((state) => ({
      ...state, rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(...state.rotation)),
    }));
    const targetRotation = (orientations.find((state) => state.id === frontRef.current) ?? orientations[0]).rotation.clone();
    cube.quaternion.copy(targetRotation);
    const hoverPoint = new THREE.Vector3(0, 0, 1.61);
    const pulsePoint = new THREE.Vector3();
    const viewDirection = new THREE.Vector3();
    const visualRotation = new THREE.Quaternion();
    const ambientAmount = { value: 0, velocity: 0 };
    let ambientTime = 0;
    let nextPulseAt = 6 + Math.random() * 4;
    let pulse: { start: THREE.Vector3; end: THREE.Vector3; elapsed: number; duration: number } | null = null;
    let paused = pausedRef.current;
    let keyboardActive = false;
    let pulseCount = 0;
    const cameraDolly = { value: 0, velocity: 0 };
    let resetCamera = true;
    let pinnedOpen = expandedRef.current;
    let hovering = false;
    let visible = true;
    let contextLost = false;
    let frameId = 0;
    let lastTime = 0;
    let hoverExitTimer: ReturnType<typeof setTimeout> | undefined;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const localRay = new THREE.Ray();
    const inverseCube = new THREE.Matrix4();
    const hitBox = new THREE.Box3(new THREE.Vector3(-1.61, -1.61, -1.61), new THREE.Vector3(1.61, 1.61, 1.61));
    const hitPoint = new THREE.Vector3();
    const deltaRotation = new THREE.Quaternion();
    const deltaEuler = new THREE.Euler();
    let drag: { id: number; x: number; y: number; startX: number; startY: number; active: boolean; touch: boolean } | null = null;

    function invalidate() {
      if (!disposed && !contextLost && !frameId && visible && !document.hidden) frameId = requestAnimationFrame(render);
    }

    function resumeRender() {
      // A resize or visibility change can invalidate a frame queued before suspension.
      cancelAnimationFrame(frameId);
      frameId = 0;
      lastTime = 0;
      invalidate();
    }

    function render(time: number) {
      frameId = 0;
      if (disposed || contextLost || !visible || document.hidden) return;
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 1 / 60;
      lastTime = time;
      const manual = hovering || !!drag || pinnedOpen || keyboardActive;
      const ambient = !reducedMotion && !paused && !manual;
      if (ambient) ambientTime += dt;
      if (reducedMotion) {
        ambientAmount.value = 0;
        ambientAmount.velocity = 0;
      } else {
        advanceSpring(ambientAmount, ambient ? 1 : 0, dt, 4);
      }
      const pose = ambientPose(ambientTime);
      floatRig.position.set(pose.x * ambientAmount.value, pose.y * ambientAmount.value, 0);
      floatRig.rotation.set(pose.pitch * ambientAmount.value, pose.yaw * ambientAmount.value, pose.roll * ambientAmount.value);
      if (ambient && !pulse && ambientTime >= nextPulseAt) startPulse();
      let automaticStrength = 0;
      if (pulse && ambient) {
        pulse.elapsed += dt;
        const progress = Math.min(1, pulse.elapsed / pulse.duration);
        const travel = progress * progress * (3 - 2 * progress);
        pulsePoint.lerpVectors(pulse.start, pulse.end, travel);
        automaticStrength = pulseStrength(progress);
        if (progress === 1) {
          pulse = null;
          nextPulseAt = ambientTime + nextPulseDelay();
        }
      }
      const active = pinnedOpen || (!reducedMotion && hovering);
      const influencePoint = active ? hoverPoint : pulsePoint;
      const influenceStrength = active ? 1 : automaticStrength;
      const blend = reducedMotion ? 1 : 1 - Math.exp(-(drag?.active ? 16 : 8) * dt);
      cube.quaternion.slerp(targetRotation, blend);
      if (cube.quaternion.angleTo(targetRotation) < 0.0002) cube.quaternion.copy(targetRotation);
      let localMotion = false;
      let maxOpening = 0;
      let affected = 0;
      cells.forEach(({ mesh, grid, direction, interior, glowMaterial, spring }) => {
        const target = influenceStrength * localInfluence(grid, influencePoint);
        if (reducedMotion) {
          spring.value = target;
          spring.velocity = 0;
        } else {
          advanceSpring(spring, target, dt, target > spring.value ? 11 : 14);
        }
        mesh.position.copy(grid).multiplyScalar(CELL_STEP).addScaledVector(direction, spring.value * EXPANSION);
        interior.emissiveIntensity = spring.value * 0.65;
        glowMaterial.color.copy(glowColor).multiplyScalar(spring.value * 1.25);
        maxOpening = Math.max(maxOpening, spring.value);
        if (spring.value > 0.025) affected++;
        localMotion ||= spring.value !== target || spring.velocity !== 0;
      });
      markings.forEach(({ symbol, cell }) => symbol.update(reducedMotion ? 0 : cell.spring.value));
      // A fixed hover framing keeps the rest of the object completely still.
      const halfExtent = 1.72;
      const cameraTarget = cubeCameraDistance(cube.quaternion, halfExtent, camera.aspect, camera.fov, 0.89);
      if (resetCamera || reducedMotion) {
        cameraDolly.value = cameraTarget;
        cameraDolly.velocity = 0;
        resetCamera = false;
      } else {
        advanceSpring(cameraDolly, cameraTarget, dt, 15);
      }
      // Keep a safety margin even during rapid dragging or an interrupted opening.
      visualRotation.copy(floatRig.quaternion).multiply(cube.quaternion);
      const cameraLimit = cubeCameraDistance(visualRotation, halfExtent + 0.075, camera.aspect, camera.fov, 0.97);
      if (cameraDolly.value < cameraLimit) {
        cameraDolly.value = cameraLimit;
        cameraDolly.velocity = Math.max(0, cameraDolly.velocity);
      }
      camera.position.z = cameraDolly.value;
      camera.updateMatrixWorld();
      mount!.dataset.motion = reducedMotion ? "reduced" : paused ? "paused" : manual ? "interaction" : "ambient";
      mount!.dataset.pulseCount = String(pulseCount);
      mount!.dataset.autoPulse = automaticStrength.toFixed(3);
      mount!.dataset.ambientTime = ambientTime.toFixed(3);
      mount!.dataset.floatPosition = floatRig.position.toArray().map((value) => value.toFixed(4)).join(",");
      mount!.dataset.visualRotation = visualRotation.toArray().map((value) => value.toFixed(4)).join(",");
      mount!.dataset.expansion = maxOpening.toFixed(3);
      mount!.dataset.affectedPieces = String(affected);
      mount!.dataset.hoverPoint = hoverPoint.toArray().map((value) => value.toFixed(2)).join(",");
      mount!.dataset.rotation = cube.quaternion.toArray().map((value) => value.toFixed(4)).join(",");
      glow.render(maxOpening > 0.001);
      const moving = ambient || ambientAmount.velocity !== 0 || localMotion
        || cube.quaternion.angleTo(targetRotation) > 0.0002
        || Math.abs(cameraDolly.value - cameraTarget) > 0.0001 || cameraDolly.velocity !== 0;
      if (moving) invalidate();
      else lastTime = 0;
    }

    function interruptAmbient() {
      pulse = null;
      nextPulseAt = ambientTime + nextPulseDelay();
    }

    function startPulse() {
      visualRotation.copy(floatRig.quaternion).multiply(cube.quaternion);
      viewDirection.set(0, 0, 1).applyQuaternion(visualRotation.clone().invert());
      const axes = ["x", "y", "z"] as const;
      const candidates = axes.filter((axis) => Math.abs(viewDirection[axis]) > 0.22);
      const total = candidates.reduce((sum, axis) => sum + Math.abs(viewDirection[axis]), 0);
      let choice = Math.random() * total;
      const axis = candidates.find((candidate) => (choice -= Math.abs(viewDirection[candidate])) <= 0) ?? candidates[0];
      const start = new THREE.Vector3();
      const end = new THREE.Vector3();
      for (const component of axes) {
        if (component === axis) {
          start[component] = end[component] = Math.sign(viewDirection[axis]) * 1.61;
        } else {
          start[component] = (Math.random() - 0.5) * 1.9;
          end[component] = THREE.MathUtils.clamp(start[component] + (Math.random() - 0.5) * 0.85, -1.15, 1.15);
        }
      }
      pulse = { start, end, elapsed: 0, duration: 2.6 + Math.random() * 0.7 };
      pulseCount++;
    }

    const setHover = (next: boolean) => {
      if (next) {
        clearTimeout(hoverExitTimer);
        hoverExitTimer = undefined;
        if (!hovering) {
          interruptAmbient();
          hovering = true;
          invalidate();
        }
      } else if (hovering && !hoverExitTimer) {
        // Briefly crossing the silhouette should not make the nearby pieces twitch.
        hoverExitTimer = setTimeout(() => {
          hoverExitTimer = undefined;
          hovering = false;
          invalidate();
        }, 120);
      }
    };

    const reportFront = () => {
      const closest = orientations.reduce((a, b) => targetRotation.angleTo(a.rotation) < targetRotation.angleTo(b.rotation) ? a : b);
      if (frontRef.current !== closest.id) {
        frontRef.current = closest.id;
        onFrontChange(closest.id);
      }
    };
    const rotate = (x: number, y: number) => {
      interruptAmbient();
      deltaEuler.set(y, x, 0, "YXZ");
      deltaRotation.setFromEuler(deltaEuler);
      targetRotation.premultiply(deltaRotation).normalize();
      reportFront();
      invalidate();
    };
    apiRef.current = {
      setFront: (front) => {
        const next = orientations.find((candidate) => candidate.id === front);
        if (!next) return;
        interruptAmbient();
        frontRef.current = front;
        targetRotation.copy(next.rotation);
        if (pinnedOpen) previewFace();
        invalidate();
      },
      setExpanded: (value) => {
        if (pinnedOpen === value) return;
        interruptAmbient();
        pinnedOpen = value;
        if (value) previewFace();
        if (!value) {
          clearTimeout(hoverExitTimer);
          hoverExitTimer = undefined;
          hovering = false;
        }
        invalidate();
      },
      setMotionPaused: (value) => {
        if (paused === value) return;
        paused = value;
        interruptAmbient();
        invalidate();
      },
    };

    function previewFace() {
      // The same local effect is available through the button on touch / keyboard.
      hoverPoint.set(0, 0, 1).applyQuaternion(targetRotation.clone().invert());
      hoverPoint.multiplyScalar(1.61 / Math.max(Math.abs(hoverPoint.x), Math.abs(hoverPoint.y), Math.abs(hoverPoint.z)));
    }
    if (pinnedOpen) previewFace();

    const overObject = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      cube.updateMatrixWorld(true);
      inverseCube.copy(cube.matrixWorld).invert();
      localRay.copy(raycaster.ray).applyMatrix4(inverseCube);
      // Pick a stable closed surface rather than the moving pieces and their gaps.
      const hit = localRay.intersectBox(hitBox, hitPoint);
      if (hit) {
        hoverPoint.copy(hitPoint);
        invalidate();
      }
      return !!hit;
    };
    const pointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !event.isPrimary || !overObject(event)) return;
      keyboardActive = false;
      interruptAmbient();
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, active: false, touch: event.pointerType === "touch" };
      mount.setPointerCapture(event.pointerId);
      if (event.pointerType === "mouse") {
        event.preventDefault();
        mount.focus({ preventScroll: true });
        setHover(true);
      }
    };
    const pointerMove = (event: PointerEvent) => {
      if (drag && drag.id === event.pointerId) {
        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;
        if (!drag.active && Math.hypot(dx, dy) < 5) return;
        // Keep vertical page scrolling available on touch screens.
        if (!drag.active && drag.touch && Math.abs(dy) > Math.abs(dx)) return;
        drag.active = true;
        mount.dataset.dragging = "true";
        setHover(overObject(event));
        rotate((event.clientX - drag.x) * 0.005, (event.clientY - drag.y) * 0.005);
        drag.x = event.clientX;
        drag.y = event.clientY;
      } else if (event.pointerType === "mouse") {
        setHover(overObject(event));
      }
    };
    const finishDrag = (event: PointerEvent) => {
      if (drag?.id !== event.pointerId) return;
      if (drag.touch) {
        clearTimeout(hoverExitTimer);
        hoverExitTimer = undefined;
        hovering = false;
      }
      drag = null;
      delete mount.dataset.dragging;
      if (mount.hasPointerCapture(event.pointerId)) mount.releasePointerCapture(event.pointerId);
      invalidate();
    };
    const pointerLeave = () => {
      if (drag) return;
      setHover(false);
    };
    const keyDown = (event: KeyboardEvent) => {
      const turns: Record<string, [number, number]> = { ArrowLeft: [-0.18, 0], ArrowRight: [0.18, 0], ArrowUp: [0, -0.18], ArrowDown: [0, 0.18] };
      const turn = turns[event.key];
      if (!turn) return;
      keyboardActive = true;
      event.preventDefault();
      rotate(...turn);
    };
    const blur = () => { keyboardActive = false; invalidate(); };
    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      resetCamera = true;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      renderer.setSize(width, height, false);
      glow.resize(width, height);
      resumeRender();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      setWebglUnavailable(true);
    };
    const restored = () => {
      contextLost = false;
      setWebglUnavailable(false);
      resize();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        clearTimeout(hoverExitTimer);
        hoverExitTimer = undefined;
        hovering = false;
        lastTime = 0;
      }
      resumeRender();
    });
    intersectionObserver.observe(mount);
    mount.addEventListener("pointerdown", pointerDown);
    mount.addEventListener("pointermove", pointerMove);
    mount.addEventListener("pointerup", finishDrag);
    mount.addEventListener("pointercancel", finishDrag);
    mount.addEventListener("lostpointercapture", finishDrag);
    mount.addEventListener("pointerleave", pointerLeave);
    mount.addEventListener("keydown", keyDown);
    mount.addEventListener("blur", blur);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);
    document.addEventListener("visibilitychange", resumeRender);
    document.fonts.ready.then(() => {
      if (disposed) return;
      faces.forEach(({ repaint }) => repaint());
      invalidate();
    });
    resize();

    return () => {
      disposed = true;
      clearTimeout(hoverExitTimer);
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mount.removeEventListener("pointerdown", pointerDown);
      mount.removeEventListener("pointermove", pointerMove);
      mount.removeEventListener("pointerup", finishDrag);
      mount.removeEventListener("pointercancel", finishDrag);
      mount.removeEventListener("lostpointercapture", finishDrag);
      mount.removeEventListener("pointerleave", pointerLeave);
      mount.removeEventListener("keydown", keyDown);
      mount.removeEventListener("blur", blur);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      document.removeEventListener("visibilitychange", resumeRender);
      glow.dispose();
      glowOccluder.dispose();
      cells.forEach(({ glowMaterial }) => glowMaterial.dispose());
      geometry.dispose();
      cornerMarks.forEach((mark) => mark.geometry.dispose());
      cornerMaterial.dispose();
      cellMaterials.forEach((material) => {
        material.map?.dispose();
        material.dispose();
      });
      interiorMaterials.forEach((material) => material.dispose());
      faces.forEach(({ geometry: faceGeometry, material, texture }) => {
        faceGeometry.dispose();
        material.dispose();
        texture.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
      scene.clear();
      apiRef.current = null;
    };
  }, [reducedMotion, onFrontChange]);

  useEffect(() => { apiRef.current?.setExpanded(expanded); }, [expanded, reducedMotion]);
  useEffect(() => { apiRef.current?.setMotionPaused(motionPaused); }, [motionPaused, reducedMotion]);

  return (
    <div
      ref={mountRef}
      className={`hawks-cube${webglUnavailable ? " is-unavailable" : ""}`}
      tabIndex={webglUnavailable ? undefined : 0}
      role="group"
      aria-label="Cubo 3D HAWKS BI. Arraste para girar ou use as setas do teclado."
    >
      {webglUnavailable && (
        <div className="cube-fallback" role="img" aria-label="As três frentes HAWKS BI">
          {FRONT_STATES.map((front) => <span key={front.id}>{front.label}</span>)}
        </div>
      )}
    </div>
  );
});
