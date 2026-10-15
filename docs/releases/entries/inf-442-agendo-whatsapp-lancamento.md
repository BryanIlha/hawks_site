# Lançamento editorial da integração Agendo com WhatsApp

- id: inf-442-agendo-whatsapp-lancamento
- products: [agendo, hawks]
- type: improvement
- editorial_status: publicado
- availability: producao
- integrated_at: 2026-10-15
- released_at: 2026-10-15
- issue: https://linear.app/infra-hawks/issue/INF-442
- pull_request: https://github.com/BryanIlha/hawks_site/pull/4
- commit: 9c72ff60d601060d97fe0bdf8cd5a2151d555cce
- published_url: https://hawksbi.com.br/blog/agendo-integracao-whatsapp/
- published_at: 2026-10-15T20:52:42Z (primeira conferência pública registrada)
- weekly_post: não se aplica; nota de lançamento individual

## O que mudou

Artigo curto em português brasileiro aprovado por Bruno em 15/10/2026, com bullets, exemplo fictício, CTA, metadados e três perguntas frequentes. A publicação é central no blog Hawks e a landing Agendo recebe o mesmo item pelo feed filtrado existente. O renderer passa a aceitar listas, etapas numeradas, FAQ e CTA específicos sem mudar os artigos antigos.

## Por que ajuda e como usar

O visitante entende que a integração conecta o atendimento à mesma agenda do site, está disponível mediante implementação e preserva aprovação explícita no fluxo manual. IA externa depende da solução configurada, sem liberação universal de assistente nativo. A disponibilidade comercial vem da confirmação expressa do fundador nesta conversa em 15/10/2026; esta entrega editorial não habilita canais nem altera o motor da agenda.

## Evidências e limitações

Gates e publicação registrados em `docs/validation/INF-442-publicacao.md`. Artigo HTTP 200 e item visível em https://agendo.hawksbi.com.br/#novidades, com link canônico para a Hawks. Sem preços, prazos, métricas, depoimentos, lembretes ou promessa de entrega de mensagens. Nenhuma mensagem, pareamento ou agendamento real foi feito.

## Sincronização e tratamento editorial

- Fonte canônica: `src/lib/agendoWhatsAppLaunch.ts`, exposta pelo blog e feed Agendo.
- Produto Hawks: nota de disponibilidade do Agendo e registro histórico de 08/10 recebem contexto atual sem reescrever os testes históricos.
- Landing Agendo: estrutura de Novidades já publicada na INF-413; sem duplicar conteúdo ou fazer novo deploy da landing.
- Padrões centrais, infraestrutura, Galáxia e manuais: sem mudança de processo, topologia, credenciais ou regras operacionais; não se aplica atualização.
- Linear: INF-442 registra autorização, escopo e evidências.
- Retenção da worktree: até integração/publicação comprovadas e preservação das evidências. Nenhum recurso alheio deve ser encerrado.
