# Job Tracker

Aplicação de estudo para organizar candidaturas, demonstrando navegação com React Router, formulário controlado pelo navegador, estado tipado e resumo por status.

## O que este projeto demonstra

- rotas para dashboard e cadastro de candidatura;
- estado local tipado com React + TypeScript;
- atualização de status e dados derivados para o resumo;
- formulário com labels explícitos e validação de campos obrigatórios;
- navegação e controles com foco visível para teclado;
- layout responsivo para telas menores.

## Stack

React · TypeScript · React Router · Vite

## Executar localmente

```bash
npm install
npm run dev
```

## Validar antes de integrar

```bash
npm run typecheck
npm run build
```

## Limitações atuais

Os dados existem apenas em memória e são reiniciados ao recarregar a página. Este projeto ainda não possui persistência, testes automatizados ou integração com backend. Essas limitações são mantidas explícitas para não apresentar capacidades que o código ainda não comprova.
