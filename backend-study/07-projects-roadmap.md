# 07 — Projetos Guiados do Zero à Primeira Vaga

A trilha usa poucos projetos, cada um com objetivo técnico claro. A meta é você conseguir **construir, testar e explicar** cada decisão.

---

# Projeto 1 — Task API

## Objetivo

Aprender HTTP, Node.js, TypeScript, rotas, validação, arquitetura simples e testes.

## Funcionalidades

- criar tarefa;
- listar tarefas;
- buscar tarefa por ID;
- atualizar título e status;
- excluir tarefa.

## Endpoints

```text
POST   /tasks
GET    /tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
```

## Modelo inicial

```ts
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
```

## Regras

- título obrigatório;
- título com tamanho mínimo;
- tarefa inexistente retorna 404;
- criação retorna 201;
- exclusão bem-sucedida pode retornar 204.

## Arquitetura

```text
routes/
controllers/
services/
schemas/
```

Sem banco no primeiro momento: use repositório em memória para entender o fluxo.

## Testes obrigatórios

- cria tarefa válida;
- rejeita título vazio;
- lista tarefas;
- retorna 404 para ID inexistente;
- conclui tarefa;
- exclui tarefa.

## Perguntas que você deve saber responder

### Por que começar sem banco?

> Para isolar o aprendizado de HTTP, arquitetura e testes. Depois troco a persistência sem precisar reaprender a camada HTTP.

### Por que PATCH?

> Porque quero alterar parcialmente título ou status, sem substituir todos os campos da tarefa.

### Por que service?

> Para manter regra de negócio separada de `req` e `res`, facilitando teste e evolução.

---

# Projeto 2 — Finance API

## Objetivo

Aprender PostgreSQL, Prisma, relacionamentos, autenticação, autorização, transações e testes de integração.

## Domínio

```text
User
- id
- name
- email
- passwordHash

Account
- id
- userId
- name
- balance

Transaction
- id
- accountId
- type
- amount
- description
- createdAt
```

## Relações

```text
User 1 ---- N Account
Account 1 ---- N Transaction
```

## Funcionalidades

- cadastro;
- login;
- criar conta;
- listar contas do usuário autenticado;
- registrar receita;
- registrar despesa;
- visualizar extrato;
- resumo por período;
- transferência entre contas.

## Regras importantes

- e-mail único;
- password hash;
- usuário só acessa próprias contas;
- valor deve ser positivo;
- transferência ocorre em transação de banco;
- saldo insuficiente é erro de negócio;
- hash nunca aparece em resposta.

## Endpoints sugeridos

```text
POST /users
POST /sessions
GET  /me

POST /accounts
GET  /accounts
GET  /accounts/:id

POST /accounts/:id/transactions
GET  /accounts/:id/transactions
POST /transfers
```

## Transferência — solução conceitual

```ts
async function transfer(input: TransferInput) {
  return database.transaction(async (tx) => {
    const source = await tx.account.findById(input.sourceId);
    const target = await tx.account.findById(input.targetId);

    if (!source || !target) {
      throw new NotFoundError();
    }

    if (source.balance < input.amount) {
      throw new ConflictError('Insufficient balance');
    }

    await tx.account.decrementBalance(source.id, input.amount);
    await tx.account.incrementBalance(target.id, input.amount);

    await tx.transaction.createDebit(...);
    await tx.transaction.createCredit(...);
  });
}
```

É código conceitual. A implementação real depende do ORM e de como concorrência é tratada.

## Testes obrigatórios

- cadastro válido;
- e-mail duplicado;
- login correto/incorreto;
- acesso sem autenticação;
- acesso à conta de outro usuário;
- receita;
- despesa;
- saldo insuficiente;
- transferência atômica;
- rollback em falha.

## Perguntas de entrevista

### Por que `UNIQUE` no banco se já valido e-mail?

> Porque validação prévia sozinha pode sofrer corrida. O banco precisa garantir a invariável também.

### Por que transação para transferência?

> Porque débito e crédito pertencem à mesma operação de negócio. Se uma parte falhar, nenhuma deve permanecer.

### Por que não armazenar saldo apenas somando transações em toda consulta?

> É uma decisão de modelagem. Calcular sempre simplifica consistência conceitual, mas pode custar performance; manter saldo materializado melhora leitura, mas exige atualização transacional correta. Eu explicaria o trade-off e escolheria com base no sistema.

---

# Projeto 3 — Back-End de Produto

## Objetivo

Consolidar nível de primeira vaga com qualidade operacional.

Sugestão: **Support Desk API**.

## Domínio

```text
User
Organization
Ticket
Comment
Tag
AuditLog
```

## Funcionalidades

- autenticação;
- usuários e organizações;
- criação e atribuição de tickets;
- prioridades e status;
- comentários;
- filtros e paginação;
- histórico de mudanças;
- busca;
- autorização por papel;
- testes;
- Docker;
- CI;
- documentação da API.

