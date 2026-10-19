# Front-End Interview Guide — Daniel Fernando Martins

Este guia organiza como eu defenderia tecnicamente os principais projetos deste portfólio em uma entrevista para Front-End Júnior ou Pleno inicial.

## Minha base

Meu foco atual é **React + TypeScript**, apoiado por fundamentos de HTML, CSS e JavaScript. Eu procuro demonstrar não apenas que uma interface funciona, mas que consigo explicar estado, tipagem, consumo de APIs, acessibilidade, tratamento de erros, organização de código e trade-offs.

## 1. TaskFlow

**Problema:** organizar tarefas com persistência local e filtros.

**O que eu explicaria:**
- por que extraí a lógica para um hook `useTasks`;
- diferença entre estado principal e estado derivado;
- por que `useMemo` é usado apenas em cálculos derivados simples e previsíveis;
- como LocalStorage é carregado com fallback seguro;
- como os tipos `Task` e `TaskFilter` limitam estados inválidos;
- como aria-labels e estado vazio melhoram UX e acessibilidade.

**Trade-off:** para um app pequeno, Context/Redux seria excesso. Estado local + hook customizado mantém a solução simples.

## 2. Movie Explorer

**Problema:** consultar uma API REST e lidar com estados assíncronos.

**O que eu explicaria:**
- separação entre UI e camada `api.ts`;
- `async/await`, HTTP errors e `try/catch/finally`;
- estados de loading, erro e resultado vazio;
- `encodeURIComponent` para construir a query com segurança;
- tipagem da resposta externa;
- importância de texto alternativo nas imagens.

**Trade-off:** usei Fetch nativo porque o projeto é simples e não precisa de recursos adicionais de um cliente HTTP.

## 3. Finance Dashboard

**Problema:** gerenciar transações e indicadores financeiros com estado global.

**O que eu explicaria:**
- por que Redux Toolkit é usado aqui, mas não no TaskFlow;
- store, slice, action e selector;
- derivação de saldo/entradas/saídas sem duplicar estado;
- tipagem de `RootState` e `AppDispatch` a partir da store;
- validação de valores antes do dispatch;
- formatação monetária localizada.

**Trade-off:** Redux seria exagero para poucos componentes, mas o projeto existe para demonstrar organização de estado global e a API moderna do Toolkit.

## 4. GitHub Explorer

**Problema:** consultar dados remotos com cache e estados assíncronos.

**O que eu explicaria:**
- cliente Axios dedicado com `baseURL` e timeout;
- separação da função de acesso à API;
- `queryKey`, cache, `staleTime` e retry no TanStack Query;
- diferença entre estado do formulário e estado do servidor;
- por que não guardar a resposta da API em `useState` manual;
- estados de fetching e erro acessíveis.

**Trade-off:** React Query adiciona dependência, mas é apropriado quando cache, refetch e lifecycle de server state são parte do problema.

## Perguntas que eu espero receber

### “Por que React?”
Porque quero atuar em aplicações de produto baseadas em componentes e estado de interface. React também me permite demonstrar de forma clara fundamentos de JavaScript, composição e fluxo de dados.

### “Por que TypeScript?”
Porque reduz uma classe importante de erros, torna contratos explícitos e melhora manutenção e refatoração. No portfólio, o CI executa checagem strict para transformar isso em evidência.

### “Você usaria Redux em todo projeto?”
Não. Ferramenta deve responder ao problema. No TaskFlow, estado local é suficiente; no Finance Dashboard, Redux Toolkit demonstra um cenário de estado compartilhado e previsível.

### “O que falta para esses projetos serem produção?”
Mais cobertura de testes, observabilidade, autenticação quando aplicável, estratégia de deploy, monitoramento, analytics, gestão de ambiente, performance medida e validação real com usuários. Eu evito chamar laboratório de produção.

### “Como seu background financeiro ajuda?”
Ajuda principalmente em requisitos, compreensão de impacto de negócio, atenção a dados, comunicação com stakeholders e responsabilidade com mudanças. A parte técnica é demonstrada separadamente no código.

## Como avalio meu nível

Busco uma primeira oportunidade formal de Front-End. Meu objetivo é chegar com fundamentos fortes, capacidade de aprender em code review e maturidade profissional para trabalhar em equipe. Tecnologias adicionais são secundárias; prefiro conseguir explicar profundamente o que já uso.
