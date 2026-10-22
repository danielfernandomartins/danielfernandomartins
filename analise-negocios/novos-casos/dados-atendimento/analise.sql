-- SQLite; fotografia sintética de propostas. Uma linha por proposta.
CREATE TABLE propostas(id TEXT PRIMARY KEY, canal TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('apto','pendente','revisao')), minutos INTEGER NOT NULL CHECK(minutos>=0));
INSERT INTO propostas VALUES
('S001','agencia','apto',15),('S002','agencia','pendente',30),
('S003','agencia','revisao',25),('S004','agencia','apto',10),
('S005','digital','apto',5),('S006','digital','pendente',12),
('S007','digital','pendente',18),('S008','digital','revisao',20);
-- Taxas usam todas as propostas do canal como denominador.
SELECT canal, COUNT(*) AS propostas,
 SUM(CASE WHEN status='apto' THEN 1 ELSE 0 END) AS aptas,
 ROUND(100.0*SUM(CASE WHEN status='pendente' THEN 1 ELSE 0 END)/COUNT(*),2) AS pendencia_pct,
 ROUND(AVG(minutos),2) AS tempo_medio_min
FROM propostas GROUP BY canal ORDER BY canal;
