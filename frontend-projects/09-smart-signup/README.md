# Smart Signup

Formulário de cadastro com validação tipada, mensagens acessíveis e regras de domínio testáveis.

## O que demonstra

- React Hook Form para estado e ciclo do formulário;
- Zod para contrato de nome, e-mail, senha e confirmação;
- schema isolado da interface em `src/schema.ts`;
- testes Vitest para payload válido, senha fraca e confirmação divergente;
- mensagens de erro ligadas aos campos por `aria-describedby`;
- `aria-invalid`, `role="alert"` e feedback de sucesso anunciado;
- autocomplete apropriado para nome, e-mail e senha;
- ESLint com zero warnings, TypeScript strict e CI.

## Stack

React · TypeScript · React Hook Form · Zod · Vitest · Vite · ESLint

## Executar

```bash
npm install
npm run dev
```

## Validar qualidade

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Decisão técnica para entrevista

As regras de validação ficam fora do componente para que possam ser reutilizadas e testadas sem depender do DOM. A interface apenas conecta o contrato Zod ao React Hook Form e apresenta os estados ao usuário.

> Projeto de portfólio e estudo aplicado; não é apresentado como produto em produção.
