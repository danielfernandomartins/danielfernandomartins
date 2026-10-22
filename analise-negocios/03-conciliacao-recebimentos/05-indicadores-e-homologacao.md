# Indicadores e plano de homologação

| Indicador proposto | Definição | Ressalva |
|---|---|---|
| Parcelas conciliadas | Ativas com soma aceita igual ao total / parcelas ativas | Canceladas fora do denominador; agregação ainda não implementada |
| Linhas em quarentena | Linhas de pagamento com ID duplicado ou parcela inexistente | Uma duplicidade repetida duas vezes conta duas linhas |
| Saldo por parcela ativa | Total − recebimento aceito | Negativo significa excedente, não perda |

No cenário C-C08, duas linhas de R$50 com o mesmo ID são ambas quarentenadas. O recebido aceito é zero, não R$50 nem R$100. A consequência é revisão, não desaparecimento de dinheiro. Não há percentual de economia de tempo nem eficácia em produção medida.

## Verificação técnica executável

Rode `python analise-negocios/validar.py --caso 03-conciliacao-recebimentos` na raiz. A rotina confere cobertura de requisitos, saída esperada, determinismo e integridade dos arquivos de evidência. Não altera entradas, não conecta sistemas e não envia mensagens.

## Aceite de negócio — pendente

1. Responsável de negócio revisa hipóteses, definições e alternativas.
2. Usuário representativo executa os cenários positivos, exceções e limites.
3. Registra divergências de entendimento, não apenas erros de código.
4. Decide aceitar, revisar ou rejeitar cada regra; registra responsável e data real.
5. Somente após aprovação planeja integração, controles e piloto.

**Critério de saída proposto:** todos os requisitos Must aceitos, nenhuma divergência crítica aberta e regras de operação aprovadas pelo responsável. No portfólio só a verificação automatizada pode estar concluída; não há usuário homologador, ata de reunião ou assinatura de cliente.

## Evidência que ainda falta para alegar resultado real

Política aprovada, observação do processo, baseline medido, uso em piloto e avaliação de resultados. Não há afirmação de economia, aumento de conversão ou redução de incidentes nesta entrega.
