"""Executa SQL e verifica controles conhecidos da amostra sintética."""
import sqlite3
from pathlib import Path
p=Path(__file__).resolve().parent
sql=(p/'analise.sql').read_text()
setup,consulta=sql.split('-- Taxas usam')
with sqlite3.connect(':memory:') as db:
    db.executescript(setup)
    rows=db.execute('-- Taxas usam'+consulta).fetchall()
    assert rows == [('agencia',4,2,25.0,20.0),('digital',4,1,50.0,13.75)], rows
    assert db.execute('SELECT COUNT(DISTINCT id),COUNT(*) FROM propostas').fetchone()==(8,8)
    print('canal | propostas | aptas | pendencia_pct | tempo_medio_min')
    for row in rows: print(' | '.join(map(str,row)))
    print('Controles de volume, unicidade e indicadores aprovados.')
