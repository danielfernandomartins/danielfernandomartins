# Core Web Vitals — performance orientada a usuário

Performance Front-End deve ser tratada como experiência real, não apenas como nota de ferramenta.

As Core Web Vitals atuais são:

- **LCP — Largest Contentful Paint:** carregamento do conteúdo principal. Meta recomendada: até **2,5 s**.
- **INP — Interaction to Next Paint:** responsividade a interações. Meta recomendada: até **200 ms**.
- **CLS — Cumulative Layout Shift:** estabilidade visual. Meta recomendada: até **0,1**.

A avaliação recomendada considera o **75º percentil** de carregamentos, separando mobile e desktop.

## O que eu investigaria primeiro

### LCP

- imagens hero sem dimensões ou prioridade adequada;
- fontes bloqueando renderização;
- JavaScript excessivo antes do conteúdo principal;
- resposta lenta do servidor;
- CSS crítico atrasado.

### INP

- handlers longos;
- renderizações React desnecessárias;
- listas pesadas sem estratégia;
- trabalho síncrono no main thread;
- parsing/processamento que deveria ser adiado ou dividido.

### CLS

- imagens sem `width`/`height` ou `aspect-ratio`;
- conteúdo injetado acima da dobra;
- fontes provocando mudanças grandes de layout;
- componentes que mudam de tamanho sem espaço reservado.

## Medição: laboratório x campo

Lighthouse e testes locais são úteis para diagnóstico e regressão, mas não substituem dados de campo. Dispositivo, rede e padrão de interação alteram a experiência real.

## Estratégia profissional

1. medir;
2. localizar a causa dominante;
3. corrigir o gargalo de maior impacto;
4. repetir a medição;
5. evitar otimizações que aumentem complexidade sem benefício comprovado.

## Fonte primária

- Web Vitals — web.dev: https://web.dev/articles/vitals
