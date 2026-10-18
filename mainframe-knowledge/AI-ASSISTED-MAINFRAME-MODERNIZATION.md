# AI-Assisted Mainframe Modernization

## Discovery First, Human Governed

> Estudo técnico autoral sobre o uso responsável de IA em modernização COBOL/Mainframe. O foco é demonstrar como IA pode acelerar entendimento, documentação, classificação de risco e geração de testes sem confundir descoberta com migração automática. Não representa experiência produtiva específica em ferramentas proprietárias.

---

## 1. A pergunta errada: “IA vai substituir COBOL?”

Em 2026, esse debate continua forte entre arquitetos, líderes Mainframe e fornecedores. A discussão mais útil, porém, não é se IA “substitui COBOL”, mas:

> **Em quais etapas da modernização a IA gera valor confiável sem comprometer semântica, auditabilidade e segurança operacional?**

Mainframes sustentam core banking, pagamentos, seguros, folha, benefícios e outros processos críticos. Nesses ambientes, uma transformação tecnicamente elegante que altera silenciosamente uma regra de negócio é uma falha grave.

Por isso, este estudo adota uma premissa:

```text
DISCOVERY ≠ MIGRATION
```

IA pode ajudar muito a entender o legado. Isso não significa que ela deva decidir sozinha como substituí-lo.

---

## 2. Onde IA pode gerar valor real

### 2.1 Entendimento de código

IA pode ajudar a explicar:

- programas COBOL;
- copybooks;
- JCLs;
- SQL embedded;
- transações CICS;
- fluxos batch;
- regras de validação;
- dependências aparentes.

### 2.2 Documentação

Pode gerar rascunhos de:

- documentação funcional;
- mapas de fluxo;
- glossário de regras;
- descrição de programas;
- runbooks;
- casos de teste.

### 2.3 Business Rule Discovery

A IA pode ajudar a identificar regras como:

```cobol
IF SALDO-DISPONIVEL < VALOR-TRANSACAO
   MOVE '51' TO COD-RETORNO
END-IF
```

Regra sugerida:

```text
Uma transação deve ser rejeitada quando o saldo disponível for inferior ao valor solicitado.
```

Mas essa regra precisa ser validada por código, testes e conhecimento de domínio.

### 2.4 Testes de caracterização

Antes de alterar legado, é possível gerar cenários que capturem comportamento atual.

Objetivo:

```text
CURRENT BEHAVIOR → TEST → CHANGE → COMPARE
```

Isso reduz risco de “modernizar” uma regra sem perceber que o comportamento mudou.

### 2.5 Classificação de risco

IA pode apoiar triagem de componentes por:

- criticidade;
- número de dependências;
- volume;
- complexidade ciclomática;
- acesso DB2;
- chamadas CICS;
- participação em batch crítico;
- histórico de incidentes.

---

## 3. Onde IA não deveria decidir sozinha

Em sistemas bancários, eu não delegaria autonomamente à IA:

- alteração de regra financeira;
- mudança de cálculo regulatório;
- definição de cutover;
- decisão de rollback;
- substituição de algoritmo de juros;
- decisão sobre idempotência;
- mudança de tratamento de duplicidade;
- interpretação final de requisito legal;
- alteração de contratos de dados sem análise de impacto;
- autorização de deploy produtivo.

A IA pode sugerir. O pipeline deve exigir evidência e aprovação humana.

---

## 4. O verdadeiro primeiro passo: Application Discovery

Antes de traduzir qualquer linha, é necessário responder:

```text
O que existe?
Quem chama quem?
Quem lê qual arquivo?
Quem atualiza qual tabela?
Qual rotina depende de qual copybook?
Qual job executa em qual ordem?
Qual regra está duplicada?
Qual componente é crítico?
```

Sem essas respostas, modernização vira navegação no escuro.

---

## 5. Construindo um grafo de dependências

Imagine um domínio de pagamentos:

