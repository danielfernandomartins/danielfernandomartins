# Mainframe ABENDs — Production Troubleshooting Guide

Material de estudo e portfólio voltado a **COBOL/Mainframe**, sustentação e Production Support em ambientes bancários.

> Objetivo: demonstrar raciocínio de diagnóstico, leitura de sintomas, investigação estruturada e preocupação com restart/rerun, integridade e causa-raiz. Este material é laboratório técnico; não afirma experiência produtiva em z/OS.

---

## 1. Como pensar um ABEND

Um ABEND não deve ser tratado apenas como "um código de erro". Em produção, a investigação precisa responder:

1. **Onde falhou?** job, step, programa, módulo, transação ou chamada SQL.
2. **Qual foi o código?** system ABEND, user ABEND, return code, mensagem IEC/IEF/IGD/DB2/CICS.
3. **Qual era a entrada?** dataset, registro, chave, parâmetro, SYSIN, data de processamento.
4. **Houve atualização parcial?** arquivos, VSAM, DB2, checkpoints, logs.
5. **Pode rerodar?** restart de step, restart lógico, rerun completo ou recuperação controlada.
6. **Como evitar duplicidade ou inconsistência?** conciliação, idempotência, checkpoint, rollback, controle de lote.
7. **Qual a causa-raiz?** dado, código, ambiente, recurso, JCL, dataset, concorrência ou dependência externa.

---

## 2. ABENDs e erros comuns para estudo

| Código / classe | Causa típica | O que investigar primeiro | Risco operacional |
|---|---|---|---|
| **S0C7** | dado inválido em operação numérica / decimal | campo PIC, conteúdo de entrada, redefinições, movimentações | processamento incorreto / parada do batch |
| **S0C4** | acesso inválido à memória | índices, subscripts, ponteiros, tamanho de área, chamada de programa | falha de execução |
| **S0C1** | instrução inválida | load module, chamada, entrada em endereço incorreto | falha imediata |
| **S806** | módulo não encontrado | STEPLIB/JOBLIB, biblioteca, nome do programa, deployment | programa não inicia |
| **SB37 / SD37 / SE37** | falta de espaço em dataset | SPACE, extensão, volume, crescimento inesperado | batch interrompido / dataset incompleto |
| **S322** | limite de CPU/tempo excedido | loop, volume, TIME, performance, acesso ineficiente | janela batch estourada |
| **Uxxxx** | user ABEND | documentação do programa, condição de negócio, logs | depende da regra implementada |
| **SQLCODE -911** | deadlock/timeout com rollback | lock, concorrência, unidade de trabalho, commits | transação desfeita |
| **SQLCODE -913** | deadlock/timeout sem rollback automático em certos contextos | lock, concorrência, retry/recovery | transação pode exigir tratamento explícito |
| **IEC141I / IECxxx** | problemas de dataset/arquivo | DDNAME, DISP, dataset, catálogo, DCB | job não acessa recurso |

> Em ambiente real, o significado exato deve ser confirmado pela documentação da plataforma e pelas mensagens completas do joblog/SDSF.

---

## 3. S0C7 — Data Exception

### Sintoma
Programa termina durante operação aritmética, comparação ou movimentação envolvendo campo numérico inválido.

### Causas comuns
- campo definido como numérico recebeu caractere não numérico;
- layout do arquivo não corresponde ao esperado;
- posição/offset incorreto;
- `REDEFINES` interpretando bytes de forma inadequada;
- dado packed/zoned inconsistente;
- campo não inicializado corretamente.

### Investigação

```text
1. localizar programa e offset/statement
2. identificar campo usado na instrução
3. conferir PIC e tamanho
4. conferir registro de entrada
5. validar layout/copybook
6. reproduzir com massa controlada
7. adicionar validação antes da operação
```

### Exemplo preventivo COBOL

```cobol
IF WS-VALOR IS NUMERIC
    COMPUTE WS-TOTAL = WS-TOTAL + WS-VALOR
ELSE
    MOVE "VALOR INVALIDO" TO WS-MENSAGEM
END-IF
```

### Pergunta de entrevista
**"Recebi um S0C7 num batch noturno. O que você faria?"**

Resposta estruturada:
- identificaria job/step/programa;
- analisaria dump e mensagem;
- localizaria instrução e campo;
- verificaria layout e dado de entrada;
- avaliaria se houve atualização parcial;
- corrigiria causa;
- validaria restart/rerun e reconciliação.

---

## 4. S0C4 — Protection Exception

### Causas frequentes
- índice fora do limite;
- subscript incorreto;
- área menor que a esperada;
- parâmetro incompatível entre programas;
- endereço inválido;
- estrutura de dados desalinhada.

### Checklist

```text
[ ] OCCURS / índice
[ ] LINKAGE SECTION
[ ] CALL USING
[ ] tamanho de campos
[ ] parâmetros de entrada
[ ] subscripts
[ ] inicialização
[ ] dump / offset
```

---

## 5. S806 — Load Module Not Found

### O que significa
O sistema não encontrou o programa/load module esperado.

### Investigar
- nome no `EXEC PGM=`;
- biblioteca correta;
- `STEPLIB` / `JOBLIB`;
- módulo compilado/link-editado;
- versão promovida para ambiente correto;
- typo no nome do programa.

### Exemplo JCL

```jcl
//STEP01   EXEC PGM=PGMBANCO
//STEPLIB  DD DSN=EMPRESA.LOADLIB,DISP=SHR
```

### Valor para sustentação
S806 costuma apontar mais para **deploy/configuração/biblioteca** do que para regra de negócio.

---

## 6. SB37 / SD37 / SE37 — Space Problems

### Sintoma
Dataset não consegue crescer durante processamento.

