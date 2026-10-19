# Auditoria Mestre Front-End

## Objetivo

Esta auditoria revisa o portfólio como um recrutador, tech lead e revisor de código avaliariam uma candidatura Front-End Júnior forte: clareza de posicionamento, consistência técnica, capacidade de manutenção, qualidade automatizada, acessibilidade, confiabilidade de build e honestidade profissional.

## Resultado executivo

O portfólio está estruturado para demonstrar profundidade em Front-End em vez de apenas quantidade de tecnologias. Os quatro projetos principais continuam sendo TaskFlow, Movie Explorer, Finance Dashboard e GitHub Explorer; os demais funcionam como laboratório de competências complementares.

### Falhas corrigidas nesta rodada

- dependências diretas deixaram de usar `latest` e passaram a versões explícitas;
- todos os projetos TypeScript modernos passaram a expor `typecheck`;
- a CI passou a executar automaticamente qualquer suíte de testes disponível;
- TaskFlow ganhou regras de domínio separadas e testes unitários;
- persistência do TaskFlow passou a validar dados recuperados e tolerar falhas de storage;
- Movie Explorer ganhou testes de sucesso e erro da camada de API;
- Finance Dashboard ganhou reducer exportável e teste de comportamento;
- apps Vite ganharam HTML completo com `lang`, viewport, descrição, título e cor de tema;
- auditoria automatizada passou a bloquear retorno de `latest`, perda de metadados, ausência de typecheck, perda de testes flagship e retorno do legado à raiz;
- CI continua responsável por build de todos os projetos modernos e TypeScript strict.

## Critérios mestres avaliados

### 1. Posicionamento profissional

- Front-End aparece primeiro e de forma inequívoca.
- React + TypeScript são o eixo técnico principal.
- experiência financeira é apresentada como diferencial de negócio, não como desvio de foco.
- projetos de estudo não são vendidos como experiência produtiva.

### 2. Arquitetura e manutenção

- projetos principais evitam concentrar toda a lógica no bootstrap.
- APIs e tipos são separados quando isso melhora legibilidade.
- TaskFlow possui domínio testável fora do hook.
- Finance Dashboard possui reducer isolável e testável.
- GitHub Explorer mantém cliente de API e estado assíncrono separados da inicialização.

### 3. TypeScript

- todos os projetos modernos possuem `tsconfig.json`.
- todos expõem `typecheck`.
- CI executa verificação estática antes do build.

### 4. Testes

Há testes automatizados em projetos que demonstram competências distintas:

- TaskFlow: lógica de domínio;
- Movie Explorer: integração da camada HTTP com estados de sucesso/erro;
- Finance Dashboard: reducer Redux;
- Tested Cart: comportamento de interface.

A meta não é inflar cobertura artificialmente, e sim testar decisões que podem quebrar sem serem percebidas visualmente.

### 5. Dependências e reprodutibilidade

As dependências diretas estão fixadas em versões explícitas. Isso reduz o risco de uma atualização implícita quebrar o portfólio sem alteração no código.

**Próxima evolução possível:** versionar `package-lock.json` de cada app e migrar integralmente a CI para `npm ci`. A CI já prefere `npm ci` automaticamente quando um lockfile estiver presente.

### 6. HTML, acessibilidade e apresentação

Os apps Vite possuem documento HTML completo com idioma, viewport, meta description e título. A landing page mantém skip link e requisitos explícitos de acessibilidade. Projetos principais usam labels, estados de erro/status e controles navegáveis.

### 7. CI e prevenção de regressão

O workflow `Front-End Portfolio Quality` executa:

1. auditoria estrutural do portfólio;
2. instalação das dependências;
3. TypeScript strict/typecheck;
4. build de todos os projetos modernos;
5. testes disponíveis em cada projeto.

O script `scripts/audit-frontend.mjs` bloqueia regressões de estrutura e qualidade que um build simples não detectaria.

## Pontos que continuam externos ao código

Estes itens não podem ser resolvidos pela integração atual do GitHub e continuam exigindo configuração na interface do GitHub ou uma integração de deploy:

1. descrição curta do repositório/perfil ainda precisa estar alinhada manualmente para Front-End;
2. pins do perfil precisam ser configurados manualmente;
3. os projetos ainda precisam de demos públicas para reduzir o atrito de avaliação por recrutadores;
4. separar os quatro flagships em repositórios independentes aumentaria a força dos pins e a leitura individual de cada projeto.

## Regra para próximas evoluções

Não adicionar tecnologia apenas para aumentar a lista de stacks. Priorizar, nesta ordem:

1. demos públicas;
2. lockfiles e instalação 100% reproduzível;
3. testes adicionais nos quatro flagships;
4. performance e acessibilidade medidas;
5. repositórios individuais para os flagships;
6. colaboração real, code review e experiência em produto/time.

## Conclusão

A principal evolução desta rodada foi trocar sinais de protótipo por sinais de engenharia: dependências controladas, contratos de qualidade, testes em camadas diferentes, metadados completos e regressões bloqueadas automaticamente. O portfólio permanece honesto sobre o nível profissional buscado, mas passa a demonstrar práticas que ajudam a diferenciar um candidato Júnior preparado de um repositório composto apenas por exercícios isolados.
