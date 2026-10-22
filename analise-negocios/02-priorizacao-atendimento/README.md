# Bradesco Cartões — estudo independente de atendimento operacional

**Estudo independente de Análise de Negócios • processos AS-IS/TO-BE • requisitos • critérios de aceite • evidência executável**

> Como tornar consistente a triagem operacional de dúvidas de fatura e acesso de cartões?

Este caso demonstra como transformar uma necessidade em regras e cenários verificáveis. É um estudo com hipóteses explícitas, não uma implantação em empresa. Os nomes Bradesco, SAP e SMART contextualizam o exercício, sem vínculo ou homologação institucional. Veja [fontes e limites](../FONTES-E-LIMITES.md).

## Percurso do recrutador

1. [Entenda o problema, o escopo e as decisões](01-contexto-e-decisoes.md).
2. [Compare o processo atual e a proposta](02-processos.md).
3. [Confira requisitos, histórias e rastreabilidade](03-requisitos-e-rastreabilidade.md).
4. [Leia cenários Dado/Quando/Então com entrada e resultado esperado](04-cenarios-de-aceite.md).
5. [Confira a execução publicada](evidencias/resultado.md) e o [protótipo](prototipo.py).
6. [Revise indicadores, limites e plano de homologação](05-indicadores-e-homologacao.md).

## Evidência concreta

- 5 requisitos Must, cada um associado a cenários de aceite.
- 18 cenários com resultados esperados explícitos, incluindo exceções e limites.
- Protótipo em Python sem bibliotecas externas, banco ou credenciais.
- Execução reproduzível: na raiz do repositório, rode `python analise-negocios/validar.py --caso 02-priorizacao-atendimento`.

Os testes verificam a implementação das regras escolhidas, não a adequação da política a uma empresa. A aprovação por usuários de negócio permanece pendente. Veja [natureza das evidências e autoria assistida](../README.md).