### Verificar
- definição de `SPACE`;
- primary / secondary allocation;
- volume disponível;
- crescimento inesperado do lote;
- retenção de arquivos antigos;
- GDGs e políticas de housekeeping.

### Exemplo

```jcl
//OUTFILE DD DSN=EMPRESA.SAIDA.DIARIA,
//           DISP=(NEW,CATLG,DELETE),
//           SPACE=(CYL,(20,10),RLSE)
```

### Ponto de entrevista
Não basta aumentar `SPACE`. É importante entender **por que o volume cresceu** e se há impacto de negócio.

---

## 7. S322 — Time/CPU Limit

### Possíveis causas
- loop infinito;
- volume maior que o previsto;
- acesso ineficiente a arquivo/DB2;
- falta de índice;
- algoritmo inadequado;
- limite `TIME` incompatível com o processamento.

### Análise

```text
sintoma -> consumo -> volume -> lógica -> acesso a dados -> tuning
```

Nunca tratar apenas aumentando TIME sem investigar causa-raiz.

---

## 8. DB2 — SQLCODE -911 e -913

### Contexto
Normalmente relacionados a deadlock ou timeout de lock.

### O que investigar
- concorrência entre transações;
- ordem de atualização de tabelas;
- duração da unidade de trabalho;
- frequência de COMMIT;
- índices;
- queries longas;
- retry controlado.

### Pergunta de entrevista
**"Como evitar que um batch segure locks por muito tempo?"**

Pontos de resposta:
- commits em intervalos adequados;
- reduzir unidade de trabalho;
- processar em ordem determinística;
- índices adequados;
- evitar scans desnecessários;
- monitorar lock wait/deadlock;
- restart lógico após commit/checkpoint.

---

## 9. Return Codes em JCL

Nem toda falha é ABEND. Return Codes também orientam fluxo operacional.

| RC | Interpretação típica |
|---:|---|
| 0 | sucesso |
| 4 | warning / condição tolerável |
| 8 | erro funcional/técnico relevante |
| 12 | erro severo |
| 16 | falha grave |

O significado real depende do utilitário/programa.

### Condição de execução

```jcl
//STEP02 EXEC PGM=PROG2,COND=(4,LT,STEP01)
```

Em ambientes modernos, prefira também entender `IF/THEN/ELSE` no JCL.

---

## 10. Fluxo de troubleshooting em produção

```text
ALERTA / JOB FAILED
       |
       v
Identificar JOB + STEP + RC/ABEND
       |
       v
Ler mensagens / joblog / spool
       |
       v
Classificar causa
  | código
  | dado
  | JCL
  | dataset
  | DB2
  | CICS
  | recurso
       |
       v
Avaliar impacto e atualização parcial
       |
       v
Definir correção + estratégia restart/rerun
       |
       v
Executar recuperação controlada
       |
       v
Conciliar resultados
       |
       v
Registrar causa-raiz + prevenção
```

---

## 11. Antes de fazer rerun

Perguntas obrigatórias:

- algum arquivo de saída já foi criado?
- houve atualização de VSAM?
- houve COMMIT em DB2?
- existe checkpoint?
- transações externas foram enviadas?
- o processamento é idempotente?
- o lote possui identificador único?
- é necessário limpar saída anterior?
- o step pode reiniciar isoladamente?

Em banking, rerun sem análise pode gerar **duplicidade financeira**.

---

## 12. Runbook de resposta rápida

### Primeiros minutos
1. capturar job/step/programa;
2. registrar ABEND/RC/SQLCODE;
3. preservar evidências;
4. identificar último ponto processado;
5. avaliar impacto financeiro/operacional;
6. impedir rerun prematuro.

### Depois
1. localizar causa provável;
2. reproduzir quando possível;
3. decidir correção ou workaround;
4. definir restart/rerun;
5. reconciliar antes/depois;
6. documentar RCA.

---

## 13. Exemplo de RCA — Root Cause Analysis

```text
INCIDENTE:
Job de liquidação falhou no STEP03.

SINTOMA:
S0C7 durante cálculo de valor líquido.

CAUSA:
Registro de entrada recebeu caractere alfabético em campo numérico.

IMPACTO:
Lote interrompido antes da geração final de conciliação.

RECUPERAÇÃO:
Registro inválido segregado e lote reiniciado a partir do checkpoint seguro.

PREVENÇÃO:
Validação de layout e conteúdo antes da operação aritmética.

CONTROLE:
Comparação de quantidade e valor total antes/depois do reprocessamento.
```

---

## 14. Perguntas técnicas que este material ajuda a responder

- O que é um ABEND?
- Diferença entre System ABEND e User ABEND?
- Como investigar S0C7?
- O que costuma causar S0C4?
- O que verificar num S806?
- Diferença prática entre restart e rerun?
- Como evitar duplicidade em reprocessamento?
- Como checkpoint ajuda um batch?
- Como SQLCODE -911/-913 afeta processamento?
- O que fazer quando um dataset fica sem espaço?
- Como distinguir problema de código, JCL e ambiente?
- O que deve existir num RCA de produção?

---

## 15. Como eu apresentaria isso numa entrevista

> "Quando penso em ABEND, não penso apenas no código. Primeiro quero entender onde o processamento parou, o que já foi persistido, qual o impacto operacional e se o rerun é seguro. Depois parto para causa-raiz usando joblog, mensagens, dump, dados de entrada e contexto do step. Em ambiente financeiro, a recuperação precisa sempre considerar conciliação e prevenção de duplicidade."

Essa resposta conecta **Mainframe + Production Support + Banking**, que é exatamente o tipo de raciocínio que quero demonstrar neste portfólio.

---

## Autor

**Daniel Fernando Martins**  
COBOL / Mainframe · Banking Technology · Systems Analysis · Application Support
