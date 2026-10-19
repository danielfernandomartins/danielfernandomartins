# Power BI Model — Análise Comercial

Este documento transforma o case SQL em um desenho simples de dashboard para **Power BI**, deixando claro como os dados seriam modelados e quais indicadores deveriam ser apresentados.

## Objetivo do dashboard

Responder rapidamente:

- qual foi a receita total;
- como a receita evoluiu por mês;
- quais categorias, produtos e vendedores mais contribuíram;
- qual foi o ticket médio;
- qual forma de pagamento concentrou maior faturamento.

## Modelo proposto

Para a versão atual do projeto, uma única tabela `vendas` é suficiente.

Campos principais:

- `data`
- `vendedor`
- `categoria`
- `produto`
- `quantidade`
- `valor_unitario`
- `forma_pagamento`

Campo calculado conceitual:

```text
Receita = quantidade × valor_unitario
```

## Medidas DAX sugeridas

```DAX
Receita Total =
SUMX(vendas, vendas[quantidade] * vendas[valor_unitario])
```

```DAX
Quantidade Vendida =
SUM(vendas[quantidade])
```

```DAX
Ticket Medio =
DIVIDE([Receita Total], COUNTROWS(vendas))
```

## Visuais recomendados

1. **Cards**
   - Receita Total
   - Quantidade Vendida
   - Ticket Médio

2. **Linha**
   - Receita por mês

3. **Barras**
   - Receita por categoria
   - Receita por vendedor
   - Top produtos

4. **Rosca ou barras**
   - Receita por forma de pagamento

## Layout executivo

```text
+-------------------------------------------------------+
| Receita Total | Quantidade | Ticket Médio             |
+-------------------------------------------------------+
| Receita por mês                                       |
+---------------------------+---------------------------+
| Receita por categoria     | Receita por vendedor      |
+---------------------------+---------------------------+
| Top produtos              | Forma de pagamento        |
+---------------------------+---------------------------+
```

## Evolução recomendada

Em uma segunda versão, o modelo pode ser transformado em estrela com dimensões de calendário, vendedor, produto e categoria.

> Este documento descreve a modelagem e as medidas propostas. Ele não afirma que um arquivo `.pbix` já foi construído.
