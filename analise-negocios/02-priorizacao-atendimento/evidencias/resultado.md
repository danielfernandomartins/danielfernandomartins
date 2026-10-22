# Evidência de execução — 02-priorizacao-atendimento

**18/18 cenários aprovados; 5/5 requisitos cobertos.**

Resultado de execução local do protótipo. Cada cenário compara uma saída esperada explícita, exige determinismo e preservação da entrada. Não representa homologação por cliente, integração SAP/SMART ou validação institucional do Bradesco.

| Cenário | Requisitos | Resultado | Saída observada |
|---|---|---|---|
| A-C01 | RF-A02, RF-A03, RF-A04, RF-A05 | PASS | `{"prioridade": "P1", "limite_primeira_resposta": "2026-10-01T11:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "especialista"}` |
| A-C02 | RF-A04 | PASS | `{"prioridade": "P1", "limite_primeira_resposta": "2026-10-01T11:00:00+00:00", "situacao": "pendente_vencido", "grupo": "especialista"}` |
| A-C03 | RF-A04 | PASS | `{"prioridade": "P1", "limite_primeira_resposta": "2026-10-01T11:00:00+00:00", "situacao": "respondido_no_prazo", "grupo": "especialista"}` |
| A-C04 | RF-A04 | PASS | `{"prioridade": "P1", "limite_primeira_resposta": "2026-10-01T11:00:00+00:00", "situacao": "respondido_vencido", "grupo": "especialista"}` |
| A-C05 | RF-A01 | PASS | `{"situacao": "aguardando_dados", "codigo": "CLASSIFICACAO_INCOMPLETA"}` |
| A-C06 | RF-A01 | PASS | `{"situacao": "aguardando_dados", "codigo": "CLASSIFICACAO_INCOMPLETA"}` |
| A-C07 | RF-A03 | PASS | `{"situacao": "revisar_dados", "codigo": "DATA_INVALIDA"}` |
| A-C08 | RF-A03 | PASS | `{"situacao": "revisar_dados", "codigo": "DATA_INVALIDA"}` |
| A-C09 | RF-A03 | PASS | `{"prioridade": "P1", "limite_primeira_resposta": "2026-10-01T11:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "especialista"}` |
| A-C10 | RF-A03 | PASS | `{"situacao": "revisar_dados", "codigo": "DATA_INVALIDA"}` |
| A-C11 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P2", "limite_primeira_resposta": "2026-10-01T14:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |
| A-C12 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P2", "limite_primeira_resposta": "2026-10-01T14:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |
| A-C13 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P2", "limite_primeira_resposta": "2026-10-01T14:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |
| A-C14 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P2", "limite_primeira_resposta": "2026-10-01T14:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |
| A-C15 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P3", "limite_primeira_resposta": "2026-10-01T18:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |
| A-C16 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P2", "limite_primeira_resposta": "2026-10-01T14:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |
| A-C17 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P3", "limite_primeira_resposta": "2026-10-01T18:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |
| A-C18 | RF-A02, RF-A03, RF-A05 | PASS | `{"prioridade": "P3", "limite_primeira_resposta": "2026-10-01T18:00:00+00:00", "situacao": "pendente_no_prazo", "grupo": "triagem"}` |

[Entradas, saídas e hashes completos](resultado.json). Reproduza na raiz: `python analise-negocios/validar.py --caso 02-priorizacao-atendimento`.

Ao modificar regras ou cenários, revise primeiro o resultado esperado e depois gere novas evidências com `--atualizar`. O comando sem essa opção falha se a evidência publicada estiver desatualizada.
