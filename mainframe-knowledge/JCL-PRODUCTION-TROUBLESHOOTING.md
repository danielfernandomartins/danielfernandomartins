# JCL Production Troubleshooting — Mainframe Operations Guide

Guia prático para estudo e entrevistas de **COBOL/Mainframe**, com foco em leitura de JCL, diagnóstico de falhas batch, datasets, GDG, DISP, DCB, SPACE, RCs e decisões seguras de restart/rerun.

> Este material é um laboratório técnico. Ele demonstra raciocínio e preparação para ambientes z/OS, sem alegar experiência produtiva prévia em ferramentas proprietárias.

---

## 1. Como eu investigaria uma falha de JCL em produção

Antes de alterar qualquer coisa, eu seguiria esta ordem:

1. identificar `JOB`, `STEP` e `PROC` envolvidos;
2. verificar `RC`, `ABEND`, mensagens JES e mensagens IEC/IEF;
3. localizar o DDNAME relacionado à falha;
4. conferir existência, nome e geração correta dos datasets;
5. revisar `DISP`, `SPACE`, `DCB`, `UNIT`, `VOL` e catalogação;
6. validar dependências entre steps, `COND` ou `IF/THEN/ELSE`;
7. confirmar se houve atualização parcial de arquivos ou banco;
8. decidir entre correção + restart ou rerun completo;
9. reconciliar resultados após a recuperação;
10. registrar causa-raiz e ação preventiva.

A prioridade não é “fazer o job ficar verde”. É recuperar o processamento sem duplicar, perder ou corromper dados.

---

## 2. Return Codes: 0, 4, 8, 12, 16

Return codes dependem do programa/utilitário, mas um padrão comum em batch é:

| RC | Leitura operacional típica |
|---|---|
| `0` | execução normal |
| `4` | warning / condição não fatal |
| `8` | erro que exige análise |
| `12` | erro severo |
| `16` | erro crítico / processamento inviável |

### Ponto importante

Nunca assumiria que `RC=4` é sempre aceitável ou que `RC=8` é sempre fatal. A interpretação depende do utilitário, da regra do job e da política operacional.

Exemplo:

```jcl
//STEP01 EXEC PGM=IDCAMS
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  LISTCAT ENT('BANK.CLIENTES.KSDS')
/*
```

Se o dataset não existir, o retorno e a mensagem precisam ser analisados no contexto do fluxo.

---

## 3. DISP — uma das fontes mais comuns de erro

Formato:

```jcl
DISP=(status,normal,abend)
```

### Status comuns

- `NEW` — dataset novo;
- `OLD` — uso exclusivo de dataset existente;
- `SHR` — dataset existente com compartilhamento permitido;
- `MOD` — adiciona ao final ou cria quando aplicável.

### Destino normal/abend

- `CATLG`
- `KEEP`
- `DELETE`
- `UNCATLG`
- `PASS`

Exemplo:

```jcl
//ARQOUT DD DSN=BANK.LIQUIDACAO.RESULTADO,
//          DISP=(NEW,CATLG,DELETE),
//          SPACE=(CYL,(5,2)),
//          DCB=(RECFM=FB,LRECL=120,BLKSIZE=0)
```

Pergunta que eu faria ao diagnosticar:

> O dataset foi criado parcialmente antes do abend? Se eu rerodar com `DISP=NEW`, haverá conflito de catálogo?

---

## 4. SPACE — SB37, SD37 e SE37

Falhas de espaço geralmente aparecem quando um dataset não consegue crescer conforme necessário.

### SB37

O volume não conseguiu fornecer nova extensão suficiente para o dataset.

### SD37

O dataset atingiu limite relacionado à alocação primária/secundária sem espaço suficiente configurado para continuar.

### SE37

Frequentemente relacionado ao limite de extensões ou falta de espaço disponível adequado.

Exemplo preventivo:

```jcl
SPACE=(CYL,(20,10),RLSE)
```

Ao investigar, eu verificaria:

- quantidade estimada de registros;
- tamanho médio do registro;
- crescimento histórico;
- primary/secondary allocation;
- número de extents;
- política de SMS/storage class;
- possibilidade de `RLSE`;
- se o erro é sintoma de aumento legítimo de volume ou loop/processamento anormal.

Em ambiente bancário, simplesmente aumentar `SPACE` pode mascarar um problema de volume inesperado.

---

## 5. DCB — formato e tamanho de registro

Parâmetros comuns:

