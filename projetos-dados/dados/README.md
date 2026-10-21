# Dados fictícios de vendas

Base didática criada para estes projetos, sem pessoas ou empresas reais. Uso livre sob CC0-1.0. São 48 vendas de janeiro a junho de 2026, sete clientes e quatro produtos. O Cliente G não possui vendas, permitindo exercitar LEFT JOIN.

**Grão:** uma linha de vendas é uma venda de um único produto. Não existe tabela de itens nem venda com vários produtos nesta versão. Cada venda_id é única.

| Arquivo | Chave | Campos e significado |
|---|---|---|
| clientes.csv | cliente_id | cliente: nome fictício; uf: estado |
| produtos.csv | produto_id | produto, categoria, preco_centavos: preço unitário de referência |
| vendas.csv | venda_id | data ISO; cliente_id/produto_id: chaves estrangeiras; quantidade: unidades; valor_bruto_centavos: total da linha antes do desconto; desconto_centavos: desconto total da linha; status: Concluida ou Cancelada |

Valores inteiros em centavos evitam erros de ponto flutuante no SQL. Receita líquida = (valor bruto − desconto) / 100, apenas vendas concluídas. Não há impostos, frete, devoluções ou custos; receita líquida neste estudo não é lucro. Dados deliberadamente pequenos e regulares: não permitem generalizar conclusões de mercado.
