"""Verifica regras, rastreabilidade e evidências publicadas. Python 3.10+."""
import argparse
import copy
import hashlib
import importlib.util
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent


def validar(pasta, atualizar=False):
    requisitos = json.loads((pasta/'requisitos.json').read_text(encoding='utf-8'))
    cenarios = json.loads((pasta/'cenarios.json').read_text(encoding='utf-8'))
    ids = {r['id'] for r in requisitos}
    assert len(ids) == len(requisitos), 'Requisito duplicado'
    assert len({c['id'] for c in cenarios}) == len(cenarios), 'Cenário duplicado'
    assert ids == {r for c in cenarios for r in c['requisitos']}, 'Cobertura incompleta ou referência desconhecida'
    spec = importlib.util.spec_from_file_location(pasta.name, pasta/'prototipo.py')
    modulo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modulo)
    resultados = []
    for c in cenarios:
        entrada = copy.deepcopy(c['entrada'])
        obtido = modulo.executar(entrada)
        assert entrada == c['entrada'], f"{c['id']}: alterou entrada"
        assert obtido == modulo.executar(copy.deepcopy(c['entrada'])), f"{c['id']}: não determinístico"
        assert obtido == c['esperado'], f"{c['id']}: esperado={c['esperado']!r}; obtido={obtido!r}"
        resultados.append({'cenario':c['id'],'requisitos':c['requisitos'],
                           'entrada':c['entrada'],'esperado':c['esperado'],'obtido':obtido,'resultado':'PASS'})
    hashes = {n:hashlib.sha256((pasta/n).read_bytes()).hexdigest()
              for n in ['prototipo.py','requisitos.json','cenarios.json']}
    evidencia = {'caso':pasta.name,'tipo':'verificacao_tecnica_automatizada',
                 'aceite_de_negocio':'pendente','requisitos_cobertos':len(ids),
                 'cenarios_aprovados':len(resultados),'sha256_fontes':hashes,'resultados':resultados}
    json_text = json.dumps(evidencia,ensure_ascii=False,indent=2)+'\n'
    texto = f'# Evidência de execução — {pasta.name}\n\n'
    texto += f'**{len(resultados)}/{len(resultados)} cenários aprovados; {len(ids)}/{len(ids)} requisitos cobertos.**\n\n'
    texto += 'Resultado de execução local do protótipo. Cada cenário compara uma saída esperada explícita, exige determinismo e preservação da entrada. Não representa homologação por cliente, integração SAP/SMART ou validação institucional do Bradesco.\n\n'
    texto += '| Cenário | Requisitos | Resultado | Saída observada |\n|---|---|---|---|\n'
    for r in resultados:
        saida=json.dumps(r['obtido'],ensure_ascii=False)
        texto += f"| {r['cenario']} | {', '.join(r['requisitos'])} | PASS | `{saida}` |\n"
    texto += '\n[Entradas, saídas e hashes completos](resultado.json). '
    texto += f'Reproduza na raiz: `python analise-negocios/validar.py --caso {pasta.name}`.\n'
    texto += '\nAo modificar regras ou cenários, revise primeiro o resultado esperado e depois gere novas evidências com `--atualizar`. O comando sem essa opção falha se a evidência publicada estiver desatualizada.\n'
    for nome, conteudo in [('resultado.json',json_text),('resultado.md',texto)]:
        destino=pasta/'evidencias'/nome
        if atualizar:
            destino.parent.mkdir(parents=True,exist_ok=True)
            destino.write_text(conteudo,encoding='utf-8')
        else:
            assert destino.read_text(encoding='utf-8')==conteudo, f'Evidência desatualizada: {destino}'
    print(f'PASS {pasta.name}: {len(resultados)} cenários; {len(ids)} requisitos; dados preservados.')
    return len(resultados)


if __name__ == '__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--caso', choices=sorted(p.name for p in BASE.iterdir() if (p/'prototipo.py').exists()))
    parser.add_argument('--atualizar',action='store_true')
    args=parser.parse_args()
    pastas=[BASE/args.caso] if args.caso else sorted(p for p in BASE.iterdir() if (p/'prototipo.py').exists())
    total=sum(validar(p,args.atualizar) for p in pastas)
    print(f'Total: {total} cenários aprovados. Aceite do negócio permanece pendente.')
