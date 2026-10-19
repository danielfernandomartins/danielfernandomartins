# Job Tracker

Aplicação para organizar candidaturas com navegação por rotas, formulário de cadastro, atualização de status e resumo do funil.

## O que demonstra

- React Router com rotas para dashboard e nova candidatura;
- componentes estáveis separados do `App`, evitando criação durante render;
- estado tipado para candidatura e status;
- dados derivados para total, entrevistas e ofertas;
- formulários com labels reais e autocomplete adequado;
- controles de status acessíveis e foco visível;
- estado vazio explícito;
- ESLint, TypeScript strict e build validados no CI.

## Stack

React · TypeScript · React Router · Vite · ESLint

## Executar

```bash
npm install
npm run dev
```

## Validar qualidade

```bash
npm run lint
npm run typecheck
npm run build
```

## Decisão técnica para entrevista

O projeto mantém o estado no componente de rota raiz e envia apenas callbacks/dados necessários para as telas. Para o escopo atual isso evita estado global sem necessidade e deixa o fluxo fácil de explicar e testar.

> Projeto de portfólio e estudo aplicado; não é apresentado como produto em produção.
