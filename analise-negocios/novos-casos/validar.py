"""Executa critérios de aceite independentes, sem bibliotecas externas."""
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def executar():
    resultados = []
    for pasta in sorted(ROOT.glob('0*')):
        spec = importlib.util.spec_from_file_location(pasta.name, pasta / 'prototipo.py')
        modulo = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(modulo)
        for c in json.loads((pasta / 'cenarios.json').read_text()):
            try:
                obtido = modulo.avaliar(**c['entrada'])
            except ValueError:
                obtido = 'ERRO'
            assert obtido == c['esperado'], (pasta.name, c['id'], obtido, c['esperado'])
            resultados.append({'caso': pasta.name, 'cenario': c['id'], 'requisito': c['requisito'], 'resultado': obtido})
    print(json.dumps(resultados, ensure_ascii=False, indent=2))
    print(f'\n{len(resultados)} cenários aprovados.')

if __name__ == '__main__':
    executar()
