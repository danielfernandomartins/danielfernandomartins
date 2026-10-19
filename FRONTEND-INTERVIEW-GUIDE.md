# Front-End Interview Guide — Daniel Fernando Martins

Este guia organiza como eu defenderia tecnicamente os principais projetos deste portfólio em uma entrevista para Front-End Júnior ou Pleno inicial.

## Minha base

Meu foco atual é **React + TypeScript**, apoiado por fundamentos de HTML, CSS e JavaScript. Eu procuro demonstrar não apenas que uma interface funciona, mas que consigo explicar estado, tipagem, consumo de APIs, acessibilidade, tratamento de erros, organização de código, testes em camadas e trade-offs.

## 1. TaskFlow

**Problema:** organizar tarefas com persistência local e filtros.

**O que eu explicaria:**
- por que extraí a lógica para um hook `useTasks`;
- diferença entre estado principal e estado derivado;
- por que `useMemo` é usado apenas em cálculos derivados simples e previsíveis;
- como LocalStorage é carregado com fallback seguro;
- como os tipos `Task` e `TaskFilter` limitam estados inválidos;
- como labels, `aria-pressed`, estados vazios e foco melhoram a acessibilidade;
- por que mantenho testes unitários das regras e, separadamente, testes de comportamento da UI para criar, concluir, filtrar e excluir tarefas.

**Trade-off:** para um app pequeno, Context/Redux seria excesso. Estado local + hook customizado mantém a solução simples. Os testes de UI não substituem os testes puros; eles protegem outra camada do comportamento.

## 2. Movie Explorer

**Problema:** consultar uma API REST e lidar com estados assíncronos.

**O que eu explicaria:**
- separação entre UI e camada `api.ts`;
- `async/await`, HTTP errors e `try/catch/finally`;
- estados de loading, erro e resultado vazio;
- `encodeURIComponent` para construir a query com segurança;
- tipagem da resposta externa;
- importância de texto alternativo nas imagens;
- por que a camada HTTP tem testes próprios e a UI também é testada com a API mockada;
- como os testes da interface validam resultado, vazio e erro sem depender da rede real.

**Trade-off:** usei Fetch nativo porque o projeto é simples e não precisa de recursos adicionais de um cliente HTTP. Nos testes, mockar a função de API deixa claro que estou testando a reação da interface, não o serviço externo.

## 3. Finance Dashboard

**Problema:** gerenciar transações e indicadores financeiros com estado global.

**O que eu explicaria:**
- por que Redux Toolkit é usado aqui, mas não no TaskFlow;
- store, slice, action e selector;
- derivação de saldo/entradas/saídas sem duplicar estado;
- tipagem de `RootState` e `AppDispatch` a partir da store;
- validação de valores antes do dispatch;
- formatação monetária localizada;
- diferença entre testar o reducer isoladamente e testar a integração formulário → dispatch → store → UI;
- por que cada teste de integração cria uma store própria para evitar vazamento de estado.

**Trade-off:** Redux seria exagero para poucos componentes, mas o projeto existe para demonstrar organização de estado global e a API moderna do Toolkit. O teste de integração comprova que a arquitetura funciona conectada, não apenas que o reducer funciona sozinho.

## 4. GitHub Explorer

**Problema:** consultar dados remotos com cache e estados assíncronos.

**O que eu explicaria:**
- cliente Axios dedicado com `baseURL` e timeout;
- separação da função de acesso à API;
- `queryKey`, cache, `staleTime` e retry no TanStack Query;
- diferença entre estado do formulário e estado do servidor;
- por que não guardar a resposta da API em `useState` manual;
- estados de fetching e erro acessíveis;
- por que os testes de UI recebem um `QueryClient` isolado por cenário;
- diferença entre testar a construção da URL na camada HTTP e testar renderização/nova busca na integração React Query + UI.

**Trade-off:** React Query adiciona dependência, mas é apropriado quando cache, refetch e lifecycle de server state são parte do problema. Nos testes, isolar o `QueryClient` evita que cache de um caso contamine outro.

## 5. Dev Portfolio Blog — Next.js

**Problema:** demonstrar App Router sem inventar backend ou CMS.

**O que eu explicaria:**
- por que o conteúdo fica tipado em `app/content.ts`;
- rota dinâmica `app/notas/[slug]/page.tsx`;
- uso de `generateStaticParams` para pré-gerar slugs conhecidos;
- `generateMetadata` para título e descrição por página;
- `notFound()` para slug inválido;
- Server Components como padrão;
- testes dos contratos de conteúdo, slugs únicos e lookup usado nas rotas.

**Trade-off:** conteúdo local é suficiente para demonstrar arquitetura do App Router sem adicionar CMS, banco ou API fictícia que não resolveriam um problema real deste portfólio.

## Perguntas que eu espero receber

### “Por que React?”
Porque quero atuar em aplicações de produto baseadas em componentes e estado de interface. React também me permite demonstrar de forma clara fundamentos de JavaScript, composição e fluxo de dados.

### “Por que TypeScript?”
Porque reduz uma classe importante de erros, torna contratos explícitos e melhora manutenção e refatoração. No portfólio, o CI executa checagem strict para transformar isso em evidência.

### “Você usaria Redux em todo projeto?”
Não. Ferramenta deve responder ao problema. No TaskFlow, estado local é suficiente; no Finance Dashboard, Redux Toolkit demonstra um cenário de estado compartilhado e previsível.

### “Qual a diferença entre seus testes unitários e de integração?”
Os testes unitários validam regras isoladas, como reducer, domínio de tarefas ou construção de URL. Os testes de integração/UI validam como essas regras aparecem conectadas ao React: eventos de formulário, store, cache, estados assíncronos e renderização acessível. Eu prefiro manter as duas camadas porque elas falham por motivos diferentes.

### “Por que usar React Testing Library?”
Porque ela incentiva testes próximos da forma como o usuário encontra a interface. Eu priorizo roles, labels e texto acessível em vez de selecionar detalhes internos do componente. Isso também ajuda a detectar problemas de acessibilidade durante o teste.

### “O que o CI garante hoje?”
A matriz executa lint, TypeScript strict, build e testes nos apps modernos, além de uma auditoria estrutural que protege metadados, configuração ESM, evidências de testes, dependências explícitas e isolamento do legado. O workflow usa Actions v7, timeouts e concorrência controlada.

### “O que falta para esses projetos serem produção?”
Deploy público, lockfiles versionados, performance e acessibilidade medidas em ambiente publicado, estratégia de observabilidade, autenticação quando aplicável, monitoramento, analytics, gestão de ambiente e validação real com usuários. Eu evito chamar laboratório de produção.

### “Como seu background financeiro ajuda?”
Ajuda principalmente em requisitos, compreensão de impacto de negócio, atenção a dados, comunicação com stakeholders e responsabilidade com mudanças. A parte técnica é demonstrada separadamente no código.

## Como avalio meu nível

Busco uma primeira oportunidade formal de Front-End. Meu objetivo é chegar com fundamentos fortes, capacidade de aprender em code review e maturidade profissional para trabalhar em equipe. Tecnologias adicionais são secundárias; prefiro conseguir explicar profundamente o que já uso.
