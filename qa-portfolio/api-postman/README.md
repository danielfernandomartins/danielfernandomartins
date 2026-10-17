# QA API Testing — Postman + Newman

Projeto simples de portfólio para vagas iniciais de **QA / Quality Assurance**, focado em testes de API REST com **Postman** e execução automatizada via **Newman**.

## Objetivo

Demonstrar conhecimento prático de:

- métodos HTTP;
- status codes;
- validação de payload JSON;
- cenários positivos e negativos;
- testes automatizados de API;
- execução em linha de comando com Newman;
- integração de testes em CI.

## API utilizada

Os testes usam a API pública **JSONPlaceholder** como sistema sob teste.

## Cenários cobertos

1. Consultar lista de usuários
2. Consultar usuário existente
3. Validar usuário inexistente
4. Criar um novo post
5. Validar campos essenciais da resposta

## Stack

- Postman
- Newman
- JavaScript em assertions
- REST API
- JSON
- Git / GitHub
- GitHub Actions

## Estrutura

```text
api-postman/
├── collection/
│   └── qa-api.postman_collection.json
├── TEST-PLAN.md
├── package.json
└── README.md
```

## Como executar

```bash
npm install
npm test
```

## O que este case demonstra para recrutadores

- entendimento de APIs REST;
- validação de status code e resposta;
- uso de assertions em Postman;
- automação com Newman;
- organização de cenários de teste;
- capacidade de integrar qualidade ao fluxo de desenvolvimento.

## Próximas evoluções

- uso de environment variables;
- testes data-driven;
- JSON Schema validation;
- autenticação;
- testes de contrato;
- execução contra uma API própria do portfólio.

## Autor

**Daniel Fernando Martins** — portfólio de transição para Tecnologia com foco em qualidade, sistemas, negócio e experiência do usuário.
