# HAWKS BI — Direção visual e sistema de identidade

> Documento de referência para criar novas páginas, campanhas, apresentações e interfaces com a mesma linguagem visual da HAWKS BI.

**Status:** fonte de verdade para a implementação atual do site.  
**Última revisão:** 31 de julho de 2026.  
**Idioma principal:** português do Brasil.  
**Escopo:** identidade visual digital, direção de arte, interface, motion, escrita e uso de assets.

## 1. Essência da marca

### Em uma frase

HAWKS BI é uma marca de tecnologia operacional que transforma complexidade em controle: dados, automações e tecnologia apresentados com precisão, clareza e confiança.

### Personalidade

| A marca deve parecer | A marca não deve parecer |
| --- | --- |
| Precisa | Genérica |
| Operacional | Excessivamente conceitual |
| Sóbria | Fria ou sem personalidade |
| Confiante | Barulhenta |
| Editorial | Decorativa |
| Técnica | Complexa sem necessidade |
| Humana | Informal demais |

### Princípio de design

**A forma deve dar segurança para a decisão.** Cada elemento precisa explicar, orientar ou criar ritmo. O visual pode ser marcante, mas nunca deve competir com a proposta, com a leitura ou com a ação principal.

### Ideia estrutural

O sistema HAWKS BI trabalha com três frentes integradas:

1. **Dados** — organizar fluxos e criar base para decidir.
2. **Automação** — conectar sistemas e reduzir fricção operacional.
3. **Tecnologia** — criar softwares e integrações que acompanham o negócio.

Essas três frentes podem aparecer como capítulos de uma página, e não como três produtos isolados. A estética é a de **um sistema único com três orientações**.

## 2. Direção de arte

### Vibe aprovada

**Editorial técnico + engenharia de sistemas.**

O contraste entre preto quase absoluto, papel quente e laranja de sinal cria uma presença semelhante a um caderno técnico sofisticado: muito espaço, linhas finas, tipografia forte, informação bem indexada e um único acento cromático que indica ação ou estado.

### Cinco decisões que definem a Hawks

1. **Contraste alto:** o preto sustenta a autoridade; o papel traz humanidade; o laranja sinaliza movimento.
2. **Geometria visível:** módulos, eixos, grids, recortes e o cubo traduzem estrutura e integração.
3. **Tipografia sem ruído:** Instrument Sans carrega títulos, textos, navegação e labels; a hierarquia vem de escala, peso e espaçamento.
4. **Respiro editorial:** blocos grandes de espaço vazio são parte do design, não espaço desperdiçado.
5. **Movimento com intenção:** animação só existe para revelar estado, relação ou mudança de frente.

### Não adicionar por padrão

- Gradientes roxos, cianos ou azul-neon de estética SaaS.
- Glassmorphism pesado em áreas de conteúdo.
- Fotografia genérica de equipes sorrindo, data centers ou telas de dashboard.
- Ícones grossos e bibliotecas visuais que não tenham relação com a geometria da marca.
- Cartões iguais em um grid previsível quando uma composição editorial resolver melhor.
- Efeitos de brilho, glow, blur ou sombra usados apenas para “enfeitar”.
- Mistura de muitas famílias tipográficas.
- Textos vagos como “soluções inovadoras” sem um problema operacional concreto.

## 3. Sistema de cores

### Tokens oficiais da interface

Os nomes abaixo são os tokens usados no CSS do projeto. Quando uma nova tela for construída, prefira os nomes semânticos a repetir hexadecimais diretamente.

