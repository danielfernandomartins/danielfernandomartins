# SQL para discutir pendências no atendimento

Dados totalmente fictícios. Execute na raiz: `python analise-negocios/novos-casos/dados-atendimento/executar.py`.

SQL executado em SQLite, não em Databricks. É necessário adaptar e validar o dialeto, catálogo e permissões antes de qualquer uso em Databricks. Não houve acesso a ambiente do Bradesco.

## Leitura de negócio

A amostra contém oito propostas, quatro por canal. Agência: duas aptas, 25% pendentes, tempo médio de 20 minutos. Digital: uma apta, 50% pendentes, tempo médio de 13,75 minutos. Esses números são exemplos de cálculo; não descrevem a operação do banco.

A amostra não permite concluir superioridade de um canal: complexidade, produto, composição dos clientes e definição de tempo podem diferir. Status é uma fotografia, sem histórico. Não mede abandono nem redução de tempo após melhoria.

## Dicionário

id: chave sintética única por proposta; canal: agencia ou digital; status: apto, pendente ou revisao; minutos: duração fictícia de tratamento, inteiro não negativo. Todas as linhas pertencem a uma única amostra didática, sem período real.

## Power BI e Excel

As saídas SQL são a tabela de apoio para uma futura carga no Power BI ou Excel. [Medidas DAX](medidas.dax) especificam taxa e denominador; não foram executadas no Power BI Desktop. Não há PBIX ou dashboard validado neste caso.

Validar medidas contra os controles SQL antes de publicar qualquer relatório. Revisar filtro de canal, contagem única de proposta e tratamento de nulos ao trocar a fonte.
