# Evidência de execução — 03-conciliacao-recebimentos

**14/14 cenários aprovados; 5/5 requisitos cobertos.**

Resultado de execução local do protótipo. Cada cenário compara uma saída esperada explícita, exige determinismo e preservação da entrada. Não representa homologação por cliente, integração SAP/SMART ou validação institucional do Bradesco.

| Cenário | Requisitos | Resultado | Saída observada |
|---|---|---|---|
| C-C01 | RF-C01, RF-C02 | PASS | `{"parcelas": [{"id": "V1", "situacao": "conciliado", "recebido_centavos": 10000, "saldo_centavos": 0}], "excecoes": []}` |
| C-C02 | RF-C02 | PASS | `{"parcelas": [{"id": "V1", "situacao": "pendente", "recebido_centavos": 0, "saldo_centavos": 10000}], "excecoes": []}` |
| C-C03 | RF-C02 | PASS | `{"parcelas": [{"id": "V1", "situacao": "parcial", "recebido_centavos": 9999, "saldo_centavos": 1}], "excecoes": []}` |
| C-C04 | RF-C02 | PASS | `{"parcelas": [{"id": "V1", "situacao": "excedente", "recebido_centavos": 10001, "saldo_centavos": -1}], "excecoes": []}` |
| C-C05 | RF-C02 | PASS | `{"parcelas": [{"id": "V1", "situacao": "conciliado", "recebido_centavos": 10000, "saldo_centavos": 0}], "excecoes": []}` |
| C-C06 | RF-C03 | PASS | `{"parcelas": [{"id": "V1", "situacao": "revisar_cancelado", "recebido_centavos": 10000, "saldo_centavos": null}], "excecoes": []}` |
| C-C07 | RF-C03 | PASS | `{"parcelas": [{"id": "V1", "situacao": "cancelado_sem_recebimento", "recebido_centavos": 0, "saldo_centavos": null}], "excecoes": []}` |
| C-C08 | RF-C04 | PASS | `{"parcelas": [{"id": "V1", "situacao": "pendente", "recebido_centavos": 0, "saldo_centavos": 10000}], "excecoes": [{"linha": 1, "id": "P1", "codigo": "ID_DUPLICADO"}, {"linha": 2, "id": "P1", "codigo": "ID_DUPLICADO"}]}` |
| C-C09 | RF-C04 | PASS | `{"parcelas": [{"id": "V1", "situacao": "pendente", "recebido_centavos": 0, "saldo_centavos": 10000}], "excecoes": [{"linha": 1, "id": "P1", "codigo": "ID_DUPLICADO"}, {"linha": 2, "id": "P1", "codigo": "ID_DUPLICADO"}]}` |
| C-C10 | RF-C05 | PASS | `{"parcelas": [{"id": "V1", "situacao": "pendente", "recebido_centavos": 0, "saldo_centavos": 10000}], "excecoes": [{"linha": 1, "id": "P1", "codigo": "PARCELA_INEXISTENTE"}]}` |
| C-C11 | RF-C01 | PASS | `{"erro": "LOTE_INVALIDO"}` |
| C-C12 | RF-C01 | PASS | `{"erro": "LOTE_INVALIDO"}` |
| C-C13 | RF-C02 | PASS | `{"parcelas": [], "excecoes": []}` |
| C-C14 | RF-C04, RF-C05 | PASS | `{"parcelas": [{"id": "V1", "situacao": "pendente", "recebido_centavos": 0, "saldo_centavos": 10000}], "excecoes": [{"linha": 1, "id": "P1", "codigo": "ID_DUPLICADO"}, {"linha": 2, "id": "P1", "codigo": "ID_DUPLICADO"}]}` |

[Entradas, saídas e hashes completos](resultado.json). Reproduza na raiz: `python analise-negocios/validar.py --caso 03-conciliacao-recebimentos`.

Ao modificar regras ou cenários, revise primeiro o resultado esperado e depois gere novas evidências com `--atualizar`. O comando sem essa opção falha se a evidência publicada estiver desatualizada.