```text
JCL PAYB001
   │
   ▼
COBOL PAYVAL01
   ├── COPY PAYREC
   ├── DB2 TB_TRANSACAO
   └── CALL PAYFRAUD
                 │
                 ▼
             PAYFRAUD
                 │
                 └── VSAM FRAUD.KSDS
```

Isso pode ser representado como grafo:

```text
NODE: JOB/PAYB001
EDGE: EXECUTES
NODE: PROGRAM/PAYVAL01
EDGE: USES_COPYBOOK
NODE: COPY/PAYREC
EDGE: READS_WRITES
NODE: DB2/TB_TRANSACAO
```

Com esse grafo, perguntas úteis se tornam possíveis:

- se `PAYREC` mudar, quais programas são afetados?
- se `TB_TRANSACAO` mudar, quais jobs precisam de regressão?
- quais componentes concentram maior dependência?
- quais programas são bons candidatos a isolamento?

---

## 6. Discovery pipeline proposto

```text
SOURCE INVENTORY
      ↓
PARSING / STATIC ANALYSIS
      ↓
DEPENDENCY EXTRACTION
      ↓
BUSINESS RULE CANDIDATES
      ↓
AI SUMMARIZATION
      ↓
HUMAN REVIEW
      ↓
KNOWLEDGE GRAPH
      ↓
RISK CLASSIFICATION
      ↓
MODERNIZATION OPTIONS
```

A IA entra no meio do processo, não no lugar de toda a engenharia.

---

## 7. Inventário mínimo

Uma análise Mainframe deveria considerar:

```text
COBOL
COPYBOOKS
JCL
PROC
DB2 SQL
DCLGEN
CICS
VSAM
IMS
MQ
SORT/DFSORT
IDCAMS
REXX
Assembler quando aplicável
APIs/serviços
arquivos sequenciais
GDGs
scheduler dependencies
```

Apenas analisar `.cbl` ignora boa parte do sistema real.

---

## 8. Business Rule Extraction

Uma das maiores oportunidades de IA é transformar conhecimento implícito em artefato revisável.

Exemplo COBOL:

```cobol
IF TIPO-CLIENTE = 'P'
   AND VALOR-PAGTO > LIMITE-PJ
      MOVE 'R' TO STATUS-PAGTO
      MOVE 'LIMITE EXCEDIDO' TO MSG-ERRO
END-IF
```

A IA pode propor:

```text
BR-017 — Limite de pagamento PJ
Clientes PJ devem ter pagamentos acima do limite configurado rejeitados.
```

Mas o reviewer precisa validar:

- o que significa `P`?
- `LIMITE-PJ` vem de onde?
- existem exceções?
- existe outra regra conflitante?
- o status `R` é realmente “rejeitado”?

Sem contexto, explicação plausível não é prova.

---

## 9. Regra de ouro: traceability

Toda conclusão gerada por IA deveria apontar para evidência.

Formato ideal:

```text
Regra: Pagamento PJ acima do limite é rejeitado.
Fonte: PAYVAL01.cbl
Parágrafo: 3200-VALIDA-LIMITE
Linhas: 210-228
Dependências: COPY LIMPARM / DB2 TB_LIMITES
Confiança: média
Reviewer: pendente
```

Sem rastreabilidade, documentação gerada por IA pode se tornar apenas outro legado difícil de confiar.

---

## 10. Confidence não é approval

Uma classificação possível:

```text
HIGH CONFIDENCE
MEDIUM CONFIDENCE
LOW CONFIDENCE
```

Mas:

```text
HIGH CONFIDENCE ≠ APPROVED
```

A aprovação pertence ao processo de governança.

---

## 11. Characterization Tests antes de refatorar

Para um programa de cálculo:

```text
INPUT A → OUTPUT X
INPUT B → OUTPUT Y
INPUT C → ABEND/RETORNO Z
```

Registrar comportamento atual é essencial.

Esses testes servem para comparar:

```text
LEGACY IMPLEMENTATION
         vs
REFACTORED IMPLEMENTATION
```

