# COBOL Batch — Liquidação Bancária

Case de portfólio voltado a **COBOL/Mainframe Banking**, inspirado em rotinas batch de processamento financeiro e sustentação operacional.

## Problema de negócio

Processar um arquivo diário de transações bancárias, validar registros e produzir:

- total financeiro processado;
- quantidade de transações válidas e rejeitadas;
- arquivo de rejeições para tratamento operacional;
- resumo para conciliação e auditoria.

## Por que abrir este projeto

Em poucos minutos ele permite discutir:

`COBOL` · `JCL` · `DB2/SQL` · `Batch` · `File Processing` · `Reconciliation` · `Incident Analysis` · `Restart/Recovery`

O foco é mostrar não apenas sintaxe, mas como uma rotina financeira precisa tratar **integridade, rejeições, reprocessamento e conciliação**.

## Fluxo

```text
Arquivo de entrada
      |
      v
COBOL Batch
  | valida layout
  | valida valor/status
  | acumula totais
  +--> rejeitados.txt
  +--> resumo.txt
      |
      v
Conciliação / Operações
```

## Estrutura

```text
batch-liquidacao-bancaria/
├── src/
│   └── liquidacao.cbl
├── jcl/
│   └── LIQUIDA.jcl
├── sql/
│   └── db2-model.sql
├── data/
│   └── transacoes.dat
├── INCIDENT-RUNBOOK.md
└── README.md
```

## Execução local

O programa COBOL foi escrito para execução com **GnuCOBOL** no processamento por arquivo.

```bash
cobc -x -free src/liquidacao.cbl -o liquidacao
./liquidacao
```

O workflow **Portfolio Validation** do repositório inclui a compilação deste programa com GnuCOBOL e possui execução concluída com sucesso no `main`.

O JCL e o modelo DB2 representam como o fluxo pode ser organizado em ambiente Mainframe; não são apresentados como evidência de execução produtiva em z/OS.

## Evidências para recrutadores

- leitura e escrita de arquivos sequenciais;
- validação de dados financeiros;
- totalização e conciliação;
- estrutura de job com JCL;
- modelagem DB2/SQL;
- rejeições e códigos de retorno;
- documentação de incidente;
- preocupação com restart/recovery e reprocessamento seguro.

## Perguntas de entrevista que o projeto suporta

- Como tratar registros inválidos sem interromper o lote inteiro?
- Como garantir reprocessamento sem duplicidade?
- Como controlar restart/recovery de um job?
- Onde entrariam commits DB2 em lotes maiores?
- Como investigar uma divergência de conciliação?
- O que monitorar em um scheduler corporativo em um fluxo como este?

## Transparência técnica

O código local e a automação com GnuCOBOL são evidências reproduzíveis do portfólio. JCL/DB2 são artefatos de estudo aplicado; não apresento experiência produtiva em z/OS ou ferramentas proprietárias que ainda não utilizei profissionalmente.

[← Voltar ao índice COBOL/Mainframe](../README.md)
