# Batch Banking — Do Arquivo à Conciliação

## Visão geral

Um fluxo batch bancário costuma existir para processar grandes volumes de registros de forma controlada, rastreável e reconciliável.

```text
Arquivo de entrada
      |
      v
Validação / SORT
      |
      v
Programa COBOL
      |
      +--> DB2 / VSAM
      |
      +--> rejeições
      |
      +--> arquivo de saída
      v
Conciliação
      |
      v
Sistema downstream / operação
```

## Etapa 1 — Entrada

Pontos de controle:
- layout esperado;
- quantidade de registros;
- data de referência;
- duplicidade de arquivo;
- integridade do trailer/header, quando existentes.

## Etapa 2 — Preparação

DFSORT pode ajudar a:
- ordenar por chave;
- eliminar ou separar registros;
- filtrar tipos específicos;
- preparar arquivo para processamento posterior.

## Etapa 3 — Processamento COBOL

Responsabilidades típicas:
- ler registro;
- validar regra de negócio;
- consultar/atualizar DB2 ou arquivo indexado;
- escrever saída válida;
- direcionar rejeição;
- acumular quantidade e valores.

## Etapa 4 — Persistência

Em DB2, lotes grandes exigem pensar em:
- tamanho da unidade de trabalho;
- frequência de commit;
- rollback;
- restartability;
- locks e contenção.

Em VSAM/KSDS:
- chave correta;
- file status;
- consistência no `REWRITE`;
- estratégia de backup/recovery.

## Etapa 5 — Saídas e downstream

Antes de entregar uma saída, validar:
- quantidade processada;
- quantidade rejeitada;
- total financeiro;
- nome/geração do dataset;
- condições do step anterior.

## Etapa 6 — Conciliação

Uma conciliação simples pode usar a equação:

`entrada = processados + rejeitados`

Para valores:

`total financeiro de entrada = total aceito + total rejeitado`, respeitando regras do processo.

## Pontos para entrevista

Eu explicaria que um bom batch bancário precisa ser:
- rastreável;
- reiniciável;
- reconciliável;
- observável;
- resistente a duplicidade;
- claro na separação entre sucesso e rejeição.

A preocupação central não é apenas performance: é **integridade financeira**.
