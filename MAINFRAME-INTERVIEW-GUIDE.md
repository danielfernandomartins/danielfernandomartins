# Mainframe Interview Guide — Daniel Fernando Martins

Guia de preparação para entrevistas de **COBOL / Mainframe / Systems / Application Support** em bancos e consultorias.

## 1. Minha apresentação em 30 segundos

Sou profissional com mais de 20 anos de experiência no mercado financeiro e estou fazendo uma transição estratégica para Tecnologia com foco em COBOL/Mainframe e sistemas bancários. Tenho desenvolvido cases práticos envolvendo COBOL, JCL, DB2/SQL, CICS, VSAM, IDCAMS, DFSORT, processamento batch e restart/recovery. Meu diferencial é combinar entendimento de tecnologia com contexto real de banking, pagamentos, risco, clientes, controles e operações.

## 2. COBOL — fundamentos que devo saber explicar

- DIVISIONs principais: IDENTIFICATION, ENVIRONMENT, DATA e PROCEDURE;
- WORKING-STORAGE e FILE SECTION;
- PIC clauses e tipos numéricos;
- arquivos sequenciais e indexados;
- READ, WRITE, REWRITE;
- PERFORM e controle de fluxo;
- FILE STATUS;
- tratamento de registros inválidos;
- diferenças entre execução batch e online.

## 3. JCL — pontos de entrevista

Explicar a função de:

- JOB;
- EXEC;
- DD;
- dataset de entrada/saída;
- DISP;
- condições de retorno;
- encadeamento de steps;
- rerun/restart de um job.

### Pergunta comum

**Como investigaria um job batch com falha?**

Resposta estruturada:

1. identificar job, step e return code;
2. verificar SYSOUT/SYSPRINT e mensagens do step;
3. identificar se a falha é programa, arquivo, DB2 ou infraestrutura;
4. verificar integridade das saídas já produzidas;
5. avaliar possibilidade de restart seguro;
6. evitar duplicidade antes do reprocessamento;
7. validar conciliação após a execução.

## 4. DB2 / SQL

Estar pronto para discutir:

- SELECT, INSERT, UPDATE e DELETE;
- chaves e integridade;
- host variables em COBOL;
- `EXEC SQL`;
- tratamento de `SQLCODE`;
- diferença entre `SQLCODE = 0`, `+100` e códigos negativos;
- commit/rollback em processamento maior;
- impacto de consultas mal desenhadas em batch.

## 5. CICS

Explicar de forma simples:

- CICS é usado para processamento online/transacional em ambientes mainframe;
- COMMAREA pode transportar dados entre programas/transações;
- fluxo online deve responder rapidamente e tratar códigos de retorno;
- COBOL pode acessar DB2 dentro de uma transação CICS;
- diferenças entre rotina online e rotina batch.

Não afirmar experiência produtiva em CICS; apresentar como conhecimento aplicado de laboratório.

## 6. VSAM / KSDS

Pontos principais:

- VSAM é uma tecnologia de armazenamento muito usada em mainframe;
- KSDS organiza registros por chave;
- acesso pode ser direto por chave;
- `READ` localiza o registro e `REWRITE` permite atualização;
- IDCAMS é usado para administração/definição de datasets VSAM;
- o projeto `VSAM + Restart` demonstra esses conceitos com arquivo indexado executável localmente.

## 7. IDCAMS e DFSORT

### IDCAMS

Saber explicar:

- DEFINE CLUSTER;
- DELETE;
- REPRO;
- uso na criação/carga de datasets VSAM.

### DFSORT

Saber explicar:

- ordenação de arquivos;
- filtragem/seleção de registros;
- preparação de dados para processamento batch;
- redução de lógica que não precisa ficar no programa COBOL.

## 8. Restart / Recovery

Em processamento financeiro, reprocessar tudo após uma falha pode gerar duplicidade.

Meu case usa checkpoint para demonstrar o conceito de registrar progresso e permitir continuidade segura.

Em entrevista, enfatizar:

- identificar último ponto consistente;
- saber o que já foi persistido;
- garantir idempotência/reprocessamento seguro;
- reconciliar entradas e saídas;
- documentar incidente e causa raiz.

## 9. Batch x Online

### Batch

- processa volume de registros;
- normalmente agendado;
- foco em throughput, integridade e conciliação;
- pode exigir restart/recovery.

### Online

- interação transacional;
- resposta rápida;
- estado e códigos de retorno importantes;
- normalmente associado a CICS em ambientes COBOL clássicos.

## 10. Sustentação / Production Support

Meu background financeiro ajuda especialmente nesta frente.

Estrutura para investigar um incidente:

1. entender impacto de negócio;
2. identificar sistema/processo afetado;
3. coletar evidências;
4. localizar erro técnico;
5. avaliar risco de reprocessamento;
6. corrigir ou contornar;
7. reconciliar resultados;
8. registrar causa raiz e prevenção.

## 11. Modernização Mainframe

Estar preparado para explicar que modernização não significa simplesmente substituir COBOL.

Possíveis estratégias:

- manter core estável no mainframe;
- expor funções por APIs;
- integrar COBOL com Java/plataformas distribuídas;
- migrar partes específicas quando houver justificativa;
- criar observabilidade e automação ao redor do legado.

O projeto PayFlow API ajuda a discutir Java, REST, PostgreSQL, concorrência e integração em contexto financeiro.

## 12. Perguntas que devo fazer ao entrevistador

- A posição é mais desenvolvimento, sustentação ou ambos?
- O ambiente usa CICS, DB2 e VSAM?
- Como funciona o fluxo de batch e scheduling?
- Quais ferramentas de versionamento/deploy são usadas: Endevor, Changeman ou outras?
- Como é feito monitoramento e tratamento de incidentes?
- Existe iniciativa de modernização ou integração com APIs/Java?
- Como funciona onboarding de profissionais que estão entrando em Mainframe?

## 13. Regra de credibilidade

Nunca afirmar experiência profissional em z/OS, CICS, VSAM, Control-M, TSO/ISPF, Endevor ou Changeman se ela ainda não aconteceu em produção.

Usar a formulação correta:

> "Tenho conhecimento aplicado em laboratório e projetos de portfólio, e consigo explicar o papel dessas tecnologias no fluxo mainframe. Minha experiência profissional anterior está no domínio financeiro e operacional, que estou agora conectando à tecnologia."

Essa resposta preserva credibilidade e transforma a transição em vantagem, não em fragilidade.
