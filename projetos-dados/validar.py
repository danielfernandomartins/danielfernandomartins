"""Conferências estruturais e de dados. Não executa DAX ou o Power BI."""
import csv
import json
import re
import sqlite3
import subprocess
import sys
from pathlib import Path

base = Path(__file__).resolve().parent
subprocess.run([sys.executable, str(base / 'sql-vendas/executar.py')], check=True)
db = sqlite3.connect(':memory:')
db.executescript((base/'sql-vendas/01_schema.sql').read_text() + (base/'sql-vendas/02_dados.sql').read_text())
model = json.loads((base/'powerbi-vendas/Vendas.SemanticModel/model.bim').read_text())['model']
tables = {t['name']: t for t in model['tables']}
for name in ['clientes', 'produtos', 'vendas']:
    with (base/'dados'/f'{name}.csv').open(newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader)
        csv_rows = list(reader)
    sql_rows = [[str(v) for v in row] for row in db.execute(f'SELECT * FROM {name}')]
    assert csv_rows == sql_rows, f'CSV e SQL divergem: {name}'
    table = tables[name.title()]
    m = '\n'.join(table['partitions'][0]['source']['expression'])
    embedded = [[str(v) for v in json.loads('['+r+']')]
                for r in re.findall(r'^\s*\{([^{}\n]+)\},?$', m, re.MULTILINE)]
    assert embedded == csv_rows, f'CSV e Power Query divergem: {name}'
    assert headers == [c['name'] for c in table['columns']]
    assert m + '\n' == (base/'powerbi-vendas/power-query'/f'{name.title()}.m').read_text()

for rel in model['relationships']:
    assert rel['crossFilteringBehavior'] == 'oneDirection'
    for side in ['from', 'to']:
        assert rel[side+'Column'] in {c['name'] for c in tables[rel[side+'Table']]['columns']}
    dimension = tables[rel['toTable']]
    col = [c['name'] for c in dimension['columns']].index(rel['toColumn'])
    m = '\n'.join(dimension['partitions'][0]['source']['expression'])
    rows = [json.loads('['+r+']') for r in re.findall(r'^\s*\{([^{}\n]+)\},?$', m, re.MULTILINE)]
    keys = [r[col] for r in rows]
    assert len(keys) == len(set(keys)), 'Dimensão sem chave única'

for path in (base/'powerbi-vendas').rglob('*.json'):
    json.loads(path.read_text())
visuals = list((base/'powerbi-vendas').rglob('visual.json'))
assert len(visuals) == 7
for path in visuals:
    visual = json.loads(path.read_text())
    p = visual['position']
    assert 0 <= p['x'] and p['x']+p['width'] <= 1280
    assert 0 <= p['y'] and p['y']+p['height'] <= 720
    for role in visual['visual']['query']['queryState'].values():
        for projection in role['projections']:
            kind, ref = next(iter(projection['field'].items()))
            t = tables[ref['Expression']['SourceRef']['Entity']]
            fields = t['measures'] if kind == 'Measure' else t['columns']
            assert ref['Property'] in {f['name'] for f in fields}

expected = json.loads((base/'sql-vendas/resultados/indicadores.json').read_text())
assert expected['vendas_concluidas'] == 42
assert expected['receita_liquida'] == 25292.0
assert expected['ticket_medio'] == 602.19
assert db.execute("SELECT COUNT(*) FROM vendas WHERE status='Cancelada'").fetchone()[0] == 6
print('OK: CSV = carga SQL = dados M; relações; campos dos sete visuais; limites da página.')
print('Pendente: abrir, atualizar e renderizar no Power BI Desktop; executar medidas DAX.')
