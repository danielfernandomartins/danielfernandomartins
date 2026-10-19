# QA Web Automation — Playwright + TypeScript

Projeto de portfólio para vagas iniciais de **QA / Quality Assurance**, focado em automação E2E de uma aplicação web de demonstração com tecnologias frequentemente pedidas em vagas júnior.

## Objetivo

Demonstrar capacidade prática de:

- transformar fluxos de negócio em cenários de teste;
- automatizar testes web com **Playwright**;
- escrever testes em **TypeScript**;
- validar cenários positivos e negativos;
- documentar testes em formato **BDD (Given / When / Then)**;
- registrar defeitos com clareza de impacto e evidência;
- gerar evidências reproduzíveis;
- executar testes automaticamente em **GitHub Actions**.

## Sistema sob teste

Os testes utilizam o **SauceDemo**, ambiente público criado para prática e demonstração de automação de testes.

## Cenários automatizados

1. Login válido
2. Login inválido
3. Inclusão de produto no carrinho
4. Validação do item no carrinho

## Evidências de QA

- [Plano de testes](TEST-PLAN.md)
- [Cenários BDD](BDD-SCENARIOS.md)
- [Exemplo de Bug Report](BUG-REPORT.md)
- testes automatizados em `tests/ecommerce.spec.ts`

## Stack

- Playwright
- TypeScript
- Node.js
- Git / GitHub
- GitHub Actions
- BDD
- Bug Reporting

## Estrutura

```text
web-playwright/
├── tests/
│   └── ecommerce.spec.ts
├── TEST-PLAN.md
├── BDD-SCENARIOS.md
├── BUG-REPORT.md
├── package.json
├── playwright.config.ts
└── README.md
```

## Como executar

```bash
npm install
npx playwright install chromium
npm test
```

Para visualizar o relatório HTML:

```bash
npx playwright show-report
```

## O que este case demonstra para recrutadores

- fundamentos de testes funcionais e E2E;
- uso de seletores e asserts;
- organização de cenários de regressão;
- BDD e tradução de requisito em comportamento esperado;
- documentação estruturada de defeitos;
- leitura de fluxo de usuário;
- automação dentro de pipeline CI;
- comunicação de qualidade para times técnicos e de negócio.

## Próximas evoluções

- Page Object Model;
- testes data-driven;
- execução cross-browser;
- evidências com screenshots e traces;
- integração de resultados a uma ferramenta de gestão de defeitos.

## Autor

**Daniel Fernando Martins** — portfólio de transição estratégica para Tecnologia, com foco na interseção entre negócio, sistemas, qualidade e experiência do usuário.
