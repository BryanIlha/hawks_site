# Alinhar o caminho de navegação no celular

- id: inf-413-hawks-breadcrumb
- products: [hawks]
- type: fix
- editorial_status: pendente
- availability: implementado
- integrated_at: pendente
- released_at: pendente
- issue: https://linear.app/infra-hawks/issue/INF-413
- pull_request: pendente
- commit: pendente
- published_url: pendente
- published_at: pendente
- weekly_post: pendente

## O que mudou
Ajuste solicitado por Bruno em 15/10/2026 durante a revisão local. O link Início ficava abaixo da barra e do nome da página no breadcrumb mobile, pois somente os links eram centralizados em áreas de toque de 44 px. O contêiner e seus grupos agora compartilham alinhamento vertical central.

## Benefício e limites
O caminho de navegação fica alinhado no blog, nos artigos, nos produtos e nos serviços. As áreas de toque e a quebra de títulos longos são preservadas. Mudança em prévia local; integração e publicação pendentes.

## Validação
Build, check:seo, integridade Hawks e diff passaram. Playwright verificou blog, artigo de título longo, produto e serviço em 320, 390 e 1440 px: sem transbordamento, alvos mobile de 44 px preservados e centros dos textos do breadcrumb alinhados. Prévia aberta foi recarregada e conferida visualmente.
