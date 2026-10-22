# Requisitos, histórias e rastreabilidade

Cada requisito Must faz parte do protótipo e tem cenários associados. As histórias abaixo são propostas do estudo, não solicitações coletadas com clientes.

## RF-C01 — Validar contrato do lote

- **Necessidade:** N-C01: impedir cálculo sobre identificadores ou valores inválidos.
- **Prioridade:** Must
- **História:** Como operações, quero rejeitar lote estruturalmente inválido antes de calcular.
- **Regra de negócio:** RN-C01: IDs de parcelas únicos, textos não vazios, status conhecido e valores inteiros positivos.
- **Critérios de aceite verificáveis:** [C-C01](04-cenarios-de-aceite.md#c-c01), [C-C11](04-cenarios-de-aceite.md#c-c11), [C-C12](04-cenarios-de-aceite.md#c-c12)

## RF-C02 — Consolidar e classificar diferenças

- **Necessidade:** N-C02: localizar parcelas com valor faltante ou excedente.
- **Prioridade:** Must
- **História:** Como operações, quero somar pagamentos válidos e comparar ao total da parcela.
- **Regra de negócio:** RN-C02: somar por referência exata; igualdade em centavos, sem tolerância; permitir pagamentos parciais.
- **Critérios de aceite verificáveis:** [C-C01](04-cenarios-de-aceite.md#c-c01), [C-C02](04-cenarios-de-aceite.md#c-c02), [C-C03](04-cenarios-de-aceite.md#c-c03), [C-C04](04-cenarios-de-aceite.md#c-c04), [C-C05](04-cenarios-de-aceite.md#c-c05), [C-C13](04-cenarios-de-aceite.md#c-c13)

## RF-C03 — Separar cancelamentos

- **Necessidade:** N-C03: impedir conclusão automática de parcela cancelada.
- **Prioridade:** Must
- **História:** Como gestor, quero revisar qualquer recebimento em parcela cancelada.
- **Regra de negócio:** RN-C03: cancelado com recebido → revisar_cancelado; sem recebido → cancelado_sem_recebimento; saldo null.
- **Critérios de aceite verificáveis:** [C-C06](04-cenarios-de-aceite.md#c-c06), [C-C07](04-cenarios-de-aceite.md#c-c07)

## RF-C04 — Quarentenar duplicidades

- **Necessidade:** N-C04: evitar dupla contagem e seleção arbitrária.
- **Prioridade:** Must
- **História:** Como operações, quero identificar todas as linhas com um mesmo ID de pagamento.
- **Regra de negócio:** RN-C04: nenhuma ocorrência do ID duplicado participa da soma, mesmo com valores conflitantes.
- **Critérios de aceite verificáveis:** [C-C08](04-cenarios-de-aceite.md#c-c08), [C-C09](04-cenarios-de-aceite.md#c-c09), [C-C14](04-cenarios-de-aceite.md#c-c14)

## RF-C05 — Identificar referência inexistente

- **Necessidade:** N-C05: evitar alocação de recebimento à parcela errada.
- **Prioridade:** Must
- **História:** Como operações, quero localizar o pagamento sem parcela correspondente.
- **Regra de negócio:** RN-C05: referência inexistente gera exceção por linha; não afeta soma de outras parcelas; duplicidade tem precedência.
- **Critérios de aceite verificáveis:** [C-C10](04-cenarios-de-aceite.md#c-c10), [C-C14](04-cenarios-de-aceite.md#c-c14)

## Contrato e dicionário

| Campo | Contrato |
|---|---|
| parcelas.id | Texto não vazio, único no lote |
| parcelas.total_centavos | Inteiro positivo; sem booleanos |
| parcelas.status | ativo ou cancelado |
| pagamentos.id | Identificador da transação; todas as ocorrências duplicadas vão à quarentena |
| pagamentos.parcela_id | Referência exata, sem correspondência aproximada |
| pagamentos.valor_centavos | Inteiro positivo; sem estornos negativos |
| excecoes.linha | Posição original do pagamento, começando em 1 |
| saldo_centavos | Total menos recebido para ativo; null para cancelado |

Situações: pendente (zero), parcial (menor), conciliado (igual), excedente (maior), revisar_cancelado (cancelado com recebido) e cancelado_sem_recebimento. Sem trim/normalização dos IDs: espaços são significativos após a validação de não vazio.

## Requisitos não funcionais e limites

- RNF-01: execução local determinística, sem conexão externa; o validador executa cada cenário duas vezes e exige o mesmo resultado.
- RNF-02: os dados dos cenários são fictícios e não contêm clientes identificáveis.
- Segurança de produção, controle de acesso, desempenho sob carga e disponibilidade não foram implementados nem validados.

## Priorização do próximo ciclo

**Should:** interface de revisão humana e trilha persistente de alterações. **Could:** exportação e filtros operacionais. **Won’t neste ciclo:** integração em produção. Uma função futura não conta como evidência entregue.

## Matriz de rastreabilidade

| Necessidade | Requisito | Regra | Cenários | Evidência |
|---|---|---|---|---|
| N-C01 | RF-C01 | RN-C01 | C-C01, C-C11, C-C12 | [Execução](evidencias/resultado.md) |
| N-C02 | RF-C02 | RN-C02 | C-C01, C-C02, C-C03, C-C04, C-C05, C-C13 | [Execução](evidencias/resultado.md) |
| N-C03 | RF-C03 | RN-C03 | C-C06, C-C07 | [Execução](evidencias/resultado.md) |
| N-C04 | RF-C04 | RN-C04 | C-C08, C-C09, C-C14 | [Execução](evidencias/resultado.md) |
| N-C05 | RF-C05 | RN-C05 | C-C10, C-C14 | [Execução](evidencias/resultado.md) |

Fonte estruturada: [requisitos.json](requisitos.json). O validador rejeita requisito sem teste e cenário ligado a ID inexistente.
