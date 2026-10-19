       IDENTIFICATION DIVISION.
       PROGRAM-ID. LIQUIDACAO.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT ARQ-IN ASSIGN TO 'cobol-portfolio/batch-liquidacao-bancaria/data/transacoes.dat'
               ORGANIZATION IS LINE SEQUENTIAL.
           SELECT ARQ-REJ ASSIGN TO 'cobol-portfolio/batch-liquidacao-bancaria/output/rejeitados.txt'
               ORGANIZATION IS LINE SEQUENTIAL.
           SELECT ARQ-RES ASSIGN TO 'cobol-portfolio/batch-liquidacao-bancaria/output/resumo.txt'
               ORGANIZATION IS LINE SEQUENTIAL.

       DATA DIVISION.
       FILE SECTION.
       FD ARQ-IN.
       01 REG-IN                  PIC X(60).

       FD ARQ-REJ.
       01 REG-REJ                 PIC X(80).

       FD ARQ-RES.
       01 REG-RES                 PIC X(100).

       WORKING-STORAGE SECTION.
       01 WS-EOF                  PIC X VALUE 'N'.
       01 WS-QTD-VALIDAS           PIC 9(7) VALUE 0.
       01 WS-QTD-REJEITADAS        PIC 9(7) VALUE 0.
       01 WS-TOTAL                 PIC 9(11)V99 VALUE 0.
       01 WS-LINHA.
          05 WS-ID                 PIC X(10).
          05 FILLER                PIC X VALUE ';'.
          05 WS-CONTA              PIC X(10).
          05 FILLER                PIC X VALUE ';'.
          05 WS-TIPO               PIC X(10).
          05 FILLER                PIC X VALUE ';'.
          05 WS-VALOR-TXT          PIC X(12).
          05 FILLER                PIC X VALUE ';'.
          05 WS-STATUS             PIC X(10).
          05 FILLER                PIC X(3).
       01 WS-VALOR                 PIC 9(9)V99 VALUE 0.
       01 WS-VALOR-EDIT            PIC ZZZZZZZZ9.99.
       01 WS-MSG                   PIC X(80).

       PROCEDURE DIVISION.
       MAIN.
           OPEN INPUT ARQ-IN
                OUTPUT ARQ-REJ ARQ-RES

           PERFORM UNTIL WS-EOF = 'S'
               READ ARQ-IN
                   AT END
                       MOVE 'S' TO WS-EOF
                   NOT AT END
                       PERFORM PROCESSA-REGISTRO
               END-READ
           END-PERFORM

           MOVE SPACES TO REG-RES
           STRING 'VALIDAS=' DELIMITED BY SIZE
                  WS-QTD-VALIDAS DELIMITED BY SIZE
                  ' REJEITADAS=' DELIMITED BY SIZE
                  WS-QTD-REJEITADAS DELIMITED BY SIZE
                  INTO REG-RES
           END-STRING
           WRITE REG-RES

           MOVE WS-TOTAL TO WS-VALOR-EDIT
           MOVE SPACES TO REG-RES
           STRING 'TOTAL_PROCESSADO=' DELIMITED BY SIZE
                  WS-VALOR-EDIT DELIMITED BY SIZE
                  INTO REG-RES
           END-STRING
           WRITE REG-RES

           CLOSE ARQ-IN ARQ-REJ ARQ-RES
           STOP RUN.

       PROCESSA-REGISTRO.
           MOVE REG-IN TO WS-LINHA

           IF WS-STATUS NOT = 'PENDENTE  '
               PERFORM REJEITA-REGISTRO
               EXIT PARAGRAPH
           END-IF

           IF WS-VALOR-TXT IS NOT NUMERIC
               PERFORM REJEITA-REGISTRO
               EXIT PARAGRAPH
           END-IF

           MOVE WS-VALOR-TXT TO WS-VALOR

           IF WS-VALOR <= 0
               PERFORM REJEITA-REGISTRO
               EXIT PARAGRAPH
           END-IF

           ADD 1 TO WS-QTD-VALIDAS
           ADD WS-VALOR TO WS-TOTAL.

       REJEITA-REGISTRO.
           ADD 1 TO WS-QTD-REJEITADAS
           MOVE SPACES TO WS-MSG
           STRING 'REJEITADO: ' DELIMITED BY SIZE
                  REG-IN DELIMITED BY SIZE
                  INTO WS-MSG
           END-STRING
           MOVE WS-MSG TO REG-REJ
           WRITE REG-REJ.
