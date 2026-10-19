# Auditoria Mestre Front-End

## Objetivo

Esta auditoria revisa o portfólio como um recrutador, tech lead e revisor de código avaliariam uma candidatura Front-End Júnior forte: clareza de posicionamento, consistência técnica, capacidade de manutenção, qualidade automatizada, acessibilidade, confiabilidade de build e honestidade profissional.

## Resultado executivo

O portfólio está estruturado para demonstrar profundidade em Front-End em vez de apenas quantidade de tecnologias. Os quatro projetos principais continuam sendo TaskFlow, Movie Explorer, Finance Dashboard e GitHub Explorer. O projeto Next.js funciona como evidência adicional de ecossistema moderno, e o Dev City Character Lab demonstra JavaScript, acessibilidade, upload de arquivos, estados assíncronos e integração opcional com IA. Os demais projetos funcionam como laboratório de competências complementares.

### Falhas corrigidas ao longo das auditorias

- dependências diretas deixaram de usar `latest` e passaram a versões explícitas;
- todos os projetos TypeScript modernos expõem `typecheck` e `lint`;
- a CI executa automaticamente qualquer suíte de testes disponível;
- TaskFlow ganhou regras de domínio separadas, persistência tolerante a falhas e testes unitários;
- Movie Explorer ganhou camada de API separada e testes de sucesso/erro;
- Finance Dashboard ganhou reducer exportável e teste de comportamento;
- GitHub Explorer separa cliente HTTP, tipos e estado assíncrono e testa a camada de API;
- o projeto Next.js ganhou conteúdo tipado e testes automatizados;
- Dev City Character Lab ganhou HTML semântico, validação de upload, tratamento de loading/erro/sucesso, fallback de IA, módulo de domínio e testes nativos;
- apps Vite possuem HTML completo com `lang`, viewport, descrição e título;
- todos os apps TypeScript usam ESLint com `typescript-eslint` e regras oficiais de React Hooks;
- o CI executa lint antes de typecheck, build e testes;
- GitHub Actions foi atualizado para as releases v7 de `checkout` e `setup-node`;
- o workflow usa `concurrency` para cancelar runs superseded e timeouts explícitos para evitar jobs presos;
- a auditoria automatizada bloqueia retorno de `latest`, perda de metadados, ausência de typecheck/lint, perda de testes e retorno do legado à raiz.

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
- Next.js mantém conteúdo tipado fora da página.
- Dev City separa regras puras de validação/normalização da manipulação do DOM.

### 3. TypeScript e lint

- todos os projetos modernos possuem `tsconfig.json`.
- todos expõem `typecheck`.
- todos os apps TypeScript possuem lint explícito com zero warnings aceitos.
- o stack de lint foi alinhado a TypeScript 6.0.3, dentro da faixa suportada pelo `typescript-eslint` 8.71.2, evitando `--force` e `legacy-peer-deps`.
- CI executa lint e verificação estática antes do build.

### 4. Testes

Há testes automatizados em projetos que demonstram competências distintas:

- TaskFlow: lógica de domínio e tarefas;
- Movie Explorer: camada HTTP e estados de sucesso/erro;
- Finance Dashboard: reducer Redux;
- Next.js: conteúdo tipado e contratos da camada de dados local;
- GitHub Explorer: construção de URL e camada de API;
- Tested Cart: comportamento de interface;
- Dev City Character Lab: validação de arquivo, resposta da IA e geração do avatar.

A meta não é inflar cobertura artificialmente, e sim testar decisões que podem quebrar sem serem percebidas visualmente.

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

Além disso, o workflow usa Actions v7, permissões mínimas, cancelamento de execuções superseded e timeouts explícitos. O script `scripts/audit-frontend.mjs` bloqueia regressões de estrutura e qualidade que um build simples não detectaria.

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
3. testes de comportamento/UI adicionais nos flagships;
4. performance e acessibilidade medidas;
5. repositórios individuais para os flagships;
6. colaboração real, code review e experiência em produto/time.

## Conclusão

A evolução do portfólio troca sinais de protótipo por sinais de engenharia: dependências controladas, contratos de qualidade, lint uniforme, testes em camadas diferentes, metadados completos, acessibilidade e regressões bloqueadas automaticamente. O perfil permanece honesto sobre o nível profissional buscado, mas demonstra práticas que ajudam a diferenciar um candidato Júnior preparado de um repositório composto apenas por exercícios isolados.
