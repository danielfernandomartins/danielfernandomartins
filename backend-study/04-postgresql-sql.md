# 04 — SQL, PostgreSQL e Modelagem

## 1. O que é banco de dados relacional?

Um banco relacional organiza dados em tabelas relacionadas por chaves.

Exemplo:

```text
users
- id
- name
- email

orders
- id
- user_id
- total
```

`orders.user_id` referencia `users.id`.

### Resposta de entrevista

> Um banco relacional organiza dados em tabelas com relações definidas por chaves. Ele oferece consistência, consultas SQL, constraints e transações.

---

## 2. PostgreSQL

PostgreSQL é um banco relacional robusto e muito usado em aplicações Web.

Ele oferece:

- SQL;
- transações;
- constraints;
- índices;
- joins;
- tipos ricos;
- recursos avançados de consulta.

---

## 3. Tabela

Exemplo:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Conceitos

`PRIMARY KEY`: identifica cada linha.

`NOT NULL`: campo obrigatório.

`UNIQUE`: impede duplicidade.

`DEFAULT`: valor padrão.

---

## 4. CRUD em SQL

### CREATE

```sql
INSERT INTO users (name, email)
VALUES ('Daniel', 'daniel@example.com');
```

### READ

```sql
SELECT id, name, email
FROM users;
```

### UPDATE

```sql
UPDATE users
SET name = 'Daniel Martins'
WHERE id = 1;
```

### DELETE

```sql
DELETE FROM users
WHERE id = 1;
```

### Regra crítica

Nunca execute `UPDATE` ou `DELETE` sem entender o `WHERE`.

---

## 5. Filtros

```sql
SELECT *
FROM users
WHERE email = 'daniel@example.com';
```

```sql
SELECT *
FROM products
WHERE price >= 100
  AND active = true;
```

---

## 6. Ordenação e limite

```sql
SELECT *
FROM products
ORDER BY price DESC
LIMIT 10;
```

---

## 7. JOIN

Dados:

```text
users
1 | Daniel

orders
10 | user_id=1 | total=250
```

Consulta:

```sql
SELECT
  users.name,
  orders.id,
  orders.total
FROM users
JOIN orders ON orders.user_id = users.id;
```

### INNER JOIN

Retorna linhas com correspondência dos dois lados.

### LEFT JOIN

Mantém todas as linhas da tabela da esquerda, mesmo sem relação correspondente.

```sql
SELECT users.name, orders.id
FROM users
LEFT JOIN orders ON orders.user_id = users.id;
```

### Resposta de entrevista

> INNER JOIN retorna apenas correspondências; LEFT JOIN preserva todos os registros da tabela à esquerda e preenche o lado direito com NULL quando não existe correspondência.

---

## 8. Chave primária e estrangeira

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  total NUMERIC(12, 2) NOT NULL
);
```

`user_id` é uma foreign key.

Ela ajuda a garantir integridade referencial.

---

## 9. Cardinalidade

### 1:N

Um usuário possui muitos pedidos.

```text
users 1 ---- N orders
```

### N:N

Um aluno pode fazer vários cursos e um curso possui vários alunos.

Tabela intermediária:

```sql
CREATE TABLE enrollments (
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  PRIMARY KEY (user_id, course_id)
);
```

---

## 10. Normalização em nível inicial

Evite duplicar dados sem necessidade.

Ruim:

```text
orders
id | customer_name | customer_email | ...
```

Se o cliente mudar e-mail, vários pedidos antigos podem ficar inconsistentes.

Melhor:

```text
users
id | name | email

orders
id | user_id
```

Mas normalização não é religião. Existem cenários em que dados históricos precisam ser copiados de propósito, como endereço de entrega usado no momento da compra.

---

## 11. Índices

Índice acelera certos tipos de consulta, mas possui custo de armazenamento e escrita.

```sql
CREATE INDEX idx_users_email
ON users(email);
```

Como `UNIQUE(email)` normalmente já cria estrutura de índice, não seria necessário duplicar esse índice.

### Quando pensar em índice?

Campos usados com frequência em:

- filtros;
- joins;
- ordenação.

### Resposta de entrevista

> Índices podem reduzir o custo de leitura, mas aumentam custo de escrita e armazenamento. Eu adicionaria com base em consultas reais e análise de plano, não em todo campo automaticamente.

---

## 12. Transações

Uma transferência financeira envolve duas mudanças que precisam ser atômicas:

```text
retirar 100 de A
adicionar 100 em B
```

Se apenas a primeira ocorrer, os dados ficam incorretos.

Transação:

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
```

