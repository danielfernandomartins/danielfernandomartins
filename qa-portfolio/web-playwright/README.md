# QA Web Automation — Playwright + TypeScript

Projeto de portfólio para vagas iniciais de **QA / Quality Assurance**, focado em automação E2E de uma aplicação web de demonstração com tecnologias frequentemente pedidas em vagas júnior.

## Objetivo

Demonstrar capacidade prática de:

- transformar fluxos de negócio em cenários de teste;
- automatizar testes web com **Playwright**;
- escrever testes em **TypeScript**;
- validar cenários positivos e negativos;
- gerar evidências reproduzíveis;
- executar testes automaticamente em **GitHub Actions**.

## Sistema sob teste

Os testes utilizam o **SauceDemo**, ambiente público criado para prática e demonstração de automação de testes.

## Cenários automatizados

1. Login válido
2. Login inválido
3. Inclusão de produto no carrinho
4. Validação do item no carrinho

## Stack

- Playwright
- TypeScript
- Node.js
- Git / GitHub
- GitHub Actions

## Estrutura

```text
web-playwright/
├── tests/
│   └── ecommerce.spec.ts
├── TEST-PLAN.md
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

- conhecimento básico de automação E2E;
- uso de seletores e asserts;
- organização de cenários de regressão;
- leitura de fluxo de usuário;
- automação dentro de pipeline CI;
- documentação de testes.

## Próximas evoluções

- Page Object Model;
- testes data-driven;
- execução cross-browser;
- evidências com screenshots e traces;
- integração com relatório de bugs.

## Autor

**Daniel Fernando Martins** — portfólio de transição estratégica para Tecnologia, com foco na interseção entre negócio, sistemas, qualidade e experiência do usuário.
