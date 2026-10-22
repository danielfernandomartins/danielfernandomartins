# Backlog para uso em Jira

Estrutura de trabalho proposta. Não foi criado projeto no Jira e não comprova uso profissional da ferramenta. Status inicial de todas as histórias: A fazer. Critérios automatizados foram executados no protótipo; homologação de negócio está pendente.

Épico: 06-priorizacao-melhorias
## História P1

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra P1 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C01: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "0.5", "esforco": "4"}`, quando avaliar, então retornar `{"beneficio_liquido_mensal": "400.00", "score": "100.00", "payback_meses": "6.00", "recomendacao": "COMPARAR_NO_BACKLOG"}`.
- C02: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "1", "esforco": "4"}`, quando avaliar, então retornar `{"beneficio_liquido_mensal": "900.00", "score": "225.00", "payback_meses": "2.67", "recomendacao": "COMPARAR_NO_BACKLOG"}`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História P2

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra P2 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C03: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "0", "esforco": "4"}`, quando avaliar, então retornar `{"beneficio_liquido_mensal": "-100.00", "score": "-25.00", "payback_meses": null, "recomendacao": "INVESTIGAR"}`.
- C04: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "500", "confianca": "0.5", "esforco": "4"}`, quando avaliar, então retornar `{"beneficio_liquido_mensal": "0.00", "score": "0.00", "payback_meses": null, "recomendacao": "INVESTIGAR"}`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História P3

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra P3 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C05: Dado `{"beneficio_mensal": "1000", "custo_inicial": "0", "custo_mensal": "100", "confianca": "0.5", "esforco": "4"}`, quando avaliar, então retornar `{"beneficio_liquido_mensal": "400.00", "score": "100.00", "payback_meses": "0.00", "recomendacao": "COMPARAR_NO_BACKLOG"}`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História P4

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra P4 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C06: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "0.5", "esforco": "8"}`, quando avaliar, então retornar `{"beneficio_liquido_mensal": "400.00", "score": "50.00", "payback_meses": "6.00", "recomendacao": "COMPARAR_NO_BACKLOG"}`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História P5

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra P5 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C07: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "0.5", "esforco": "0"}`, quando avaliar, então retornar `"ERRO"`.
- C08: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "1.01", "esforco": "4"}`, quando avaliar, então retornar `"ERRO"`.
- C09: Dado `{"beneficio_mensal": "1000", "custo_inicial": "-1", "custo_mensal": "100", "confianca": "0.5", "esforco": "4"}`, quando avaliar, então retornar `"ERRO"`.
- C10: Dado `{"beneficio_mensal": "Infinity", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "0.5", "esforco": "4"}`, quando avaliar, então retornar `"ERRO"`.
- C11: Dado `{"beneficio_mensal": "1000", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "-0.1", "esforco": "4"}`, quando avaliar, então retornar `"ERRO"`.
- C12: Dado `{"beneficio_mensal": "abc", "custo_inicial": "2400", "custo_mensal": "100", "confianca": "0.5", "esforco": "4"}`, quando avaliar, então retornar `"ERRO"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.

## Quadro e consultas sugeridas

A fazer → Em análise → Em desenvolvimento → Em validação → Concluído. Não marcar Concluído apenas por teste automatizado.

Exemplos JQL após criar e configurar um projeto com chave BA:

```jql
project = BA AND statusCategory != Done ORDER BY priority DESC
project = BA AND issuetype = Story AND assignee is EMPTY
```

A chave BA é ilustrativa. Campos, permissões, tipos e status dependem da configuração da instância.
