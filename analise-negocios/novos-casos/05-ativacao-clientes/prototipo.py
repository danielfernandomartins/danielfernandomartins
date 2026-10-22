"""Triagem fictícia de cadastro; sem dados pessoais ou decisão de crédito."""
def avaliar(cliente_id, documentos, duplicado, revisao_manual):
    if not isinstance(cliente_id, str) or not cliente_id.strip():
        raise ValueError('ID obrigatório')
    if not isinstance(documentos, list) or any(not isinstance(x, str) for x in documentos):
        raise ValueError('Lista de documentos inválida')
    if type(duplicado) is not bool or type(revisao_manual) is not bool:
        raise ValueError('Flags devem ser booleanas')
    if duplicado:
        return 'REVISAR_DUPLICIDADE'
    if not {'cadastro', 'contrato'}.issubset(set(documentos)):
        return 'PENDENTE_DOCUMENTOS'
    if revisao_manual:
        return 'REVISAO_HUMANA'
    return 'APTO_PARA_ATIVACAO'
