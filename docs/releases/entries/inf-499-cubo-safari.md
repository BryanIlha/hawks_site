# Fundo do cubo integrado à página no Safari

- id: inf-499-cubo-safari
- products: [hawks]
- type: fix
- editorial_status: pendente
- availability: producao
- integrated_at: 2026-10-27
- released_at: 2026-10-27
- issue: https://linear.app/infra-hawks/issue/INF-499
- pull_request: https://github.com/BryanIlha/hawks_site/pull/6
- commit: 533ec2db81aac0fdcb3d9eb692ccc62c2bc15ab2
- published_url: https://hawksbi.com.br/
- published_at: 2026-10-27 (conferencia no Safari e Chrome reais)
- weekly_post: pendente

## O que mudou

O pós-processamento do cubo preserva transparência fora da geometria e do brilho, em vez de pintar um retângulo opaco da mesma cor CSS da página. A cobertura inclui a radiância visível para manter a saída premultiplicada válida durante o brilho.

## Benefício e validação

Elimina a diferença de fundo reproduzida no Safari macOS do usuário. Reprodução no site publicado e na base local; comparação no Chrome do mesmo Mac; correção visual confirmada nos dois, com cubo fechado e peças abertas. Detalhes e limites em `docs/validation/INF-499-cubo-safari.md`. Produção no deployment Cloudflare `82bf115f-8238-4cbf-8ba3-43ad91dc1e26`; asset `HawksCube-Bqafqm7o.js` servido com a correção.
