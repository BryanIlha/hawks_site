# Contrato de trabalho — hawks_site

Adoção Hawks 1.2.1 no [manifesto](../.hawks/workflow.json). Referência de integração revalidada em 12/10/2026: `master`, SHA `d3876bf5fc461c5b5fa6f12966be3ab953e77749`. A referência de 11/10/2026 (`cabe358fb445280881bb9df71c844a715ed5eeb9`) permanece como evidência histórica em [status](status.md). Confirmar novamente antes de iniciar nova história; nenhuma publicação é inferida da branch.

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

Usar assets/logos/tokens oficiais presentes na árvore e o [perfil landing do núcleo](../.hawks/vendor/profiles/landing.md). Preservar CTA e destinos verdadeiros; não transformar conteúdo de referência em funcionalidade comprovada.


## Padrão comum

Processo, qualidade, catálogo, templates e ciclo de worktrees são definidos no [núcleo fixado](../.hawks/vendor/standards/governance.md). Este contrato fornece apenas parâmetros e requisitos locais. Mudança de regra comum exige fonte central e propagação.

## Sincronização após mudanças

Aplicar a [sincronização obrigatória de fontes e referências](../.hawks/vendor/standards/governance.md#sincronização-obrigatória-após-mudanças): avaliar Linear, fonte central Hawks, documentos locais e derivados afetados; registrar ações/evidências ou não aplicabilidade justificada. Revisão e encerramento conferem a matriz.

## Blog e patch notes semanais

Toda feature/fix segue a [norma central](../.hawks/vendor/standards/blog-and-release-notes.md) e deixa [registro durável](releases/README.md) para a edição semanal. Disponibilidade deve ter evidência; não inferir lançamento do merge.
