# Backlog para uso em Jira

Estrutura de trabalho proposta. Não foi criado projeto no Jira e não comprova uso profissional da ferramenta. Status inicial de todas as histórias: A fazer. Critérios automatizados foram executados no protótipo; homologação de negócio está pendente.

Épico: 04-alcadas-estornos
## História E1

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra E1 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C01: Dado `{"valor": "100", "orcamento": "10000", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"GESTOR"`.
- C02: Dado `{"valor": "5000", "orcamento": "10000", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"GESTOR"`.
- C03: Dado `{"valor": "5000.01", "orcamento": "10000", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"DIRETORIA"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História E2

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra E2 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C04: Dado `{"valor": "100", "orcamento": "10000", "solicitante": "u1", "aprovador": " U1 ", "documentos": true}`, quando avaliar, então retornar `"BLOQUEADO_SEGREGACAO"`.
- C11: Dado `{"valor": "100", "orcamento": "10000", "solicitante": "u1", "aprovador": "u1", "documentos": false}`, quando avaliar, então retornar `"BLOQUEADO_SEGREGACAO"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História E3

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra E3 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C05: Dado `{"valor": "100", "orcamento": "10000", "solicitante": "u1", "aprovador": "u2", "documentos": false}`, quando avaliar, então retornar `"PENDENTE_DOCUMENTOS"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História E4

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra E4 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C06: Dado `{"valor": "101", "orcamento": "100", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"REVISAO_ORCAMENTO"`.
- C07: Dado `{"valor": "100", "orcamento": "100", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"GESTOR"`.

**Definition of Ready:** regra revisada, entrada definida e exemplos discutidos.

**Definition of Done proposta:** implementação revisada, testes aprovados, rastreabilidade atualizada e aceite do responsável registrado. Aceite ainda pendente.
## História E5

**Tipo:** Story · **Prioridade:** Must · **Responsável:** a definir · **Estimativa:** a refinar

Como responsável pela operação, quero aplicar a regra E5 documentada na especificação para conferir o resultado e tratar exceções.

**Dependência:** validação da política com responsável de negócio.

**Critérios de aceite:**
- C08: Dado `{"valor": "0", "orcamento": "10000", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"ERRO"`.
- C09: Dado `{"valor": "NaN", "orcamento": "10000", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"ERRO"`.
- C10: Dado `{"valor": "1.001", "orcamento": "10000", "solicitante": "u1", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"ERRO"`.
- C12: Dado `{"valor": "100", "orcamento": "10000", "solicitante": "", "aprovador": "u2", "documentos": true}`, quando avaliar, então retornar `"ERRO"`.

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