| Token | HEX | RGB | Função |
| --- | --- | --- | --- |
| `--ink` | `#080808` | `8, 8, 8` | Fundo principal, texto forte, superfície de autoridade |
| `--ink-soft` | `#141311` | `20, 19, 17` | Preto aquecido para variação de superfície |
| `--paper` | `#F5F0E7` | `245, 240, 231` | Fundo claro principal, texto sobre preto |
| `--paper-deep` | `#E1D7C7` | `225, 215, 199` | Papel escurecido, ênfase suave sobre fundo escuro |
| `--orange` | `#F2610A` | `242, 97, 10` | CTA, ação, estado ativo, destaque primário |
| `--orange-deep` | `#C84A04` | `200, 74, 4` | Hover/pressão, laranja de profundidade |
| `--signal` | `#F4A064` | `244, 160, 100` | Laranja claro, estado secundário, luz e tecnologia |
| `--muted` | `#B9B0A4` | `185, 176, 164` | Texto auxiliar sobre `--ink`, metadados |

### Linhas e overlays

| Token | Valor | Uso |
| --- | --- | --- |
| `--line-dark` | `rgba(245, 240, 231, 0.15)` | Divisórias sobre preto |
| `--line-light` | `rgba(8, 8, 8, 0.17)` | Divisórias sobre papel |
| Texto claro secundário | `rgba(245, 240, 231, 0.72–0.88)` | Leitura auxiliar no hero e em blocos escuros |
| Texto escuro secundário | `rgba(10, 10, 10, 0.58–0.76)` | Descrições e labels em blocos claros |
| Nav clara | `rgba(245, 240, 231, 0.97)` | Ilha de navegação flutuante |
| Readout escuro | `rgba(10, 10, 10, 0.78)` | Legenda sobre o cubo |

### Cores do logo

Os SVGs oficiais usam uma paleta própria de reprodução para manter a aparência do símbolo. Ela é próxima da paleta de interface, mas não deve ser “corrigida” automaticamente para os tokens de UI.

| Token de reprodução | HEX | Onde aparece |
| --- | --- | --- |
| Laranja do logo | `#FF7900` | Face laranja do símbolo |
| Sombra laranja | `#E65B00` | Profundidade da face laranja |
| Linha laranja | `#F26B00` | Contorno da face laranja |
| Preto do logo | `#080707` | Faces escuras e texto do wordmark |
| Preto de volume | `#1A1616` / `#171313` | Variações de luz nas faces escuras |
| Linha do logo | `#211B1B` | Contorno das formas escuras |
| Papel claro do logo | `#F5F0E7` | Reverse mark e texto claro |
| Luz do logo | `#FFFFFF` / `#F8F4ED` | Face superior e variações claras |
| Sombra de papel | `#D8CEC0` / `#E6DFD4` | Profundidade das faces claras |

### Regra de proporção cromática

Como ponto de partida, pense em uma composição com aproximadamente **60–70% de neutros escuros e claros, 20–30% de espaço vazio/linhas e 5–10% de laranja**. O laranja é um sinal de alta importância; se tudo for laranja, nada funciona como sinal.

### Regras de contraste

- Em fundo `--ink`, use `--paper` para texto principal e `--muted` somente para apoio.
- Em fundo `--paper`, use `--ink` para títulos e texto funcional; não use laranja para parágrafos longos.
- Reserve `--orange` para CTA, estado ativo, links de ação, marcadores e ênfase curta.
- Use `--signal` em superfícies de transição ou como segunda ênfase; não transforme o site inteiro em tons de laranja.
- Linhas devem ser percebidas como estrutura, não como molduras pesadas.

## 4. Tipografia

### Família oficial

