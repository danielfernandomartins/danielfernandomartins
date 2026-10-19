# TaskFlow — React + TypeScript

Gerenciador de tarefas construído para demonstrar fundamentos de React com tipagem, estado local, filtros, persistência e testes em duas camadas: domínio e comportamento da interface.

## Problema que resolve
Organizar tarefas de forma simples, permitindo criar, concluir, excluir e filtrar itens sem perder os dados ao recarregar a página.

## O que este projeto demonstra
- componentes funcionais e renderização condicional;
- `useState`, `useEffect` e `useMemo`;
- tipagem de entidades com TypeScript;
- filtros derivados do estado;
- persistência segura com `LocalStorage`;
- interface responsiva e controles acessíveis;
- testes unitários das regras de domínio;
- testes React Testing Library para criar, concluir, filtrar e remover tarefas.

## Decisões técnicas
O estado permanece local porque o domínio é pequeno. A persistência fica isolada no hook e tolera storage indisponível ou dados inválidos. Os testes de domínio validam regras puras; os testes de interface exercitam o fluxo que o usuário realmente percorre, usando roles e labels em vez de detalhes internos.

## Stack
React · TypeScript · Vite · LocalStorage · Vitest · React Testing Library · jsdom · ESLint

## Como executar
```bash
npm install
npm run dev
```

## Validação
```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Este projeto faz parte da trilha Front-End Job Ready e é validado pelo workflow de qualidade do portfólio.
