"""Triagem fictícia de estornos; não autoriza nem realiza operações bancárias."""
from decimal import Decimal, InvalidOperation

def avaliar(valor, orcamento, solicitante, aprovador, documentos):
    try:
        v, o = Decimal(str(valor)), Decimal(str(orcamento))
    except InvalidOperation:
        raise ValueError('Valor inválido')
    if not v.is_finite() or not o.is_finite() or v <= 0 or o < 0:
        raise ValueError('Valor fora do domínio')
    if v.as_tuple().exponent < -2 or o.as_tuple().exponent < -2:
        raise ValueError('Use no máximo duas casas decimais')
    if not isinstance(documentos, bool):
        raise ValueError('Documentos deve ser booleano')
    if not isinstance(solicitante, str) or not isinstance(aprovador, str) or not solicitante.strip() or not aprovador.strip():
        raise ValueError('Identificadores obrigatórios')
    if solicitante.strip().casefold() == aprovador.strip().casefold():
        return 'BLOQUEADO_SEGREGACAO'
    if not documentos:
        return 'PENDENTE_DOCUMENTOS'
    if v > o:
        return 'REVISAO_ORCAMENTO'
    return 'GESTOR' if v <= 5000 else 'DIRETORIA'
