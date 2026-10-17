# COBOL Mainframe — VSAM, IDCAMS, SORT e Restart/Recovery

Terceiro case da trilha COBOL/Mainframe, voltado a vagas em **bancos e consultorias** que pedem conhecimento de arquivos indexados/VSAM, JCL, utilitários z/OS, processamento batch e sustentação.

## Problema de negócio

Simular um processamento noturno de movimentações de contas bancárias sobre um cadastro mestre indexado. O fluxo precisa:

- localizar a conta pela chave;
- aplicar crédito ou débito;
- rejeitar conta inexistente ou saldo insuficiente;
- atualizar o cadastro mestre;
- registrar checkpoint para restart;
- permitir reprocessamento controlado após falha;
- gerar saída ordenada para conferência operacional.

## O que é executável e o que é laboratório

A parte COBOL utiliza **arquivo indexado** compatível com GnuCOBOL para demonstrar acesso por chave, `READ`, `REWRITE` e processamento batch.

Os exemplos `IDCAMS`, `SORT` e nomenclatura VSAM representam um **laboratório de arquitetura z/OS**. Eles demonstram como o fluxo seria organizado em mainframe, mas não são apresentados como execução produtiva em z/OS.

## Stack e conceitos

- COBOL
- arquivo indexado / conceitos VSAM KSDS
- JCL
- IDCAMS
- DFSORT / SORT
- batch processing
- checkpoint
- restart / recovery
- códigos de retorno
- reconciliação e sustentação

## Fluxo

```text
Carga inicial
   |
   v
Cadastro mestre indexado
   |
Movimentos sequenciais
   |
   v
COBOL batch
   |-- READ por chave
   |-- valida saldo
   |-- REWRITE do mestre
   |-- checkpoint por registro
   +-- rejeições
   |
   v
SORT / relatório operacional
```

## Estrutura

```text
vsam-restart-bancario/
├── src/
│   ├── carga_clientes.cbl
│   └── processa_movimentos.cbl
├── jcl/
│   ├── IDCAMS.jcl
│   ├── PROCESSA.jcl
│   └── SORT.jcl
├── data/
│   ├── clientes.txt
│   └── movimentos.txt
├── RESTART-RECOVERY.md
└── README.md
```

## Execução local com GnuCOBOL

```bash
cobc -x -free src/carga_clientes.cbl -o carga_clientes
./carga_clientes

cobc -x -free src/processa_movimentos.cbl -o processa_movimentos
./processa_movimentos
```

## Competências demonstradas

- organização de arquivo mestre indexado;
- acesso aleatório por chave;
- atualização com `REWRITE`;
- processamento sequencial de movimentos;
- rejeição de registros inválidos;
- checkpoint e estratégia de restart;
- desenho de cluster VSAM com IDCAMS;
- ordenação e preparação de saída com SORT;
- visão operacional de batch bancário.

## Pontos para entrevista

- diferença entre arquivo sequencial e VSAM KSDS;
- como `READ ... KEY IS` e `REWRITE` se relacionam a acesso indexado;
- o que acontece em um abend no meio do lote;
- como definir um checkpoint seguro;
- como evitar duplicidade no restart;
- quando usar IDCAMS `DEFINE CLUSTER`, `REPRO` e `DELETE`;
- como SORT pode preparar arquivos para conciliação;
- como Control-M poderia orquestrar dependências e rerun do fluxo.

## Autor

**Daniel Fernando Martins** — portfólio COBOL/Mainframe aplicado a sistemas bancários, processamento batch e sustentação.
