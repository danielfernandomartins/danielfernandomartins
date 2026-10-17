# 👥 Customer KPIs — Python + Pandas

Projeto simples de portfólio para vagas iniciais de **Analista de Dados**, voltado a indicadores de clientes, receita e risco de churn.

## Objetivo

Demonstrar prática com:

- Python para análise de dados;
- Pandas para limpeza, filtros e agregações;
- cálculo de KPIs;
- segmentação simples de clientes;
- geração de saída tabular pronta para consumo em Excel ou Power BI;
- comunicação de insights de negócio.

## Perguntas de negócio

1. Quantos clientes estão ativos?
2. Qual é a receita mensal total da carteira?
3. Qual segmento gera mais receita?
4. Qual é o ticket médio mensal por cliente?
5. Quantos clientes apresentam risco de churn?
6. Quais clientes deveriam receber atenção prioritária?

## Stack

- Python
- Pandas
- CSV
- Excel/Power BI ready output
- Git / GitHub

## Estrutura

```text
customer-kpis-python/
├── data/
│   └── clientes.csv
├── src/
│   └── analise_clientes.py
├── output/
│   └── kpis_clientes.csv
├── INSIGHTS.md
├── requirements.txt
└── README.md
```

## Como executar

```bash
pip install -r requirements.txt
python src/analise_clientes.py
```

O script lê a base, calcula indicadores e gera `output/kpis_clientes.csv`.

## Regra simples de risco de churn

Neste case didático, um cliente é classificado como `RISCO` quando apresenta **30 dias ou mais sem interação** ou **duas ou mais ocorrências de suporte**. A regra é deliberadamente simples e serve para demonstrar segmentação baseada em critérios de negócio.

## O que este projeto demonstra

- manipulação de DataFrames;
- tratamento de tipos e colunas;
- filtros e agregações;
- criação de variáveis derivadas;
- segmentação de clientes;
- geração de indicadores úteis para relacionamento e retenção;
- preparação de dados para dashboard.

## Próximas evoluções

- dashboard no Power BI;
- análise por coorte;
- churn histórico real;
- SQL para persistência e consultas;
- modelo estatístico de propensão ao churn.

## Autor

**Daniel Fernando Martins** — conectando experiência em relacionamento, serviços financeiros e indicadores com tecnologia e análise de dados.
