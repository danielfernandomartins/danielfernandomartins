"""Conciliação determinística de amostra fictícia, em centavos, sem baixa automática."""
from collections import Counter


def executar(entrada):
    parcelas, pagamentos = entrada['parcelas'], entrada['pagamentos']
    def texto(v): return isinstance(v,str) and bool(v.strip())
    def positivo(v): return type(v) is int and v > 0
    if (any(not texto(p.get('id')) or not positivo(p.get('total_centavos')) or p.get('status') not in {'ativo','cancelado'} for p in parcelas)
        or len({p['id'] for p in parcelas}) != len(parcelas)
        or any(not texto(p.get('id')) or not texto(p.get('parcela_id')) or not positivo(p.get('valor_centavos')) for p in pagamentos)):
        return {'erro':'LOTE_INVALIDO'}
    ids = Counter(p['id'] for p in pagamentos)
    recebidos = {p['id']:0 for p in parcelas}
    excecoes = []
    for linha,p in enumerate(pagamentos,1):
        codigo = 'ID_DUPLICADO' if ids[p['id']] > 1 else ('PARCELA_INEXISTENTE' if p['parcela_id'] not in recebidos else None)
        if codigo:
            excecoes.append({'linha':linha,'id':p['id'],'codigo':codigo})
        else:
            recebidos[p['parcela_id']] += p['valor_centavos']
    resultado = []
    for p in parcelas:
        recebido = recebidos[p['id']]
        if p['status']=='cancelado':
            situacao = 'revisar_cancelado' if recebido else 'cancelado_sem_recebimento'
        elif recebido==0: situacao = 'pendente'
        elif recebido < p['total_centavos']: situacao = 'parcial'
        elif recebido == p['total_centavos']: situacao = 'conciliado'
        else: situacao = 'excedente'
        resultado.append({'id':p['id'],'situacao':situacao,'recebido_centavos':recebido,
                          'saldo_centavos':p['total_centavos']-recebido if p['status']=='ativo' else None})
    return {'parcelas':resultado,'excecoes':excecoes}
