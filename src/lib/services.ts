export type Service = {
  slug: string; name: string; heading: string; title: string; description: string; intro: string;
  situations: { title: string; text: string }[];
  scope: string; steps: { title: string; text: string }[];
  questions: { question: string; answer: string }[];
  product: 'visto' | 'agendo'; proof: string;
};
export const servicePath = (slug: string) => `/servicos/${slug}/`;
export const services: Service[] = [
  {
    slug: 'software-sob-medida', name: 'Software sob medida', heading: 'Software sob medida',
    title: 'Software sob medida em Gravataí | Hawks BI',
    description: 'Desenvolvimento de software sob medida em Gravataí para conectar sistemas, registros e rotinas da sua empresa. Converse com a Hawks BI sobre seu projeto.',
    intro: 'Quando a rotina da empresa depende de planilhas paralelas e ajustes em vários sistemas, vale olhar para o processo inteiro. A Hawks desenvolve software para conectar o trabalho, os registros e as regras da sua operação.',
    situations: [
      { title: 'Um processo que precisa de um sistema próprio.', text: 'Pedidos, responsáveis, aprovações e histórico podem fazer parte do mesmo fluxo. O escopo começa pelo que a equipe precisa executar e pelo que a gestão precisa acompanhar.' },
      { title: 'Sistemas que precisam conversar.', text: 'Uma integração pode evitar que a mesma informação seja digitada em vários lugares. Antes de definir a solução, avaliamos os acessos disponíveis e as regras de cada sistema envolvido.' },
      { title: 'Informação que precisa acompanhar a execução.', text: 'Registros, evidências e relatórios precisam preservar o contexto de quem fez o trabalho. Essa ligação aparece no Visto, produto da Hawks para rotinas operacionais.' },
    ],
    scope: 'Traga o fluxo atual, exemplos de registros e os sistemas que sua equipe usa. A conversa ajuda a separar o que um produto existente já atende do que exige desenvolvimento específico.',
    steps: [
      { title: 'Entender a rotina', text: 'Identificar usuários, entradas, decisões e pontos em que o trabalho fica parado.' },
      { title: 'Delimitar o escopo', text: 'Definir quais etapas entram no projeto, as integrações necessárias e os critérios para validar a entrega.' },
      { title: 'Validar com a operação', text: 'Conferir os fluxos com situações do trabalho antes de ampliar o uso.' },
    ],
    questions: [
      { question: 'A Hawks atende presencialmente em Gravataí?', answer: 'Sim. A Hawks tem base em Gravataí, no Rio Grande do Sul, e realiza atendimento presencial. Entre em contato para conversar sobre a sua necessidade e combinar o atendimento.' },
      { question: 'Preciso trocar todos os sistemas da empresa?', answer: 'O projeto pode partir dos sistemas que você já usa. A possibilidade de integração depende dos acessos, das interfaces disponíveis e das regras de cada fornecedor.' },
      { question: 'Quanto custa e quanto tempo leva?', answer: 'Custo e prazo dependem dos fluxos, das integrações e do volume de trabalho definido no escopo. Compartilhe a rotina que precisa melhorar para a Hawks avaliar o projeto.' },
    ],
    product: 'visto', proof: 'No Visto, checklists, fotos e histórico conectam execução e revisão. Conheça esse exemplo de produto da Hawks antes de discutir o que a sua operação precisa.',
  },
  {
    slug: 'automacao-de-processos', name: 'Automação de processos', heading: 'Automação de processos',
    title: 'Automação de processos em Gravataí | Hawks BI',
    description: 'Automação de processos em Gravataí: conecte sistemas e organize tarefas repetitivas com a Hawks BI. Atendimento presencial para conversar sobre sua operação.',
    intro: 'Copiar um cadastro, encaminhar uma solicitação e conferir uma pendência consome atenção todos os dias. A Hawks conecta sistemas e automatiza etapas para que a equipe acompanhe o trabalho e cuide das exceções.',
    situations: [
      { title: 'Uma informação, vários destinos.', text: 'Fluxos de integração podem levar dados de uma origem aos sistemas que precisam deles. O projeto precisa definir qual registro vale, quando atualizar e como tratar falhas.' },
      { title: 'Uma tarefa que sempre segue a mesma regra.', text: 'Encaminhamentos, avisos e atualizações de status são candidatos à automação. Começamos pela sequência atual e pelas condições que permitem executar cada etapa.' },
      { title: 'Um atendimento que precisa continuar.', text: 'Pedidos e conversas podem precisar de intervenção humana. A automação deve preservar o contexto e indicar quando uma pessoa precisa assumir a próxima decisão.' },
    ],
    scope: 'Escolha uma rotina recorrente. Mostre de onde ela começa, quem participa e onde costuma parar. Esse recorte permite discutir a automação e as exceções com clareza.',
    steps: [
      { title: 'Mapear uma rotina', text: 'Descrever entradas, responsáveis, frequência e saídas esperadas.' },
      { title: 'Definir regras e exceções', text: 'Separar o que pode seguir automaticamente do que depende de aprovação ou análise humana.' },
      { title: 'Conferir o fluxo', text: 'Validar situações de sucesso e falha, com um caminho de acompanhamento para a equipe.' },
    ],
    questions: [
      { question: 'Que processo devo automatizar primeiro?', answer: 'Uma boa conversa começa por uma tarefa recorrente com regras claras. Avalie com a equipe a frequência, os erros que ocorrem e as exceções antes de escolher o primeiro fluxo.' },
      { question: 'Dá para conectar WhatsApp, CRM e outros sistemas?', answer: 'Esses cenários fazem parte da frente de automação da Hawks. A viabilidade de cada integração depende das interfaces, das permissões e das condições de uso dos sistemas envolvidos.' },
      { question: 'A equipe continua participando do processo?', answer: 'Sim. O escopo pode incluir aprovações, análise de exceções e passagem para uma pessoa. É preciso definir quem acompanha cada etapa e como retomar o trabalho quando algo falhar.' },
      { question: 'Posso conversar presencialmente com a Hawks?', answer: 'Sim. A Hawks tem base em Gravataí e atendimento presencial. Conte qual rotina você quer melhorar para combinar uma conversa sobre o projeto.' },
    ],
    product: 'agendo', proof: 'No Agendo, o modo manual mantém a confirmação do horário com o profissional. O produto está em validação, e o atendimento assistido por WhatsApp segue em testes.',
  },
];