**Instrument Sans Variable** é a família tipográfica atual do site, carregada com variação de largura e peso:

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&display=swap" rel="stylesheet" />
```

Fallback recomendado:

```css
font-family: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
```

Se uma nova aplicação precisar funcionar offline, hospede uma versão licenciada/local da fonte. A aparência da marca depende mais da estrutura tipográfica do que de um fallback arbitrário.

### Distribuição de pesos

| Peso | Uso | Sensação |
| ---: | --- | --- |
| 400 | Texto corrido, descrições, legendas longas | Claro e neutro |
| 450–500 | Leads, readouts, textos de apoio | Presença sem peso excessivo |
| 550–600 | Subtítulos e títulos de seção | Direção |
| 650 | H1, H2, H3 e mensagens principais | Autoridade e impacto |
| 700 | Navegação, labels, índices, botões | Precisão e escaneabilidade |

### Escala recomendada

| Papel | Tamanho sugerido | Entrelinha | Tracking |
| --- | --- | --- | --- |
| H1 hero | `clamp(3.8rem, 6.7vw, 6rem)` | `0.97` | `-0.045em` |
| H2 de seção | `clamp(3.2rem, 6.2vw, 5.7rem)` | `0.97–1.02` | `-0.045em` |
| H3 de card | `clamp(2.6rem, 4vw, 4rem)` | `0.97` | `-0.045em` |
| Lead | `1rem–1.18rem` | `1.60–1.70` | normal |
| Texto corrido | `0.95rem–1.05rem` | `1.60–1.70` | normal |
| Label funcional | `0.75rem` / 12px | `1.20` | `0.10–0.14em` |
| Microtexto | `0.70–0.75rem` | `1.20` | `0.10–0.14em` |

### Comportamento tipográfico

- Títulos grandes usam peso alto, largura controlada e tracking negativo.
- H1 e H2 podem usar `<em>` para uma frase curta em `--orange`; não aplique laranja em cada palavra.
- Use `text-wrap: balance` em títulos de impacto.
- Labels são preferencialmente em caixa alta, com tracking moderado. Nunca compense um tamanho muito pequeno com tracking exagerado.
- Texto de negócio permanece em português. Termos técnicos em inglês só entram quando forem a convenção real do domínio, como `Data warehouse` ou `Pipelines`.
- Não use uma serif ornamental para “parecer premium”. O premium da HAWKS BI vem da proporção, do espaço, da precisão e do material.

## 5. Grid, espaço e proporção

### Container principal

```css
.section-frame {
  width: min(100% - 4rem, 84rem);
  margin-inline: auto;
}
```

- Desktop: largura máxima de `84rem` / 1344px.
- Desktop compacto: o frame mantém `2rem` de respiro lateral em vez de colar no viewport.
- Mobile: `width: min(100% - 2rem, 44rem)`.
- O frame é uma borda de leitura. Elementos de atmosfera podem atravessar a largura, mas textos e ações devem respeitar o frame.

### Ritmo vertical

| Contexto | Espaço de referência |
| --- | ---: |
| Seção desktop ampla | `9rem–11rem` |
| Seção mobile | `7rem` |
| Distância entre eyebrow e título | `1.5rem–3rem` |
| Distância entre título e lead | `2rem` |
| Distância entre lead e ação | `3rem` |
| Padding interno de card | `1.35rem` |
| Respiro interno de card para conteúdo | `3.5rem–5rem` |
| Divisória e conteúdo | `1.2rem–1.45rem` |

### Breakpoints de comportamento

- **Desktop principal:** a partir de `900px`; hero em duas colunas e navegação completa.
- **Tablet/compacto:** abaixo de `900px`; navegação vira menu, colunas viram fluxo vertical e cards empilham.
- **Mobile:** abaixo de `560px`; ações ficam em largura total, selector vira lista vertical e grids viram uma coluna.
- Não use `h-screen` como altura semântica de seção. Prefira `min-height: 100svh` ou `100dvh` quando a seção realmente precisar ocupar a viewport.

### Geometria

- Linhas estruturais: 1px, baixo contraste.
- Divisórias: horizontais ou verticais, alinhadas ao grid.
- Pills: `border-radius: 999px` para navegação e CTAs.
- Indicadores circulares: `border-radius: 50%`.
- Cards de serviço da composição atual são retos, sem arredondamento decorativo. Se uma página futura introduzir raio, use-o como uma decisão de sistema e aplique-o de forma consistente, não card a card.
- Evite bordas cinzas genéricas. Use `--line-dark` ou `--line-light`.

## 6. Logo e identidade gráfica

### Arquivos canônicos

| Arquivo | Papel | Fundo preferencial |
| --- | --- | --- |
| `hawks-bi-mark.svg` | Símbolo compacto em preto, laranja e gradientes do logo | Papel e superfícies claras |
| `hawks-bi-mark-light.svg` | Símbolo reverso com faces claras e laranja | Preto e superfícies escuras |
| `hawks-bi-wordmark.svg` | Assinatura completa com símbolo + HAWKS BI escuro | Papel e superfícies claras |
| `hawks-bi-wordmark-reverse.svg` | Assinatura completa para fundo escuro | Preto e superfícies escuras |
| `hawks-bi-mark-mono-ink.svg` | Símbolo de uma cor escura | Aplicações técnicas, gravação, 1-bit |
| `hawks-bi-mark-mono-paper.svg` | Símbolo de uma cor clara | Aplicações técnicas sobre preto |

Os arquivos reutilizáveis estão em [`public/assets/brand-kit/`](../public/assets/brand-kit/). Os arquivos originais usados pela aplicação continuam em [`public/assets/brand/`](../public/assets/brand/).

### Escolha rápida

- Use o **wordmark** quando a marca precisa ser identificada por alguém que ainda não conhece a Hawks.
- Use o **mark** quando o contexto já nomeia a empresa ou quando o espaço é quadrado.
- Use a versão **light/reverse** em heros escuros, rodapés escuros, fundos `--ink` e fundos fotográficos suficientemente escuros.
- Use a versão **mono** somente quando a reprodução não comportar os gradientes ou a cor de assinatura.

### Área de proteção

Mantenha um espaço livre mínimo equivalente a **25% da largura do mark** em todos os lados. Para o wordmark, use como referência a altura total do símbolo: nenhum texto, moldura ou outro logo deve invadir esse perímetro.

### Tamanhos mínimos recomendados

- Mark digital: `24px` de altura; abaixo disso, prefira um favicon ou aplicação simplificada.
- Mark em apresentação: `32px–160px` de altura, conforme o espaço.
- Wordmark digital: `128px` de largura mínima para manter a leitura de `HAWKS BI`.
- Nunca aumente um PNG quando existir uma versão SVG.

### Proibições

- Não esticar, comprimir, inclinar ou redesenhar o símbolo.
- Não trocar o laranja por vermelho, amarelo, neon ou gradiente roxo.
- Não aplicar drop shadow pesado ao logo.
- Não colocar o mark dentro de uma bolha, badge ou círculo que não faça parte da composição.
- Não separar o texto `HAWKS BI` do símbolo do wordmark para criar um lockup improvisado.
- Não usar a versão escura sobre fundo preto nem a versão clara sobre fundo papel sem checar contraste.

## 7. Linguagem de imagens, 3D e texturas

### O cubo

O cubo 3×3×3 é a metáfora visual de um sistema composto por unidades que funcionam juntas. Ele deve comunicar:

- volume;
- integração;
- organização;
- orientação entre as três frentes;
- mudança de estado.

Ele não deve parecer um brinquedo, um Rubik genérico ou uma coleção de 27 produtos. A interface deve nomear apenas as três frentes externas: **Dados, Automação e Tecnologia**.

### Materiais

Quando o cubo for redesenhado ou reproduzido em ilustração, use três famílias de material:

1. **Preto aquecido:** base, profundidade e estabilidade.
2. **Papel claro:** clareza, informação e superfície de leitura.
3. **Laranja:** sinal, ação, transição e energia operacional.

O `--signal` pode aparecer como luz ou superfície de apoio, mas não deve virar um quarto sistema cromático independente.

### Texturas existentes

Os arquivos `public/assets/cube3/cube3-01.webp` a `cube3-27.webp` são texturas raster do cubo. Eles são materiais de uma única peça 3D, não logos e não 27 ícones separados.

Eles permanecem raster de propósito: uma fotografia/material WebP não ganha qualidade ao ser “vetorizada” automaticamente. Para máxima qualidade, preserve o WebP original para o cubo e use os SVGs do brand kit para logos, símbolos e elementos geométricos.

### Fotografia futura

Quando uma página pedir fotografia:

- prefira detalhes de operação, fluxos, interfaces abstratas, materiais, mãos e ambientes reais;
- use baixa saturação, preto, papel e laranja como pontos de intervenção;
- deixe a foto respirar, com muito espaço negativo;
- evite imagens de banco com estética de “inovação” genérica;
- não use fotografia como fundo de todas as seções; um gesto visual forte por página é suficiente.

### Gráficos e diagramas

- Use linhas finas e geometria ortogonal.
- Prefira 1 destaque laranja por unidade visual.
- Baseie visualizações em preto/papel, com laranja para o dado ou caminho que precisa ser percebido.
- Eixos, grids e labels devem ser legíveis; não transforme dados em textura decorativa.
- Use cantos retos, retículas discretas, marcadores quadrados ou circulares e índices `01 / 03`.

## 8. Componentes e composição

### Navegação — ilha flutuante

- É uma cápsula clara, separada do topo por cerca de `1.15rem`.
- Tem largura limitada, altura mínima de `5rem`, padding interno e raio total.
- Wordmark à esquerda; links centralizados; CTA à direita.
- No mobile, reduz para wordmark + botão de menu e abre um bloco claro logo abaixo.
- A navegação deve parecer um instrumento flutuante, não uma barra colada na borda da tela.

### Eyebrow

O eyebrow indexa uma seção antes de ela pedir atenção.

```html
<p class="eyebrow">
  <span class="eyebrow-mark" aria-hidden="true"></span>
  O que fazemos