O objetivo não é assumir que o legado está “correto”, mas detectar mudança de comportamento intencional ou acidental.

---

## 12. Semantic Equivalence

Traduzir sintaxe não garante equivalência semântica.

Exemplo:

COBOL pode trabalhar com:

- packed decimal;
- truncation rules;
- fixed-point arithmetic;
- EBCDIC ordering;
- file status;
- implicit spaces;
- signed fields;
- COMP/COMP-3.

Java ou outra plataforma pode ter comportamento diferente.

Portanto:

```text
COMPILES ≠ EQUIVALENT
```

A validação precisa comparar resultados funcionais e efeitos colaterais.

---

## 13. Exemplo financeiro: juros

COBOL:

```cobol
COMPUTE JUROS = SALDO * TAXA / 100
```

Uma tradução ingênua pode usar tipo numérico inadequado e introduzir diferenças de arredondamento.

Em banco, centavos divergentes multiplicados por milhões de operações viram impacto financeiro e de reconciliação.

Por isso, modernização exige:

```text
golden dataset
precision rules
rounding rules
reconciliation threshold
```

---

## 14. AI-generated tests: úteis, mas insuficientes

IA pode gerar bons cenários básicos:

```text
happy path
boundary
null/blank
invalid status
limit exceeded
```

Mas especialistas precisam incluir:

- regras históricas;
- exceções comerciais;
- datas de corte;
- comportamento de feriado;
- retroatividade;
- arredondamento;
- restart;
- duplicidade;
- reconciliação.

Os bugs mais caros costumam viver nos casos que não parecem óbvios para quem só lê o código localmente.

---

## 15. Human-in-the-loop gates

Pipeline sugerido:

```text
AI DISCOVERY
    ↓
TECH REVIEW
    ↓
BUSINESS REVIEW
    ↓
TEST EVIDENCE
    ↓
ARCHITECTURE REVIEW
    ↓
SECURITY / COMPLIANCE
    ↓
CHANGE APPROVAL
    ↓
DEPLOY
```

IA acelera análise. Ela não elimina accountability.

---

## 16. Modernization options

Depois do discovery, nem tudo precisa virar Java.

Cada componente pode receber uma estratégia:

### RETAIN

Manter como está.

### OPTIMIZE

Melhorar COBOL/JCL/SQL sem mover de plataforma.

### EXPOSE

Expor funcionalidade via API.

### REFACTOR

Reestruturar internamente.

### REPLATFORM

Mover runtime mantendo grande parte da lógica.

### REWRITE

Reescrever quando benefício superar risco.

### RETIRE

Eliminar componente sem valor.

Modernização boa é seletiva.

---

## 17. Decision matrix

| Critério | Retain | Refactor | Expose API | Rewrite |
|---|---:|---:|---:|---:|
| Alta criticidade | forte | possível | forte | cautela |
| Código estável | forte | possível | forte | fraco |
| Muitas dependências | forte | cautela | possível | alto risco |
| Regra bem conhecida | possível | forte | forte | possível |
| Sem documentação | discovery primeiro | discovery primeiro | discovery primeiro | discovery obrigatório |
| Custo operacional alto | avaliar | forte | possível | avaliar |

---

## 18. AI para documentação de legado

Artefatos úteis:

```text
PROGRAM SUMMARY
INPUT/OUTPUT MAP
DEPENDENCY MAP
BUSINESS RULE CATALOG
DB2 ACCESS MAP
FILE ACCESS MAP
CICS TRANSACTION MAP
BATCH FLOW
ABEND/RUNBOOK LINKS
```

Isso reduz dependência de conhecimento tribal.

---

## 19. Conhecimento tribal é risco operacional

Muitos sistemas antigos dependem de frases como:

```text
"não mexa nesse step"
"esse arquivo sempre precisa chegar antes"
"se der RC 8 roda de novo"
"esse campo tem uma exceção antiga"
```

O problema não é apenas aposentadoria de especialistas. É conhecimento crítico não formalizado.

IA pode ajudar a organizar esse conhecimento, desde que ele seja revisado e versionado.

