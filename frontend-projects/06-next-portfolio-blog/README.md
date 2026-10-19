# Dev Portfolio Blog — Next.js

Projeto de portfólio/blog criado para demonstrar **App Router de verdade**, conteúdo tipado, metadata dinâmica, rotas pré-geradas e testes de contratos de conteúdo.

## O que demonstra

- Next.js App Router;
- Server Components por padrão;
- rota dinâmica `app/notas/[slug]/page.tsx`;
- `generateStaticParams` para pré-gerar as notas conhecidas;
- `generateMetadata` para título e descrição específicos por nota;
- `notFound()` para slugs inválidos;
- navegação com `next/link`;
- conteúdo e tipos separados em `app/content.ts`;
- lookup por slug testável;
- testes Vitest para contratos, slugs únicos e conteúdo das rotas;
- ESLint, TypeScript strict, build e testes no GitHub Actions.

## Stack

Next.js · React · TypeScript · Vitest · ESLint

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

As notas são conteúdo local e tipado, permitindo demonstrar rotas dinâmicas e geração estática sem inventar backend ou CMS. A página dinâmica resolve o conteúdo por slug e produz metadata específica, enquanto os testes garantem que os slugs permaneçam únicos e roteáveis.

> Projeto de portfólio e estudo aplicado; não é apresentado como produto em produção.
