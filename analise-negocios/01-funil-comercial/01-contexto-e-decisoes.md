# Contexto, descoberta e decisões

## Necessidade e origem

Como impedir mudanças incoerentes de etapa e evitar duas leituras diferentes da conversão?

O AS-IS parte do [projeto de pipeline existente](https://github.com/danielfernandomartins/pipeline-comercial-python): cadastro e indicadores em memória, sem edição de status, validação de valores ou histórico. O TO-BE abaixo é uma proposta didática separada; não altera a aplicação original. SAP e SMART são nomes informados pelo proprietário do portfólio. Neste estudo, identificam apenas a origem simulada de uma oportunidade. Campos, transições e papéis abaixo não são documentação interna do Bradesco, especificação SAP ou integração real.

## Stakeholders e perguntas de descoberta

| Papel hipotético | Necessidade a validar | Participação esperada |
|---|---|---|
| Gestor comercial | Comparar conversão sem misturar denominadores | Aprovar definições e política de mudança de etapa |
| Executivo de vendas | Atualizar oportunidades com regras claras | Testar os cenários de operação |
| Operações comerciais | Registrar perdas sem campos inconsistentes | Revisar motivos e qualidade dos registros |
| Desenvolvimento | Implementar regras sem ambiguidade | Estimar e integrar o protótipo a uma interface |

Não foram realizadas entrevistas. Roteiro proposto: uma venda pode saltar negociação? Há reabertura? Quem aprova correções? Valor zero é uma oportunidade válida? Qual coorte e período devem compor a conversão?

## Escopo do MVP

Dentro: validação de estado e valor, transições, motivo de perda, duas taxas de conversão. Fora: CRM, autenticação, persistência, funil com múltiplos produtos, forecast e histórico auditável. O motor retorna a decisão; não grava uma alteração em sistema. O campo sistema_origem aceita SAP ou SMART em alterações; não há login, API, sincronização ou leitura desses sistemas.

## Alternativas e registro de decisões

| Alternativa | Vantagem | Limite | Decisão do estudo |
|---|---|---|---|
| Apenas instrução de preenchimento | Baixo esforço | Não impede entradas inválidas | Não selecionada como solução isolada |
| Motor de regras com mensagens explícitas | Critérios verificáveis antes de integrar | Sem interface e persistência | Selecionada para o MVP |
| Implantar CRM completo | Fluxo e histórico integrados | Integração, custo e governança fora do escopo | Posterior, sem recomendação de fornecedor |

DEC-F01: estados terminais não reabrem no MVP; isso evita reescrever resultados sem trilha. DEC-F02: motivo de perda é texto não vazio, pois não houve validação de uma taxonomia. DEC-F03: taxas sem denominador retornam ausência (null), não 0%. Essas decisões são do estudo e aguardariam validação com o negócio.

## Riscos e dependências

Risco: bloquear uma correção legítima de oportunidade encerrada. Mitigação proposta: fluxo autorizado de correção com histórico, fora do MVP. Risco: comparar conversão de coortes diferentes. Mitigação: definir período e datas de entrada/fechamento antes de uso real.

## Exemplo de análise de impacto de mudança

Se o gestor solicitar reabertura de ganhos, não basta adicionar uma seta: RF-F02, metas/fechamento, histórico, permissões e cenários F-C05/F-C09 precisam ser revistos. A alteração deve ser aprovada antes de mudar o denominador de indicadores publicados.

Não há custo, prazo de implementação ou ROI estimado: faltam volume, tempo por atividade, custo por hora e validação com responsáveis. Antes de prometer benefício, medir o baseline e executar um piloto comparável.
