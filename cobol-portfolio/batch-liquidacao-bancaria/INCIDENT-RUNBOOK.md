# Incident Runbook — Batch de Liquidação

## Objetivo

Demonstrar raciocínio de sustentação para rotinas COBOL/Mainframe, incluindo análise de falhas, reprocessamento e conciliação.

## Checklist inicial

1. Identificar job/step com falha.
2. Ler retorno do job e mensagens de SYSOUT/SYSUDUMP.
3. Confirmar disponibilidade do arquivo de entrada e seu layout.
4. Validar quantidade de registros recebidos.
5. Verificar registros rejeitados e motivo funcional.
6. Conferir totais processados contra origem.
7. Em fluxo DB2, verificar SQLCODE e ponto de commit.
8. Avaliar se o job permite restart ou exige reprocessamento completo.
9. Antes de reprocessar, garantir que não haverá duplicidade.
10. Registrar causa, impacto, evidências e ação corretiva.

## Exemplos de falhas a investigar

### Arquivo ausente
Possíveis causas: geração upstream não executada, dataset incorreto ou dependência não concluída.

### Layout incompatível
Possíveis causas: alteração não coordenada no sistema origem ou registro truncado.

### Divergência de total
Comparar quantidade, somatórios, rejeições e registros processados. Isolar diferenças por conta, tipo e status.

### SQLCODE negativo
Identificar comando, tabela e chave envolvida. Diferenciar falha de dados, integridade, indisponibilidade ou erro de aplicação.

### Abend / retorno não zero
Preservar evidências do job, identificar step e avaliar restart a partir do último ponto consistente.

## Conceitos de mercado relacionados

- JCL e steps batch
- DB2 / SQLCODE
- restart / recovery
- scheduler (ex.: Control-M)
- sustentação e análise de incidentes
- conciliação financeira

> Este documento demonstra conhecimento aplicado e raciocínio de suporte. Não afirma experiência produtiva com ferramentas proprietárias específicas.
