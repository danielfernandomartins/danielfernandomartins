# Plano de Testes — API REST

## Escopo
Validar operações básicas de leitura e criação simulada na API pública JSONPlaceholder.

## Riscos priorizados
- endpoint indisponível;
- retorno com status code incorreto;
- payload sem campos essenciais;
- recurso inexistente não tratado adequadamente;
- criação retornando contrato inesperado.

## Casos de teste

| ID | Requisição | Resultado esperado | Prioridade |
|---|---|---|---|
| API-001 | GET /users | 200 + lista não vazia | Alta |
| API-002 | GET /users/1 | 200 + id, name e email | Alta |
| API-003 | GET /users/9999 | 404 | Média |
| API-004 | POST /posts | 201 + campos enviados + id | Alta |

## Critério de saída
A collection deve executar integralmente via Newman sem falhas de assertion.

## Tipos de validação
- status code;
- estrutura básica do JSON;
- presença de campos obrigatórios;
- comportamento positivo e negativo.

## Fora de escopo nesta versão
- autenticação;
- performance;
- segurança;
- persistência real do POST;
- testes de carga.
