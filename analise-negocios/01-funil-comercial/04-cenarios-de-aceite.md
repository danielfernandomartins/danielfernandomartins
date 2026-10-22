# Cenários de aceite

Resultados esperados definidos no estudo e comparados por igualdade com a saída do protótipo. A passagem automatizada não substitui aceite do negócio.

## F-C01

**Requisitos:** RF-F01, RF-F02

**Dado** Oportunidade prospectada de R$100. **Quando** Avançar à negociação. **Então** Aceitar negociacao.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "prospeccao",
  "destino": "negociacao",
  "valor_centavos": 10000,
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": true,
  "novo_status": "negociacao",
  "sistema_origem": "SMART"
}
```

## F-C02

**Requisitos:** RF-F01

**Dado** Valor negativo. **Quando** Solicitar alteração. **Então** Rejeitar dados.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "prospeccao",
  "destino": "negociacao",
  "valor_centavos": -1,
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": false,
  "codigo": "DADOS_INVALIDOS"
}
```

## F-C03

**Requisitos:** RF-F02

**Dado** Oportunidade em prospecção. **Quando** Saltar diretamente para ganha. **Então** Rejeitar salto.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "prospeccao",
  "destino": "ganha",
  "valor_centavos": 10000,
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": false,
  "codigo": "TRANSICAO_INVALIDA"
}
```

## F-C04

**Requisitos:** RF-F03

**Dado** Negociação com motivo em branco. **Quando** Encerrar como perdida. **Então** Exigir motivo.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "negociacao",
  "destino": "perdida",
  "valor_centavos": 10000,
  "motivo": "  ",
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": false,
  "codigo": "MOTIVO_OBRIGATORIO"
}
```

## F-C05

**Requisitos:** RF-F02

**Dado** Oportunidade ganha. **Quando** Tentar reabrir negociação. **Então** Rejeitar reabertura.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "ganha",
  "destino": "negociacao",
  "valor_centavos": 10000,
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": false,
  "codigo": "TRANSICAO_INVALIDA"
}
```

## F-C06

**Requisitos:** RF-F04

**Dado** Uma ganha, uma perdida, uma aberta. **Quando** Calcular as duas taxas. **Então** 33,33% total; 50% encerradas; R$200 abertos.

Entrada:
```json
{
  "acao": "indicadores",
  "oportunidades": [
    {
      "status": "ganha",
      "valor_centavos": 10000
    },
    {
      "status": "perdida",
      "valor_centavos": 5000
    },
    {
      "status": "negociacao",
      "valor_centavos": 20000
    }
  ]
}
```

Resultado esperado:
```json
{
  "total": 3,
  "ganhas": 1,
  "valor_aberto_centavos": 20000,
  "conversao_total_pct": 33.33,
  "taxa_ganho_encerradas_pct": 50.0
}
```

## F-C07

**Requisitos:** RF-F05

**Dado** Lista vazia. **Quando** Calcular taxas. **Então** Retornar null nos dois denominadores.

Entrada:
```json
{
  "acao": "indicadores",
  "oportunidades": []
}
```

Resultado esperado:
```json
{
  "total": 0,
  "ganhas": 0,
  "valor_aberto_centavos": 0,
  "conversao_total_pct": null,
  "taxa_ganho_encerradas_pct": null
}
```

## F-C08

**Requisitos:** RF-F04, RF-F05

**Dado** Uma oportunidade aberta. **Quando** Calcular taxas. **Então** 0% sobre total e null sobre encerradas.

Entrada:
```json
{
  "acao": "indicadores",
  "oportunidades": [
    {
      "status": "prospeccao",
      "valor_centavos": 10000
    }
  ]
}
```

Resultado esperado:
```json
{
  "total": 1,
  "ganhas": 0,
  "valor_aberto_centavos": 10000,
  "conversao_total_pct": 0.0,
  "taxa_ganho_encerradas_pct": null
}
```

## F-C09

**Requisitos:** RF-F02

**Dado** Negociação válida. **Quando** Encerrar como ganha. **Então** Aceitar ganho.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "negociacao",
  "destino": "ganha",
  "valor_centavos": 10000,
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": true,
  "novo_status": "ganha",
  "sistema_origem": "SMART"
}
```

## F-C10

**Requisitos:** RF-F03

**Dado** Negociação com motivo preço. **Quando** Encerrar como perdida. **Então** Aceitar perda justificada.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "negociacao",
  "destino": "perdida",
  "valor_centavos": 10000,
  "motivo": "preco",
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": true,
  "novo_status": "perdida",
  "sistema_origem": "SMART"
}
```

## F-C11

**Requisitos:** RF-F01, RF-F05

**Dado** Registro com estado desconhecido. **Quando** Calcular indicadores. **Então** Rejeitar lote de indicadores.

Entrada:
```json
{
  "acao": "indicadores",
  "oportunidades": [
    {
      "status": "inventado",
      "valor_centavos": 100
    }
  ]
}
```

Resultado esperado:
```json
{
  "erro": "REGISTRO_INVALIDO"
}
```

## F-C12

**Requisitos:** RF-F01

**Dado** Valor zero. **Quando** Solicitar negociação. **Então** Rejeitar valor.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "prospeccao",
  "destino": "negociacao",
  "valor_centavos": 0,
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": false,
  "codigo": "DADOS_INVALIDOS"
}
```

## F-C13

**Requisitos:** RF-F01

**Dado** Oportunidade de origem SAP simulada. **Quando** Avançar à negociação. **Então** Preservar origem SAP.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "prospeccao",
  "destino": "negociacao",
  "valor_centavos": 10000,
  "sistema_origem": "SAP"
}
```

Resultado esperado:
```json
{
  "aceito": true,
  "novo_status": "negociacao",
  "sistema_origem": "SAP"
}
```

## F-C14

**Requisitos:** RF-F01

**Dado** Origem fora do contrato didático. **Quando** Avançar à negociação. **Então** Rejeitar origem desconhecida.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "prospeccao",
  "destino": "negociacao",
  "valor_centavos": 10000,
  "sistema_origem": "OUTRO"
}
```

Resultado esperado:
```json
{
  "aceito": false,
  "codigo": "DADOS_INVALIDOS"
}
```

## F-C15

**Requisitos:** RF-F03

**Dado** Motivo preenchido com número em vez de texto. **Quando** Encerrar como perdida. **Então** Exigir motivo textual.

Entrada:
```json
{
  "acao": "transicao",
  "atual": "negociacao",
  "destino": "perdida",
  "valor_centavos": 10000,
  "motivo": 123,
  "sistema_origem": "SMART"
}
```

Resultado esperado:
```json
{
  "aceito": false,
  "codigo": "MOTIVO_OBRIGATORIO"
}
```