```jcl
DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
```

### RECFM

- `FB` — fixed blocked;
- `VB` — variable blocked;
- `F` — fixed;
- `V` — variable.

### LRECL

Define o tamanho lógico do registro.

Problemas possíveis:

- programa espera 120 bytes e dataset fornece 100;
- arquivo variável tratado como fixo;
- copybook diferente do layout real;
- geração upstream alterou layout sem coordenação.

Sintomas podem aparecer como erro de arquivo, dados truncados ou até `S0C7` quando campos numéricos recebem conteúdo incompatível.

---

## 6. GDG — Generation Data Group

GDGs são comuns em processamento batch porque facilitam versionamento sequencial de arquivos.

Exemplos:

```jcl
DSN=BANK.TRANSACOES.GDG(+1)
DSN=BANK.TRANSACOES.GDG(0)
DSN=BANK.TRANSACOES.GDG(-1)
```

Leitura conceitual:

- `(+1)` — próxima geração;
- `(0)` — geração atual;
- `(-1)` — anterior.

### Erro clássico de produção

Um step falha após criar uma geração `+1`, mas antes da conclusão do fluxo. No rerun, tentar criar novamente `(+1)` sem entender o estado do catálogo pode gerar inconsistência operacional.

Antes do rerun eu confirmaria:

- geração realmente catalogada;
- conteúdo parcial ou completo;
- dependentes que já consumiram essa geração;
- necessidade de excluir/recriar ou reaproveitar;
- impacto na reconciliação.

---

## 7. Erros de dataset e mensagens IEC

Em troubleshooting eu procuraria mensagens associadas a abertura, leitura, gravação, catalogação e espaço.

Checklist:

- DSN correto?
- dataset existe?
- catálogo correto?
- volume acessível?
- DDNAME bate com o esperado pelo programa?
- `DISP` permite o acesso necessário?
- dataset está alocado por outro job?
- layout/DCB estão compatíveis?
- houve mudança upstream?

Exemplo de falha de nome:

```jcl
//ENTRADA DD DSN=BANK.TRANSAO.DIARIA,DISP=SHR
```

Um simples erro de DSN pode causar falha de abertura e interromper toda a cadeia.

---

## 8. COND versus IF/THEN/ELSE

### COND

É legado e pode ser menos intuitivo porque a condição representa quando **pular** o step.

Exemplo:

```jcl
//STEP02 EXEC PGM=PROG2,COND=(4,LT,STEP01)
```

### IF/THEN/ELSE

Costuma deixar a intenção mais clara:

```jcl
// IF (STEP01.RC = 0) THEN
//STEP02 EXEC PGM=PROG2
// ENDIF
```

Em troubleshooting eu verificaria se um step não executou por regra condicional, e não por falha técnica.

---

## 9. PROC e override de parâmetros

JCLs produtivos frequentemente usam procedures catalogadas.

Exemplo:

```jcl
//JOB01 EXEC PROC=BANKPROC,ENV=PRD
```

Problemas podem vir de:

- parâmetro errado;
- biblioteca de PROC incorreta;
- override de DD inesperado;
- versão de PROC incompatível com programa;
- ambiente `DEV/HML/PRD` trocado.

Na análise eu expandiria mentalmente o fluxo: JCL chamador + PROC + overrides.

---

## 10. SYSIN, SYSOUT, SYSPRINT e SYSUDUMP

### SYSIN

Entrada de comandos/parâmetros para utilitários ou programas.

```jcl
//SYSIN DD *
  SORT FIELDS=(1,10,CH,A)
/*
```

### SYSOUT / SYSPRINT

Saídas de log e mensagens operacionais.

### SYSUDUMP

Pode fornecer dump útil em análise de abend.

Em incidente, esses DDs são evidências. Eu evitaria alterar o job antes de preservar mensagens relevantes.

---

## 11. SORT / DFSORT: quando RC não conta toda a história

Exemplo:

```jcl
//SORT01 EXEC PGM=SORT
//SYSOUT DD SYSOUT=*
//SORTIN DD DSN=BANK.MOVIMENTOS,DISP=SHR
//SORTOUT DD DSN=BANK.MOVIMENTOS.ORD,
//          DISP=(NEW,CATLG,DELETE),
//          SPACE=(CYL,(5,2)),
//          DCB=(RECFM=FB,LRECL=100,BLKSIZE=0)
//SYSIN DD *
  SORT FIELDS=(1,10,CH,A)
/*
```

