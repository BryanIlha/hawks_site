import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

type GlowSource = { mesh: THREE.Mesh; surface: THREE.Material[]; mask: THREE.Material[] };

/** Bloom only the exposed inner faces, with the exterior still occluding the light. */
export function createCubeGlow(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, sources: GlowSource[], decorations: THREE.Object3D[], compact = false) {
  const glow = new EffectComposer(renderer);
  glow.setPixelRatio(1);
  glow.renderToScreen = false;
  const maskPass = new RenderPass(scene, camera);
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.1, 0.3, 0.06);
  glow.addPass(maskPass);
  glow.addPass(bloom);

  const final = new EffectComposer(renderer);
  final.renderTarget1.samples = compact ? 0 : Math.min(2, renderer.capabilities.maxSamples);
  final.renderTarget2.samples = compact ? 0 : Math.min(2, renderer.capabilities.maxSamples);
  const scenePass = new RenderPass(scene, camera);
  const merge = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      glowTexture: { value: null },
      glowEnabled: { value: 0 },
    },
    vertexShader: `varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform sampler2D tDiffuse;
      uniform sampler2D glowTexture;
      uniform float glowEnabled;
      varying vec2 vUv;
      void main() {
        vec4 surface = texture2D(tDiffuse, vUv);
        vec3 light = vec3(0.0);
        if (glowEnabled > 0.5) light = texture2D(glowTexture, vUv).rgb;
        vec2 edge = smoothstep(vec2(0.0), vec2(0.16), vUv)
          * smoothstep(vec2(0.0), vec2(0.16), 1.0 - vUv);
        light *= edge.x * edge.y;
        vec3 color = surface.rgb + light;
        // Keep empty pixels transparent, including after OutputPass. Include the
        // visible radiance in alpha so bloom remains valid premultiplied color.
        vec3 displayColor = sRGBTransferOETF(vec4(color, 1.0)).rgb;
        float alpha = max(surface.a, clamp(max(displayColor.r, max(displayColor.g, displayColor.b)), 0.0, 1.0));
        gl_FragColor = vec4(color, alpha);
      }`,
  });
  // Render-target textures must be assigned after ShaderPass clones its uniforms.
  merge.uniforms.glowTexture.value = bloom.renderTargetsHorizontal[0].texture;
  const output = new OutputPass();
  final.addPass(scenePass);
  final.addPass(merge);
  final.addPass(output);
  const decorationVisibility = decorations.map((object) => object.visible);

  return {
    render(active: boolean) {
      merge.uniforms.glowEnabled.value = active ? 1 : 0;
      if (active) {
        sources.forEach(({ mesh, mask }) => { mesh.material = mask; });
        decorations.forEach((object, index) => {
          decorationVisibility[index] = object.visible;
          object.visible = false;
        });
        try {
          glow.render();
        } finally {
          sources.forEach(({ mesh, surface }) => { mesh.material = surface; });
          decorations.forEach((object, index) => { object.visible = decorationVisibility[index]; });
        }
      }
      // Never paint a CSS-colored backdrop into this WebGL canvas: Safari can
      // composite it differently from the page even when their RGB values match.
      // The base image always follows the same color/alpha pipeline. Switching
      // between direct rendering and compositing made translucent lines flash white.
      final.render();
    },
    resize(width: number, height: number) {
      // Soft light needs less resolution than the original textures and lettering.
      glow.setSize(Math.max(32, Math.round(width * (compact ? 0.4 : 0.6))), Math.max(32, Math.round(height * (compact ? 0.4 : 0.6))));
      final.setSize(width, height);
    },
    dispose() {
      maskPass.dispose();
      bloom.dispose();
      scenePass.dispose();
      merge.dispose();
      output.dispose();
      glow.dispose();
      final.dispose();
    },
  };
}
