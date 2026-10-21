"""Executa em memória e confere resultados; somente biblioteca padrão."""
from pathlib import Path
import sqlite3, csv, io
base = Path(__file__).resolve().parent
db = sqlite3.connect(":memory:")
db.executescript((base/"01_schema.sql").read_text()+(base/"02_dados.sql").read_text())
assert db.execute("PRAGMA foreign_key_check").fetchall() == []
assert db.execute("SELECT COUNT(*) FROM vendas").fetchone()[0] == 48
sql = (base/"03_consultas.sql").read_text()
blocos = sql.split("-- 0")[1:]
for bloco in blocos:
    cabecalho, consulta = bloco.split("\n", 1)
    nome = "0"+cabecalho.strip()
    cur = db.execute(consulta)
    out = io.StringIO(); w = csv.writer(out)
    w.writerow([c[0] for c in cur.description]); w.writerows(cur.fetchall())
    esperado = (base/"resultados"/(nome+".csv")).read_text()
    assert out.getvalue().replace("\r\n","\n") == esperado, nome
    print("OK", nome)
# Casos importantes: base vazia e restrição de desconto.
db.execute("SAVEPOINT vazio"); db.execute("DELETE FROM vendas")
assert db.execute("SELECT COUNT(*),SUM(valor_bruto_centavos) FROM vendas").fetchone()==(0,None)
db.execute("ROLLBACK TO vazio"); db.execute("RELEASE vazio")
try:
    db.execute("UPDATE vendas SET desconto_centavos=valor_bruto_centavos+1 WHERE venda_id=1")
    raise AssertionError("Desconto inválido aceito")
except sqlite3.IntegrityError:
    pass
print("Validação: resultados esperados, chaves estrangeiras, base vazia e desconto inválido OK.")
