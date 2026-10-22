# Análise de Negócios — três estudos de caso verificáveis

Portfólio de processos, requisitos, regras e critérios de aceite aplicado ao contexto bancário. **São evidências de artefatos e execução técnica, não comprovação de contratação, atuação ou resultado no Bradesco.**

| Caso | Problema e competência demonstrada | Evidência verificável |
|---|---|---|
| [01 · Funil SAP / SMART](01-funil-comercial/) | Consistência de etapas, origem da oportunidade e definição de conversão | 5 requisitos; 15 cenários; [execução](01-funil-comercial/evidencias/resultado.md) |
| [02 · Atendimento de cartões](02-priorizacao-atendimento/) | Triagem operacional, matriz de prioridade e primeira resposta; contexto Bradesco Cartões | 5 requisitos; 18 cenários; [execução](02-priorizacao-atendimento/evidencias/resultado.md) |
| [03 · Conciliação de parcelas](03-conciliacao-recebimentos/) | Pagamentos parciais, duplicidades e exceções; contexto Bradesco Consórcios | 5 requisitos; 14 cenários; [execução](03-conciliacao-recebimentos/evidencias/resultado.md) |

## Como avaliar em cinco minutos

Escolha um caso, leia a necessidade e o TO-BE, selecione um requisito e siga o vínculo até o cenário e a saída publicada. Todos os requisitos Must têm rastreabilidade até um teste. As alternativas descartadas, as perguntas ainda abertas e os limites estão documentados.

## O que foi entregue

- Contexto, escopo, stakeholders hipotéticos e roteiro de descoberta.
- Processos AS-IS e TO-BE, com distinção entre situação observada no projeto anterior e hipóteses de operação.
- Histórias de usuário, regras de negócio e priorização do MVP.
- Contratos de dados, matriz de rastreabilidade e cenários Dado/Quando/Então.
- Protótipos executáveis, resultados esperados e evidências com hashes das fontes.
- Definição de indicadores, decisões, riscos, análise de impacto de mudança e plano de homologação.

## Execute

Requer apenas Python 3.10 ou superior. Na raiz do repositório:

```bash
python analise-negocios/validar.py
```

Não há dependências externas, credenciais, banco ou conexão com sistemas. O comando confere 47 cenários, cobertura dos 15 requisitos, determinismo, preservação das entradas e atualidade dos arquivos de evidência. A mesma rotina roda no GitHub Actions.

## Natureza das evidências

Os estudos foram preparados com assistência de IA. A execução comprova comportamentos dos protótipos; entendimento, adaptação e apresentação dos casos precisam ser demonstrados pelo candidato. Não foram inventadas entrevistas, atas, assinaturas, aprovações de stakeholders ou ganhos financeiros.

SAP e SMART são nomes informados pelo proprietário do portfólio, usados como origens simuladas. Não foi confirmada arquitetura interna do Bradesco, integração real ou uso de módulo SAP específico. As referências a cartões e consórcios usam páginas públicas para contextualização; regras internas não foram reproduzidas. Consulte [fontes e limites](FONTES-E-LIMITES.md).

## Próxima evidência a conquistar

Apresentar o caso a um profissional de negócio, registrar feedback real autorizado, revisar os requisitos e só então documentar aceite. Para uma experiência empresarial, seriam necessários ambiente autorizado, dados adequados, responsáveis, baseline e piloto. O portfólio atual não afirma essas etapas como concluídas.

## Ampliação do portfólio

[Três novos casos no contexto bancário](novos-casos/): encaminhamento de estornos, pendências cadastrais e priorização de melhorias. Incluem 15 requisitos, 36 cenários executados e análise SQL. Execute separadamente `python analise-negocios/novos-casos/validar.py` e `python analise-negocios/novos-casos/dados-atendimento/executar.py`. Os totais e o comando anteriores referem-se aos três casos originais.
