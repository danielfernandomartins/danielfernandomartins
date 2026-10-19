# Auditoria Mestre Front-End

## Objetivo

Esta auditoria revisa o portfólio como um recrutador, tech lead e revisor de código avaliariam uma candidatura Front-End Júnior forte: clareza de posicionamento, consistência técnica, capacidade de manutenção, qualidade automatizada, acessibilidade, confiabilidade de build e honestidade profissional.

## Resultado executivo

O portfólio está estruturado para demonstrar profundidade em Front-End em vez de apenas quantidade de tecnologias. Os quatro projetos principais continuam sendo TaskFlow, Movie Explorer, Finance Dashboard e GitHub Explorer. O projeto Next.js funciona como evidência adicional de ecossistema moderno, e o Dev City Character Lab demonstra JavaScript, acessibilidade, upload de arquivos, estados assíncronos e integração opcional com IA. Os demais projetos funcionam como laboratório de competências complementares.

### Falhas corrigidas ao longo das auditorias

- dependências diretas deixaram de usar `latest` e passaram a versões explícitas;
- todos os projetos TypeScript modernos expõem `typecheck` e `lint`;
- a CI executa automaticamente qualquer suíte de testes disponível;
- TaskFlow ganhou domínio separado, persistência tolerante a falhas, testes unitários e testes de criação/conclusão/filtro/exclusão pela UI;
- Movie Explorer ganhou camada de API separada, testes HTTP e testes de resultado/estado vazio/erro na interface;
- Finance Dashboard ganhou reducer exportável, teste unitário e teste de integração entre formulário, Redux e resumo financeiro;
- GitHub Explorer separa cliente HTTP, tipos e estado assíncrono, testa a camada de API e testa a integração TanStack Query + UI;
- o projeto Next.js ganhou conteúdo tipado, rota dinâmica, metadata por nota, geração estática e testes de contratos de conteúdo;
- Smart Signup ganhou schema Zod isolado, validação acessível e testes das regras;
- Tested Cart passou a usar consultas acessíveis e testes de comportamento;
- Dev City Character Lab ganhou HTML semântico, validação de upload, tratamento de loading/erro/sucesso, fallback de IA, módulo de domínio e testes nativos;
- apps Vite possuem HTML completo com `lang`, viewport, descrição, título e `type: module` explícito;
- todos os apps TypeScript usam ESLint com `typescript-eslint` e regras oficiais de React Hooks;
- o CI executa lint antes de typecheck, build e testes;
- GitHub Actions foi atualizado para as releases v7 de `checkout` e `setup-node`;
- o workflow usa `concurrency` para cancelar runs superseded e timeouts explícitos para evitar jobs presos;
- a auditoria automatizada bloqueia perda dos testes de comportamento dos flagships, retorno de `latest`, perda de metadados, ausência de typecheck/lint e retorno do legado à raiz.

## Critérios mestres avaliados

### 1. Posicionamento profissional

- Front-End aparece primeiro e de forma inequívoca.
- React + TypeScript são o eixo técnico principal.
- experiência financeira é apresentada como diferencial de negócio, não como desvio de foco.
- projetos de estudo não são vendidos como experiência produtiva.

### 2. Arquitetura e manutenção

- projetos principais evitam concentrar toda a lógica no bootstrap.
- APIs, domínio e tipos são separados quando isso melhora legibilidade e testabilidade.
- TaskFlow possui domínio testável fora do hook.
- Finance Dashboard possui reducer isolável e testável.
- GitHub Explorer mantém cliente de API e estado assíncrono separados da inicialização.
- Next.js mantém conteúdo tipado fora da página e resolve rotas por slug.
- Dev City separa regras puras de validação/normalização da manipulação do DOM.

### 3. TypeScript e lint

- todos os projetos modernos possuem `tsconfig.json`.
- todos expõem `typecheck`.
- todos os apps TypeScript possuem lint explícito com zero warnings aceitos.
- o stack de lint usa uma faixa de TypeScript compatível com o `typescript-eslint`, evitando `--force` e `legacy-peer-deps`.
- CI executa lint e verificação estática antes do build.

