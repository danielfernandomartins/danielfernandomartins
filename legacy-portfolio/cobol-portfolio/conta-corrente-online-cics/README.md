# COBOL Online — Consulta de Conta Corrente (CICS-oriented)

Projeto de portfólio para vagas de **Desenvolvedor COBOL/Mainframe** com foco em processamento online/transacional, inspirado em fluxos bancários que utilizam **COBOL + CICS + DB2**.

## Objetivo

Demonstrar fundamentos pedidos em vagas de bancos e consultorias:

- COBOL estruturado;
- transação online;
- leitura de conta e saldo;
- SQL/DB2;
- códigos de retorno;
- tratamento de erro;
- separação entre regra de negócio e interface transacional;
- documentação de fluxo CICS.

## Importante sobre o ambiente

O código COBOL local utiliza arquivo sequencial para permitir execução com **GnuCOBOL**. Também há um exemplo separado de programa com comandos **EXEC CICS** e **EXEC SQL** para mostrar a adaptação conceitual ao ambiente z/OS. Esse exemplo não é apresentado como execução real em CICS/DB2.

## Caso de uso

Uma transação recebe o número da conta e deve retornar:

- titular;
- status da conta;
- saldo disponível;
- código de retorno;
- mensagem funcional apropriada.

Cenários tratados:

1. conta ativa encontrada;
2. conta bloqueada;
3. conta inexistente;
4. entrada inválida;
5. falha de acesso a dados.

## Stack

- COBOL
- CICS (exemplo orientado a mainframe)
- DB2 / SQL
- VSAM/arquivo indexado como possibilidade de evolução
- COMMAREA
- códigos de retorno
- tratamento de SQLCODE

## Estrutura

```text
conta-corrente-online-cics/
├── src/
│   ├── consulta-conta-local.cbl
│   └── consulta-conta-cics.cbl
├── sql/
│   └── conta-db2.sql
├── data/
│   └── contas.dat
├── CICS-FLOW.md
└── README.md
```

## Execução local

```bash
cobc -x -free src/consulta-conta-local.cbl -o consulta-conta
./consulta-conta
```

## O que este case demonstra

- lógica COBOL aplicada a domínio bancário;
- leitura de dados de conta;
- tratamento de status e retorno;
- entendimento conceitual de CICS/COMMAREA;
- SQL embarcado e tratamento de `SQLCODE`;
- preocupação com sustentação e mensagens operacionais.

## Perguntas de entrevista que o projeto suporta

- Qual a diferença entre batch e processamento online?
- Como uma COMMAREA transporta dados em uma transação CICS?
- Como tratar `SQLCODE +100` versus erro negativo no DB2?
- Quando usar VSAM e quando usar DB2?
- Como evitar expor dados sensíveis em mensagens e logs?
- Como estruturar tratamento de erro em um programa transacional?

## Autor

**Daniel Fernando Martins** — portfólio focado em tecnologia bancária, COBOL/Mainframe e modernização de carreira com forte contexto financeiro.