---

## 20. Operational intelligence

Outra oportunidade é correlacionar:

```text
JES logs
ABEND history
SMF data
job duration
DB2 SQL performance
CICS response time
change history
incident tickets
```

Objetivo:

> transformar sinais técnicos dispersos em contexto para investigação.

Isso pode ser mais valioso no curto prazo do que reescrever milhões de linhas de COBOL.

---

## 21. AI-assisted incident analysis

Cenário:

```text
JOB PAYB002 abende S0C7
```

Assistente poderia reunir:

```text
programa afetado
última mudança
copybook alterado
campo provável
dump offset
jobs dependentes
incidentes semelhantes
runbook associado
```

Mas a decisão de restart/rerun continua exigindo análise de estado e efeito financeiro.

---

## 22. Prompt injection e segurança

Uso corporativo de LLMs adiciona riscos novos.

Código-fonte pode conter comentários, dados e strings que não devem ser tratados como instruções confiáveis.

Governança deveria separar:

```text
SOURCE DATA
SYSTEM INSTRUCTIONS
USER REQUEST
GENERATED OUTPUT
```

Além disso:

- código sensível não deve sair do ambiente autorizado;
- dados produtivos precisam de controles;
- logs do modelo devem seguir política de retenção;
- acessos devem respeitar least privilege.

---

## 23. Hallucination risk

Uma IA pode inventar uma explicação extremamente convincente.

Por isso, toda afirmação importante deve responder:

```text
WHERE IS THE EVIDENCE?
```

Se não existe referência para código, schema, documentação ou teste, a saída deve ser tratada como hipótese.

---

## 24. Governance model

Artefato proposto:

```text
AI MODERNIZATION DECISION RECORD
```

Campos:

```text
component
business owner
technical owner
AI recommendation
source evidence
risk level
human decision
reason
required tests
rollback path
approval date
```

Isso cria trilha auditável.

---

## 25. Explainability para auditoria

Em instituições financeiras, não basta dizer:

```text
"a IA recomendou"
```

É necessário explicar:

- qual evidência foi usada;
- qual transformação foi proposta;
- quem revisou;
- quais testes provaram equivalência;
- qual risco residual foi aceito.

---

## 26. Modernização e segregação de funções

O mesmo agente não deveria necessariamente:

```text
gerar código
aprovar código
gerar teste
julgar o próprio teste
aprovar deploy
```

Separar funções reduz viés de confirmação.

---

## 27. Banking modernization example

Domínio: liquidação de pagamentos.

### Discovery

IA identifica:

```text
23 programas COBOL
8 copybooks
14 tabelas DB2
6 jobs JCL
2 arquivos VSAM
3 interfaces externas
```

### Knowledge graph

Revela que `PAYCPY01` é compartilhado por 17 programas.

### Risk

Alterar esse copybook vira mudança de alto impacto.

### Decision

Em vez de rewrite imediato:

```text
retain core calculation
expose via service boundary
modernize orchestration
add characterization tests
```

Essa pode ser uma decisão mais segura e economicamente eficiente.

---

## 28. Strangler pattern no Mainframe

Modernização gradual pode seguir:

```text
CHANNEL
   ↓
API LAYER
   ↓
ROUTING
 ┌─────┴─────┐
 ▼           ▼
LEGACY     NEW SERVICE
COBOL
```

Novas capacidades podem nascer fora do core enquanto regras críticas permanecem no Mainframe até existir evidência suficiente para movê-las.

---

## 29. Anti-pattern: Big Bang AI Rewrite

```text
COBOL ESTATE
     ↓
LLM TRANSLATION
     ↓
DEPLOY NEW PLATFORM
```

Problemas:

- dependências ocultas;
- regra implícita;
- semantic drift;
- falhas de performance;
- interfaces esquecidas;
- comportamento batch não reproduzido;
- dificuldade de rollback;
- regressão impossível de explicar.

---

## 30. Anti-pattern: documentação sem evidência

