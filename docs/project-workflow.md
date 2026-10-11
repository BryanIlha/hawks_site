# Contrato de trabalho — hawks_site

Adoção Hawks 1.1.0 no [manifesto](../.hawks/workflow.json). Referência de integração conferida em 11/10/2026: `master`, SHA `cabe358fb445280881bb9df71c844a715ed5eeb9`. Confirmar novamente antes de iniciar nova história; nenhuma publicação é inferida da branch.

## Capacidades e isolamento

Carregar `toolkit` e `worktreePolicy` na fonte/commit do manifesto antes de cada fase. Ler skills e schemas pertinentes; usar MCP suficiente e registrar limitação/fallback. Toda edição versionada usa branch e worktree da história, nunca checkout principal. Pesquisar execução existente e retomar. Convenção portátil: HAWKS_WORKTREE_ROOT/<repo>/inf-<número>; branch codex/inf-<número>-<resumo>.

Ao concluir, comprovar remoto, integração/aceite e arquivos importantes preservados; remover somente a própria worktree pelo Git/helper suportado. Se retida, registrar motivo, caminho local e condição de remoção no Linear e no relatório. Preservar dados/configurações e outras tarefas.

## Comandos reais

Scripts de [package.json](../package.json), verificados sem executar runtime nesta adoção documental:

- `npm run dev`.
- `npm run build`.
- `npm run lint`.
- `npm run preview`.
- `npm run check:seo`.
- `npm run check:seo:published`.
- `npm run check:contact`.

Scripts de publicação ou dados exigem o runbook, destino, ambiente e autorização da tarefa. Perfil landing preserva produto/identidade existentes; não impõe autenticação, pagamentos ou módulos de outro produto. Impeccable aplica-se à mudança visual; Linear ao ciclo; n8n apenas a automações e Coolify somente quando o runtime realmente o usar.

Usar assets/logos/tokens oficiais presentes na árvore e perfis/landing.md do núcleo. Preservar CTA e destinos verdadeiros; não transformar conteúdo de referência em funcionalidade comprovada.

## Estado e entrega

[Estado datado](status.md). Backlog → história revisada → Todo → In Progress → In Review → integração/aceite → Done. Build/publicação são etapas; exigidas apenas quando a história depende delas. Documentação: diff, links e comandos; UI/código: checks e validação real proporcionais.
