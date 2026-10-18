# Mainframe ABENDs — Production Troubleshooting Guide

Guia prático de estudo e sustentação para **COBOL/Mainframe**, com foco em diagnóstico, causa-raiz, restart/rerun e comunicação de incidentes em ambientes críticos.

> Este material é um laboratório técnico e guia de estudo. Não representa experiência produtiva em z/OS ou ferramentas proprietárias que eu ainda não utilizei profissionalmente.

---

## 1. Como pensar diante de um ABEND

Um ABEND não deve ser tratado apenas como “erro de programa”. Em ambiente bancário, a primeira pergunta é:

**qual foi o impacto operacional e até onde o processamento avançou antes da falha?**

Checklist inicial:

1. identificar `JOB`, `STEP`, programa e horário da falha;
2. verificar `RETURN CODE`, `ABEND CODE` e mensagens do sistema;
3. inspecionar `JESMSGLG`, `JESJCL`, `JESYSMSG`, `SYSOUT`, `SYSUDUMP`/dump equivalente;
4. confirmar datasets de entrada/saída, GDG e geração utilizada;
5. avaliar se houve atualização parcial em DB2/VSAM/arquivo;
6. identificar último checkpoint ou ponto seguro de restart;
7. avaliar risco de duplicidade antes de qualquer rerun;
8. registrar causa, impacto, evidência e ação corretiva.

---

## 2. ABENDs comuns que preciso reconhecer

| Código | Categoria | Sintoma típico | Hipóteses iniciais |
|---|---|---|---|
| `S0C7` | Data Exception | falha ao usar dado inválido em operação numérica | conteúdo não numérico, layout incorreto, campo deslocado, arquivo incompatível |
| `S0C4` | Protection Exception | acesso inválido à memória | subscrito fora de faixa, ponteiro/endereço inválido, área não inicializada |
| `S0C1` | Operation Exception | instrução inválida | branch incorreto, load module incompatível/corrompido, execução em endereço inválido |
| `S806` | Load Module Not Found | programa não localizado | STEPLIB/JOBLIB incorreto, módulo ausente, nome errado |
| `S322` | CPU Time Exceeded | job excedeu limite de tempo | loop infinito, volume inesperado, condição de saída incorreta |
| `S222` | Cancelled | job cancelado externamente | operador, scheduler ou intervenção manual |
| `S013` | Dataset/Open | erro ao abrir dataset | DCB/layout incompatível, arquivo incorreto, atributos inconsistentes |
| `S0CB` | Divide Exception | divisão inválida | divisor zero ou dado incorreto |
| `Uxxxx` | User ABEND | falha disparada pela aplicação | regra de negócio, validação, tratamento explícito do programa |

A tabela serve como ponto de partida. O diagnóstico real depende sempre das mensagens e evidências do job.

---

## 3. S0C7 — Data Exception

### O que significa

O programa tentou usar um conteúdo incompatível com uma operação numérica.

### Hipóteses comuns

- campo `PIC 9` recebeu caracteres;
- layout do arquivo não corresponde ao copybook esperado;
- mudança de layout sem sincronização entre produtor e consumidor;
- posição de campo deslocada;
- campo COMP/COMP-3 com conteúdo inválido;
- dado externo sem validação adequada.

### Investigação

1. localizar programa e offset/statement informado no dump;
2. identificar variável envolvida;
3. verificar conteúdo da área de memória/dado de entrada;
4. comparar layout físico com copybook;
5. confirmar origem do arquivo e versão do layout;
6. validar se houve mudança recente em upstream.

### Prevenção

- validar dados antes de operações numéricas;
- controlar versões de copybooks/layouts;
- rejeitar registros inválidos com motivo rastreável;
- criar métricas de rejeição por origem.

### Como explicaria em entrevista

> “Em um S0C7 eu não partiria direto para rerun. Primeiro localizaria o statement/offset, identificaria o campo numérico envolvido e compararia o conteúdo real com o layout esperado. Em processamento financeiro eu também verificaria se o arquivo veio com mudança de layout ou dado corrompido antes de reprocessar.”

---

## 4. S0C4 — Protection Exception

Possíveis causas:

- índice/subscrito fora da faixa;
- referência a área não inicializada;
- problema com ponteiros/endereço;
- tamanho incorreto de estrutura;
- acesso além do limite de tabela.

Pontos de investigação:

- tabelas e `OCCURS`;
- índices e subscritos;
- campos redefinidos (`REDEFINES`);
- parâmetros de chamada e LINKAGE SECTION;
- tamanho esperado x recebido em estruturas compartilhadas.

Em CICS, também avaliaria coerência da COMMAREA/canal-container e tamanho recebido.

---

## 5. S806 — Load Module Not Found

O sistema não conseguiu localizar o programa/módulo a executar.

Checklist:

- `PGM=` está correto?
- load module foi gerado?
- biblioteca correta está em `STEPLIB`/`JOBLIB`?
- houve promoção/deploy incompleto?
- ambiente está apontando para biblioteca correta?
- versão do módulo corresponde ao ambiente?

Esse tipo de falha mostra por que desenvolvimento Mainframe também exige entender **JCL, bibliotecas, deploy e execução**, e não apenas COBOL.

---

## 6. S322 — Time Limit Exceeded

