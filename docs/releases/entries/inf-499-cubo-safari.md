# Fundo do cubo integrado à página no Safari

- id: inf-499-cubo-safari
- products: [hawks]
- type: fix
- editorial_status: pendente
- availability: implementado
- integrated_at: pendente
- released_at: pendente
- issue: https://linear.app/infra-hawks/issue/INF-499
- pull_request: pendente
- commit: consultar PR
- published_url: pendente
- published_at: pendente
- weekly_post: pendente

## O que mudou

O pós-processamento do cubo preserva transparência fora da geometria e do brilho, em vez de pintar um retângulo opaco da mesma cor CSS da página. A cobertura inclui a radiância visível para manter a saída premultiplicada válida durante o brilho.

## Benefício e validação

Elimina a diferença de fundo reproduzida no Safari macOS do usuário. Reprodução no site publicado e na base local; comparação no Chrome do mesmo Mac; correção visual confirmada nos dois, com cubo fechado e peças abertas. Detalhes e limites em `docs/validation/INF-499-cubo-safari.md`. Disponibilidade pública depende de integração e conferência do deploy.
