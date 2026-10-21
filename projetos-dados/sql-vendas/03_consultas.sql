-- 01_kpis
-- Receita, número de vendas concluídas e ticket médio.
SELECT COUNT(*) AS vendas_concluidas,
 ROUND(SUM(valor_bruto_centavos-desconto_centavos)/100.0,2) AS receita_liquida,
 ROUND(AVG(valor_bruto_centavos-desconto_centavos)/100.0,2) AS ticket_medio
FROM vendas WHERE status='Concluida';

-- 02_receita_mensal
SELECT substr(data,1,7) AS mes, COUNT(*) AS vendas_concluidas,
 ROUND(SUM(valor_bruto_centavos-desconto_centavos)/100.0,2) AS receita_liquida
FROM vendas WHERE status='Concluida' GROUP BY substr(data,1,7) ORDER BY mes;

-- 03_receita_categoria
SELECT p.categoria, SUM(v.quantidade) AS unidades,
 ROUND(SUM(v.valor_bruto_centavos-v.desconto_centavos)/100.0,2) AS receita_liquida
FROM vendas v JOIN produtos p ON p.produto_id=v.produto_id
WHERE v.status='Concluida' GROUP BY p.categoria ORDER BY receita_liquida DESC;

-- 04_clientes_sem_compras
-- O filtro no ON preserva clientes sem vendas concluídas.
SELECT c.cliente_id,c.cliente,COUNT(v.venda_id) AS compras_concluidas,
 COALESCE(SUM(v.valor_bruto_centavos-v.desconto_centavos),0)/100.0 AS receita_liquida
FROM clientes c LEFT JOIN vendas v ON v.cliente_id=c.cliente_id AND v.status='Concluida'
GROUP BY c.cliente_id,c.cliente HAVING COUNT(v.venda_id)=0 ORDER BY c.cliente_id;

-- 05_ranking_clientes
WITH totais AS (
 SELECT c.cliente, SUM(v.valor_bruto_centavos-v.desconto_centavos) AS receita_centavos
 FROM clientes c JOIN vendas v ON v.cliente_id=c.cliente_id
 WHERE v.status='Concluida' GROUP BY c.cliente_id,c.cliente
)
SELECT cliente,receita_centavos/100.0 AS receita_liquida,
 DENSE_RANK() OVER (ORDER BY receita_centavos DESC) AS posicao
FROM totais ORDER BY posicao,cliente;

-- 06_variacao_mensal
WITH mensal AS (
 SELECT substr(data,1,7) AS mes,SUM(valor_bruto_centavos-desconto_centavos) AS receita
 FROM vendas WHERE status='Concluida' GROUP BY substr(data,1,7)
), anterior AS (
 SELECT mes,receita,LAG(receita) OVER (ORDER BY mes) AS receita_anterior FROM mensal
)
SELECT mes,receita/100.0 AS receita_liquida,
 ROUND(100.0*(receita-receita_anterior)/NULLIF(receita_anterior,0),2) AS variacao_pct
FROM anterior ORDER BY mes;
-- NULL no primeiro mês ou quando o denominador anterior é zero.
-- LAG compara meses presentes; uma base com lacunas exige calendário mensal.

