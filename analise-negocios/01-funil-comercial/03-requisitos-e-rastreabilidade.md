# Requisitos, histórias e rastreabilidade

Cada requisito Must faz parte do protótipo e tem cenários associados. As histórias abaixo são propostas do estudo, não solicitações coletadas com clientes.

## RF-F01 — Validar estados e valores

- **Necessidade:** N-F01: evitar registros incompatíveis com as regras do funil.
- **Prioridade:** Must
- **História:** Como operações, quero receber uma rejeição clara para estado desconhecido ou valor não positivo.
- **Regra de negócio:** RN-F01: somente quatro estados e valor inteiro positivo; rejeição precede avaliação da transição. Origem de alteração deve ser SAP ou SMART; o retorno aceito preserva esse rótulo.
- **Critérios de aceite verificáveis:** [F-C01](04-cenarios-de-aceite.md#f-c01), [F-C02](04-cenarios-de-aceite.md#f-c02), [F-C11](04-cenarios-de-aceite.md#f-c11), [F-C12](04-cenarios-de-aceite.md#f-c12), [F-C13](04-cenarios-de-aceite.md#f-c13), [F-C14](04-cenarios-de-aceite.md#f-c14)

## RF-F02 — Controlar transições

- **Necessidade:** N-F02: proteger a coerência do avanço e do fechamento.
- **Prioridade:** Must
- **História:** Como gestor, quero permitir apenas mudanças previstas no fluxo.
- **Regra de negócio:** RN-F02: prospeccao → negociacao/perdida; negociacao → ganha/perdida; estados terminais não reabrem.
- **Critérios de aceite verificáveis:** [F-C01](04-cenarios-de-aceite.md#f-c01), [F-C03](04-cenarios-de-aceite.md#f-c03), [F-C05](04-cenarios-de-aceite.md#f-c05), [F-C09](04-cenarios-de-aceite.md#f-c09)

## RF-F03 — Justificar perdas

- **Necessidade:** N-F03: permitir investigação futura de oportunidades perdidas.
- **Prioridade:** Must
- **História:** Como gestor, quero que o encerramento perdido tenha motivo.
- **Regra de negócio:** RN-F03: motivo vazio, nulo ou composto só por espaços impede perda.
- **Critérios de aceite verificáveis:** [F-C04](04-cenarios-de-aceite.md#f-c04), [F-C10](04-cenarios-de-aceite.md#f-c10), [F-C15](04-cenarios-de-aceite.md#f-c15)

## RF-F04 — Distinguir denominadores

- **Necessidade:** N-F04: comparar indicadores sem ambiguidade.
- **Prioridade:** Must
- **História:** Como gestor, quero ver conversão total e taxa de ganho em encerradas separadas.
- **Regra de negócio:** RN-F04: duas fórmulas explícitas; calcular valor aberto apenas de prospeccao e negociacao.
- **Critérios de aceite verificáveis:** [F-C06](04-cenarios-de-aceite.md#f-c06), [F-C08](04-cenarios-de-aceite.md#f-c08)

## RF-F05 — Tratar ausência de base

- **Necessidade:** N-F04: evitar interpretação incorreta de dados ausentes.
- **Prioridade:** Must
- **História:** Como leitor do relatório, quero distinguir zero resultados de denominador inexistente.
- **Regra de negócio:** RN-F05: denominador zero retorna null; registros inválidos retornam erro, sem indicador parcial.
- **Critérios de aceite verificáveis:** [F-C07](04-cenarios-de-aceite.md#f-c07), [F-C08](04-cenarios-de-aceite.md#f-c08), [F-C11](04-cenarios-de-aceite.md#f-c11)

## Contrato e dicionário

| Campo | Tipo / contrato |
|---|---|
| acao | transicao ou indicadores |
| atual / destino / status | prospeccao, negociacao, ganha ou perdida |
| valor_centavos | Inteiro positivo, sem booleanos; valor total de uma oportunidade |
| motivo | Texto obrigatório somente ao mudar para perdida |
| oportunidades | Lista para indicadores; cada linha representa uma oportunidade |

Sem deduplicação de oportunidades ou datas nesta versão. O chamador deve fornecer registros únicos; valores inválidos rejeitam o cálculo inteiro.
| sistema_origem | SAP ou SMART, apenas nas transições; rótulos de fontes simuladas |

As oportunidades podem representar contatos comerciais sobre cartões ou consórcios. valor_centavos é um valor comercial fictício comparável na amostra; não significa limite aprovado de cartão, receita bancária, carta de crédito ou retorno de investimento. Ganho é encerramento de oportunidade no estudo, não concessão de crédito ou contemplação.


## Requisitos não funcionais e limites

- RNF-01: execução local determinística, sem conexão externa; o validador executa cada cenário duas vezes e exige o mesmo resultado.
- RNF-02: os dados dos cenários são fictícios e não contêm clientes identificáveis.
- Segurança de produção, controle de acesso, desempenho sob carga e disponibilidade não foram implementados nem validados.

## Priorização do próximo ciclo

**Should:** interface de revisão humana e trilha persistente de alterações. **Could:** exportação e filtros operacionais. **Won’t neste ciclo:** integração em produção. Uma função futura não conta como evidência entregue.

## Matriz de rastreabilidade

| Necessidade | Requisito | Regra | Cenários | Evidência |
|---|---|---|---|---|
| N-F01 | RF-F01 | RN-F01 | F-C01, F-C02, F-C11, F-C12, F-C13, F-C14 | [Execução](evidencias/resultado.md) |
| N-F02 | RF-F02 | RN-F02 | F-C01, F-C03, F-C05, F-C09 | [Execução](evidencias/resultado.md) |
| N-F03 | RF-F03 | RN-F03 | F-C04, F-C10, F-C15 | [Execução](evidencias/resultado.md) |
| N-F04 | RF-F04 | RN-F04 | F-C06, F-C08 | [Execução](evidencias/resultado.md) |
| N-F04 | RF-F05 | RN-F05 | F-C07, F-C08, F-C11 | [Execução](evidencias/resultado.md) |

Fonte estruturada: [requisitos.json](requisitos.json). O validador rejeita requisito sem teste e cenário ligado a ID inexistente.
