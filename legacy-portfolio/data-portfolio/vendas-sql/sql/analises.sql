-- Receita total
SELECT ROUND(SUM(quantidade * valor_unitario), 2) AS receita_total
FROM vendas;

-- Receita por categoria
SELECT categoria,
       ROUND(SUM(quantidade * valor_unitario), 2) AS receita
FROM vendas
GROUP BY categoria
ORDER BY receita DESC;

-- Faturamento por vendedor
SELECT vendedor,
       ROUND(SUM(quantidade * valor_unitario), 2) AS faturamento
FROM vendas
GROUP BY vendedor
ORDER BY faturamento DESC;

-- Ticket médio por linha de venda
SELECT ROUND(AVG(quantidade * valor_unitario), 2) AS ticket_medio
FROM vendas;

-- Receita por mês (SQLite)
SELECT strftime('%Y-%m', data) AS mes,
       ROUND(SUM(quantidade * valor_unitario), 2) AS receita
FROM vendas
GROUP BY mes
ORDER BY mes;

-- Receita por forma de pagamento
SELECT forma_pagamento,
       ROUND(SUM(quantidade * valor_unitario), 2) AS receita
FROM vendas
GROUP BY forma_pagamento
ORDER BY receita DESC;

-- Top 5 produtos por receita
SELECT produto,
       ROUND(SUM(quantidade * valor_unitario), 2) AS receita
FROM vendas
GROUP BY produto
ORDER BY receita DESC
LIMIT 5;
