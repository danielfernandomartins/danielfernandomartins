# Evidência de execução — 01-funil-comercial

**15/15 cenários aprovados; 5/5 requisitos cobertos.**

Resultado de execução local do protótipo. Cada cenário compara uma saída esperada explícita, exige determinismo e preservação da entrada. Não representa homologação por cliente, integração SAP/SMART ou validação institucional do Bradesco.

| Cenário | Requisitos | Resultado | Saída observada |
|---|---|---|---|
| F-C01 | RF-F01, RF-F02 | PASS | `{"aceito": true, "novo_status": "negociacao", "sistema_origem": "SMART"}` |
| F-C02 | RF-F01 | PASS | `{"aceito": false, "codigo": "DADOS_INVALIDOS"}` |
| F-C03 | RF-F02 | PASS | `{"aceito": false, "codigo": "TRANSICAO_INVALIDA"}` |
| F-C04 | RF-F03 | PASS | `{"aceito": false, "codigo": "MOTIVO_OBRIGATORIO"}` |
| F-C05 | RF-F02 | PASS | `{"aceito": false, "codigo": "TRANSICAO_INVALIDA"}` |
| F-C06 | RF-F04 | PASS | `{"total": 3, "ganhas": 1, "valor_aberto_centavos": 20000, "conversao_total_pct": 33.33, "taxa_ganho_encerradas_pct": 50.0}` |
| F-C07 | RF-F05 | PASS | `{"total": 0, "ganhas": 0, "valor_aberto_centavos": 0, "conversao_total_pct": null, "taxa_ganho_encerradas_pct": null}` |
| F-C08 | RF-F04, RF-F05 | PASS | `{"total": 1, "ganhas": 0, "valor_aberto_centavos": 10000, "conversao_total_pct": 0.0, "taxa_ganho_encerradas_pct": null}` |
| F-C09 | RF-F02 | PASS | `{"aceito": true, "novo_status": "ganha", "sistema_origem": "SMART"}` |
| F-C10 | RF-F03 | PASS | `{"aceito": true, "novo_status": "perdida", "sistema_origem": "SMART"}` |
| F-C11 | RF-F01, RF-F05 | PASS | `{"erro": "REGISTRO_INVALIDO"}` |
| F-C12 | RF-F01 | PASS | `{"aceito": false, "codigo": "DADOS_INVALIDOS"}` |
| F-C13 | RF-F01 | PASS | `{"aceito": true, "novo_status": "negociacao", "sistema_origem": "SAP"}` |
| F-C14 | RF-F01 | PASS | `{"aceito": false, "codigo": "DADOS_INVALIDOS"}` |
| F-C15 | RF-F03 | PASS | `{"aceito": false, "codigo": "MOTIVO_OBRIGATORIO"}` |

[Entradas, saídas e hashes completos](resultado.json). Reproduza na raiz: `python analise-negocios/validar.py --caso 01-funil-comercial`.

Ao modificar regras ou cenários, revise primeiro o resultado esperado e depois gere novas evidências com `--atualizar`. O comando sem essa opção falha se a evidência publicada estiver desatualizada.
