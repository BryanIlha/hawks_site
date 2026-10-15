# INF-442 — nota de lançamento Agendo WhatsApp

## Autorização e origem

Bruno aprovou o texto curto, metadados e FAQ nesta conversa e autorizou a publicação nos sites Hawks e Agendo em 15/10/2026. A confirmação do fundador de disponibilidade mediante implementação prevalece sobre o estado histórico dos documentos de testes. Não equivale à ativação universal de um assistente nativo.

Base: `master`, `13d03402b88f6b1648b27425b47a7cef9fe09883`. Execução em worktree registrada, branch `codex/inf-442-agendo-whatsapp-launch`; checkout principal e alterações locais da sessão original preservados. Revisão própria pelo Codex; não se alega revisão independente.

## Escopo

Uma fonte editorial no blog Hawks, slug `/blog/agendo-integracao-whatsapp/`, distribuída à seção `#novidades` do Agendo pelo feed já publicado. Artigo com seis bullets, quatro etapas de exemplo fictício, três perguntas frequentes e CTA para o domínio Agendo. Meta title dentro de 60 caracteres, meta description de 148 e resumo de 208. Nenhuma alteração de API, banco, agendamento, credenciais, canais ou automações.

## Comandos e verificações

- `npm ci`: concluído; auditoria informou uma vulnerabilidade alta preexistente nas dependências. Lockfile preservado e nenhuma atualização de pacote incluída.
- `npm run lint`: passou.
- `npm run build`: passou; 13 páginas e 404, feeds e sitemap gerados. Aviso existente sobre tamanho do chunk de Three.js.
- `npm run check:seo`: passou após conclusão do build.
- `npm run check:contact`: nove testes passaram, usando transporte injetado; nenhuma mensagem real enviada.
- `node --test scripts/blog-feed.test.mjs`: três testes passaram, incluindo rascunhos, distribuição multiproduto e correspondência central/filtrada.
- `python3 .hawks/check.py`: passou.
- `git diff --check`: passou.
- `wrangler pages functions build --outdir .wrangler/inf-442-functions`: compilação concluída; formulário preservado.
- Detector Impeccable 4.5.2 nos dois arquivos de UI alterados: lista vazia de achados. Identidade Hawks preservada.
- Inspeção adicional do HTML inicial e dos quatro feeds: título, limites editoriais de tamanho, dez itens de listas, três respostas, canonical e inclusão somente em Agendo passaram.

Limites corrigidos da execução: uma checagem SEO prematura leu o dist antigo enquanto o build ainda rodava; a checagem posterior usou o artefato final e passou. Uma asserção inicial contou títulos de artigos relacionados junto com o FAQ; corrigida para o artigo. O navegador esperado pelo pacote Playwright local não estava instalado; foi usado o Chromium headless 1246 já presente. O servidor de desenvolvimento excedeu o tempo de navegação; a conferência visual passou a usar o build estático, sem alterar o produto para acomodar o teste.

## Publicação e conferência visual

Browser no build estático em 360, 390, 768 e 1440 px: artigo, metadados, seis bullets, quatro etapas, três respostas, CTA, canonical, filtro Agendo, foco/teclado, zoom 200%, texto longo e ausência de erros de JavaScript passaram. Capturas mobile/desktop inspecionadas: identidade existente, bullets e leitura preservados. Relatório e capturas em `output/blog-whatsapp-2026-10-15` no pacote local desta conversa.

Revisão própria do diff e do resultado: sem achados materiais. O Git local recusou o push por permissão; transporte remoto segue pelo conector GitHub já autorizado para o repositório, com branch própria e atualização sem force. PR, SHA integrado, hospedagem e URLs públicas serão acrescentados após observação. Não inferir publicação do build local.

## Matriz de sincronização

| Fonte | Ação |
| --- | --- |
| Blog central | Texto e metadados aprovados, listas, FAQ e CTA; home destaca o lançamento recente. |
| Histórico e produto | Nota de disponibilidade do Agendo atualizada; artigo de 08/10 contextualizado como registro histórico. |
| Feed e landing Agendo | Feed recebe o novo item; usar a seção de Novidades existente, sem duplicação manual nem deploy da landing. |
| Linear | INF-442 registra autorização, prontidão, execução e evidência. |
| Núcleo Hawks | Sem mudança normativa ou de contrato do feed; não se aplica propagação. |
| Galáxia/manuais/infraestrutura | Sem mudança de topologia, acessos ou operação; não se aplica atualização. |

## Recuperação e retenção

O deploy Git deve preservar as Functions e as variáveis do projeto Cloudflare `hawks-bi`. Se necessário, recuperar a versão anterior no histórico do mesmo projeto ou reverter o commit editorial, sem mexer nos canais do Agendo. Não alterar DNS nem projetos de app/staging. Worktree retida até publicação/integração verificadas e preservação das capturas; condição final será registrada no Linear.
