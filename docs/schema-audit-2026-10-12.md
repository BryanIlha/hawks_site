# Dados estruturados — Hawks BI e produtos

Revisão com a skill `schema`, em 12/10/2026. Escopo: identidade da Hawks em Gravataí, páginas de Visto, Agendo e Conexo e catálogo `/produtos/`. Nenhuma alteração de layout ou de disponibilidade dos produtos.

## Correções

- A entidade existente `https://hawksbi.com.br/#organization` agora representa `Organization` e `LocalBusiness`, sem criar uma segunda empresa desconectada.
- Endereço completo, bairro, CEP, país, telefone internacional, e-mail comercial, atendimento de segunda a sexta das 09h às 20h e área atendida em Gravataí. São fatos confirmados pelo responsável e presentes na seção de contato.
- Cada página de produto tem uma entidade `WebApplication`, subtipo de `SoftwareApplication`, ligada à página por `mainEntity` e `mainEntityOfPage` e à Hawks por `creator` e `publisher`.
- Nome, descrição, categoria, imagem, endereço do aplicativo, recursos e nota de disponibilidade vêm do mesmo conteúdo usado na página. Visto e Agendo estão em operação; Conexo está em validação.
- O catálogo usa `CollectionPage` e `ItemList` com as três páginas na ordem da vitrine. Isso descreve a lista; não promete um carrossel de software no Google.
- Breadcrumbs preservados e referências entre entidades verificadas. A marcação sai no HTML pré-renderizado, antes da execução do JavaScript, e continua consistente após a inicialização do site.

## Elegibilidade e dados ainda ausentes

- LocalBusiness: `name` e endereço completos; teste de resultados avançados do Google reconheceu um item local válido e um item de organização válido. Há um aviso opcional sobre `priceRange`: nenhum intervalo de preço comercial foi confirmado, portanto não foi inventado.
- Aplicativos: marcação semântica válida em Schema.org. Para o resultado avançado de aplicativos, o Google exige oferta com preço e avaliação/review real. Esses dados não estão publicados nas páginas, então não há `offers`, preço zero, `aggregateRating` ou `review` fictícios. A ausência limita esse formato avançado; não impede a indexação normal das páginas.
- Também não foram inventados coordenadas da sede, CNPJ/razão social, perfis sociais, URL pública do Perfil da Empresa, versões dos softwares ou capturas de tela. Adicionar esses campos somente com fontes confirmadas e conteúdo correspondente.
- Não foram adicionados FAQ, HowTo ou SearchAction para tentar obter recursos descontinuados.

## Verificação

- `npm run build`: 12 páginas e 404 pré-renderizadas.
- `npm run check:seo`: metadados, links, sitemap, mídia, dados locais, três softwares, catálogo e referências consistentes com o HTML.
- Schema.org Validator: home, Visto, Agendo, Conexo e catálogo sem erros ou avisos, testados pelo código JSON-LD gerado.
- Google Rich Results Test, código gerado do Visto: breadcrumbs, empresa local e organização válidos. A entidade de aplicativo apresenta uma pendência crítica para o formato avançado, devido aos campos de elegibilidade ainda ausentes. O teste sinalizou `offers`, `aggregateRating` e `operatingSystem`; não foram inventadas ofertas, avaliações nem uma lista de sistemas operacionais suportados. A documentação do Google exige preço e review/rating para esse formato. Essa pendência foi informada ao responsável e permanece visível.
- O verificador da publicação também valida o JSON-LD efetivamente entregue pelo servidor; uma versão antiga ou um dado local incorreto faz o comando falhar.
- Evidências e resultados finais de publicação são registrados junto da revisão local, sem incluir arquivos gerados de `dist` no commit de origem.

## Referências oficiais

- [Negócios locais](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Aplicativos de software](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Galeria de recursos do Google](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [WebApplication](https://schema.org/WebApplication)
- [Status de desenvolvimento](https://schema.org/creativeWorkStatus)

Validação não garante exibição de resultados avançados nem posição em buscas por Gravataí. Após a publicação, o Google precisa rastrear a versão atualizada.
