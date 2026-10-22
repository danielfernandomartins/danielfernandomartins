# Cenários de aceite

Resultados esperados definidos no estudo e comparados por igualdade com a saída do protótipo. A passagem automatizada não substitui aceite do negócio.

## C-C01

**Requisitos:** RF-C01, RF-C02

**Dado** Parcela R$100 e pagamento R$100. **Quando** Conciliar. **Então** Classificar conciliado.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 10000
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "conciliado",
      "recebido_centavos": 10000,
      "saldo_centavos": 0
    }
  ],
  "excecoes": []
}
```

## C-C02

**Requisitos:** RF-C02

**Dado** Parcela R$100 sem pagamento. **Quando** Conciliar. **Então** Pendente e saldo R$100.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": []
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "pendente",
      "recebido_centavos": 0,
      "saldo_centavos": 10000
    }
  ],
  "excecoes": []
}
```

## C-C03

**Requisitos:** RF-C02

**Dado** Pagamento R$99,99. **Quando** Conciliar. **Então** Parcial com saldo R$0,01.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 9999
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "parcial",
      "recebido_centavos": 9999,
      "saldo_centavos": 1
    }
  ],
  "excecoes": []
}
```

## C-C04

**Requisitos:** RF-C02

**Dado** Pagamento R$100,01. **Quando** Conciliar. **Então** Excedente de R$0,01.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 10001
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "excedente",
      "recebido_centavos": 10001,
      "saldo_centavos": -1
    }
  ],
  "excecoes": []
}
```

## C-C05

**Requisitos:** RF-C02

**Dado** Dois pagamentos de R$40 e R$60 com IDs distintos. **Quando** Conciliar. **Então** Somar R$100.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 4000
    },
    {
      "id": "P2",
      "parcela_id": "V1",
      "valor_centavos": 6000
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "conciliado",
      "recebido_centavos": 10000,
      "saldo_centavos": 0
    }
  ],
  "excecoes": []
}
```

## C-C06

**Requisitos:** RF-C03

**Dado** Parcela cancelada com pagamento. **Quando** Conciliar. **Então** Revisar cancelado, sem saldo calculado.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "cancelado"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 10000
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "revisar_cancelado",
      "recebido_centavos": 10000,
      "saldo_centavos": null
    }
  ],
  "excecoes": []
}
```

## C-C07

**Requisitos:** RF-C03

**Dado** Parcela cancelada sem pagamento. **Quando** Conciliar. **Então** Cancelado sem recebimento.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "cancelado"
    }
  ],
  "pagamentos": []
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "cancelado_sem_recebimento",
      "recebido_centavos": 0,
      "saldo_centavos": null
    }
  ],
  "excecoes": []
}
```

## C-C08

**Requisitos:** RF-C04

**Dado** Mesmo ID em duas linhas de R$50. **Quando** Conciliar. **Então** Quarentenar ambas.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 5000
    },
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 5000
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "pendente",
      "recebido_centavos": 0,
      "saldo_centavos": 10000
    }
  ],
  "excecoes": [
    {
      "linha": 1,
      "id": "P1",
      "codigo": "ID_DUPLICADO"
    },
    {
      "linha": 2,
      "id": "P1",
      "codigo": "ID_DUPLICADO"
    }
  ]
}
```

## C-C09

**Requisitos:** RF-C04

**Dado** Mesmo ID com valores R$50 e R$60. **Quando** Conciliar. **Então** Não escolher uma versão.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 5000
    },
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": 6000
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "pendente",
      "recebido_centavos": 0,
      "saldo_centavos": 10000
    }
  ],
  "excecoes": [
    {
      "linha": 1,
      "id": "P1",
      "codigo": "ID_DUPLICADO"
    },
    {
      "linha": 2,
      "id": "P1",
      "codigo": "ID_DUPLICADO"
    }
  ]
}
```

## C-C10

**Requisitos:** RF-C05

**Dado** Pagamento referencia parcela V9 inexistente. **Quando** Conciliar. **Então** Separar exceção.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V9",
      "valor_centavos": 10000
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "pendente",
      "recebido_centavos": 0,
      "saldo_centavos": 10000
    }
  ],
  "excecoes": [
    {
      "linha": 1,
      "id": "P1",
      "codigo": "PARCELA_INEXISTENTE"
    }
  ]
}
```

## C-C11

**Requisitos:** RF-C01

**Dado** Pagamento negativo. **Quando** Conciliar. **Então** Rejeitar lote.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V1",
      "valor_centavos": -100
    }
  ]
}
```

Resultado esperado:
```json
{
  "erro": "LOTE_INVALIDO"
}
```

## C-C12

**Requisitos:** RF-C01

**Dado** Dois parcelas com mesmo ID. **Quando** Conciliar. **Então** Rejeitar lote.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    },
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": []
}
```

Resultado esperado:
```json
{
  "erro": "LOTE_INVALIDO"
}
```

## C-C13

**Requisitos:** RF-C02

**Dado** Lote vazio. **Quando** Conciliar. **Então** Sem parcelas ou exceções.

Entrada:
```json
{
  "parcelas": [],
  "pagamentos": []
}
```

Resultado esperado:
```json
{
  "parcelas": [],
  "excecoes": []
}
```

## C-C14

**Requisitos:** RF-C04, RF-C05

**Dado** Duplicatas com referência inexistente. **Quando** Conciliar. **Então** Duplicidade tem precedência.

Entrada:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "total_centavos": 10000,
      "status": "ativo"
    }
  ],
  "pagamentos": [
    {
      "id": "P1",
      "parcela_id": "V9",
      "valor_centavos": 10000
    },
    {
      "id": "P1",
      "parcela_id": "V9",
      "valor_centavos": 10000
    }
  ]
}
```

Resultado esperado:
```json
{
  "parcelas": [
    {
      "id": "V1",
      "situacao": "pendente",
      "recebido_centavos": 0,
      "saldo_centavos": 10000
    }
  ],
  "excecoes": [
    {
      "linha": 1,
      "id": "P1",
      "codigo": "ID_DUPLICADO"
    },
    {
      "linha": 2,
      "id": "P1",
      "codigo": "ID_DUPLICADO"
    }
  ]
}
```
