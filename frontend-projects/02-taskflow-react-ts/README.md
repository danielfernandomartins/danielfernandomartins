# TaskFlow — React + TypeScript

Gerenciador de tarefas construído para demonstrar fundamentos de React com tipagem, estado local, filtros e persistência no navegador.

## Problema que resolve
Organizar tarefas de forma simples, permitindo criar, concluir, excluir e filtrar itens sem perder os dados ao recarregar a página.

## O que este projeto demonstra
- componentes funcionais e renderização condicional;
- `useState`, `useEffect` e `useMemo`;
- tipagem de entidades com TypeScript;
- filtros derivados do estado;
- persistência com `LocalStorage`;
- formulário controlado pelo fluxo do React;
- interface responsiva.

## Decisões técnicas
O estado permanece local porque o domínio é pequeno. A persistência foi isolada em efeito para manter a UI sincronizada com o navegador. `useMemo` é usado para deixar explícita a derivação da lista filtrada.

## Stack
React · TypeScript · Vite · LocalStorage

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

Este projeto faz parte da trilha Front-End Job Ready e é validado pelo workflow de qualidade do portfólio.