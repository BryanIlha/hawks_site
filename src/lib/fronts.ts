import * as THREE from "three";

export type FrontId = "dados" | "inteligencia" | "automacao";

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
    kicker: "Evidência operacional",
    detail: "A resposta antes da pergunta.",
    description:
      "Uma camada confiável para entender o que está acontecendo antes de decidir o próximo movimento.",
    accent: "#f5f0e7",
    rotation: quaternionFrom(-0.34, 0.56, 0.02),
  },
  {
    id: "inteligencia",
    index: 1,
    label: "Inteligência",
    kicker: "Modelos no seu contexto",
    detail: "Previsão que cabe na operação.",
    description:
      "Modelos preditivos treinados na realidade do negócio — não em um benchmark distante.",
    accent: "#f4a064",
    rotation: quaternionFrom(-0.2, -1.12, -0.04),
  },
  {
    id: "automacao",
    index: 2,
    label: "Automação",
    kicker: "Ação em produção",
    detail: "A decisão que continua circulando.",
    description:
      "Software e fluxos que conectam sistemas e transformam uma decisão clara em ação repetível.",
    accent: "#f2610a",
    rotation: quaternionFrom(1.12, 0.52, 0.04),
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
