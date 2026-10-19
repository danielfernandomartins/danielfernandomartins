# CRM Dashboard — React + Tailwind

Dashboard de carteira de clientes focado em composição de UI, responsividade, estado local e classes utilitárias.

## O que demonstra

- React + TypeScript com dados de domínio tipados;
- Tailwind CSS para layout, estados visuais e responsividade;
- filtro funcional por status com `aria-pressed`;
- métricas derivadas da carteira em vez de valores duplicados no estado;
- tabela semântica com `thead`, `tbody`, headers de coluna e linha;
- feedback da quantidade filtrada via `aria-live`;
- foco visível nos controles;
- ESLint, TypeScript strict e build no GitHub Actions.

Os dados são locais e demonstrativos; não representam clientes ou métricas reais.

## Stack

React · TypeScript · Tailwind CSS · Vite · ESLint

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

O filtro é mantido como estado mínimo e a lista visível é derivada com `useMemo`. A tabela preserva semântica nativa em vez de simular estrutura tabular apenas com `div`s.

> Projeto de portfólio e estudo aplicado; não é apresentado como produto em produção.