</p>
```

- Caixa alta.
- `12px` como referência.
- Tracking de `0.10–0.14em`.
- Pequeno quadrado laranja como marcador.
- Nunca transformar o eyebrow em um parágrafo ou slogan longo.

### Títulos

- Uma ideia por título.
- Quebras de linha podem ser intencionais para criar ritmo editorial.
- O laranja enfatiza uma conclusão ou uma expressão-chave, não um bloco inteiro.
- Use largura controlada (`9ch–12ch`) para manter peso e não criar linhas longas demais.

### CTAs

O CTA primário é uma pill com um segundo círculo interno para a seta. Esse detalhe faz a ação parecer um pequeno objeto físico e cria um ponto de movimento.

```html
<a class="button button-primary" href="#contato">
  <span>Entre em contato.</span>
  <span class="arrow-capsule" aria-hidden="true">↗</span>
</a>
```

- Altura mínima entre `3rem` e `3.45rem`.
- Texto em caixa alta, peso 700, tracking moderado.
- A seta pode deslocar levemente para cima/direita no hover.
- O hover deve comunicar avanço, não transformar o CTA em outro componente.
- Use uma ação principal por bloco; links secundários podem ser textuais.

### Cards de serviço

O card é editorial, não uma caixa de software genérica:

1. Índice no topo (`01 / 03`) e sinal de estado.
2. Linha horizontal fina.
3. Subtítulo em uppercase.
4. Título grande.
5. Descrição curta e concreta.
6. Lista de capacidades.
7. Ação no rodapé.

Os três cards podem compartilhar estrutura, mas não precisam ter a mesma cor: papel, laranja e `--signal` formam a sequência atual.

### Readout do cubo

O readout é uma legenda operacional, não uma decoração. Deve conter:

- índice;
- frente ativa;
- kicker contextual;
- frase de resultado ou consequência.

Use `aria-live="polite"` quando o estado mudar. O texto do readout deve continuar fazendo sentido sem o 3D.

### Seções

A página institucional atual usa a seguinte sequência de atmosfera:

| Seção | Fundo | Papel narrativo |
| --- | --- | --- |
| Hero | `--ink` | Apresentar a promessa e o sistema de três frentes |
| Prova | `--ink` | Criar confiança com sinais objetivos |
| Serviços | `--paper` | Explicar as frentes de forma escaneável |
| Método | `--ink` | Mostrar processo, critério e disciplina |
| Contato | `--orange` | Encerrar com energia e ação |
| Footer | `--ink` | Assinatura e navegação residual |

Não é obrigatório repetir essa ordem em toda página, mas a alternância entre escuro, papel e laranja cria a cadência da marca.

### Footer

- Deve ser mais silencioso do que o hero.
- Use o wordmark com contraste correto.
- Liste as três frentes sem transformar o rodapé em um menu cheio.
- Inclua localidade e copyright como informação secundária.

## 9. Motion e comportamento

### Princípio

**Movimento revela relação.** Não animar para preencher a tela; animar para mostrar que uma coisa mudou, entrou ou ganhou foco.

### Curvas

Curva base da interface:

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

Para GSAP, a linguagem atual usa principalmente `power3.out`, `power4.out` e scrub controlado. Evite `linear` e `ease-in-out` em interações de marca.

### Durações

| Duração | Uso |
| ---: | --- |
| `260ms` | Cor de link e mudança de texto |
| `300ms–360ms` | Ícone, CTA, menu e microinteração |
| `620ms` | Elevação/entrada de card |
| `720ms–920ms` | Entrada de bloco e título |
| `1100ms` | Objeto 3D e transição visual principal |

### Regras de implementação

- Anime `transform` e `opacity` sempre que possível.
- Evite animar `top`, `left`, `width` ou `height` em loops.
- Pause o 3D quando estiver fora do viewport.
- O cubo pode flutuar suavemente depois de chegar ao estado; não deve flutuar enquanto ainda está girando.
- A seleção direta e o scroll precisam representar o mesmo estado; não deixe dois controladores discordarem.
- Toda animação relevante deve ter uma versão estática para `prefers-reduced-motion: reduce`.
- A função da animação precisa continuar legível sem animação.

### Entrada de conteúdo

Padrão sugerido: conteúdo entra com uma combinação leve de `translateY`, `opacity` e, quando apropriado, blur mínimo. O estado final deve ser nítido e estável. O primeiro viewport não deve depender de o usuário esperar uma longa sequência.

## 10. Voz e redação

### Tom

Direto, calmo, específico, competente e próximo. A Hawks fala como uma parceira de operação: explica o problema, mostra o sistema e reduz a sensação de risco.

### Estrutura de mensagem

Use a sequência:

1. **Problema observável:** o que trava, dispersa ou tira controle.
2. **Intervenção:** o que a Hawks constrói, integra ou organiza.
3. **Consequência:** o que muda na operação, na decisão ou na velocidade.
4. **Próximo passo:** uma conversa, diagnóstico ou definição de escopo.

### Palavras que combinam

`controle`, `clareza`, `operação`, `evidência`, `fluxos`, `decisão`, `integração`, `ritmo`, `sob medida`, `confiável`, `sistema`, `avançar`.

### Palavras que exigem prova

`revolucionário`, `disruptivo`, `exponencial`, `inteligente`, `inovador`, `automático`, `eficiente`, `resultado`.

Essas palavras só devem aparecer quando vierem acompanhadas de um contexto verificável, uma métrica ou uma descrição concreta do que mudou.

### Exemplos

**Bom:** “Organizamos os fluxos de dados para que a operação decida com a mesma informação.”  
**Fraco:** “Transformamos dados em inovação para o seu negócio.”

**Bom:** “Conectamos as ferramentas que hoje exigem conferência manual.”  
**Fraco:** “Automatizamos tudo com tecnologia de ponta.”

## 11. Tokens prontos para novas páginas

```css
:root {
  --hawks-ink: #080808;
  --hawks-ink-soft: #141311;
  --hawks-paper: #f5f0e7;
  --hawks-paper-deep: #e1d7c7;
  --hawks-orange: #f2610a;
  --hawks-orange-deep: #c84a04;
  --hawks-signal: #f4a064;
  --hawks-muted: #b9b0a4;
  --hawks-line-dark: rgba(245, 240, 231, 0.15);
  --hawks-line-light: rgba(8, 8, 8, 0.17);
  --hawks-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --hawks-frame: min(100% - 4rem, 84rem);
  --hawks-frame-mobile: min(100% - 2rem, 44rem);
  --hawks-radius-pill: 999px;
  --hawks-font: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
}
```

## 12. Checklist antes de publicar

### Identidade

- [ ] O logo é SVG e está usando a versão correta para o fundo.
- [ ] O mark/wordmark não foi distorcido, redesenhado ou comprimido.
- [ ] O laranja aparece como sinal, não como preenchimento indiscriminado.
- [ ] A paleta não ganhou azul-neon, roxo ou cinza neutro genérico.

### Tipografia

- [ ] Instrument Sans é a família dominante.
- [ ] Títulos usam peso e tracking corretos.
- [ ] Labels têm pelo menos 12px quando forem importantes para navegação.
- [ ] O texto pode ser compreendido sem depender de animação.

### Composição

- [ ] O frame respeita o respiro lateral.
- [ ] Existe espaço vertical suficiente entre os capítulos.
- [ ] Linhas seguem uma lógica de grid.
- [ ] O laranja tem uma função clara em cada bloco.
- [ ] O mobile não é apenas um desktop espremido.

### Conteúdo

- [ ] A página consegue dizer qual problema operacional resolve.
- [ ] A ação principal é clara e não há vários CTAs competindo.
- [ ] Claims de resultado têm evidência ou foram escritos como intenção.
- [ ] As três frentes mantêm os nomes Dados, Automação e Tecnologia.

### Motion

- [ ] As transições usam curvas não lineares e duração coerente.
- [ ] O 3D para fora do viewport.
- [ ] `prefers-reduced-motion` produz uma experiência completa.
- [ ] Nenhum elemento essencial aparece apenas depois de uma espera longa.

## 13. Estrutura de assets

```text
public/assets/
├── brand/
│   ├── hawks-bi-mark.svg            # fonte original da aplicação
│   ├── hawks-bi-mark-light.svg      # fonte original reversa
│   ├── hawks-bi-wordmark.svg        # fonte original da aplicação
│   ├── orange-hawks-bi-icon-transparent.png
│   └── orange-hawks-bi-transparent.png
├── brand-kit/
│   ├── README.md
│   ├── manifest.json
│   ├── hawks-bi-mark.svg
│   ├── hawks-bi-mark-light.svg
│   ├── hawks-bi-mark-mono-ink.svg
│   ├── hawks-bi-mark-mono-paper.svg
│   ├── hawks-bi-wordmark.svg
│   └── hawks-bi-wordmark-reverse.svg
└── cube3/
    └── cube3-01.webp ... cube3-27.webp  # materiais raster do cubo 3D
```

O `brand-kit` foi pensado como a pasta de handoff: contém versões vetoriais reutilizáveis, um manifesto e instruções rápidas. Os PNGs continuam disponíveis por compatibilidade, mas SVG deve ser a escolha para qualquer novo uso de logo.

## 14. Receita para criar uma nova página Hawks BI

1. Comece com uma superfície `--ink` ou `--paper`, nunca com um gradiente decorativo.
2. Defina uma promessa de uma linha e uma única ação primária.
3. Adicione um eyebrow com índice visual.
4. Use um H1 grande, Instrument Sans 650, com uma ênfase laranja curta.
5. Organize a informação em capítulos, linhas e relações; evite uma coleção de cards independentes.
6. Escolha um único gesto visual: mark grande, cubo, diagrama, textura ou fotografia.
7. Use `--orange` apenas para sinalizar decisão, estado ou avanço.
8. Feche com prova, método ou próximo passo concreto.
9. Revise a versão mobile e a versão reduzida de motion antes de considerar a página pronta.

---

**Fonte técnica desta documentação:** tokens, componentes, assets SVG, escalas tipográficas, breakpoints e comportamentos observados na implementação React/Vite da HAWKS BI em `src/styles.css`, `src/components/`, `src/lib/` e `public/assets/`.
