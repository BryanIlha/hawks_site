# INF-413 — publicação do blog central e retenção

15/10/2026: PR2 integrada, commitc1d1a83dc08cf4cb891d992de764d6b9337b8571. Projeto Cloudflare hawks-bi, master, deployment1cdbe507-965e-4ccc-97a7-dceb94655000, sucesso13:45:46UTC. O deploy Git preservou as Functions do formulário e as quatro variáveis existentes; os valores não foram lidos e nenhuma mensagem foi enviada.

Browser público: feed Visto200/CORS*,2artigos; Agendo200/CORS*,2artigos; Conexo200/CORS*,0artigos. Conteúdo rascunho/interno não faz parte dos feeds. Visto e Agendo exibem somente os respectivos artigos. Filtro central, datas, disponibilidade e links foram validados localmente e em produção; breadcrumb mantém alinhamento das linhas e alvos de toque, sem alterar conteúdo.

As landings Visto/Agendo também foram otimizadas pela INF-437 e estão publicadas. O projeto conexo-landing usa BZuller/conexo-landing/main; sua PR2 preserva a página e acrescenta somente Novidades e regras Hawks. A PR2 em BryanIlha/conexo-landing corresponde à outra árvore e não é a origem do domínio público.

Núcleo Hawks1.3.0 integrado pela PR1 de BZuller/hawks-standards; adoção do Cockpit integrada pela PR14. Nove adoções documentais permanecem em PRs porque o GitHub Actions não iniciou seus jobs: “recent account payments have failed or your spending limit needs to be increased”. A correção de cobrança/limite precisa ser feita pelo titular da conta; não foram desabilitados os checks. PRs: BryanIlha/ciclo23, smile-check162 (re-design, squash),01-hub48 (codex/hub-billing-team-release), Conexo102, topsul-colaborador-portal24, dash-01capital2, hawksbi-creative-kit2, routeradar-command-center9 e conexo-landing2. Conflitos do Cockpit e Visto app foram resolvidos preservando as extensões locais e a base atual. No Visto app, regras locais ficam em docs/local-development-rules.md para manter AGENTS gerado íntegro.

Disponibilidade dos recursos publicados: produção. Estado editorial: pendente. A cadência semanal é uma regra de registro/consolidação, sem automação ou post publicado por esta tarefa. Não há confirmação de Google Search Console ou indexação/ranking.

Retenção: as worktrees de INF-413 e INF-437 permanecem para a prévia local solicitada, os registros de produção e as nove PRs bloqueadas. Commits estão no remoto. Condição de remoção: concluir CI/integração pendentes, preservar capturas/relatórios e mover a prévia para um diretório durável, sem encerrar processos alheios. A referência do núcleo fixado permanece disponível para retomar as adoções. Não há limpeza concluída alegada.
