import type { Article } from "./editorial";

export const agendoWhatsAppLaunch: Article = {
  slug: "agendo-integracao-whatsapp",
  product: "agendo",
  kind: "news",
  editorialStatus: "published",
  date: "2026-10-15",
  title: "Agendo WhatsApp: atendimento conectado à sua agenda",
  metaTitle: "Agendo WhatsApp: pedidos na mesma agenda",
  metaDescription: "Consulte horários e encaminhe pedidos pelo WhatsApp à agenda do Agendo. Disponível mediante implementação. No fluxo manual, você aprova cada pedido.",
  summary: "O agendamento pelo WhatsApp chega à mesma agenda usada no site. Consulte horários, receba pedidos e configure avisos conforme a implementação. No fluxo manual, a confirmação continua com a pessoa responsável.",
  status: "Disponível mediante implementação",
  note: "Canais, mensagens, fluxos e ferramentas são configurados para cada negócio. O uso de IA depende da solução implementada.",
  intro: [
    "A integração do Agendo com WhatsApp está disponível mediante implementação. Agora, o atendimento pelo canal pode consultar opções e encaminhar pedidos para a mesma agenda usada no site.",
  ],
  sections: [
    {
      title: "O que a integração permite",
      paragraphs: ["Conforme a solução implementada, você pode:"],
      bullets: [
        "Consultar serviços, profissionais e horários disponíveis durante a conversa.",
        "Encaminhar pedidos para o Agendo, seguindo as mesmas regras de disponibilidade do site.",
        "Personalizar respostas e fluxos com informações aprovadas pelo negócio.",
        "Conectar um bot ou um agente de IA externo ao atendimento.",
        "Enviar avisos de aprovação, recusa, cancelamento ou expiração de pedidos vinculados ao canal, conforme configuração e vínculo autorizado.",
        "Avisar a pessoa responsável quando uma conversa precisa de atendimento, no destino autorizado.",
      ],
    },
    {
      title: "A aprovação continua nas suas mãos",
      paragraphs: [
        "No fluxo manual, pedir um horário não significa confirmar o atendimento.",
        "O pedido fica aguardando aprovação até a ação explícita da pessoa responsável. Quando necessário, ela pode assumir a conversa com o cliente.",
      ],
    },
    {
      title: "Um exemplo de uso",
      paragraphs: ["Em um estúdio de beleza fictício:"],
      steps: [
        "A cliente pede manicure pelo WhatsApp.",
        "A integração consulta a agenda e apresenta horários disponíveis.",
        "A cliente revisa os dados e solicita o horário. O pedido aparece no Agendo como aguardando aprovação.",
        "A gestora confirma. No fluxo deste exemplo, a cliente recebe o aviso pelo WhatsApp.",
      ],
      closingParagraphs: ["Esse exemplo é ilustrativo. O fluxo de cada negócio é configurado durante a implementação."],
    },
    {
      title: "Como começar",
      paragraphs: ["A integração de agenda com WhatsApp envolve conectar e configurar os canais, as mensagens, os fluxos e as ferramentas do seu negócio. O uso de IA é definido nessa etapa e não está incluído automaticamente."],
    },
  ],
  faq: [
    {
      question: "Como começar a usar a integração?",
      answer: "Ela está disponível mediante implementação, com canais, mensagens e fluxos configurados para o seu negócio. Converse sobre a implementação pelo",
      link: { label: "site do Agendo", href: "https://agendo.hawksbi.com.br/" },
    },
    {
      question: "O pedido pelo WhatsApp já fica confirmado?",
      answer: "No fluxo manual, ele fica aguardando aprovação até a confirmação explícita da pessoa responsável.",
    },
    {
      question: "A integração já inclui IA?",
      answer: "Não automaticamente. A implementação pode conectar um bot ou um agente de IA externo, conforme a solução definida para o negócio.",
    },
  ],
  cta: {
    title: "Conheça a integração do Agendo com WhatsApp",
    text: "Acesse o site do Agendo para conhecer a integração e conversar sobre a implementação.",
    label: "Conversar sobre a implementação",
    href: "https://agendo.hawksbi.com.br/",
  },
};
