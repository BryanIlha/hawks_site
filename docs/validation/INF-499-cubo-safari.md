# INF-499 — fundo do cubo no Safari

## Diagnóstico — 27/10/2026

Base `a3da4029b95386030e5d23bb218c3a06421dddf4`, repositório `BryanIlha/hawks_site`, integração `master`. Executor: Codex. Pedido humano: descobrir e resolver o retângulo preto visível neste computador.

- Safari real no Mac do usuário: retângulo reproduzido no site publicado, mantido após recarga e reproduzido na mesma base local.
- Chrome real no mesmo Mac: sem o defeito.
- Desativar multisampling não resolveu. O diagnóstico temporário leu RGB final `[8,8,8,255]` no framebuffer do Safari mesmo com diferença visual para CSS. Não há evidência para atribuir a cache, extensão ou placa defeituosa.
- O compositor forçava alpha 1 e pintava um backdrop. A transparência fora do cubo elimina a dependência de equivalência visual entre CSS e a superfície WebGL opaca do Safari.

## Implementação e revisão

`src/lib/cubeGlow.ts`: remove backdrop artificial; mantém RGB e pipeline OutputPass; alpha é o máximo entre cobertura da superfície e radiância convertida para sRGB, limitado a 1. Pixels vazios têm RGBA zero; cores visíveis conservam alpha suficiente para a composição premultiplicada do canvas. Sem detecção de navegador, mudança de configurações do Mac ou alteração de layout, materiais, movimento, formulário ou destinos.

Revisão pelo executor: verificados alpha zero fora da cena por construção, cobertura do brilho, mesma conversão sRGB do OutputPass e restauração de materiais já existente. Não modifica dados, API, autorização ou infraestrutura: respectivas linhas da matriz comum não se aplicam. UI/código e publicação aplicam-se.

## Evidências

- Safari e Chrome reais: cubo fechado e peças abertas com brilho, sem retângulo após recarga completa.
- `npm run lint`, `npm run build`, `python3 .hawks/check.py`, `git diff --check`: aprovados. Build registra aviso de tamanho do chunk Three.js, sem falha.
- Instrumentação diagnóstica e cores de teste removidas antes da validação final.
- Capturas preservadas fora do repositório público, no resultado da conversa; não incluir abas ou dados pessoais nas notas públicas.

## Capacidades e limites

Impeccable 4.4.0: skill, harden e craft-floor lidos; PRODUCT/DESIGN lidos diretamente. O launcher foi chamado na pasta externa à cópia do repo e não encontrou contexto; nenhuma diretriz de redesenho foi aplicada. Browser CUA usado para Safari nativo e Chrome. Linear MCP de issues funcional; `get_agent_context` respondeu ferramenta ausente. Verificador `check-worktree.mjs` não está no pacote fixado: identidade conferida diretamente por Git (branch própria e worktree registrada fora do checkout principal). Catálogo e padrões fixados no manifesto consultados. Teste físico de iPhone não realizado.

## Sincronização

| Fonte | Impacto e ação |
| --- | --- |
| Linear INF-499 | Registrar diagnóstico, PR, SHA e publicação real. |
| Código e nota de release | Alteração estreita e registro `inf-499-cubo-safari.md`. |
| PRODUCT/DESIGN/contrato | Identidade, produto e comandos mantidos; sem atualização necessária. |
| Padrões centrais, Galáxia e consumidores | Sem mudança de processo, infraestrutura ou contrato compartilhado; não se aplica. |

## Publicação e recuperação

Publicar pelo deploy Git existente do projeto Cloudflare Pages `hawks-bi`, preservando Functions e variáveis. Conferir asset novo servido e Safari real após integração. Reverter a alteração por commit se houver regressão. Integração/publicação ainda pendentes neste registro inicial.

Worktree da INF-499 retida até integração, comprovação da versão servida e encerramento seguro dos processos próprios. Não remover recursos alheios.
