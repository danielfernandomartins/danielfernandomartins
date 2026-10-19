# GitHub Explorer — TanStack Query

Cliente de busca de usuários do GitHub criado para demonstrar consumo de API com uma camada dedicada de gerenciamento de estado assíncrono.

## Problema que resolve
Consultar perfis públicos do GitHub e apresentar os dados com estados claros de carregamento, erro e resultado.

## O que este projeto demonstra
- requisições HTTP com Axios;
- cache e ciclo de vida assíncrono com TanStack Query;
- `QueryClient` e `QueryClientProvider`;
- chaves de consulta dependentes do usuário pesquisado;
- tipagem dos dados retornados pela GitHub API;
- tratamento de erro e loading;
- separação entre estado de interface e estado de servidor.

## Decisões técnicas
TanStack Query foi escolhido para mostrar a diferença entre armazenar estado local e gerenciar dados remotos. O cache evita requisições desnecessárias quando uma consulta conhecida é reutilizada.

## Stack
React · TypeScript · Axios · TanStack Query · Vite · GitHub REST API

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

A aplicação usa somente endpoints públicos e não exige token para o fluxo demonstrado.