Checklist:

- chave correta?
- posição e tamanho corretos?
- formato `CH`, `ZD`, `PD` adequado?
- LRECL compatível?
- volume de SORTWORK suficiente?
- saída será sobrescrita ou criada?

Um sort “tecnicamente bem-sucedido” pode gerar resultado funcionalmente errado se a chave estiver incorreta.

---

## 12. Restart versus rerun

### Rerun

Executa novamente uma parte maior ou todo o job.

### Restart

Retoma a partir de ponto controlado.

Exemplo conceitual:

```jcl
//JOB1 JOB ... ,RESTART=STEP03
```

Antes de qualquer restart, eu avaliaria:

- steps anteriores fizeram commit?
- arquivos foram gerados?
- geração GDG foi catalogada?
- houve atualização DB2?
- step é idempotente?
- há checkpoint funcional?
- downstream já consumiu alguma saída?

A pergunta central:

> “Posso reexecutar sem gerar efeito financeiro duplicado?”

---

## 13. Cenário de entrevista: batch de liquidação falhou

### Situação

Um job de liquidação bancária possui cinco steps:

1. recepção do arquivo;
2. SORT;
3. programa COBOL de validação;
4. atualização DB2;
5. geração de relatório de conciliação.

O `STEP04` falha com problema de recurso/lock DB2.

### Minha abordagem

1. verificar `RC/SQLCODE` e logs do step;
2. determinar se houve commits antes da falha;
3. identificar quantidade processada;
4. conferir checkpoint ou controle de transação;
5. impedir rerun cego desde o STEP01;
6. avaliar rollback/restart seguro;
7. reconciliar DB2 versus arquivo de entrada;
8. só liberar saída após consistência financeira;
9. registrar causa, impacto e prevenção.

Esse raciocínio conecta JCL, COBOL, DB2 e operação bancária.

---

## 14. Matriz rápida — sintoma → hipótese → ação

| Sintoma | Hipótese inicial | Ação de investigação |
|---|---|---|
| dataset não abre | DSN/DISP/catálogo | conferir DD, catálogo e mensagens IEC |
| `SB37` | falta de espaço | revisar SPACE, extents e volume de dados |
| step não executou | COND/IF | revisar dependência e RC anterior |
| geração GDG inesperada | rerun parcial | conferir catálogo e gerações existentes |
| `S806` | load module ausente | STEPLIB/JOBLIB e deploy |
| `S0C7` após leitura | layout incompatível | DCB/copybook/conteúdo |
| SORT retorna erro | chave/layout/space | SYSOUT/SYSIN/SORTWORK |
| job “verde” com resultado errado | erro funcional | reconciliação e controles de negócio |

---

## 15. O que eu destacaria em uma entrevista

Eu não trataria JCL como “apenas um script para rodar COBOL”. Em ambiente bancário, JCL participa da orquestração operacional do processamento.

Uma resposta forte seria:

> “Ao investigar um job, eu quero entender o step que falhou, o estado dos datasets, os return codes, os efeitos já persistidos e a segurança do restart. Em processamento financeiro, recuperar rápido é importante, mas recuperar sem duplicidade e com reconciliação é mais importante.”

---

## 16. Perguntas para estudar antes de uma entrevista

1. Qual a diferença entre `DISP=SHR` e `DISP=OLD`?
2. O que pode causar `SB37`?
3. Como funciona um GDG?
4. Qual o risco de rerodar um job que criou `GDG(+1)`?
5. Para que servem `SYSIN` e `SYSPRINT`?
6. O que você verificaria se um step não executou?
7. Qual a diferença prática entre `COND` e `IF/THEN/ELSE`?
8. Como DCB incorreto pode impactar um programa COBOL?
9. Quando usar restart em vez de rerun?
10. Por que reconciliação é necessária depois de uma recuperação de batch?
11. O que você faria antes de aumentar SPACE após um `SB37`?
12. Como um erro upstream pode aparecer como `S0C7` downstream?

---

## 17. Palavras-chave

`JCL` `z/OS` `Batch` `GDG` `DISP` `DCB` `SPACE` `SB37` `SD37` `SE37` `SYSIN` `SYSOUT` `SYSPRINT` `SYSUDUMP` `DFSORT` `IDCAMS` `COND` `IF THEN ELSE` `PROC` `Restart` `Rerun` `Production Support` `Application Support` `Troubleshooting` `Banking` `COBOL` `DB2`
