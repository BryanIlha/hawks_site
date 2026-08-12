export type FrontId = "dados" | "automacao" | "tecnologia";
export type FrontRotation = readonly [x: number, y: number, z: number];

export type FrontState = {
  id: FrontId;
  index: number;
  label: string;
  kicker: string;
  detail: string;
  description: string;
  accent: string;
  rotation: FrontRotation;
};

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
    rotation: [-0.34, 0.56, 0.02],
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
    rotation: [1.12, 0.52, 0.04],
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
    rotation: [-0.2, -1.12, -0.04],
  },
];
