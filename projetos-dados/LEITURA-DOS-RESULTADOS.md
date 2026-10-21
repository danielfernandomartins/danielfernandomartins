# Leitura dos resultados — vendas fictícias

## Pergunta e resposta

Como a receita se distribui por mês, categoria e cliente? Na amostra, a receita se concentra em Monitores e varia mesmo com a quantidade de vendas concluídas constante.

| Evidência calculada | Interpretação possível | O que investigar numa base real |
|---|---|---|
| R$ 25.292,00 em 42 vendas concluídas; ticket R$ 602,19 | Referência geral da amostra | Conferir regras de faturamento, impostos e devoluções |
| Monitores: R$ 17.370,00, ou 68,68% da receita; 20 unidades | Receita concentrada numa categoria de maior valor | Margem, disponibilidade e risco de concentração |
| Acessórios: R$ 7.922,00 em 64 unidades | Maior volume de unidades não implica maior receita | Mix, preço médio e descontos |
| Janeiro: R$ 4.904,00; junho: R$ 3.957,00; diferença de −19,31% | As pontas do período diferem; não prova uma tendência contínua | Mix e descontos mês a mês, sazonalidade e período comparável |
| Todos os meses têm sete vendas concluídas | Nesta base, a variação da receita não vem da contagem de vendas | Quantidades por venda, produtos e descontos |
| Cliente E: R$ 7.628,00, ou 30,16% da receita | Concentração em um cliente fictício | Recorrência, margem e dependência comercial |
| Cliente G sem compras concluídas | O LEFT JOIN permite encontrar clientes sem movimentação | Tempo de cadastro e motivo de inatividade |

Há 48 vendas cadastradas: seis canceladas (12,5%). Cancelamento é contado em vendas, não em unidades ou reais. O estudo não calcula perda financeira causada pelo cancelamento.

## Como conferir

- Receita, quantidade e ticket: `sql-vendas/resultados/01_kpis.csv`.
- Meses: `02_receita_mensal.csv` e `06_variacao_mensal.csv`.
- Categorias: `03_receita_categoria.csv`.
- Clientes: `04_clientes_sem_compras.csv` e `05_ranking_clientes.csv`.
- Participações: receita do segmento / 25.292 × 100.
- Diferença janeiro–junho: (3.957 / 4.904 − 1) × 100.

## Limites da conclusão

Os dados foram construídos para praticar ferramentas. Não sustentam decisões comerciais reais, causalidade, sazonalidade ou ganho financeiro. Receita não é lucro: não há custos ou margens. O Power BI tem resultados esperados calculados em SQL; sua execução no Desktop ainda precisa ser validada.
