DROP TABLE IF EXISTS vendas;

CREATE TABLE vendas (
    data DATE,
    vendedor TEXT,
    categoria TEXT,
    produto TEXT,
    quantidade INTEGER,
    valor_unitario REAL,
    forma_pagamento TEXT
);