### 4. Testes

Os quatro flagships agora possuem duas camadas complementares de teste:

- **TaskFlow:** regras puras de tarefas + fluxos reais da interface com React Testing Library;
- **Movie Explorer:** camada HTTP + estados de resultado, vazio e erro na UI;
- **Finance Dashboard:** reducer Redux + integração formulário → dispatch → store → resumo visual;
- **GitHub Explorer:** cliente/API + integração TanStack Query → renderização de perfil e nova busca.

Outras evidências:

- Next.js: contratos de conteúdo, slugs únicos e lookup usado nas rotas;
- Smart Signup: regras Zod de payload válido, senha fraca e confirmação divergente;
- Tested Cart: carrinho vazio e atualização de quantidade/total por comportamento visível;
- Dev City Character Lab: validação de arquivo, resposta da IA e geração do avatar.

A meta não é inflar cobertura artificialmente, e sim testar decisões que podem quebrar sem serem percebidas visualmente. Nos testes de interface, o foco é usar roles, labels e texto acessível em vez de acoplar a suíte a detalhes internos dos componentes.

### 5. Dependências e reprodutibilidade

As dependências diretas estão fixadas em versões explícitas. Isso reduz o risco de uma atualização implícita quebrar o portfólio sem alteração no código.

**Próxima evolução importante:** versionar `package-lock.json` de cada app e migrar integralmente a CI para `npm ci`. A CI já prefere `npm ci` automaticamente quando um lockfile estiver presente.

### 6. HTML, acessibilidade e apresentação

Os apps Vite possuem documento HTML completo com idioma, viewport, meta description e título. A landing page mantém skip link e requisitos explícitos de acessibilidade. Os flagships usam labels reais, estados anunciados, headings estruturais, foco visível e controles com semântica apropriada. O Dev City inclui skip link, `aria-live`, `aria-pressed`, validação de upload e suporte a `prefers-reduced-motion`.

### 7. CI e prevenção de regressão

O workflow `Front-End Portfolio Quality` executa:

1. auditoria estrutural do portfólio;
2. instalação das dependências;
3. lint em todos os apps TypeScript;
4. TypeScript strict/typecheck;
5. build de todos os projetos modernos;
6. testes disponíveis em cada projeto.

Além disso, o workflow usa Actions v7, permissões mínimas, cancelamento de execuções superseded e timeouts explícitos. O script `scripts/audit-frontend.mjs` bloqueia regressões de estrutura e exige a presença das evidências principais de teste dos flagships.

## Pontos que continuam externos ao código

Estes itens não podem ser resolvidos pela integração atual do GitHub e continuam exigindo configuração na interface do GitHub ou uma integração de deploy:

1. a descrição curta do repositório ainda menciona Backend e precisa ser alinhada manualmente para Front-End;
2. pins do perfil precisam ser configurados manualmente;
3. os projetos ainda precisam de demos públicas para reduzir o atrito de avaliação por recrutadores;
4. separar os quatro flagships em repositórios independentes aumentaria a força dos pins e a leitura individual de cada projeto.

## Regra para próximas evoluções

Não adicionar tecnologia apenas para aumentar a lista de stacks. Priorizar, nesta ordem:

1. demos públicas;
2. lockfiles e instalação 100% reproduzível;
3. acessibilidade e performance medidas em ambiente publicado;
4. testes E2E em um projeto com fluxo representativo;
5. repositórios individuais para os flagships;
6. colaboração real, code review e experiência em produto/time.

## Conclusão

A evolução do portfólio troca sinais de protótipo por sinais de engenharia: dependências controladas, contratos de qualidade, lint uniforme, testes em camadas diferentes, metadados completos, acessibilidade e regressões bloqueadas automaticamente. Os quatro flagships já demonstram não só lógica isolada, mas também comportamento observável de UI. O perfil permanece honesto sobre o nível profissional buscado, mas demonstra práticas que ajudam a diferenciar um candidato Júnior preparado de um repositório composto apenas por exercícios isolados.