Gerar 500 páginas automaticamente pode criar falsa confiança.

Melhor:

```text
DOCUMENT LESS
TRACE MORE
```

Documentação valiosa aponta para componentes e regras concretas.

---

## 31. Metrics de modernization readiness

Um score de prontidão pode considerar:

```text
% programas inventariados
% dependências mapeadas
% regras com evidência
% componentes com owner
% cobertura de characterization tests
% interfaces conhecidas
% dados sensíveis classificados
% rollback documentado
```

Antes de discutir “quantas linhas a IA traduziu”, eu mediria quanto do sistema passou a ser realmente compreendido.

---

## 32. Métricas de IA que importam

Evitaria métricas puramente de produtividade como:

```text
LOC generated
prompts executed
summaries created
```

Preferiria:

```text
lead time de análise reduzido
dependências descobertas
regras confirmadas
incidentes evitados
cobertura de testes aumentada
tempo de onboarding reduzido
change failure rate
rollback success
```

---

## 33. Modernization readiness gates

### Gate A — Inventory complete

Nenhuma transformação antes de inventário mínimo.

### Gate B — Dependency understood

Componentes críticos precisam de mapa de impacto.

### Gate C — Behavior captured

Regras e testes de caracterização suficientes.

### Gate D — Target justified

Arquitetura-alvo precisa resolver problema real.

### Gate E — Equivalence proven

Comparação funcional antes de cutover.

### Gate F — Recovery proven

Rollback/roll-forward ensaiados.

---

## 34. Cenário de entrevista

### Pergunta

“Você usaria IA para converter um core COBOL para Java?”

### Minha abordagem

Não começaria pela conversão.

Primeiro faria discovery do portfólio, dependências, dados, regras e fluxos operacionais. Usaria IA para acelerar entendimento e documentação, mas exigiria rastreabilidade para toda regra importante. Depois criaria characterization tests e classificaria os componentes entre retain, optimize, expose, refactor, replatform, rewrite ou retire.

Se Java fosse a decisão arquitetural adequada, a conversão poderia usar IA como acelerador, mas seria validada por equivalência funcional, performance, segurança, observabilidade e rollback.

---

## 35. O papel do desenvolvedor COBOL nesse futuro

IA não reduz a importância de entender Mainframe. Ela aumenta o valor de quem consegue validar suas respostas.

Conhecimentos continuam centrais:

```text
COBOL
JCL
DB2
CICS
VSAM
batch/restart
business rules
production behavior
banking domain
```

Quem entende o legado consegue usar IA como ferramenta. Quem não entende pode apenas aceitar uma resposta plausível.

---

## 36. Minha tese

> **O maior valor da IA no Mainframe não é apagar o legado rapidamente. É tornar o legado compreensível o suficiente para que decisões de modernização deixem de ser apostas.**

---

## 37. Fontes e contexto de mercado

Este estudo foi inspirado por discussões atuais da comunidade e documentação técnica de 2026, incluindo:

- Open Mainframe Project — “Discovery Is Not Migration: Where AI Actually Stands for Mainframe Modernization”;
- IBM watsonx Code Assistant for Z — application discovery, refactoring, geração de serviços e testes de equivalência;
- IBM — recursos agentic para modernização Mainframe;
- IBM Research — uso combinado de LLMs e análise de programas em tradução COBOL→Java;
- Planet Mainframe — discussões sobre AI, technical debt, discovery e operational intelligence.

O objetivo não é defender um fornecedor ou estratégia única, mas demonstrar uma abordagem prudente, verificável e orientada a risco.

---

## Conclusão

Modernização Mainframe com IA não deveria começar com “qual linguagem vai substituir COBOL?”.

Deveria começar com:

```text
O QUE ESTE SISTEMA REALMENTE FAZ?
```

Quando código, dependências, regras, dados e comportamento operacional são compreendidos, a organização pode escolher modernizar com muito mais segurança.

A IA pode acelerar esse entendimento. A responsabilidade pela decisão continua humana.
