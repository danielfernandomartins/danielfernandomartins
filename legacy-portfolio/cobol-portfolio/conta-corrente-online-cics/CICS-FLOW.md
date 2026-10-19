# Fluxo CICS — Consulta de Conta

## Objetivo

Documentar como o case local pode ser traduzido para uma transação online típica de mainframe com COBOL, CICS e DB2.

## Fluxo conceitual

```text
Terminal / Canal
      |
      v
Transação CICS
      |
      v
Programa COBOL
      |
      +--> valida COMMAREA / entrada
      |
      +--> EXEC SQL SELECT (DB2)
      |
      +--> trata SQLCODE
      |       0   = sucesso
      |      +100 = não encontrado
      |      <0   = erro DB2
      |
      +--> aplica regra de status da conta
      |
      v
Resposta na COMMAREA
```

## Pontos importantes para sustentação

- `EIBCALEN` ajuda a validar se existe conteúdo recebido na COMMAREA.
- `SQLCODE = 0` indica consulta bem-sucedida.
- `SQLCODE = +100` representa ausência de linha para a consulta.
- SQLCODE negativo exige investigação do erro DB2 e do contexto da transação.
- Mensagens funcionais devem ser separadas de informações técnicas sensíveis.
- Em ambiente real, logs e dumps precisam permitir diagnóstico sem expor dados bancários.

## CICS x Batch

**Batch:** orientado a grandes volumes e processamento agendado, normalmente com JCL e arquivos/datasets.  
**Online/CICS:** orientado a solicitações transacionais curtas, com tempo de resposta e interação por transação.

## Evoluções possíveis

- BMS map para interface 3270;
- tratamento explícito de `RESP`/`RESP2` em comandos CICS;
- atualização de saldo transacional;
- controle de commit/rollback;
- acesso VSAM alternativo ao DB2;
- testes de integração em ambiente z/OS.

> O documento descreve conceitos aplicados ao case. Não declara experiência produtiva em CICS, DB2 ou terminal 3270.
