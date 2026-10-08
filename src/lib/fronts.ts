export type FrontId = "dados" | "inteligencia" | "automacao";

export type FrontState = {
  id: FrontId;
  index: number;
  label: string;
  kicker: string;
  detail: string;
  description: string;
  accent: string;
  rotation: [number, number, number];
};

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
    rotation: [-0.34, 0.56, 0.02],
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
    rotation: [-0.2, -1.12, -0.04],
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
    rotation: [1.12, 0.52, 0.04],
  },
];
