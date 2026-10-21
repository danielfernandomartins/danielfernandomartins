PRAGMA foreign_keys = ON;
CREATE TABLE clientes (cliente_id INTEGER PRIMARY KEY, cliente TEXT NOT NULL, uf TEXT NOT NULL);
CREATE TABLE produtos (produto_id INTEGER PRIMARY KEY, produto TEXT NOT NULL, categoria TEXT NOT NULL, preco_centavos INTEGER NOT NULL CHECK(preco_centavos > 0));
CREATE TABLE vendas (
 venda_id INTEGER PRIMARY KEY, data TEXT NOT NULL,
 cliente_id INTEGER NOT NULL REFERENCES clientes(cliente_id),
 produto_id INTEGER NOT NULL REFERENCES produtos(produto_id),
 quantidade INTEGER NOT NULL CHECK(quantidade > 0),
 valor_bruto_centavos INTEGER NOT NULL CHECK(valor_bruto_centavos >= 0),
 desconto_centavos INTEGER NOT NULL CHECK(desconto_centavos BETWEEN 0 AND valor_bruto_centavos),
 status TEXT NOT NULL CHECK(status IN ('Concluida','Cancelada'))
);
