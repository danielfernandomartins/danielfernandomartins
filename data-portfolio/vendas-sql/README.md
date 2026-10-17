# 📊 Análise Comercial com SQL

Projeto de portfólio para vagas iniciais de **Analista de Dados / BI**, focado em transformar uma base simples de vendas em indicadores úteis para tomada de decisão.

## Objetivo

Demonstrar prática com competências comuns em vagas júnior:

- SQL para filtros, agregações e agrupamentos;
- cálculo de KPIs;
- leitura de dados comerciais;
- interpretação de resultados;
- preparação conceitual para dashboard em Power BI;
- documentação clara para público não técnico.

## Perguntas de negócio

1. Qual foi a receita total?
2. Qual categoria gerou mais receita?
3. Qual vendedor teve maior faturamento?
4. Qual foi o ticket médio?
5. Como as vendas evoluíram por mês?
6. Qual forma de pagamento concentrou mais receita?

## Stack

- SQL
- SQLite
- CSV
- Power BI modeling
- DAX conceitual
- Git / GitHub

## Arquivos

```text
vendas-sql/
├── data/
│   └── vendas.csv
├── sql/
│   ├── schema.sql
│   └── analises.sql
├── INSIGHTS.md
├── POWER-BI-MODEL.md
└── README.md
```

## Como executar

Importe o CSV para uma tabela chamada `vendas` em SQLite, DBeaver ou outra ferramenta SQL e execute as consultas de `sql/analises.sql`.

## Camada de BI

O arquivo [POWER-BI-MODEL.md](POWER-BI-MODEL.md) documenta:

- desenho sugerido do dashboard;
- KPIs principais;
- medidas DAX propostas;
- estrutura visual executiva;
- evolução futura para modelo estrela.

Essa documentação demonstra como eu transformaria uma análise SQL em uma entrega de BI, sem afirmar que um arquivo `.pbix` já foi construído.

## O que este projeto demonstra

- domínio básico de `SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`, `SUM`, `AVG` e `COUNT`;
- transformação de dados transacionais em indicadores;
- capacidade de responder perguntas de negócio com SQL;
- organização de análise reproduzível;
- entendimento inicial da passagem de SQL para visualização em Power BI.

## Próximas evoluções

- adicionar `JOIN` com tabela de clientes;
- criar visão por região;
- construir dashboard real em Power BI;
- incluir metas e análise de variação;
- automatizar atualização da base.

## Autor

**Daniel Fernando Martins** — portfólio de transição estratégica para Tecnologia e Dados, conectando experiência de negócios a análise, indicadores e tomada de decisão.
