# Estado da adoção — hawks_site

11/10/2026. Base documental: [commit cabe358](https://github.com/BryanIlha/hawks_site/commit/cabe358fb445280881bb9df71c844a715ed5eeb9). Adoção Hawks 1.1.0 preparada em branch própria; integração/aceite pendentes. Sem alteração de runtime, dados, automações ou publicação. Esta leitura não comprova estado servido nem validação autenticada do produto.

Catálogo e ciclo de worktrees passam a ser exigidos pela proposta de adoção. Configuração é por cliente: Linear/n8n/GitHub responderam nesta conversa; Coolify não tem MCP conectado; o novo MCP Hawks requer credenciais próprias para Linear/OpenAI. Responsável humano e próxima data de configuração a definir em INF-392. Limpeza da worktree pendente de integração/aceite e preservação dos arquivos.


## Revalidação documental — 12/10/2026 (INF-401)

A proposta atual adota Hawks 1.2.1, pin `75710d621022e3333ab632e3fa2c3423b09fcc74`. Os seis prompts gerados e o pacote offline permanecem idênticos à fonte fixada. README e contrato foram atualizados para essa versão; a fotografia de 11/10 acima permanece histórica.

A branch `codex/inf-392-workflow` foi reconciliada com a adoção remota `b9a5f8768b0ee762bf99048d7f7916138d239996` e a base real `master`, SHA `d3876bf5fc461c5b5fa6f12966be3ab953e77749`. O snapshot documental local foi preservado no histórico; o código, assets, oito skills GSAP e a publicação de SEO existente foram preservados. Não há alteração funcional nem necessidade de novo deploy de runtime nesta entrega.

PR, CI do SHA final, integração e aceite continuam pendentes nesta fotografia. O estado posterior e a evidência de limpeza/retenção ficam na [INF-401](https://linear.app/infra-hawks/issue/INF-401/concluir-adocao-do-workflow-hawks-121-site-hawks); este documento não substitui o Linear.

A consulta GitHub mostrou `master` com `protected: false` e lista de rulesets vazia. A consulta detalhada de proteção retornou HTTP 403 (`Resource not accessible by integration`). É necessário acesso administrativo autorizado para tornar o check Hawks obrigatório e restringir bypass; não há confirmação de configuração nesta entrega.

A fonte central requer revisão dos rótulos antigos em `standards/toolkit.md`, `standards/worktrees.md` e `templates/execution.json`, além da frase de criação de espaço no passo 2 de `prompts/implement.md`, que deve explicitar a retomada de execução existente. Proposta registrada na INF-401 para consolidação central, sem editar cópias geradas nem trocar o pin. O coordenador também deve reconciliar o registro de adoção e a captura da Galáxia com o resultado final desta subtarefa.
