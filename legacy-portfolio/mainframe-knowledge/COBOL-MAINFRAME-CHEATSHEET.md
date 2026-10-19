# COBOL / Mainframe — Cheat Sheet para Entrevistas

## COBOL

### Divisões clássicas
- `IDENTIFICATION DIVISION` — identifica o programa.
- `ENVIRONMENT DIVISION` — arquivos e ambiente.
- `DATA DIVISION` — estruturas de dados, arquivos e variáveis.
- `PROCEDURE DIVISION` — lógica de processamento.

### Pontos que costumo revisar
- `PIC X`, `PIC 9`, `COMP-3` e campos numéricos.
- `REDEFINES` e estruturas de layout.
- `OCCURS` e tabelas.
- arquivos sequenciais e indexados.
- `READ`, `WRITE`, `REWRITE`, `START`.
- `FILE STATUS` para tratamento de retorno.

## JCL

### Três peças fundamentais
- `JOB` — identifica o job.
- `EXEC` — executa programa ou procedure.
- `DD` — associa datasets/arquivos ao step.

### Conceitos úteis em sustentação
- `DISP` — status e destino do dataset.
- `COND` — condiciona execução de steps.
- `PARM` — parâmetros para programa.
- `SYSOUT` — saída do job.
- `SYSIN` — parâmetros/control statements.
- GDG — versionamento geracional de datasets.

## DB2

### Estrutura típica
```cobol
EXEC SQL
    SELECT SALDO
      INTO :WS-SALDO
      FROM CONTA
     WHERE ID_CONTA = :WS-ID-CONTA
END-EXEC.
```

### SQLCODE que merece atenção
- `0` — sucesso.
- `+100` — nenhum registro encontrado / fim de cursor.
- negativo — erro a investigar conforme código e contexto.

### Em batch
Pensaria em commits controlados, restartability e prevenção de processamento duplicado.

## CICS

### Papel
Gerencia processamento transacional online no mainframe.

### Conceitos
- `COMMAREA` — área para troca de dados entre programas/transações.
- `LINK` — chama outro programa e retorna.
- `XCTL` — transfere controle sem retorno esperado.
- `SEND/RECEIVE` — interação com terminal/mapa.
- pseudo-conversational — libera recursos entre interações.

## VSAM

### KSDS
Dataset indexado por chave. Útil quando precisamos localizar registros diretamente.

Operações relacionadas:
- `READ ... KEY IS`
- `START`
- leitura sequencial após posicionamento
- `REWRITE`

### IDCAMS
Utilitário associado à definição, carga e manutenção de datasets VSAM.

## DFSORT

Pode ser usado para ordenar, filtrar, transformar e sumarizar arquivos sem criar um programa COBOL específico para cada necessidade operacional.

## Batch x Online

**Batch:** alto volume, execução programada, arquivos/datasets, jobs e conciliação.

**Online/CICS:** baixa latência, transações unitárias, interação imediata e controle transacional.

## Sustentação

Quando um job falha, eu estruturaria a análise em:
1. identificar step e return code/abend;
2. preservar evidências;
3. verificar entradas e outputs já produzidos;
4. avaliar risco de duplicidade;
5. corrigir causa;
6. definir restart ou rerun seguro;
7. reconciliar resultado final.
