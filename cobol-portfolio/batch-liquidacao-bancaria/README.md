# COBOL Batch — Liquidação Bancária

Projeto de portfólio voltado a vagas de **Desenvolvedor COBOL / Mainframe** em bancos e consultorias, inspirado em rotinas batch de processamento financeiro.

## Aderência ao mercado

Vagas recentes em bancos e consultorias pedem repetidamente **COBOL, JCL, DB2/SQL, processamento batch, sustentação, testes e análise de incidentes**. Este case foi desenhado para demonstrar exatamente esses fundamentos, sem afirmar experiência em z/OS que não foi executada em ambiente real.

## Problema de negócio

Processar um arquivo diário de transações bancárias, validar registros e produzir:

- total financeiro processado;
- quantidade de transações válidas e rejeitadas;
- arquivo de rejeições para tratamento operacional;
- resumo para conciliação e auditoria.

## Stack demonstrada

- COBOL
- JCL
- SQL / modelagem DB2
- processamento batch
- arquivos sequenciais
- validação de registros
- tratamento de retorno
- documentação de incidentes

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

## Como executar localmente

O programa COBOL foi escrito para ser compatível com **GnuCOBOL** no processamento por arquivo.

```bash
cobc -x -free src/liquidacao.cbl -o liquidacao
./liquidacao
```

O arquivo JCL e o modelo DB2 representam a forma como o mesmo fluxo seria organizado em ambiente mainframe. Eles não são apresentados como evidência de execução real em z/OS.

## O que este projeto demonstra para recrutadores

- entendimento de rotina batch;
- leitura e escrita de arquivos sequenciais;
- validação de dados financeiros;
- totals e reconciliação;
- estrutura de job com JCL;
- noções de persistência DB2/SQL;
- preocupação com rejeições, retorno de processamento e sustentação.

## Perguntas de entrevista que o projeto suporta

- Como você trataria registros inválidos sem interromper o lote inteiro?
- Como garantiria reprocessamento sem duplicidade?
- Como controlaria restart/recovery de um job?
- Onde entrariam commits DB2 em lotes maiores?
- Como investigaria uma divergência de conciliação?
- O que monitoraria em Control-M em um fluxo como este?

## Autor

**Daniel Fernando Martins** — conectando experiência no mercado financeiro com desenvolvimento COBOL, processamento batch e sistemas bancários.
