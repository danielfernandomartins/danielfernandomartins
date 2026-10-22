# Novos estudos — Análise de Negócios no contexto Bradesco

Estudo independente preparado com assistência de IA, ligado ao contexto da experiência profissional no Bradesco informada pelo autor. Dados, atores, políticas, valores e processos são fictícios. Não representa projeto realizado no banco, procedimento interno, aprovação institucional ou resultado empresarial. Não usa dados de clientes. A experiência informada contextualiza a escolha do problema; o estudo demonstra artefatos de análise.

| Caso | Competência principal | Evidência |
|---|---|---|
| [04 · Encaminhamento de estornos](04-alcadas-estornos/) | Alçadas, segregação de papéis e exceções | 5 requisitos; 12 cenários |
| [05 · Pendências de cadastro](05-ativacao-clientes/) | Jornada, completude e revisão humana | 5 requisitos; 12 cenários |
| [06 · Priorização de melhorias](06-priorizacao-melhorias/) | Business case, sensibilidade e backlog | 5 requisitos; 12 cenários |

## Fontes e origem das hipóteses

O autor informou experiência profissional no Bradesco. A conexão com atendimento e serviços financeiros orienta os temas; não foram atribuídas ao autor atividades específicas não confirmadas.

Referências públicas consultadas em 22/10/2026 apenas para contexto de cadastro e atendimento:

- [Bradesco — termos do aplicativo](https://exclusive.bradesco/assets/common/inc/termo-de-uso-bradesco-celular.shtm): jornada pública de cadastro e uso dos canais.
- [Bradesco — atendimento digital](https://cloud.campanhasbradesco.com.br/11251FAQ): contexto público de canais de atendimento.

Essas fontes não fundamentam alçadas de estorno, checklists internos, orçamento ou fórmulas de priorização. Todas essas regras são hipóteses didáticas definidas neste estudo. Não foi usado material interno do banco.

## Reprodução

```bash
python analise-negocios/novos-casos/validar.py
```

O comando executa 36 cenários, compara saídas com expectativas e encerra com erro na primeira divergência. Os 47 cenários dos casos anteriores continuam no validador original e não são recontados aqui.

## Roteiro para evolução

1. Estudar e executar cada cenário, explicando decisões e limites.
2. Revisar hipóteses com um profissional de negócio, registrando apenas feedback real autorizado.
3. Refinar os requisitos e coletar métricas em piloto autorizado antes de afirmar benefício.

Os protótipos não são sistemas de produção. Não coletam dados pessoais nem realizam operações bancárias.

## Ferramentas alinhadas às referências públicas

[Ferramentas e fontes](FERRAMENTAS-E-FONTES.md) · [Análise SQL de atendimento](dados-atendimento/)

Cada caso inclui BACKLOG-JIRA.md com histórias, critérios Dado/Quando/Então, dependências e fluxo de trabalho. A documentação funcional pode apoiar revisão em Confluence; não foi publicada em instância desses serviços.
