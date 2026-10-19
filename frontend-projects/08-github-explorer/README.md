# GitHub Explorer — TanStack Query

Cliente de busca de usuários do GitHub criado para demonstrar consumo de API com uma camada dedicada de gerenciamento de estado assíncrono, testando tanto o cliente HTTP quanto a integração React Query + UI.

## Problema que resolve
Consultar perfis públicos do GitHub e apresentar os dados com estados claros de carregamento, erro e resultado.

## O que este projeto demonstra
- requisições HTTP com Axios;
- cache e ciclo de vida assíncrono com TanStack Query;
- `QueryClient` e `QueryClientProvider`;
- chaves de consulta dependentes do usuário pesquisado;
- tipagem dos dados retornados pela GitHub API;
- tratamento de erro e loading;
- separação entre estado de interface e estado de servidor;
- testes unitários da construção de URL/camada de API;
- testes React Testing Library com `QueryClient` isolado para resultado inicial e nova busca.

## Decisões técnicas
TanStack Query foi escolhido para mostrar a diferença entre armazenar estado local e gerenciar dados remotos. Nos testes de interface o cliente de API é mockado e cada cenário recebe um `QueryClient` próprio, mantendo cache e estado assíncrono isolados.

## Stack
React · TypeScript · Axios · TanStack Query · Vite · GitHub REST API · Vitest · React Testing Library · jsdom · ESLint

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

A aplicação usa somente endpoints públicos e não exige token para o fluxo demonstrado.
