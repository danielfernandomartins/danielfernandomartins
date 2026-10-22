# Cenários de aceite

Resultados esperados definidos no estudo e comparados por igualdade com a saída do protótipo. A passagem automatizada não substitui aceite do negócio.

## A-C01

**Requisitos:** RF-A02, RF-A03, RF-A04, RF-A05

**Dado** P1 sem resposta. **Quando** Conferir no segundo exato do limite. **Então** Pendente no prazo e especialista.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P1",
  "limite_primeira_resposta": "2026-10-01T11:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "especialista"
}
```

## A-C02

**Requisitos:** RF-A04

**Dado** P1 sem resposta. **Quando** Conferir um segundo depois do limite. **Então** Pendente vencido.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:01Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P1",
  "limite_primeira_resposta": "2026-10-01T11:00:00+00:00",
  "situacao": "pendente_vencido",
  "grupo": "especialista"
}
```

## A-C03

**Requisitos:** RF-A04

**Dado** P1 respondido exatamente às 11h. **Quando** Conferir às 12h. **Então** Respondido no prazo.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T12:00:00Z",
  "primeira_resposta": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P1",
  "limite_primeira_resposta": "2026-10-01T11:00:00+00:00",
  "situacao": "respondido_no_prazo",
  "grupo": "especialista"
}
```

## A-C04

**Requisitos:** RF-A04

**Dado** P1 respondido às 11h00m01s. **Quando** Conferir às 12h. **Então** Respondido vencido.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T12:00:00Z",
  "primeira_resposta": "2026-10-01T11:00:01Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P1",
  "limite_primeira_resposta": "2026-10-01T11:00:00+00:00",
  "situacao": "respondido_vencido",
  "grupo": "especialista"
}
```

## A-C05

**Requisitos:** RF-A01

**Dado** Urgência ausente. **Quando** Classificar. **Então** Solicitar complemento.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": null,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "situacao": "aguardando_dados",
  "codigo": "CLASSIFICACAO_INCOMPLETA"
}
```

## A-C06

**Requisitos:** RF-A01

**Dado** Impacto fora do domínio. **Quando** Classificar. **Então** Solicitar complemento.

Entrada:
```json
{
  "impacto": 4,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "situacao": "aguardando_dados",
  "codigo": "CLASSIFICACAO_INCOMPLETA"
}
```

## A-C07

**Requisitos:** RF-A03

**Dado** Abertura sem fuso. **Quando** Calcular prazo. **Então** Revisar data.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "situacao": "revisar_dados",
  "codigo": "DATA_INVALIDA"
}
```

## A-C08

**Requisitos:** RF-A03

**Dado** Resposta anterior à abertura. **Quando** Calcular situação. **Então** Revisar cronologia.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z",
  "primeira_resposta": "2026-10-01T09:00:00Z"
}
```

Resultado esperado:
```json
{
  "situacao": "revisar_dados",
  "codigo": "DATA_INVALIDA"
}
```

## A-C09

**Requisitos:** RF-A03

**Dado** Abertura 07h no fuso −03. **Quando** Calcular limite UTC. **Então** Mesmo limite 11h UTC.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T07:00:00-03:00",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P1",
  "limite_primeira_resposta": "2026-10-01T11:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "especialista"
}
```

## A-C10

**Requisitos:** RF-A03

**Dado** Resposta posterior ao relógio atual. **Quando** Calcular situação. **Então** Revisar cronologia.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z",
  "primeira_resposta": "2026-10-01T12:00:00Z"
}
```

Resultado esperado:
```json
{
  "situacao": "revisar_dados",
  "codigo": "DATA_INVALIDA"
}
```

## A-C11

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 1, urgência 2. **Quando** Classificar às 11h. **Então** P2, limite 14h e triagem.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 2,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P2",
  "limite_primeira_resposta": "2026-10-01T14:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```

## A-C12

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 1, urgência 3. **Quando** Classificar às 11h. **Então** P2, limite 14h e triagem.

Entrada:
```json
{
  "impacto": 1,
  "urgencia": 3,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P2",
  "limite_primeira_resposta": "2026-10-01T14:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```

## A-C13

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 2, urgência 1. **Quando** Classificar às 11h. **Então** P2, limite 14h e triagem.

Entrada:
```json
{
  "impacto": 2,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P2",
  "limite_primeira_resposta": "2026-10-01T14:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```

## A-C14

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 2, urgência 2. **Quando** Classificar às 11h. **Então** P2, limite 14h e triagem.

Entrada:
```json
{
  "impacto": 2,
  "urgencia": 2,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P2",
  "limite_primeira_resposta": "2026-10-01T14:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```

## A-C15

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 2, urgência 3. **Quando** Classificar às 11h. **Então** P3, limite 18h e triagem.

Entrada:
```json
{
  "impacto": 2,
  "urgencia": 3,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P3",
  "limite_primeira_resposta": "2026-10-01T18:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```

## A-C16

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 3, urgência 1. **Quando** Classificar às 11h. **Então** P2, limite 14h e triagem.

Entrada:
```json
{
  "impacto": 3,
  "urgencia": 1,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P2",
  "limite_primeira_resposta": "2026-10-01T14:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```

## A-C17

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 3, urgência 2. **Quando** Classificar às 11h. **Então** P3, limite 18h e triagem.

Entrada:
```json
{
  "impacto": 3,
  "urgencia": 2,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P3",
  "limite_primeira_resposta": "2026-10-01T18:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```

## A-C18

**Requisitos:** RF-A02, RF-A03, RF-A05

**Dado** Impacto 3, urgência 3. **Quando** Classificar às 11h. **Então** P3, limite 18h e triagem.

Entrada:
```json
{
  "impacto": 3,
  "urgencia": 3,
  "abertura": "2026-10-01T10:00:00Z",
  "agora": "2026-10-01T11:00:00Z"
}
```

Resultado esperado:
```json
{
  "prioridade": "P3",
  "limite_primeira_resposta": "2026-10-01T18:00:00+00:00",
  "situacao": "pendente_no_prazo",
  "grupo": "triagem"
}
```
