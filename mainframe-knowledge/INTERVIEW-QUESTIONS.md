# Perguntas Técnicas — COBOL / Mainframe

## COBOL

1. Qual a diferença entre arquivo sequencial e indexado?
2. Para que serve `FILE STATUS`?
3. Quando usar `REWRITE`?
4. O que são `COMP` e `COMP-3`?
5. Para que servem `REDEFINES` e `OCCURS`?

## JCL

1. Qual o papel de `JOB`, `EXEC` e `DD`?
2. O que `DISP` controla?
3. Para que serve `SYSIN`?
4. Quando um GDG é útil?
5. Como você investigaria um step que terminou com return code diferente de zero?

## DB2

1. O que significa `SQLCODE +100`?
2. Como trataria SQLCODE negativo?
3. Por que commits muito frequentes ou muito raros podem ser problemáticos em batch?
4. Como restart/recovery se relaciona com commit?
5. O que você investigaria em deadlock ou timeout?

## CICS

1. Qual a diferença entre batch e online?
2. Para que serve COMMAREA?
3. Diferença conceitual entre `LINK` e `XCTL`?
4. O que é uma aplicação pseudo-conversational?
5. Por que liberar recursos entre interações importa?

## VSAM

1. O que é KSDS?
2. Como funciona acesso por chave?
3. Para que serve IDCAMS?
4. Qual a diferença entre leitura direta e sequencial?
5. O que precisa ser avaliado antes de um `REWRITE`?

## Produção / Sustentação

1. O que você faria diante de um abend em um job bancário?
2. Quando é seguro fazer rerun completo?
3. Quando restart por checkpoint é melhor?
4. Como evitar duplicidade financeira em reprocessamento?
5. Como provar que o lote terminou corretamente após recuperação?

## Modernização

1. Como integrar uma regra COBOL a uma API REST?
2. Onde manteria a regra de negócio durante uma modernização gradual?
3. Como trataria idempotência entre API e sistema legado?
4. Quais riscos existem ao duplicar regras entre COBOL e Java?
5. Como manter rastreabilidade ponta a ponta?

## Resposta que quero transmitir em entrevistas

Não pretendo decorar comandos isolados. Quero demonstrar uma linha de raciocínio consistente: **entender o fluxo, proteger integridade financeira, tratar retorno explicitamente, tornar processamento recuperável e documentar decisões**.
