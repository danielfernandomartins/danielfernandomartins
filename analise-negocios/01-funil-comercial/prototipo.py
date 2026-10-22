"""Motor didático de regras comerciais, sem persistência ou integração CRM."""
ESTADOS = {'prospeccao', 'negociacao', 'ganha', 'perdida'}
TRANSICOES = {'prospeccao': {'negociacao', 'perdida'},
              'negociacao': {'ganha', 'perdida'}, 'ganha': set(), 'perdida': set()}


def positivo(valor):
    return type(valor) is int and valor > 0


def executar(entrada):
    if entrada['acao'] == 'transicao':
        atual, destino = entrada.get('atual'), entrada.get('destino')
        origem = entrada.get('sistema_origem')
        if origem not in {'SAP','SMART'} or atual not in ESTADOS or destino not in ESTADOS or not positivo(entrada.get('valor_centavos')):
            return {'aceito': False, 'codigo': 'DADOS_INVALIDOS'}
        if destino not in TRANSICOES[atual]:
            return {'aceito': False, 'codigo': 'TRANSICAO_INVALIDA'}
        if destino == 'perdida' and (not isinstance(entrada.get('motivo'),str) or not entrada['motivo'].strip()):
            return {'aceito': False, 'codigo': 'MOTIVO_OBRIGATORIO'}
        return {'aceito': True, 'novo_status': destino, 'sistema_origem': origem}
    if entrada['acao'] == 'indicadores':
        registros = entrada['oportunidades']
        if any(r.get('status') not in ESTADOS or not positivo(r.get('valor_centavos')) for r in registros):
            return {'erro': 'REGISTRO_INVALIDO'}
        ganhas = sum(r['status'] == 'ganha' for r in registros)
        perdidas = sum(r['status'] == 'perdida' for r in registros)
        encerradas = ganhas + perdidas
        return {
            'total': len(registros),
            'ganhas': ganhas,
            'valor_aberto_centavos': sum(r['valor_centavos'] for r in registros if r['status'] in {'prospeccao','negociacao'}),
            'conversao_total_pct': round(100 * ganhas / len(registros), 2) if registros else None,
            'taxa_ganho_encerradas_pct': round(100 * ganhas / encerradas, 2) if encerradas else None,
        }
    raise ValueError('Ação não suportada')
