# Contexto, descoberta e decisões

## Necessidade e origem

Como tornar consistente a triagem operacional de dúvidas de fatura e acesso de cartões?

AS-IS hipotético: uma fila atendida por ordem de chegada, sem matriz documentada. Não foi observado um service desk real. A proposta é independente dos laboratórios de suporte existentes e usa uma política fictícia de operação contínua. O contexto escolhido é uma fila de dúvidas de fatura/acesso de cartões inspirada apenas na existência de canais públicos de atendimento. Prioridades, grupos e prazos são inventados para o exercício e não representam política do Bradesco Cartões.

## Stakeholders e perguntas de descoberta

| Papel hipotético | Necessidade a validar | Participação esperada |
|---|---|---|
| Solicitante | Registrar impacto sem precisar conhecer prioridades | Testar entendimento dos campos |
| Triagem | Usar uma matriz comum e localizar dados faltantes | Revisar as nove combinações |
| Gestor de atendimento | Definir prazo e cobertura de equipe | Aprovar política e capacidade |
| Especialista | Receber casos críticos de forma previsível | Validar encaminhamento P1 |

Perguntas de descoberta ainda não respondidas por pessoas reais: o serviço opera 24x7? Quem declara impacto? Há feriados? O prazo começa no registro ou na triagem? Reclassificar um ticket reinicia a contagem? Qual evento é uma primeira resposta válida?

## Escopo do MVP

Dentro: classificar impacto e urgência, propor grupo, calcular prazo e comparar primeira resposta. Fora: resolução, calendário útil, pausas, reclassificação, notificações, integração com ferramenta e mensuração de satisfação. A resposta é uma decisão de teste; não encaminha chamados de verdade. O caso não trata fraude, bloqueio emergencial, decisão de contestação ou estorno; não coleta número de cartão, senha ou CPF.

## Alternativas e registro de decisões

| Alternativa | Benefício | Limite | Decisão |
|---|---|---|---|
| FIFO | Simples | Pode atrasar incidente crítico | Referência AS-IS hipotética |
| Prioridade por julgamento individual | Flexível | Critérios inconsistentes | Não escolhida para o MVP |
| Matriz impacto × urgência | Regra explícita e testável | Exige calibração com operação | Selecionada como proposta |

DEC-A01: 1, 4 e 8 horas corridas para primeira resposta, sem calendário útil. DEC-A02: igualdade exata ao prazo está dentro; ultrapassar por um segundo está fora. DEC-A03: timestamp com fuso obrigatório e comparação em UTC. Os tempos não são norma de mercado nem contrato de SLA.

## Riscos e dependências

Risco: promessa de prazo incompatível com capacidade real. Mitigação: simular volume e aprovar capacidade antes de implantação. Risco: classificação autodeclarada incorreta. Mitigação proposta: revisão humana na triagem e registro de justificativa.

## Exemplo de análise de impacto de mudança

Trocar horas corridas por úteis afeta RF-A03/RF-A04, calendário, feriados, fuso e cenários de limite. Uma pausa por dependência de terceiro exige evento e política próprios. Não alterar apenas HORAS e afirmar que passou a existir SLA em horário comercial.

Não há custo, prazo de implementação ou ROI estimado: faltam volume, tempo por atividade, custo por hora e validação com responsáveis. Antes de prometer benefício, medir o baseline e executar um piloto comparável.
