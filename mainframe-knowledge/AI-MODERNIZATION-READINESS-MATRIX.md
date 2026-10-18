# AI Mainframe Modernization — Readiness & Governance Matrix

## Decision framework para COBOL/Mainframe

Este artefato acompanha o estudo [AI-Assisted Mainframe Modernization](AI-ASSISTED-MAINFRAME-MODERNIZATION.md) e transforma princípios em um processo de decisão auditável.

---

## 1. Objetivo

Evitar que “modernização com IA” vire uma decisão baseada apenas em facilidade de geração de código.

O framework mede se um componente está pronto para mudança e qual estratégia parece mais adequada.

---

## 2. Readiness score

Pontuar cada dimensão de 0 a 3:

```text
0 = desconhecido / inexistente
1 = parcial
2 = adequado
3 = forte / comprovado
```

| Dimensão | Pergunta | Score |
|---|---|---:|
| Inventário | programas, jobs, tabelas e arquivos estão mapeados? | 0–3 |
| Dependências | chamadores/consumidores estão conhecidos? | 0–3 |
| Regras | regras críticas possuem evidência rastreável? | 0–3 |
| Testes | comportamento atual está protegido por testes? | 0–3 |
| Dados | schemas, formatos e sensibilidade estão conhecidos? | 0–3 |
| Operação | batch windows, restart e runbooks são entendidos? | 0–3 |
| Performance | baseline de CPU/I/O/latência existe? | 0–3 |
| Segurança | riscos e acessos foram avaliados? | 0–3 |
| Compliance | impacto regulatório foi classificado? | 0–3 |
| Recovery | rollback/roll-forward foi desenhado? | 0–3 |

Máximo: **30 pontos**.

### Interpretação

```text
0–10  → NÃO PRONTO: discovery obrigatório
11–18 → PARCIAL: modernização apenas em baixo risco
19–24 → PRONTO COM GATES: mudanças controladas
25–30 → ALTA PRONTIDÃO: candidato forte para transformação
```

---

## 3. Estratégias possíveis

### RETAIN

Manter o componente como está.

Indicado quando:

- estabilidade é alta;
- custo é aceitável;
- risco de mudança supera benefício.

### OPTIMIZE

Melhorar COBOL/JCL/SQL sem retirar da plataforma.

Indicado quando:

- core está correto;
- gargalo é performance/manutenibilidade;
- plataforma continua adequada.

### EXPOSE

Preservar lógica e expor serviço por API/evento.

Indicado quando:

- regra é madura;
- consumidores modernos precisam de acesso;
- rewrite não se justifica.

### REFACTOR

Reestruturar componentes preservando plataforma.

Indicado quando:

- monólito dificulta manutenção;
- dependências estão bem compreendidas.

### REPLATFORM

Mover execução sem reescrever todo o domínio.

Indicado quando:

- motivação é operacional/plataforma;
- semântica pode ser preservada.

### REWRITE

Reconstruir funcionalidade.

Indicado apenas quando:

- comportamento está bem documentado;
- testes são robustos;
- benefícios justificam risco.

### RETIRE

Eliminar componente sem valor ou duplicado.

---

## 4. Decision matrix

| Condição | Retain | Optimize | Expose | Refactor | Rewrite |
|---|---:|---:|---:|---:|---:|
| Criticidade alta | forte | forte | forte | possível | cautela |
| Dependências desconhecidas | forte | cautela | fraco | fraco | não |
| Testes fracos | forte | possível | possível | cautela | não |
| Regra estável | forte | forte | forte | forte | possível |
| Technical debt alto | possível | forte | possível | forte | possível |
| Plataforma atende SLA | forte | forte | forte | possível | fraco |
| Alto custo operacional | possível | forte | possível | possível | avaliar |
| Domínio obsoleto | fraco | fraco | fraco | fraco | retire/rewrite |

---

## 5. AI Modernization Decision Record

Template sugerido:

