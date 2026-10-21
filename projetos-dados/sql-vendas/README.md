# Análise de vendas com SQL

**Pergunta:** como receita, ticket e vendas se distribuem por mês, categoria e cliente?

Projeto iniciante em SQLite, com dados fictícios completos no repositório. Demonstra SELECT, WHERE, JOIN, LEFT JOIN, GROUP BY, HAVING, CTE e funções de janela (DENSE_RANK e LAG). As consultas não dependem de servidor.

## Resultado conferido

| Indicador | Valor |
|---|---:|
| Vendas concluídas | 42 |
| Receita líquida em reais | 25292.00 |
| Ticket médio em reais | 602.19 |

Receita e ticket excluem canceladas. Ticket = receita / quantidade de vendas concluídas, não quantidade de unidades.

## Execute em um minuto

Na raiz do repositório: `python projetos-dados/sql-vendas/executar.py`. Requer Python 3 e SQLite com funções de janela (3.25+). O script cria um banco em memória, executa as seis consultas e compara com os CSVs publicados.

Alternativa com DB Browser for SQLite: crie um banco vazio e execute, nesta ordem, `01_schema.sql`, `02_dados.sql` e cada consulta de `03_consultas.sql`. A carga é para um banco novo; executá-la novamente gera conflitos de chave, sem duplicar silenciosamente os dados.

## Perguntas e evidências

1. KPIs gerais → `resultados/01_kpis.csv`.
2. Receita mensal → `resultados/02_receita_mensal.csv`.
3. Receita por categoria → `resultados/03_receita_categoria.csv`.
4. Cliente sem compras concluídas → `resultados/04_clientes_sem_compras.csv`.
5. Ranking de clientes → `resultados/05_ranking_clientes.csv`.
6. Variação mensal → `resultados/06_variacao_mensal.csv`.

## Modelo e decisões

Clientes 1:N Vendas N:1 Produtos. Uma venda contém um produto. Valores em centavos, chaves estrangeiras e CHECKs protegem a integridade. Veja [dicionário e licença dos dados](../dados/README.md).

O cliente sem compras aparece porque o LEFT JOIN mantém a dimensão completa. A variação mensal usa o mês anterior presente na base; não preenche meses ausentes. Resultados da amostra fictícia não são impacto empresarial. Os mesmos dados e definições alimentam o [projeto Power BI](../powerbi-vendas/).
