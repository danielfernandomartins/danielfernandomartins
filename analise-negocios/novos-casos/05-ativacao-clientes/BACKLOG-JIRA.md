# Backlog para uso em Jira

Estrutura de trabalho proposta. Não foi criado projeto no Jira e não comprova uso profissional da ferramenta. Status inicial de todas as histórias: A fazer. Critérios automatizados foram executados no protótipo; homologação de negócio está pendente.

Épico: 05-ativacao-clientes
## História A1

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra A1 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C01: Dado `{"cliente_id": "SINT-001", "documentos": ["cadastro", "contrato"], "duplicado": false, "revisao_manual": false}`, quando avaliar, então retornar `"APTO_PARA_ATIVACAO"`.
- C12: Dado `{"cliente_id": "SINT-001", "documentos": ["cadastro", "contrato", "cadastro"], "duplicado": false, "revisao_manual": false}`, quando avaliar, então retornar `"APTO_PARA_ATIVACAO"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História A2

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra A2 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C02: Dado `{"cliente_id": "SINT-001", "documentos": ["cadastro"], "duplicado": false, "revisao_manual": false}`, quando avaliar, então retornar `"PENDENTE_DOCUMENTOS"`.
- C03: Dado `{"cliente_id": "SINT-001", "documentos": ["contrato"], "duplicado": false, "revisao_manual": false}`, quando avaliar, então retornar `"PENDENTE_DOCUMENTOS"`.
- C04: Dado `{"cliente_id": "SINT-001", "documentos": [], "duplicado": false, "revisao_manual": false}`, quando avaliar, então retornar `"PENDENTE_DOCUMENTOS"`.
- C08: Dado `{"cliente_id": "SINT-001", "documentos": [], "duplicado": false, "revisao_manual": true}`, quando avaliar, então retornar `"PENDENTE_DOCUMENTOS"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História A3

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra A3 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C05: Dado `{"cliente_id": "SINT-001", "documentos": ["cadastro", "contrato"], "duplicado": true, "revisao_manual": false}`, quando avaliar, então retornar `"REVISAR_DUPLICIDADE"`.
- C07: Dado `{"cliente_id": "SINT-001", "documentos": [], "duplicado": true, "revisao_manual": false}`, quando avaliar, então retornar `"REVISAR_DUPLICIDADE"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História A4

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra A4 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C06: Dado `{"cliente_id": "SINT-001", "documentos": ["cadastro", "contrato"], "duplicado": false, "revisao_manual": true}`, quando avaliar, então retornar `"REVISAO_HUMANA"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História A5

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra A5 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C09: Dado `{"cliente_id": " ", "documentos": ["cadastro", "contrato"], "duplicado": false, "revisao_manual": false}`, quando avaliar, então retornar `"ERRO"`.
- C10: Dado `{"cliente_id": "SINT-001", "documentos": ["cadastro", "contrato"], "duplicado": "false", "revisao_manual": false}`, quando avaliar, então retornar `"ERRO"`.
- C11: Dado `{"cliente_id": "SINT-001", "documentos": "cadastro", "duplicado": false, "revisao_manual": false}`, quando avaliar, então retornar `"ERRO"`.

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
