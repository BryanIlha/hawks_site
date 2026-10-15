# Blog central com distribuição por produto

- id: inf-413-hawks-blog
- products: [hawks]
- type: feature
- editorial_status: pendente
- availability: producao
- integrated_at: 2026-10-15
- released_at: 2026-10-15T13:45:46Z
- issue: https://linear.app/infra-hawks/issue/INF-413
- pull_request: https://github.com/BryanIlha/hawks_site/pull/2
- commit: c1d1a83dc08cf4cb891d992de764d6b9337b8571
- published_url: pendente
- published_at: pendente
- weekly_post: pendente

## O que mudou
O blog central publica metadados dos artigos em feeds públicos por produto. As landings Visto, Agendo e Conexo listam os respectivos posts, mantendo título, resumo, data e indicação de disponibilidade. Artigos continuam no site central; uma atualização da fonte alimenta todas as listas.

## Por que ajuda
O visitante acompanha a evolução do produto na própria landing e abre o artigo completo no blog Hawks. Erro de rede oferece nova tentativa e o blog filtrado; ausência de conteúdo fica explícita.

## Evidências e limitações
Builds e checks proporcionais passaram. Testes de parsing do feed, renderização e browser confirmaram filtros, loading/erro/retry/vazio, 320/390/768/1440 px e movimento reduzido. Nos testes locais, o browser recebeu o feed gerado pelo site central via interceptação de rede; publicação do endpoint/CORS e disponibilização nos domínios oficiais ainda são pendentes. Nenhum post semanal foi publicado.

Disponibilidade do site e feeds confirmada em15/10/2026; editorial permanece pendente. Prova em docs/validation/INF-413-production.md.
