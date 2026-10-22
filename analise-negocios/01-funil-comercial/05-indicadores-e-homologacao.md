# Indicadores e plano de homologação

| Indicador | Fórmula e população | Exceção / fonte |
|---|---|---|
| Conversão sobre total | ganhas / todas as oportunidades × 100 | Lista vazia: null; cenário F-C07 |
| Taxa de ganho em encerradas | ganhas / (ganhas + perdidas) × 100 | Nenhuma encerrada: null; F-C08 |
| Valor em aberto | Soma em centavos de prospeccao e negociacao | Exclui ganha/perdida; F-C06 |
| Rejeições de alteração | Tentativas rejeitadas / tentativas avaliadas | Apenas casos de teste; não estima qualidade de operação real |

Na amostra F-C06, 1 ganha, 1 perdida e 1 aberta produzem 33,33% sobre o total e 50% sobre encerradas. A diferença é definição do denominador, não melhora de desempenho. Não existe baseline de conversão empresarial ou meta aprovada.

## Verificação técnica executável

Rode `python analise-negocios/validar.py --caso 01-funil-comercial` na raiz. A rotina confere cobertura de requisitos, saída esperada, determinismo e integridade dos arquivos de evidência. Não altera entradas, não conecta sistemas e não envia mensagens.

## Aceite de negócio — pendente

1. Responsável de negócio revisa hipóteses, definições e alternativas.
2. Usuário representativo executa os cenários positivos, exceções e limites.
3. Registra divergências de entendimento, não apenas erros de código.
4. Decide aceitar, revisar ou rejeitar cada regra; registra responsável e data real.
5. Somente após aprovação planeja integração, controles e piloto.

**Critério de saída proposto:** todos os requisitos Must aceitos, nenhuma divergência crítica aberta e regras de operação aprovadas pelo responsável. No portfólio só a verificação automatizada pode estar concluída; não há usuário homologador, ata de reunião ou assinatura de cliente.

## Evidência que ainda falta para alegar resultado real

Política aprovada, observação do processo, baseline medido, uso em piloto e avaliação de resultados. Não há afirmação de economia, aumento de conversão ou redução de incidentes nesta entrega.
