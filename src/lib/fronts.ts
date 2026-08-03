import * as THREE from "three";

export type FrontId = "dados" | "automacao" | "tecnologia";

export type FrontState = {
  id: FrontId;
  index: number;
  label: string;
  kicker: string;
  detail: string;
  description: string;
  accent: string;
  rotation: THREE.Quaternion;
};

const quaternionFrom = (x: number, y: number, z: number) =>
  new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z));

export const FRONT_STATES: FrontState[] = [
  {
    id: "dados",
    index: 0,
    label: "Dados",
    kicker: "Fluxos de dados",
    detail: "Dados prontos para decidir.",
    description:
      "Fluxos de dados confiáveis para decisões claras.",
    accent: "#f5f0e7",
    rotation: quaternionFrom(-0.34, 0.56, 0.02),
  },
  {
    id: "automacao",
    index: 1,
    label: "Automação",
    kicker: "Automação em produção",
    detail: "Rotinas que seguem em movimento.",
    description:
      "Automações que conectam sistemas e fazem a operação avançar.",
    accent: "#f2610a",
    rotation: quaternionFrom(1.12, 0.52, 0.04),
  },
  {
    id: "tecnologia",
    index: 2,
    label: "Tecnologia",
    kicker: "Softwares sob medida",
    detail: "Tecnologia no ritmo do negócio.",
    description:
      "Softwares e integrações que acompanham a operação.",
    accent: "#f4a064",
    rotation: quaternionFrom(-0.2, -1.12, -0.04),
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function resolveFrontProgress(value: number) {
  const progress = clamp(value);
  const scaled = progress * (FRONT_STATES.length - 1);
  const fromIndex = Math.min(FRONT_STATES.length - 2, Math.floor(scaled));
  const transition = scaled - fromIndex;
  const from = FRONT_STATES[fromIndex];
  const to = FRONT_STATES[Math.min(fromIndex + 1, FRONT_STATES.length - 1)];
  const rotation = from.rotation.clone().slerp(to.rotation, transition);

  return {
    progress,
    from,
    to,
    transition,
    active: transition > 0.53 ? to : from,
    rotation,
  };
}
