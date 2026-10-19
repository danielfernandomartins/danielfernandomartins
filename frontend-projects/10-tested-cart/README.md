# Tested Cart

Carrinho compacto criado para demonstrar testes de comportamento em React sem depender de detalhes internos da implementação.

## O que demonstra

- React + TypeScript com estado local;
- total derivado com `useMemo`;
- formatação monetária com `Intl.NumberFormat`;
- controles com nomes acessíveis por produto;
- resumo do carrinho anunciado com `aria-live`;
- Vitest + React Testing Library em ambiente jsdom;
- testes por roles/labels e texto visível, evitando dependência desnecessária de `data-testid`;
- ESLint com zero warnings, TypeScript strict, build e testes no CI.

## Stack

React · TypeScript · Vitest · React Testing Library · jsdom · Vite · ESLint

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

## Cenários testados

- carrinho inicia vazio;
- adicionar produtos atualiza quantidade;
- o total é recalculado conforme os itens adicionados.

> Projeto de portfólio e estudo aplicado; não é apresentado como produto em produção.
