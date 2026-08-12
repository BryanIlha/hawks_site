export type SolutionId = "conexo" | "visto" | "agendamento";

export type Solution = {
  id: SolutionId;
  index: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  detail: string;
  points: readonly string[];
  cta: string;
  tone: "conexo" | "visto" | "agendamento";
  liveUrl?: string;
};

export const SOLUTIONS: readonly Solution[] = [
  {
    id: "conexo",
    index: "01",
    name: "Conexo",
    category: "Atendimento no WhatsApp",
    headline: "A conversa chega. O próximo passo já aparece.",
    description: "Organiza a entrada, guia a triagem e entrega o contexto para a pessoa certa assumir.",
    detail: "Piloto em validação: uma jornada principal, triagem guiada e passagem para uma pessoa.",
    points: ["Resposta inicial", "Triagem guiada", "Passagem com contexto"],
    cta: "Ver o piloto em ação",
    tone: "conexo",
  },
  {
    id: "visto",
    index: "02",
    name: "Visto",
    category: "Checklist operacional",
    headline: "A rotina acontece. A evidência fica.",
    description: "Checklists que orientam a execução, registram evidências e mostram onde a operação precisa agir.",
    detail: "Já em operação. Conheça a proposta completa na landing do Visto.",
    points: ["Rotinas guiadas", "Evidências no lugar certo", "Exceções visíveis"],
    cta: "Conhecer o Visto",
    tone: "visto",
    liveUrl: "https://visto.hawksbi.com.br",
  },
  {
    id: "agendamento",
    index: "03",
    name: "Agendamento",
    category: "Agendamento em validação",
    headline: "Horários claros. Menos troca de mensagens.",
    description: "Um MVP para organizar disponibilidade, horários e confirmações em um só fluxo.",
    detail: "MVP em refinamento, sem nome definitivo — apresentado aqui como uma solução em desenvolvimento.",
    points: ["Disponibilidade em um só lugar", "Horários organizados", "Confirmações claras"],
    cta: "Conversar sobre o MVP",
    tone: "agendamento",
  },
];

export function getSolution(id: string | undefined) {
  return SOLUTIONS.find((solution) => solution.id === id);
}
