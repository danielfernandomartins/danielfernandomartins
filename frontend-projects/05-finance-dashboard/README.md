# Finance Dashboard — Redux Toolkit

Dashboard de entradas e saídas criado para demonstrar gerenciamento de estado global em um domínio próximo da minha experiência profissional no mercado financeiro.

## Problema que resolve
Centralizar transações e apresentar saldo, total de entradas e total de saídas a partir de uma única fonte de estado.

## O que este projeto demonstra
- store global com Redux Toolkit;
- `createSlice` e actions tipadas;
- integração React Redux com `Provider`, `useSelector` e `useDispatch`;
- cálculos derivados a partir das transações;
- formulários e atualização imediata da interface;
- formatação monetária em BRL;
- TypeScript aplicado ao domínio financeiro.

## Decisões técnicas
Redux Toolkit foi escolhido propositalmente para demonstrar arquitetura de estado global, mesmo em um projeto pequeno. Indicadores como saldo não são duplicados no store: são calculados a partir das transações, evitando estado redundante.

## Stack
React · TypeScript · Redux Toolkit · React Redux · Vite

## Como executar
```bash
npm install
npm run dev
```

## Validação
```bash
npx tsc --noEmit
npm run build
```

Este projeto conecta experiência de negócio financeiro a uma implementação Front-End moderna sem apresentar experiência de estudo como experiência produtiva.