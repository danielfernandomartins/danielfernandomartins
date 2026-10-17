       IDENTIFICATION DIVISION.
       PROGRAM-ID. CARGA-CLIENTES.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-ENTRADA ASSIGN TO "cobol-portfolio/vsam-restart-bancario/data/clientes.txt"
               ORGANIZATION IS LINE SEQUENTIAL.
           SELECT ARQ-MESTRE ASSIGN TO "clientes.idx"
               ORGANIZATION IS INDEXED
               ACCESS MODE IS DYNAMIC
               RECORD KEY IS M-ID
               FILE STATUS IS WS-FS-MESTRE.

       DATA DIVISION.
       FILE SECTION.
       FD  ARQ-ENTRADA.
       01  REG-ENTRADA                  PIC X(80).

       FD  ARQ-MESTRE.
       01  REG-MESTRE.
           05 M-ID                      PIC 9(6).
           05 M-NOME                    PIC X(30).
           05 M-SALDO                   PIC S9(9)V99.
           05 M-STATUS                  PIC X.

       WORKING-STORAGE SECTION.
       01  WS-FS-MESTRE                 PIC XX VALUE SPACES.
       01  WS-EOF                       PIC X VALUE 'N'.
       01  WS-ID                        PIC 9(6).
       01  WS-NOME                      PIC X(30).
       01  WS-SALDO                     PIC S9(9)V99.
       01  WS-STATUS                    PIC X.

       PROCEDURE DIVISION.
       MAIN.
           OPEN INPUT ARQ-ENTRADA
                OUTPUT ARQ-MESTRE

           PERFORM UNTIL WS-EOF = 'S'
               READ ARQ-ENTRADA
                   AT END
                       MOVE 'S' TO WS-EOF
                   NOT AT END
                       UNSTRING REG-ENTRADA DELIMITED BY ';'
                           INTO WS-ID WS-NOME WS-SALDO WS-STATUS
                       END-UNSTRING

                       MOVE WS-ID     TO M-ID
                       MOVE WS-NOME   TO M-NOME
                       MOVE WS-SALDO  TO M-SALDO
                       MOVE WS-STATUS TO M-STATUS

                       WRITE REG-MESTRE
                           INVALID KEY
                               DISPLAY 'ERRO AO GRAVAR ID=' M-ID
                                       ' FS=' WS-FS-MESTRE
                       END-WRITE
               END-READ
           END-PERFORM

           CLOSE ARQ-ENTRADA ARQ-MESTRE
           DISPLAY 'CARGA CONCLUIDA'
           GOBACK.