```text
ID: AMD-2026-001
COMPONENT: PAYVAL01
BUSINESS DOMAIN: Payments
BUSINESS OWNER: <owner>
TECH OWNER: <owner>

CURRENT PLATFORM:
COBOL / CICS / DB2

AI FINDINGS:
- 12 dependências diretas
- 3 copybooks compartilhados
- 4 regras de negócio candidatas
- criticidade estimada: alta

SOURCE EVIDENCE:
- PAYVAL01.cbl / 3100-VALIDATE
- PAYREC.cpy
- JCL PAYB001
- DB2 TB_TRANSACAO

CONFIDENCE:
Medium

HUMAN REVIEW:
Approved / Rejected / Needs investigation

READINESS SCORE:
22/30

OPTIONS CONSIDERED:
Retain / Optimize / Expose / Refactor / Rewrite

DECISION:
Expose via service boundary + retain core calculation

WHY:
Core estável, regras críticas e alta dependência tornam rewrite desnecessariamente arriscado.

REQUIRED TESTS:
- characterization
- equivalence
- performance
- restart/recovery

ROLLBACK:
Route traffic back to legacy path

APPROVALS:
Architecture / Business / Security / Operations
```

---

## 6. Evidence ladder

Toda conclusão de IA deve subir esta escada:

```text
L0 — AI GUESS
L1 — CODE REFERENCE
L2 — MULTIPLE SOURCE CORRELATION
L3 — TEST CONFIRMATION
L4 — SME CONFIRMATION
L5 — PRODUCTION EVIDENCE
```

Somente itens L3+ deveriam sustentar decisões significativas de modernização.

---

## 7. Risk classes

### R1 — Low

- relatório;
- utilitário isolado;
- sem atualização financeira.

### R2 — Medium

- batch não crítico;
- integrações limitadas.

### R3 — High

- customer/account/payment workflow;
- DB2 updates;
- múltiplos consumidores.

### R4 — Critical

- liquidação;
- ledger;
- cálculo financeiro;
- regulatório;
- autorização transacional.

Quanto maior o risco, maior a exigência de evidência humana e testes.

---

## 8. Human gates por risco

| Gate | R1 | R2 | R3 | R4 |
|---|---:|---:|---:|---:|
| Technical review | ✓ | ✓ | ✓ | ✓ |
| Business review | opcional | ✓ | ✓ | ✓ |
| Architecture | opcional | ✓ | ✓ | ✓ |
| Security | conforme dado | ✓ | ✓ | ✓ |
| Compliance | se aplicável | se aplicável | ✓ | ✓ |
| Production rehearsal | opcional | ✓ | ✓ | ✓ |
| Executive/change approval | não | opcional | ✓ | ✓ |

---

## 9. Semantic equivalence checklist

Antes de substituir lógica COBOL:

```text
[ ] valores monetários idênticos
[ ] arredondamento idêntico
[ ] signed fields preservados
[ ] COMP-3 tratado corretamente
[ ] datas e calendário equivalentes
[ ] EBCDIC/ASCII diferenças analisadas
[ ] SQL side effects equivalentes
[ ] file status equivalentes
[ ] return codes equivalentes
[ ] restart behavior equivalente
[ ] duplicidade controlada
[ ] performance dentro do SLA
```

---

## 10. AI output review checklist

```text
[ ] toda regra possui fonte
[ ] dependências foram confirmadas
[ ] nenhuma decisão é baseada só em resumo de LLM
[ ] dados sensíveis permanecem em ambiente autorizado
[ ] prompt/output é versionado quando relevante
[ ] reviewer humano está identificado
[ ] risco residual foi registrado
```

---

## 11. KPI de sucesso

Evitar medir apenas linhas geradas.

Melhores indicadores:

```text
% estate inventoried
% dependencies mapped
% business rules confirmed
% characterization coverage
incident rate after change
change failure rate
mean time to understand component
onboarding time
rollback success rate
reconciliation variance
```

---

## 12. Critério Go / No-Go

### GO

Somente quando:

```text
readiness adequado
critical dependencies known
characterization tests green
semantic equivalence validated
performance accepted
security/compliance approved
rollback rehearsed
operations ready
```

### NO-GO

Se qualquer item crítico continuar desconhecido.

---

## 13. Tese do framework

> **IA pode acelerar a descoberta. A decisão de modernização precisa continuar baseada em evidência, risco e responsabilidade humana.**
