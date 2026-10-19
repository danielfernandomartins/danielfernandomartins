# Restart / Recovery — Batch Bancário

Este documento descreve como pensar restart e recovery para um lote bancário que atualiza um cadastro mestre indexado.

## Cenário de falha

Imagine que o job processe 100.000 movimentos e sofra abend após o registro 62.430. Reexecutar desde o início sem controle pode aplicar novamente créditos e débitos já efetivados.

## Estratégia adotada no laboratório

O programa registra o número sequencial do último movimento concluído em um arquivo de checkpoint.

Na próxima execução:

1. lê o checkpoint;
2. percorre o arquivo de movimentos;
3. ignora registros já concluídos;
4. retoma a partir do próximo movimento.

## Risco importante

Em um sistema real, atualizar o cadastro mestre e depois gravar o checkpoint em operações independentes cria uma janela de inconsistência. Se ocorrer falha entre as duas ações, o movimento pode ser reaplicado no restart.

## Como um ambiente produtivo poderia reduzir esse risco

- utilizar unidade de trabalho transacional com DB2;
- realizar `COMMIT` por lote controlado;
- persistir checkpoint na mesma unidade lógica quando aplicável;
- utilizar identificador único de transação para idempotência;
- reconciliar totais antes e depois do rerun;
- definir procedimentos formais de restart por step/job;
- registrar RC/abend e última chave processada.

## Runbook operacional

### 1. Identificar o ponto de falha

Verificar:

- job e step;
- return code ou abend;
- último checkpoint;
- quantidade processada;
- arquivo de rejeições;
- disponibilidade do cadastro mestre.

### 2. Validar integridade antes do rerun

Conferir se o último registro indicado no checkpoint realmente foi aplicado ao mestre.

### 3. Corrigir causa raiz

Exemplos:

- registro malformado;
- dataset indisponível;
- falta de espaço;
- conflito de acesso;
- erro de lógica;
- dado mestre inconsistente.

### 4. Definir estratégia

- `RESTART` a partir do checkpoint, quando seguro;
- rerun de step específico;
- restauração do mestre + reprocessamento integral, quando necessário.

### 5. Reconciliar

Após o processamento:

- validar quantidade de movimentos;
- validar rejeições;
- conferir totais financeiros;
- comparar saldo anterior + créditos - débitos com saldo final;
- documentar a ocorrência.

## Relação com Control-M

Em um ambiente corporativo, um scheduler como Control-M poderia:

- controlar dependências entre jobs;
- impedir execução antes da chegada dos datasets;
- registrar sucesso/falha;
- permitir rerun controlado;
- disparar alertas;
- acompanhar SLA da janela batch.

Este projeto demonstra entendimento do fluxo; não afirma experiência produtiva com Control-M.
