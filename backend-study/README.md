# Back-End do Zero à Primeira Vaga

Trilha prática de estudo com foco em **Node.js + TypeScript + PostgreSQL**, organizada para aprender, revisar e responder entrevistas técnicas.

> Objetivo: sair do nível iniciante até conseguir explicar, construir e defender uma API Back-End completa.

## Como estudar

1. Leia a teoria.
2. Refaça os exemplos sem copiar.
3. Tente responder as perguntas de entrevista antes de abrir as respostas.
4. Refaça os exercícios resolvidos sozinho.
5. Só avance quando conseguir explicar o assunto em voz alta com suas próprias palavras.

## Ordem recomendada

1. [HTTP, cliente, servidor, API e REST](01-http-api-rest.md)
2. [Node.js, TypeScript, módulos e assíncrono](02-node-typescript.md)
3. [APIs, arquitetura, validação e erros](03-api-architecture.md)
4. [SQL, PostgreSQL e modelagem](04-postgresql-sql.md)
5. [Autenticação, segurança e testes](05-auth-security-tests.md)
6. [Entrevista Back-End: perguntas e respostas](06-interview-qa.md)
7. [Projetos guiados do zero à vaga](07-projects-roadmap.md)
8. [Task API totalmente resolvida](08-task-api-resolvida.md)
9. [Exercícios SQL resolvidos](09-sql-exercises-resolvidos.md)

## O que já está respondido

A trilha inclui:

- teoria explicada do zero;
- respostas-modelo de entrevista;
- exercícios com solução;
- SQL resolvido passo a passo;
- arquitetura comentada;
- segurança e autenticação;
- testes unitários e de integração;
- projeto Task API com código completo de referência;
- projetos maiores com modelagem e decisões explicadas;
- simulações de perguntas que costumam revelar lacunas de fundamento.

## Stack da trilha

- Node.js
- TypeScript
- Express ou Fastify
- PostgreSQL
- Prisma
- Zod
- Vitest/Jest
- Supertest
- Docker
- GitHub Actions

## Meta de domínio

Ao final, você deve conseguir explicar com segurança este fluxo:

```text
Cliente / Front-End
       ↓
HTTP Request
       ↓
Router
       ↓
Controller
       ↓
Service / regra de negócio
       ↓
Repository / ORM
       ↓
PostgreSQL
       ↓
HTTP Response
```

Resposta de entrevista modelo:

> O Front-End envia uma requisição HTTP para um endpoint. A aplicação Back-End identifica a rota, valida os dados, executa a regra de negócio, consulta ou altera o banco e devolve uma resposta com status HTTP e JSON. Em aplicações maiores, separo camada HTTP, regra de negócio e acesso a dados para reduzir acoplamento e facilitar testes.

## Regra importante

As respostas prontas existem para acelerar a correção e revisão, não para substituir prática. Para realmente ficar pronto para entrevista, tente responder primeiro sem olhar e depois compare com a solução.

Para primeira vaga, é mais valioso entender muito bem **HTTP, APIs, JavaScript/TypeScript, Node.js, SQL, banco de dados, autenticação, erros e testes** do que conhecer dez frameworks superficialmente.