Em erro:

```sql
ROLLBACK;
```

### Resposta de entrevista

> Uma transação agrupa operações que devem ser confirmadas ou revertidas juntas. É essencial quando uma regra exige consistência entre múltiplas alterações.

---

## 13. ACID em nível de entrevista júnior

**Atomicity:** tudo ou nada.

**Consistency:** regras de integridade são preservadas.

**Isolation:** transações concorrentes devem evitar interferências incorretas.

**Durability:** após commit, os dados confirmados devem persistir.

---

## 14. Agregações

```sql
SELECT COUNT(*)
FROM users;
```

```sql
SELECT AVG(price)
FROM products;
```

```sql
SELECT user_id, SUM(total) AS total_spent
FROM orders
GROUP BY user_id;
```

---

## 15. HAVING

`WHERE` filtra linhas antes do agrupamento.

`HAVING` filtra grupos.

```sql
SELECT user_id, SUM(total) AS total_spent
FROM orders
GROUP BY user_id
HAVING SUM(total) > 1000;
```

---

## 16. SQL Injection

Nunca monte SQL concatenando input do usuário.

Ruim:

```ts
const sql = `SELECT * FROM users WHERE email = '${email}'`;
```

Melhor: query parametrizada.

```sql
SELECT * FROM users WHERE email = $1;
```

ORMs também ajudam, mas não eliminam toda possibilidade de uso inseguro quando raw SQL é utilizado.

---

## 17. Prisma e ORM

ORM permite trabalhar com banco por uma API de código.

Exemplo conceitual:

```ts
const user = await prisma.user.findUnique({
  where: { email }
});
```

### ORM x SQL

Você ainda precisa saber SQL.

### Resposta de entrevista

> ORM melhora produtividade e tipagem, mas não substitui conhecimento de modelagem, índices, joins e comportamento do banco. Quando a consulta fica complexa, preciso entender o SQL gerado e o custo dela.

---

# Exercícios resolvidos

## 1. Buscar cinco usuários mais recentes

```sql
SELECT *
FROM users
ORDER BY created_at DESC
LIMIT 5;
```

---

## 2. Buscar pedidos com nome do usuário

```sql
SELECT
  orders.id,
  orders.total,
  users.name
FROM orders
JOIN users ON users.id = orders.user_id;
```

---

## 3. Contar pedidos por usuário

```sql
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id;
```

---

## 4. Usuários sem pedidos

```sql
SELECT users.*
FROM users
LEFT JOIN orders ON orders.user_id = users.id
WHERE orders.id IS NULL;
```

---

## 5. E-mail deve ser duplicado?

Não. Use `UNIQUE` no banco e também trate o conflito na aplicação.

---

# Mini entrevista resolvida

### Primary key x foreign key?

> Primary key identifica unicamente uma linha. Foreign key aponta para outra tabela e ajuda a garantir relação válida entre registros.

### O que é JOIN?

> É uma operação para combinar linhas de tabelas relacionadas a partir de uma condição.

### O que é índice?

> É uma estrutura que pode acelerar busca, ordenação e joins, com custo adicional em escrita e armazenamento.

### O que é transação?

> É um conjunto de operações tratado como unidade. Ou todas são confirmadas ou todas são revertidas.

### ORM elimina SQL Injection?

> Ele reduz riscos ao parametrizar operações comuns, mas raw queries ainda podem ser mal utilizadas. Além disso, segurança depende de validação e de não montar SQL por concatenação.

---

# Checklist

- SELECT, INSERT, UPDATE e DELETE.
- WHERE, ORDER BY e LIMIT.
- PK e FK.
- 1:N e N:N.
- INNER JOIN e LEFT JOIN.
- GROUP BY e agregações.
- UNIQUE e constraints.
- índices.
- transações.
- SQL parametrizado.
- ORM não substitui SQL.
