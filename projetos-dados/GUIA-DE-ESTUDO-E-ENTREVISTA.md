# Guia de estudo e entrevista

Use este roteiro para compreender e demonstrar os projetos. Descreva sua participação com precisão: o código inicial foi preparado com assistência de IA; estudo, execução e alterações próprias devem ser relatados conforme forem realizados.

## Ordem de estudo

1. Leia `dados/README.md` e identifique o grão: uma venda de um único produto por linha.
2. Execute `python projetos-dados/validar.py` a partir da raiz e observe os resultados.
3. Abra `sql-vendas/03_consultas.sql`; explique cada consulta antes de olhar o CSV correspondente.
4. Altere uma cópia da consulta para incluir canceladas. Explique por que a receita muda.
5. Abra o projeto Power BI e siga `powerbi-vendas/VALIDACAO-DESKTOP.md`.
6. Leia `LEITURA-DOS-RESULTADOS.md` e escolha um achado para apresentar com sua limitação.

## Apresentação de 60 segundos

Estruture sua explicação com suas próprias palavras:

- **Problema:** acompanhar receita, vendas e ticket de uma operação fictícia.
- **Dados:** 48 vendas, sete clientes e quatro produtos, com valores em centavos.
- **SQL:** relacionamento de tabelas, agrupamento por mês e categoria, cliente sem compras e ranking.
- **Power BI:** modelo estrela, transformações M, medidas DAX e filtro por mês; informe o estado real da validação no Desktop.
- **Achado:** Monitores representam 68,68% da receita, apesar de terem menos unidades que Acessórios.
- **Limite:** faltam custos para concluir sobre lucro e os dados não representam uma empresa real.

## Perguntas técnicas e raciocínio esperado

| Pergunta | Resposta que você deve conseguir demonstrar |
|---|---|
| Por que armazenar dinheiro em centavos? | Os cálculos SQL somam inteiros; a divisão por 100 ocorre na apresentação. Evita acumular erros binários de valores fracionários. |
| Qual a diferença entre INNER JOIN e LEFT JOIN? | INNER mantém correspondências; LEFT preserva todos os clientes, incluindo o Cliente G. |
| Por que o filtro de status fica no ON do LEFT JOIN? | Para não excluir os clientes sem correspondência, cujo lado de vendas é NULL. |
| WHERE e HAVING fazem a mesma coisa? | WHERE filtra linhas antes da agregação; HAVING filtra grupos agregados. |
| O que o DENSE_RANK faz? | Ordena clientes pela receita; empates compartilham posição e a seguinte não pula número. |
| O que LAG compara? | A linha anterior na ordem mensal. Com meses ausentes, não garante comparação com o mês civil imediatamente anterior. |
| Por que ticket não usa SUM(quantidade)? | Ticket é receita por venda; receita por unidade é outro indicador. |
| O que muda ao selecionar um mês? | O calendário filtra a tabela Vendas; as medidas são recalculadas nesse contexto. |
| Por que relações unidirecionais? | As dimensões filtram a fato, mantendo um fluxo de filtros simples e previsível. |
| O que CALCULATE e KEEPFILTERS fazem aqui? | CALCULATE modifica o contexto; KEEPFILTERS intersecta o filtro de status com o contexto já existente. |
| Por que DIVIDE? | Trata denominador zero ou ausente; sem resultado alternativo explícito, retorna BLANK. |
| A receita caiu continuamente? | Não: houve aumento em abril. A comparação janeiro–junho não demonstra queda contínua. |

## Exercícios para demonstrar domínio

- Escreva uma consulta nova de receita por UF. Confira se a soma corresponde ao total geral.
- Calcule receita média por unidade e explique a diferença para ticket médio.
- Use CASE para mostrar receita concluída e valor de canceladas em colunas separadas, sem somá-las como receita realizada.
- Explique por que um cadastro sem compras não deve ser excluído da dimensão Clientes.
- Depois de abrir no Desktop, altere o título de um visual e salve o projeto. Examine a mudança no Git.

Não apresente exercícios como concluídos até executá-los. Não use estes projetos para alegar experiência profissional ou resultados empresariais.
