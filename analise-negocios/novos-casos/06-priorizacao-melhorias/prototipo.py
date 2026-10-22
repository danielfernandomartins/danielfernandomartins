"""Apoio à comparação de propostas com hipóteses financeiras explícitas."""
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

def avaliar(beneficio_mensal, custo_inicial, custo_mensal, confianca, esforco):
    try:
        b, i, m, c, e = map(lambda x: Decimal(str(x)),
                           (beneficio_mensal, custo_inicial, custo_mensal, confianca, esforco))
    except InvalidOperation:
        raise ValueError('Entrada inválida')
    if any(not x.is_finite() for x in (b, i, m, c, e)) or min(b, i, m) < 0 or not 0 <= c <= 1 or e <= 0:
        raise ValueError('Entrada fora do domínio')
    liquido = b * c - m
    score = liquido / e
    payback = None if liquido <= 0 else i / liquido
    fmt = lambda x: str(x.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))
    return {'beneficio_liquido_mensal': fmt(liquido), 'score': fmt(score),
            'payback_meses': None if payback is None else fmt(payback),
            'recomendacao': 'INVESTIGAR' if liquido <= 0 else 'COMPARAR_NO_BACKLOG'}
