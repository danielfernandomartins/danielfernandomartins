       IDENTIFICATION DIVISION.
       PROGRAM-ID. CONTCICS.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       EXEC SQL INCLUDE SQLCA END-EXEC.

       01 WS-CONTA                 PIC X(10).
       01 WS-TITULAR               PIC X(30).
       01 WS-STATUS                PIC X(10).
       01 WS-SALDO                 PIC S9(9)V99 COMP-3.
       01 WS-MENSAGEM              PIC X(60).

       LINKAGE SECTION.
       01 DFHCOMMAREA.
          05 LK-CONTA              PIC X(10).
          05 LK-RC                 PIC 9(2).
          05 LK-TITULAR            PIC X(30).
          05 LK-STATUS             PIC X(10).
          05 LK-SALDO              PIC S9(9)V99 COMP-3.
          05 LK-MENSAGEM           PIC X(60).

       PROCEDURE DIVISION.
       MAIN.
           IF EIBCALEN = 0
               EXEC CICS RETURN END-EXEC
           END-IF

           MOVE LK-CONTA TO WS-CONTA

           EXEC SQL
               SELECT TITULAR,
                      STATUS,
                      SALDO
                 INTO :WS-TITULAR,
                      :WS-STATUS,
                      :WS-SALDO
                 FROM CONTA_CORRENTE
                WHERE NUM_CONTA = :WS-CONTA
           END-EXEC

           EVALUATE SQLCODE
               WHEN 0
                   MOVE 00 TO LK-RC
                   MOVE WS-TITULAR TO LK-TITULAR
                   MOVE WS-STATUS TO LK-STATUS
                   MOVE WS-SALDO TO LK-SALDO
                   IF WS-STATUS = 'BLOQUEADA'
                       MOVE 12 TO LK-RC
                       MOVE 'CONTA BLOQUEADA' TO LK-MENSAGEM
                   ELSE
                       MOVE 'CONSULTA REALIZADA' TO LK-MENSAGEM
                   END-IF
               WHEN 100
                   MOVE 08 TO LK-RC
                   MOVE 'CONTA NAO ENCONTRADA' TO LK-MENSAGEM
               WHEN OTHER
                   MOVE 16 TO LK-RC
                   MOVE 'ERRO DB2 NA CONSULTA' TO LK-MENSAGEM
           END-EVALUATE

           EXEC CICS RETURN END-EXEC.
