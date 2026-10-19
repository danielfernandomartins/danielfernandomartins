# Movie Explorer — React + REST API

Aplicação de busca que consome a API pública do TVmaze e transforma uma resposta externa em uma experiência de interface clara.

## Problema que resolve
Permitir que o usuário pesquise títulos e receba resultados com nome, gênero, nota, imagem e descrição, tratando também carregamento e falhas de rede.

## O que este projeto demonstra
- consumo de REST API com `fetch`;
- `async/await` e tratamento de exceções;
- estados de `loading`, erro e sucesso;
- tipagem da resposta externa com TypeScript;
- sanitização simples de conteúdo HTML retornado pela API;
- renderização de listas e fallback de dados;
- layout responsivo.

## Decisões técnicas
A aplicação mantém os estados assíncronos explícitos para evitar interfaces silenciosas durante requisições. A consulta é codificada com `encodeURIComponent` antes de ser enviada à API.

## Stack
React · TypeScript · Vite · Fetch API · TVmaze API

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

Não exige chave de API.