       IDENTIFICATION DIVISION.
       PROGRAM-ID. PROCESSA-MOVIMENTOS.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-MOV ASSIGN TO "cobol-portfolio/vsam-restart-bancario/data/movimentos.txt"
               ORGANIZATION IS LINE SEQUENTIAL.
           SELECT ARQ-MESTRE ASSIGN TO "clientes.idx"
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS M-ID
               FILE STATUS IS WS-FS-MESTRE.
           SELECT ARQ-REJEITADOS ASSIGN TO "rejeitados.txt"
               ORGANIZATION IS LINE SEQUENTIAL.
           SELECT ARQ-CHECKPOINT ASSIGN TO "checkpoint.txt"
               ORGANIZATION IS LINE SEQUENTIAL.

       DATA DIVISION.
       FILE SECTION.
       FD  ARQ-MOV.
       01  REG-MOV-IN                  PIC X(80).

       FD  ARQ-MESTRE.
       01  REG-MESTRE.
           05 M-ID                     PIC 9(6).
           05 M-NOME                   PIC X(30).
           05 M-SALDO                  PIC S9(9)V99.
           05 M-STATUS                 PIC X.

       FD  ARQ-REJEITADOS.
       01  REG-REJEITADO               PIC X(120).

       FD  ARQ-CHECKPOINT.
       01  REG-CHECKPOINT              PIC X(20).

       WORKING-STORAGE SECTION.
       01  WS-FS-MESTRE                PIC XX VALUE SPACES.
       01  WS-EOF                      PIC X VALUE 'N'.
       01  WS-SEQUENCIA                PIC 9(6) VALUE 0.
       01  WS-ULTIMO-PROCESSADO        PIC 9(6) VALUE 0.
       01  WS-ID                       PIC 9(6).
       01  WS-TIPO                     PIC X.
       01  WS-VALOR                    PIC 9(9)V99.
       01  WS-VALOR-EDIT               PIC -ZZZ,ZZZ,ZZ9.99.
       01  WS-MOTIVO                   PIC X(40).

       PROCEDURE DIVISION.
       MAIN.
           PERFORM CARREGA-CHECKPOINT

           OPEN INPUT ARQ-MOV
                I-O ARQ-MESTRE
                OUTPUT ARQ-REJEITADOS

           PERFORM UNTIL WS-EOF = 'S'
               READ ARQ-MOV
                   AT END
                       MOVE 'S' TO WS-EOF
                   NOT AT END
                       ADD 1 TO WS-SEQUENCIA
                       IF WS-SEQUENCIA > WS-ULTIMO-PROCESSADO
                           PERFORM PROCESSA-REGISTRO
                           PERFORM GRAVA-CHECKPOINT
                       END-IF
               END-READ
           END-PERFORM

           CLOSE ARQ-MOV ARQ-MESTRE ARQ-REJEITADOS
           DISPLAY 'PROCESSAMENTO CONCLUIDO. ULTIMO REGISTRO='
                   WS-SEQUENCIA
           GOBACK.

       CARREGA-CHECKPOINT.
           OPEN INPUT ARQ-CHECKPOINT
           IF WS-SEQUENCIA = 0
               CONTINUE
           END-IF
           READ ARQ-CHECKPOINT
               AT END
                   MOVE 0 TO WS-ULTIMO-PROCESSADO
               NOT AT END
                   MOVE REG-CHECKPOINT TO WS-ULTIMO-PROCESSADO
           END-READ
           CLOSE ARQ-CHECKPOINT.

       PROCESSA-REGISTRO.
           UNSTRING REG-MOV-IN DELIMITED BY ';'
               INTO WS-ID WS-TIPO WS-VALOR
           END-UNSTRING

           MOVE WS-ID TO M-ID
           READ ARQ-MESTRE KEY IS M-ID
               INVALID KEY
                   MOVE 'CONTA NAO ENCONTRADA' TO WS-MOTIVO
                   PERFORM GRAVA-REJEICAO
               NOT INVALID KEY
                   IF M-STATUS NOT = 'A'
                       MOVE 'CONTA INATIVA' TO WS-MOTIVO
                       PERFORM GRAVA-REJEICAO
                   ELSE
                       EVALUATE WS-TIPO
                           WHEN 'C'
                               ADD WS-VALOR TO M-SALDO
                               REWRITE REG-MESTRE
                           WHEN 'D'
                               IF M-SALDO >= WS-VALOR
                                   SUBTRACT WS-VALOR FROM M-SALDO
                                   REWRITE REG-MESTRE
                               ELSE
                                   MOVE 'SALDO INSUFICIENTE' TO WS-MOTIVO
                                   PERFORM GRAVA-REJEICAO
                               END-IF
                           WHEN OTHER
                               MOVE 'TIPO INVALIDO' TO WS-MOTIVO
                               PERFORM GRAVA-REJEICAO
                       END-EVALUATE
                   END-IF
           END-READ.

       GRAVA-REJEICAO.
           MOVE WS-VALOR TO WS-VALOR-EDIT
           STRING
               'SEQ=' WS-SEQUENCIA
               ';CONTA=' WS-ID
               ';TIPO=' WS-TIPO
               ';VALOR=' WS-VALOR-EDIT
               ';MOTIVO=' WS-MOTIVO
               DELIMITED BY SIZE
               INTO REG-REJEITADO
           END-STRING
           WRITE REG-REJEITADO.

       GRAVA-CHECKPOINT.
           OPEN OUTPUT ARQ-CHECKPOINT
           MOVE WS-SEQUENCIA TO REG-CHECKPOINT
           WRITE REG-CHECKPOINT
           CLOSE ARQ-CHECKPOINT.