Possíveis causas:

- loop infinito;
- condição EOF incorreta;
- `PERFORM` sem saída adequada;
- aumento inesperado de volume;
- SQL ineficiente;
- processamento repetitivo excessivo;
- dataset incorreto muito maior que o esperado.

Em ambiente bancário, investigaria também se houve crescimento atípico do movimento do dia.

---

## 7. DB2: quando o problema não é um ABEND clássico

Em aplicações COBOL/DB2, muitos incidentes aparecem primeiro como `SQLCODE`.

### `SQLCODE -911`

Transação sofreu rollback por deadlock ou timeout.

### `SQLCODE -913`

Execução falhou por deadlock/timeout; o tratamento de unidade de trabalho deve ser analisado conforme contexto.

### `SQLCODE -805`

Package/DBRM esperado não foi encontrado ou não está consistente com o bind.

### `SQLCODE -818`

Inconsistência de timestamp entre load module e DBRM/package.

Perguntas relevantes:

- houve rollback?
- qual era a unidade de trabalho?
- existe estratégia segura de retry?
- o processamento é idempotente?
- qual commit point foi alcançado?

---

## 8. IEC messages e problemas de dataset

Nem toda falha é COBOL.

Exemplos de investigação:

- dataset inexistente;
- dataset catalogado incorretamente;
- espaço insuficiente;
- atributos incompatíveis (`RECFM`, `LRECL`, `BLKSIZE`);
- DISP incorreto;
- geração GDG não disponível;
- tentativa de sobrescrever recurso indevidamente.

Por isso, ao receber um incidente, eu separaria rapidamente:

**programa vs dados vs JCL vs dataset vs DB2 vs infraestrutura/scheduler.**

---

## 9. Restart x Rerun

### Rerun

Reexecutar o job/step desde um ponto anterior.

Risco principal: repetir atualizações já aplicadas.

### Restart

Continuar a partir de um ponto controlado, normalmente apoiado por checkpoint, estado persistido ou step seguro.

Antes de qualquer reprocessamento financeiro, eu validaria:

- quantos registros foram processados;
- quais transações já produziram efeito;
- existência de commit/checkpoint;
- saídas intermediárias;
- atualizações em DB2/VSAM;
- risco de débito/crédito duplicado;
- necessidade de rollback ou compensação.

**Rerun sem entender idempotência é risco operacional.**

---

## 10. Exemplo de raciocínio de incidente bancário

### Situação

Job noturno de liquidação termina com `S0C7` no registro 284.932.

### Minha linha de investigação

1. identificar step/programa;
2. verificar dump e campo envolvido;
3. localizar registro de entrada;
4. comparar registro com layout/copybook;
5. confirmar se os 284.931 anteriores geraram efeitos persistentes;
6. confirmar último commit/checkpoint;
7. separar registro inválido para análise;
8. decidir restart/rerun somente após validar duplicidade;
9. reconciliar quantidade e valor total antes/depois;
10. documentar causa-raiz e prevenção.

### Possível causa-raiz

Campo de valor recebeu conteúdo alfanumérico devido a mudança de layout upstream.

### Ação preventiva

Adicionar validação de layout/versão antes do processamento principal e rejeição controlada de registros inconsistentes.

---

## 11. Matriz rápida: sintoma → hipótese → evidência

| Sintoma | Hipótese | Evidência a procurar |
|---|---|---|
| `S0C7` | dado inválido | dump, registro, copybook, origem do arquivo |
| `S0C4` | acesso inválido | dump, índice, OCCURS, LINKAGE |
| `S806` | módulo ausente | JCL, STEPLIB/JOBLIB, deploy |
| `S322` | loop/tempo | condição EOF, volume, SQL, CPU |
| `-911/-913` | lock/deadlock | SQLCODE, unidade de trabalho, concorrência |
| erro IEC | dataset | JESYSMSG, DD, catálogo, DCB, DISP |
| RC alto em SORT/IDCAMS | utilitário/dados | SYSPRINT/SYSOUT, control cards, dataset |

---

## 12. O que documentar após o incidente

Um bom registro de incidente deve conter:

- data/hora;
- job e step;
- código do erro;
- impacto;
- volume afetado;
- causa-raiz;
- evidências;
- ação de recuperação;
- validação pós-reprocessamento;
- risco de recorrência;
- ação preventiva;
- owner e follow-up.

Esse histórico reduz MTTR e melhora a sustentação.

---

## 13. Perguntas de entrevista relacionadas a ABENDs

1. O que é um `S0C7` e como você investigaria?
2. Qual a diferença entre `S0C4` e `S0C7`?
3. O que verificar em um `S806`?
4. Quando um rerun pode ser perigoso?
5. Como evitar duplicidade em restart de processamento financeiro?
6. Qual a diferença entre `-911` e `-913` no DB2?
7. Como você identifica se o problema está no programa ou no dataset?
8. O que procuraria no JES após um job falhar?
9. Como checkpoint ajuda em batches longos?
10. O que você documentaria depois de restaurar o serviço?

---

## 14. Minha abordagem em uma frase

**Diagnosticar primeiro, preservar integridade dos dados, recuperar com segurança, reconciliar resultados e eliminar a causa-raiz antes de considerar o incidente encerrado.**
