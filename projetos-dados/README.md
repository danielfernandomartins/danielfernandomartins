# Projetos de dados — SQL e Power BI

Dois projetos simples com a mesma base fictícia, definições de indicadores e resultados de conferência.

| Projeto | Conteúdo | Estado da validação |
|---|---|---|
| [SQL: análise de vendas](sql-vendas/) | Modelo relacional, seis consultas e resultados CSV | Executado com SQLite e conferido por script |
| [Power BI: dashboard de vendas](powerbi-vendas/) | PBIP, modelo estrela, Power Query, cinco medidas DAX e sete visuais | Código disponível; abertura e renderização no Desktop pendentes |

Comece pelo SQL para entender os indicadores; depois abra o PBIP no Windows. [Dados, dicionário e licença](dados/README.md). São estudos de portfólio com dados artificiais, sem alegação de resultados em empresas.

Validação local e no CI: `python projetos-dados/validar.py` (a partir da raiz). Usa apenas a biblioteca padrão do Python. A rotina compara CSV, SQL e dados M, além de conferir relações e referências dos visuais; não executa o Power BI.
