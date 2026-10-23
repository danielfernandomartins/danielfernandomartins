# 09 — Exercícios SQL Resolvidos

Use este arquivo para treinar SQL de entrevista. Leia a pergunta, tente resolver e só depois compare.

## Schema usado

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
```

---

## 1. Listar usuários em ordem alfabética

```sql
SELECT id, name, email
FROM users
ORDER BY name ASC;
```

---

## 2. Buscar usuários cujo nome contém `dan`

```sql
SELECT *
FROM users
WHERE name ILIKE '%dan%';
```

No PostgreSQL, `ILIKE` faz comparação textual case-insensitive.

---

## 3. Buscar produtos ativos acima de R$ 100

```sql
SELECT *
FROM products
WHERE active = TRUE
  AND price > 100
ORDER BY price DESC;
```

---

## 4. Mostrar os 10 pedidos mais recentes

```sql
SELECT *
FROM orders
ORDER BY created_at DESC
LIMIT 10;
```

---

## 5. Mostrar pedidos com nome do usuário

```sql
SELECT
  orders.id,
  users.name AS user_name,
  orders.created_at
FROM orders
JOIN users ON users.id = orders.user_id
ORDER BY orders.created_at DESC;
```

---

## 6. Calcular valor de cada item do pedido

```sql
SELECT
  order_id,
  product_id,
  quantity,
  unit_price,
  quantity * unit_price AS subtotal
FROM order_items;
```

---

## 7. Calcular valor total de cada pedido

```sql
SELECT
  order_id,
  SUM(quantity * unit_price) AS total
FROM order_items
GROUP BY order_id;
```

---

## 8. Mostrar pedido, cliente e total

```sql
SELECT
  orders.id,
  users.name,
  SUM(order_items.quantity * order_items.unit_price) AS total
FROM orders
JOIN users ON users.id = orders.user_id
JOIN order_items ON order_items.order_id = orders.id
GROUP BY orders.id, users.name
ORDER BY orders.id;
```

---

## 9. Usuários que nunca fizeram pedido

```sql
SELECT users.*
FROM users
LEFT JOIN orders ON orders.user_id = users.id
WHERE orders.id IS NULL;
```

---

## 10. Quantidade de pedidos por usuário

```sql
SELECT
  users.id,
  users.name,
  COUNT(orders.id) AS order_count
FROM users
LEFT JOIN orders ON orders.user_id = users.id
GROUP BY users.id, users.name
ORDER BY order_count DESC;
```

Usar `LEFT JOIN` mantém usuários com zero pedidos.

---

## 11. Usuários com mais de 3 pedidos

```sql
SELECT
  user_id,
  COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 3;
```

`HAVING` filtra grupos após agregação.

---

## 12. Produto mais caro

```sql
SELECT *
FROM products
ORDER BY price DESC
LIMIT 1;
```

---

## 13. Preço médio dos produtos ativos

```sql
SELECT AVG(price) AS average_price
FROM products
WHERE active = TRUE;
```

---

## 14. Total gasto por usuário

```sql
SELECT
  users.id,
  users.name,
  COALESCE(SUM(order_items.quantity * order_items.unit_price), 0) AS total_spent
FROM users
LEFT JOIN orders ON orders.user_id = users.id
LEFT JOIN order_items ON order_items.order_id = orders.id
GROUP BY users.id, users.name
ORDER BY total_spent DESC;
```

`COALESCE` troca `NULL` por zero.

---

## 15. Top 5 clientes por gasto

```sql
SELECT
  users.id,
  users.name,
  SUM(order_items.quantity * order_items.unit_price) AS total_spent
FROM users
JOIN orders ON orders.user_id = users.id
JOIN order_items ON order_items.order_id = orders.id
GROUP BY users.id, users.name
ORDER BY total_spent DESC
LIMIT 5;
```

---

## 16. Produtos nunca vendidos

```sql
SELECT products.*
FROM products
LEFT JOIN order_items ON order_items.product_id = products.id
WHERE order_items.product_id IS NULL;
```

---

## 17. Quantidade vendida por produto

```sql
SELECT
  products.id,
  products.name,
  COALESCE(SUM(order_items.quantity), 0) AS sold_quantity
FROM products
LEFT JOIN order_items ON order_items.product_id = products.id
GROUP BY products.id, products.name
ORDER BY sold_quantity DESC;
```

---

## 18. Atualizar preço de um produto

```sql
UPDATE products
SET price = 149.90
WHERE id = 10;
```

Sempre confira o `WHERE` antes de executar `UPDATE`.

---

## 19. Desativar todos os produtos abaixo de R$ 10

```sql
UPDATE products
SET active = FALSE
WHERE price < 10;
```

---

## 20. Excluir um usuário

```sql
DELETE FROM users
WHERE id = 5;
```

Isso pode falhar se houver pedidos referenciando esse usuário, dependendo da foreign key. Esse comportamento é desejável quando queremos preservar integridade.

---

# Perguntas conceituais resolvidas

## WHERE x HAVING?

> WHERE filtra linhas antes de agrupamento. HAVING filtra grupos após GROUP BY.

## COUNT(*) x COUNT(coluna)?

> COUNT(*) conta linhas. COUNT(coluna) ignora valores NULL daquela coluna.

## Por que `LEFT JOIN` para usuários sem pedidos?

> Porque INNER JOIN eliminaria usuários sem correspondência. LEFT JOIN mantém todos os usuários e deixa colunas de `orders` como NULL quando não há pedido.

## Por que salvar `unit_price` em `order_items` se produto já tem preço?

> Porque o pedido precisa preservar o preço praticado no momento da compra. Se o preço atual do produto mudar, o histórico do pedido não deve mudar.

## Por que não usar `SELECT *` sempre?

> Porque retornar só as colunas necessárias reduz acoplamento, tráfego e risco de expor dados que não deveriam sair da camada de persistência.

---

# Desafios de entrevista com solução

## A. Segundo produto mais caro

Solução simples:

```sql
SELECT DISTINCT price
FROM products
ORDER BY price DESC
OFFSET 1
LIMIT 1;
```

Para obter o produto completo, existem outras estratégias. O importante é esclarecer se preços repetidos contam como posições distintas.

---

## B. Pedidos feitos nos últimos 30 dias

```sql
SELECT *
FROM orders
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;
```

---

## C. Usuários com gasto acima de 1000

```sql
SELECT
  users.id,
  users.name,
  SUM(order_items.quantity * order_items.unit_price) AS total_spent
FROM users
JOIN orders ON orders.user_id = users.id
JOIN order_items ON order_items.order_id = orders.id
GROUP BY users.id, users.name
HAVING SUM(order_items.quantity * order_items.unit_price) > 1000;
```

---

# Como estudar SQL para entrevista

1. Leia o schema.
2. Explique as relações.
3. Resolva a consulta em português antes do SQL.
4. Escreva `FROM` e `JOIN`.
5. Adicione filtros.
6. Só depois agregação e ordenação.
7. Teste mentalmente casos com zero relações e valores NULL.

Se você consegue explicar **por que** uma query funciona, está aprendendo SQL de verdade.
