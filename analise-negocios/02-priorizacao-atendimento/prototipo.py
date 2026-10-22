"""Política fictícia de primeira resposta, em horas corridas e UTC."""
from datetime import datetime, timedelta, timezone

MATRIZ = {(1,1):'P1', (1,2):'P2', (1,3):'P2',
          (2,1):'P2', (2,2):'P2', (2,3):'P3',
          (3,1):'P2', (3,2):'P3', (3,3):'P3'}
HORAS = {'P1':1,'P2':4,'P3':8}


def instante(valor):
    d = datetime.fromisoformat(valor.replace('Z','+00:00'))
    if d.tzinfo is None:
        raise ValueError('Fuso obrigatório')
    return d.astimezone(timezone.utc)


def executar(entrada):
    impacto, urgencia = entrada.get('impacto'), entrada.get('urgencia')
    if type(impacto) is not int or type(urgencia) is not int or (impacto,urgencia) not in MATRIZ:
        return {'situacao':'aguardando_dados','codigo':'CLASSIFICACAO_INCOMPLETA'}
    prioridade = MATRIZ[(impacto,urgencia)]
    try:
        abertura, agora = instante(entrada['abertura']), instante(entrada['agora'])
        resposta = instante(entrada['primeira_resposta']) if entrada.get('primeira_resposta') else None
        if agora < abertura or (resposta and not abertura <= resposta <= agora):
            raise ValueError('Cronologia inválida')
    except (KeyError,ValueError,TypeError,AttributeError):
        return {'situacao':'revisar_dados','codigo':'DATA_INVALIDA'}
    prazo = abertura + timedelta(hours=HORAS[prioridade])
    comparado = resposta if resposta is not None else agora
    dentro = comparado <= prazo
    situacao = ('respondido_' if resposta else 'pendente_') + ('no_prazo' if dentro else 'vencido')
    return {'prioridade':prioridade,'limite_primeira_resposta':prazo.isoformat(),
            'situacao':situacao,'grupo':'especialista' if prioridade=='P1' else 'triagem'}
