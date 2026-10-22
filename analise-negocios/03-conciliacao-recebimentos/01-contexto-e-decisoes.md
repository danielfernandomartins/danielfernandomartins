# Contexto, descoberta e decisões

## Necessidade e origem

Como separar recebimentos conciliados de diferenças que precisam de revisão, sem contabilizar duplicidades?

AS-IS hipotético: comparação manual de parcelas com uma lista de pagamentos. Nenhuma empresa, sistema bancário ou transação real foi utilizada. O protótipo recebe dados sintéticos locais e não executa baixas, cobranças ou transferências. O tema faz referência a Bradesco Consórcios como contexto público, sem reproduzir regras contratuais, procedimentos de baixa ou arquivos internos.

## Stakeholders e perguntas de descoberta

| Papel hipotético | Necessidade a validar | Participação esperada |
|---|---|---|
| Operações financeiras | Identificar diferenças sem dupla contagem | Revisar exceções e amostras |
| Comercial | Explicar status e cancelamentos de parcelas | Validar parcelas e origem de ajustes |
| Gestão | Definir tolerância e responsabilidade de aprovação | Aprovar política de tratamento |
| Desenvolvimento | Preservar referências e prevenir duplicidade | Revisar contrato dos arquivos |

Perguntas de descoberta: identificadores são únicos entre fontes? Há pagamentos parciais? Existem taxas ou moedas diferentes? Quando um cancelamento é efetivo? Quem aprova ajuste? O arquivo é incremental ou fotografia completa? Nenhuma resposta foi atribuída a um stakeholder real.

## Escopo do MVP

Dentro: correspondência exata por parcela_id, soma de pagamentos parciais, classificação de diferença, quarentena de IDs duplicados e referências inexistentes. Fora: conexão bancária, tarifas, estornos, impostos, múltiplas moedas, tolerância percentual e baixa automática. O lote é uma fotografia didática; não há idempotência entre execuções persistidas. Não simula contemplação, lance, composição de parcela, juros, fundo de reserva, reajuste ou quitação de cota. O status cancelado refere-se a um registro fictício de parcela em revisão, não a cancelamento de contrato.

## Alternativas e registro de decisões

| Alternativa | Benefício | Risco | Decisão |
|---|---|---|---|
| Aceitar o primeiro ID repetido | Simples | Pode aceitar uma versão conflitante | Rejeitada |
| Contabilizar todas as linhas | Nenhuma quarentena | Duplica recebimentos | Rejeitada |
| Quarentenar todas as ocorrências do ID repetido | Evita escolher arbitrariamente uma versão | Exige revisão humana | Selecionada |

DEC-C01: igualdade exata em centavos, tolerância zero. DEC-C02: duplicidade tem precedência sobre referência inexistente. DEC-C03: pagamento de parcela cancelada exige revisão, sem baixa. DEC-C04: nenhum dado pessoal nos exemplos. Políticas escolhidas para estudo, sem aprovação empresarial.

## Riscos e dependências

Risco: diferenças legítimas por taxas ou moeda serem classificadas como exceção. Mitigação: explicitar moeda única e valores brutos; novo requisito antes de ampliar. Risco: suprimir pagamento válido ao quarentenar duplicata. Mitigação: informar linha e ID para revisão humana, sem excluir a entrada.

## Exemplo de análise de impacto de mudança

Introduzir tolerância de R$0,01 modifica RF-C02, a definição de conciliado e os cenários C-C03/C-C04. Receber arquivos incrementais exige armazenamento e chave idempotente persistente; o protótipo atual não deve ser usado para baixa automatizada.

Não há custo, prazo de implementação ou ROI estimado: faltam volume, tempo por atividade, custo por hora e validação com responsáveis. Antes de prometer benefício, medir o baseline e executar um piloto comparável.