## Stack

```text
Node.js
TypeScript
Fastify ou Express
PostgreSQL
Prisma
Zod
Vitest
Supertest
Docker
GitHub Actions
```

## Sinais de maturidade que o projeto deve demonstrar

- `.env.example` sem secrets;
- migrations versionadas;
- validação centralizada;
- tratamento global de erros;
- autorização explícita;
- paginação com limites;
- logs sem dados sensíveis;
- health check;
- testes de integração;
- CI com lint, typecheck, test e build;
- README com arquitetura e decisões;
- documentação de limitações reais.

---

# Plano de estudo em 8 semanas

A velocidade pode ser ajustada. O importante é domínio, não calendário.

## Semana 1 — HTTP e fundamentos

Dominar:

- cliente/servidor;
- HTTP;
- métodos;
- status;
- params/query/body/headers;
- API e REST.

Prática:

- desenhar endpoints no papel;
- explicar respostas em voz alta;
- usar Postman/Insomnia/curl.

## Semana 2 — Node + TypeScript

Dominar:

- runtime;
- npm;
- módulos;
- async/await;
- Promise;
- erro;
- env.

Prática:

- servidor HTTP simples;
- primeiros endpoints.

## Semana 3 — API organizada

Dominar:

- router;
- controller;
- service;
- schema;
- middleware;
- erro global.

Entrega:

- Projeto 1 completo.

## Semana 4 — SQL e PostgreSQL

Dominar:

- CRUD SQL;
- PK/FK;
- joins;
- agregação;
- índices;
- transações.

Prática:

- escrever SQL manual antes do ORM.

## Semana 5 — ORM + autenticação

Dominar:

- Prisma;
- migrations;
- relações;
- hashing;
- sessão/token;
- autorização.

## Semana 6 — Finance API

Implementar e testar Projeto 2.

Foco especial:

- transações;
- ownership;
- integração com banco.

## Semana 7 — Testes, Docker e CI

Dominar:

- unitário;
- integração;
- Supertest;
- banco de teste;
- Docker;
- pipeline CI.

## Semana 8 — Entrevista

Todos os dias:

- 20 perguntas rápidas;
- 1 exercício SQL;
- 1 debugging;
- 1 explicação de projeto;
- 1 problema de modelagem.

---

# Rotina diária de 90 minutos

## Bloco 1 — 20 min

Revisão ativa de perguntas de entrevista.

## Bloco 2 — 45 min

Código sem copiar solução.

## Bloco 3 — 15 min

Comparar sua solução com a solução resolvida e anotar diferenças.

## Bloco 4 — 10 min

Explicar em voz alta:

- o que fez;
- por que fez;
- erro encontrado;
- o que faria diferente.

---

# Critério de “pronto para entrevista”

Você não precisa saber tudo. Precisa conseguir:

- explicar HTTP sem confusão;
- criar API CRUD sozinho;
- validar entradas;
- usar async/await corretamente;
- escrever SQL básico/intermediário;
- modelar relações;
- explicar índice e transação;
- implementar autenticação básica com segurança;
- diferenciar autenticação/autorização;
- escrever testes de API;
- explicar seu próprio projeto sem decorar README;
- admitir limites sem inventar experiência.

---

# Teste final — desafio completo

Sem olhar solução, desenhe uma API de biblioteca com:

```text
User
Book
Loan
```

Regras:

- usuário autenticado pega livro emprestado;
- livro não pode ter dois empréstimos ativos;
- empréstimo possui data de retirada e devolução;
- usuário só vê próprios empréstimos;
- admin cadastra livros;
- filtros por título e disponibilidade;
- paginação;
- testes de concorrência/conflito.

## Solução de modelagem

```text
User 1 ---- N Loan N ---- 1 Book
```

`Loan`:

```text
id
user_id
book_id
borrowed_at
returned_at nullable
```

## Endpoints possíveis

```text
POST /sessions
GET  /books
POST /books                  admin
POST /books/:id/loans
PATCH /loans/:id/return
GET /me/loans
```

## Regra crítica

Antes de criar empréstimo, verifique se existe loan ativo para o livro. Além da regra na aplicação, pense em mecanismo de banco/transação que impeça corrida entre duas requisições simultâneas.

## Resposta de entrevista esperada

> Eu modelaria `Loan` como relação entre usuário e livro. A devolução seria representada por `returned_at`; um empréstimo ativo teria esse campo nulo. A criação precisa ser transacional porque duas requisições simultâneas podem tentar emprestar o mesmo livro. Eu validaria autorização, existência do livro e disponibilidade, criaria o empréstimo e retornaria 201. Um conflito de disponibilidade poderia retornar 409.

---

# Última regra

Você não estará pronto porque leu estes arquivos. Estará pronto quando conseguir **fechar o GitHub e reproduzir os conceitos e projetos sozinho**.
