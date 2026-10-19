# Support Ops Dashboard

Dashboard operacional em React + TypeScript voltado a filas de atendimento, priorização e risco de SLA.

## O que este projeto demonstra
- modelagem de dados de negócio;
- filtros por texto e status;
- métricas derivadas de uma coleção;
- tabela responsiva e semântica;
- estados vazios e `aria-live`;
- TypeScript strict;
- testes unitários com Vitest.

## Executar
```bash
npm install
npm run typecheck
npm test
npm run build
```

## Decisões técnicas
As métricas e regras de filtragem ficam separadas da camada visual para facilitar testes, manutenção e evolução. O projeto usa dados locais para enfatizar lógica de produto e qualidade de interface sem simular integrações inexistentes.
