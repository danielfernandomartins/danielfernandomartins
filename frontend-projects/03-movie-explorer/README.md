# Movie Explorer — React + REST API

Aplicação de busca que consome a API pública do TVmaze e transforma uma resposta externa em uma experiência de interface clara, com testes da camada HTTP e dos estados de UI.

## Problema que resolve
Permitir que o usuário pesquise títulos e receba resultados com nome, gênero, nota, imagem e descrição, tratando também carregamento, vazio e falhas de rede.

## O que este projeto demonstra
- consumo de REST API com `fetch`;
- `async/await` e tratamento de exceções;
- estados de loading, erro, vazio e sucesso;
- tipagem da resposta externa com TypeScript;
- sanitização simples de conteúdo HTML retornado pela API;
- renderização de listas e fallback de dados;
- testes unitários da camada `api.ts`;
- testes React Testing Library para resultado, estado vazio e erro acessível.

## Decisões técnicas
A camada HTTP fica separada da UI para que contrato de rede e comportamento visual possam ser testados independentemente. Nos testes de interface a API é mockada; o objetivo é validar como a aplicação reage aos diferentes resultados sem depender da rede real.

## Stack
React · TypeScript · Vite · Fetch API · TVmaze API · Vitest · React Testing Library · jsdom · ESLint

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

Não exige chave de API.
