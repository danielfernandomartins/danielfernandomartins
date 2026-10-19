       IDENTIFICATION DIVISION.
       PROGRAM-ID. CONSULTA-CONTA.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-CONTAS ASSIGN TO 'cobol-portfolio/conta-corrente-online-cics/data/contas.dat'
               ORGANIZATION IS LINE SEQUENTIAL.

       DATA DIVISION.
       FILE SECTION.
       FD ARQ-CONTAS.
       01 REG-CONTA                 PIC X(65).

       WORKING-STORAGE SECTION.
       01 WS-EOF                    PIC X VALUE 'N'.
       01 WS-ENCONTROU              PIC X VALUE 'N'.
       01 WS-CONTA-PESQUISA         PIC X(10).
       01 WS-LINHA.
          05 WS-CONTA               PIC X(10).
          05 FILLER                 PIC X VALUE ';'.
          05 WS-TITULAR             PIC X(30).
          05 FILLER                 PIC X VALUE ';'.
          05 WS-STATUS              PIC X(10).
          05 FILLER                 PIC X VALUE ';'.
          05 WS-SALDO-TXT           PIC X(12).
       01 WS-SALDO                  PIC 9(9)V99 VALUE 0.
       01 WS-SALDO-EDIT             PIC ZZZZZZZZ9.99.

       PROCEDURE DIVISION.
       MAIN.
           DISPLAY 'INFORME A CONTA (10 POSICOES): '
           ACCEPT WS-CONTA-PESQUISA

           IF WS-CONTA-PESQUISA = SPACES
               DISPLAY 'RC=04 - CONTA INVALIDA'
               STOP RUN
           END-IF

           OPEN INPUT ARQ-CONTAS

           PERFORM UNTIL WS-EOF = 'S' OR WS-ENCONTROU = 'S'
               READ ARQ-CONTAS
                   AT END
                       MOVE 'S' TO WS-EOF
                   NOT AT END
                       MOVE REG-CONTA TO WS-LINHA
                       IF WS-CONTA = WS-CONTA-PESQUISA
                           MOVE 'S' TO WS-ENCONTROU
                           PERFORM EXIBE-CONTA
                       END-IF
               END-READ
           END-PERFORM

           IF WS-ENCONTROU = 'N'
               DISPLAY 'RC=08 - CONTA NAO ENCONTRADA'
           END-IF

           CLOSE ARQ-CONTAS
           STOP RUN.

       EXIBE-CONTA.
           IF WS-STATUS = 'BLOQUEADA  '
               DISPLAY 'RC=12 - CONTA BLOQUEADA'
               EXIT PARAGRAPH
           END-IF

           MOVE WS-SALDO-TXT TO WS-SALDO
           MOVE WS-SALDO TO WS-SALDO-EDIT
           DISPLAY 'RC=00 - CONSULTA OK'
           DISPLAY 'TITULAR: ' WS-TITULAR
           DISPLAY 'STATUS : ' WS-STATUS
           DISPLAY 'SALDO  : ' WS-SALDO-EDIT.
