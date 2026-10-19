# Baseline — Web Platform moderna com compatibilidade explícita

Baseline organiza recursos da Web Platform por disponibilidade nos principais navegadores, ajudando a responder uma pergunta prática: **posso usar este recurso com segurança no público que preciso atender?**

Em 2026, o conjunto Baseline continua sendo atualizado e já pode ser integrado a ferramentas como Lighthouse.

## Por que isso importa

Um Front-End moderno não precisa depender sempre de bibliotecas para resolver problemas que o navegador já resolve bem. Ao mesmo tempo, adotar uma API nova sem olhar compatibilidade pode criar regressões difíceis de perceber.

Baseline ajuda a equilibrar inovação e previsibilidade.

## Como eu usaria no dia a dia

Antes de adotar uma API nativa nova, eu verificaria:

1. status no Baseline;
2. navegadores realmente suportados pelo produto;
3. existência de progressive enhancement simples;
4. custo de polyfill ou fallback;
5. ganho real frente à solução atual.

## Exemplos de áreas que merecem acompanhamento

- View Transitions;
- Container Queries;
- CSS nesting;
- `:has()`;
- Popover API;
- `<dialog>`;
- novas APIs de formulários e navegação;
- recursos modernos de JavaScript e coleções.

O ponto não é usar tudo. É saber quando o navegador já oferece uma solução suficientemente robusta para reduzir dependências e código customizado.

## Progressive enhancement

Quando uma experiência principal funciona sem um recurso novo, a API moderna pode entrar como melhoria opcional. Isso reduz risco e aumenta alcance.

## Fonte primária

- Baseline — web.dev: https://web.dev/baseline
