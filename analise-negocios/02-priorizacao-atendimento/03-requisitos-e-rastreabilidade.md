# Requisitos, histórias e rastreabilidade

Cada requisito Must faz parte do protótipo e tem cenários associados. As histórias abaixo são propostas do estudo, não solicitações coletadas com clientes.

## RF-A01 — Exigir classificação válida

- **Necessidade:** N-A01: impedir prioridade calculada a partir de dados incompletos.
- **Prioridade:** Must
- **História:** Como triagem, quero solicitar complemento quando faltar impacto ou urgência.
- **Regra de negócio:** RN-A01: impacto e urgência são inteiros entre 1 e 3; caso contrário, aguardando_dados.
- **Critérios de aceite verificáveis:** [A-C05](04-cenarios-de-aceite.md#a-c05), [A-C06](04-cenarios-de-aceite.md#a-c06)

## RF-A02 — Aplicar a matriz

- **Necessidade:** N-A02: padronizar a priorização.
- **Prioridade:** Must
- **História:** Como gestor, quero que a mesma combinação resulte na mesma prioridade.
- **Regra de negócio:** RN-A02: aplicar as nove combinações da matriz documentada.
- **Critérios de aceite verificáveis:** [A-C01](04-cenarios-de-aceite.md#a-c01), [A-C11](04-cenarios-de-aceite.md#a-c11), [A-C12](04-cenarios-de-aceite.md#a-c12), [A-C13](04-cenarios-de-aceite.md#a-c13), [A-C14](04-cenarios-de-aceite.md#a-c14), [A-C15](04-cenarios-de-aceite.md#a-c15), [A-C16](04-cenarios-de-aceite.md#a-c16), [A-C17](04-cenarios-de-aceite.md#a-c17), [A-C18](04-cenarios-de-aceite.md#a-c18)

## RF-A03 — Calcular o limite de resposta

- **Necessidade:** N-A03: oferecer referência objetiva de prazo.
- **Prioridade:** Must
- **História:** Como atendente, quero saber o instante limite de primeira resposta.
- **Regra de negócio:** RN-A03: abertura + horas corridas por prioridade; fuso obrigatório e cronologia válida.
- **Critérios de aceite verificáveis:** [A-C01](04-cenarios-de-aceite.md#a-c01), [A-C07](04-cenarios-de-aceite.md#a-c07), [A-C08](04-cenarios-de-aceite.md#a-c08), [A-C09](04-cenarios-de-aceite.md#a-c09), [A-C10](04-cenarios-de-aceite.md#a-c10), [A-C11](04-cenarios-de-aceite.md#a-c11), [A-C12](04-cenarios-de-aceite.md#a-c12), [A-C13](04-cenarios-de-aceite.md#a-c13), [A-C14](04-cenarios-de-aceite.md#a-c14), [A-C15](04-cenarios-de-aceite.md#a-c15), [A-C16](04-cenarios-de-aceite.md#a-c16), [A-C17](04-cenarios-de-aceite.md#a-c17), [A-C18](04-cenarios-de-aceite.md#a-c18)

## RF-A04 — Aferir cumprimento no limite

- **Necessidade:** N-A03: distinguir pendência de resposta tardia.
- **Prioridade:** Must
- **História:** Como gestor, quero diferenciar pendentes e respondidos dentro ou fora do prazo.
- **Regra de negócio:** RN-A04: comparar resposta, ou agora se ausente; igualdade está no prazo.
- **Critérios de aceite verificáveis:** [A-C01](04-cenarios-de-aceite.md#a-c01), [A-C02](04-cenarios-de-aceite.md#a-c02), [A-C03](04-cenarios-de-aceite.md#a-c03), [A-C04](04-cenarios-de-aceite.md#a-c04)

## RF-A05 — Indicar tratamento crítico

- **Necessidade:** N-A04: encaminhar o nível crítico ao grupo apropriado.
- **Prioridade:** Must
- **História:** Como triagem, quero identificar o grupo sugerido para P1.
- **Regra de negócio:** RN-A05: P1 indica especialista; P2 e P3 indicam triagem; sem envio automático.
- **Critérios de aceite verificáveis:** [A-C01](04-cenarios-de-aceite.md#a-c01), [A-C11](04-cenarios-de-aceite.md#a-c11), [A-C12](04-cenarios-de-aceite.md#a-c12), [A-C13](04-cenarios-de-aceite.md#a-c13), [A-C14](04-cenarios-de-aceite.md#a-c14), [A-C15](04-cenarios-de-aceite.md#a-c15), [A-C16](04-cenarios-de-aceite.md#a-c16), [A-C17](04-cenarios-de-aceite.md#a-c17), [A-C18](04-cenarios-de-aceite.md#a-c18)

## Contrato e dicionário

| Impacto \ Urgência | 1 | 2 | 3 |
|---|---|---|---|
| 1 | P1 | P2 | P2 |
| 2 | P2 | P2 | P3 |
| 3 | P2 | P3 | P3 |

| Campo | Contrato |
|---|---|
| impacto / urgencia | Inteiros 1–3; ausência ou domínio inválido aguarda dados |
| abertura / agora | Timestamp ISO 8601 com fuso |
| primeira_resposta | Timestamp opcional; quando presente, abertura ≤ resposta ≤ agora |
| limite_primeira_resposta | Abertura + 1h (P1), 4h (P2), 8h (P3), retornado em UTC |
| grupo | especialista para P1, triagem para P2/P3; indicação sem integração |

Exemplos de demandas de estudo: dúvida de visualização de fatura e indisponibilidade do acesso usado pelo atendimento. Não existem clientes, protocolos ou cartões reais nos cenários.


## Requisitos não funcionais e limites

- RNF-01: execução local determinística, sem conexão externa; o validador executa cada cenário duas vezes e exige o mesmo resultado.
- RNF-02: os dados dos cenários são fictícios e não contêm clientes identificáveis.
- Segurança de produção, controle de acesso, desempenho sob carga e disponibilidade não foram implementados nem validados.

## Priorização do próximo ciclo

**Should:** interface de revisão humana e trilha persistente de alterações. **Could:** exportação e filtros operacionais. **Won’t neste ciclo:** integração em produção. Uma função futura não conta como evidência entregue.

## Matriz de rastreabilidade

| Necessidade | Requisito | Regra | Cenários | Evidência |
|---|---|---|---|---|
| N-A01 | RF-A01 | RN-A01 | A-C05, A-C06 | [Execução](evidencias/resultado.md) |
| N-A02 | RF-A02 | RN-A02 | A-C01, A-C11, A-C12, A-C13, A-C14, A-C15, A-C16, A-C17, A-C18 | [Execução](evidencias/resultado.md) |
| N-A03 | RF-A03 | RN-A03 | A-C01, A-C07, A-C08, A-C09, A-C10, A-C11, A-C12, A-C13, A-C14, A-C15, A-C16, A-C17, A-C18 | [Execução](evidencias/resultado.md) |
| N-A03 | RF-A04 | RN-A04 | A-C01, A-C02, A-C03, A-C04 | [Execução](evidencias/resultado.md) |
| N-A04 | RF-A05 | RN-A05 | A-C01, A-C11, A-C12, A-C13, A-C14, A-C15, A-C16, A-C17, A-C18 | [Execução](evidencias/resultado.md) |

Fonte estruturada: [requisitos.json](requisitos.json). O validador rejeita requisito sem teste e cenário ligado a ID inexistente.
