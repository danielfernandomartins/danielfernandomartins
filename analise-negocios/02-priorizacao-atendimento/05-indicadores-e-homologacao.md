# Indicadores e plano de homologação

| Indicador proposto | Fórmula / população | Dados necessários |
|---|---|---|
| Primeira resposta no prazo | Respondidos dentro / todos respondidos elegíveis × 100 | Abertura, resposta, matriz e versão da política |
| Pendentes vencidos | Contagem sem resposta e agora > limite | Relógio de referência explícito |
| Registros incompletos | Classificações incompletas / entradas recebidas × 100 | Registro da entrada e do erro |

Não misturar pendentes com tickets respondidos no denominador do cumprimento. O motor calcula a situação por ticket, não agrega esses KPIs. Abertura 10h UTC em P1 gera limite 11h UTC; 11h exatas estão no prazo e 11h00m01s não. Não há baseline operacional, capacidade medida ou redução comprovada de espera.

## Verificação técnica executável

Rode `python analise-negocios/validar.py --caso 02-priorizacao-atendimento` na raiz. A rotina confere cobertura de requisitos, saída esperada, determinismo e integridade dos arquivos de evidência. Não altera entradas, não conecta sistemas e não envia mensagens.

## Aceite de negócio — pendente

1. Responsável de negócio revisa hipóteses, definições e alternativas.
2. Usuário representativo executa os cenários positivos, exceções e limites.
3. Registra divergências de entendimento, não apenas erros de código.
4. Decide aceitar, revisar ou rejeitar cada regra; registra responsável e data real.
5. Somente após aprovação planeja integração, controles e piloto.

**Critério de saída proposto:** todos os requisitos Must aceitos, nenhuma divergência crítica aberta e regras de operação aprovadas pelo responsável. No portfólio só a verificação automatizada pode estar concluída; não há usuário homologador, ata de reunião ou assinatura de cliente.

## Evidência que ainda falta para alegar resultado real

Política aprovada, observação do processo, baseline medido, uso em piloto e avaliação de resultados. Não há afirmação de economia, aumento de conversão ou redução de incidentes nesta entrega.
