# Runbook — Abend, Restart e Rerun em Batch Mainframe

## Objetivo

Mostrar uma abordagem operacional para investigar falhas de jobs batch e reduzir risco de duplicidade ou inconsistência ao reprocessar.

## 1. Identificar a falha

Registrar:
- job e step;
- programa executado;
- return code ou abend;
- horário da falha;
- datasets de entrada/saída;
- mensagens relevantes do job log.

## 2. Determinar o ponto de processamento

Perguntas:
- o step falhou antes ou depois de gravar saída?
- houve atualização de DB2?
- houve commit antes da falha?
- algum dataset já foi gerado parcialmente?
- existe checkpoint ou controle de sequência processada?

## 3. Classificar o risco

### Sem efeito persistido
Rerun completo tende a ser mais simples.

### Efeito parcial
Exige avaliar restart por step ou por checkpoint.

### Efeito externo
Se houve envio para outro sistema, liquidação ou notificação, reprocessar sem controle pode duplicar efeito financeiro.

## 4. Estratégia de recuperação

Possibilidades:
- corrigir entrada e rerodar o job inteiro;
- reiniciar no step que falhou;
- recomeçar a partir de checkpoint;
- restaurar saída intermediária;
- executar rotina de compensação antes do rerun.

A escolha depende de idempotência, persistência e desenho do processo.

## 5. DB2

Durante investigação, verificar:
- `SQLCODE`;
- último commit concluído;
- locks/deadlocks;
- quantidade já processada;
- consistência entre tabela de controle e resultado operacional.

## 6. Datasets / GDG

Antes de rerun:
- confirmar gerações existentes;
- verificar se uma nova geração foi criada parcialmente;
- evitar sobrescrever evidência necessária à investigação;
- garantir que o job utilizará a geração correta.

## 7. Conciliação pós-reprocessamento

Validar:
- quantidade de registros lidos;
- processados;
- rejeitados;
- totais financeiros;
- saldo de controle;
- arquivos enviados/recebidos;
- ausência de duplicidade.

## Exemplo de incidente

Um lote de 100.000 transações falha após 63.200 registros. O sistema registra checkpoint a cada 1.000 transações.

Uma estratégia possível é:
1. confirmar último checkpoint válido;
2. verificar commits DB2 correspondentes;
3. validar se os 200 registros após o checkpoint tiveram efeito persistido;
4. compensar ou ignorar conforme desenho;
5. reiniciar a partir do último ponto seguro;
6. reconciliar 100% do lote ao final.

## Mentalidade de sustentação

O objetivo não é apenas "fazer o job voltar". É recuperar o processamento com **integridade, rastreabilidade e risco controlado**.
