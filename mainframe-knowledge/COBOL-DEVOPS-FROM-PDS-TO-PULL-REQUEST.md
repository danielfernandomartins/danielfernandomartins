# COBOL DevOps — Do PDS ao Pull Request

## Como modernizar a entrega de software Mainframe sem perder controle operacional

> Material autoral de estudo técnico. O objetivo é demonstrar raciocínio sobre modernização do ciclo de desenvolvimento COBOL/Mainframe com Git, CI/CD, Zowe, automação de build, testes, promoção e rollback. Não representa experiência produtiva específica com ferramentas proprietárias em ambiente bancário.

---

## 1. O problema que este material resolve

Muitas organizações Mainframe ainda possuem fluxos de desenvolvimento baseados em combinações como:

```text
ISPF / PDS
        ↓
compilação manual
        ↓
teste em ambiente compartilhado
        ↓
promoção por ferramenta SCM tradicional
        ↓
change ticket
        ↓
deploy
```

Esse processo pode funcionar bem, mas cria desafios quando a empresa precisa integrar Mainframe a práticas modernas de engenharia:

- versionamento distribuído;
- code review;
- rastreabilidade por commit;
- pipelines reprodutíveis;
- testes automatizados;
- segregação de funções;
- segurança da cadeia de software;
- integração com times distribuídos e cloud.

A tese deste estudo é:

> **Mainframe DevOps não significa abandonar controles tradicionais; significa transformar controles manuais em controles versionados, automatizados, auditáveis e repetíveis.**

---

## 2. O que muda de verdade

O salto não é apenas trocar PDS por Git.

É mudar a unidade de trabalho.

Antes:

```text
membro alterado em biblioteca
```

Depois:

```text
issue → branch → commit → pull request → build → test → approval → deploy
```

Essa mudança cria um elo entre código, decisão, evidência e produção.

---

## 3. Arquitetura de referência

```text
Developer
   │
   ▼
VS Code / IDE / ISPF integrado
   │
   ▼
Git Repository
   │
   ├── Pull Request
   ├── Review
   ├── Static Analysis
   └── Policy Checks
   │
   ▼
CI Pipeline
   │
   ├── Dependency Resolution
   ├── COBOL Compile
   ├── Link-edit
   ├── Unit Tests
   ├── Integration Tests
   └── Artifact Generation
   │
   ▼
Artifact Repository / Controlled Promotion
   │
   ▼
CD Pipeline
   │
   ├── Test
   ├── Homologation
   └── Production
   │
   ▼
Observability + Audit + Rollback
```

---

## 4. Git no Mainframe: o que ele resolve

Git agrega:

- histórico distribuído;
- branching;
- pull requests;
- revisão de código;
- tags/releases;
- rastreabilidade entre mudança e commit;
- integração com pipelines.

Mas Git sozinho não resolve:

- dependências COBOL;
- copybooks;
- build no z/OS;
- link-edit;
- bind DB2;
- promoção de load modules;
- datasets;
- segurança RACF;
- change management;
- scheduling.

Logo, o modelo correto é:

```text
Git = source of truth do código
+
Mainframe toolchain = source of truth da execução
```

---

## 5. O desafio real: dependências

Um programa COBOL pode depender de:

```text
COPYBOOK
DCLGEN
DB2 PACKAGE
JCL
PROC
VSAM
CICS MAP
LOAD MODULE
subprogramas
parâmetros SYSIN
```

Um pipeline ingênuo que apenas executa:

```text
compile changed_file.cbl
```

pode ignorar impacto indireto.

Exemplo:

```text
COPYBOOK CLIENTE.cpy alterado
        ↓
PROGRAM-A usa CLIENTE.cpy
PROGRAM-B usa CLIENTE.cpy
PROGRAM-C chama PROGRAM-B
```

A mudança real pode atingir três componentes.

Por isso Mainframe DevOps precisa de **dependency-aware build**.

---

## 6. Dependency-Based Build

A ideia central é simples:

```text
mudança
  ↓
identificar dependências
  ↓
recompilar apenas o necessário
  ↓
executar testes afetados
```

Isso evita dois extremos:

1. recompilar tudo;
2. recompilar pouco demais.

O modelo de dependência pode considerar:

```text
COBOL → COPYBOOK
COBOL → DB2
COBOL → subprograma
JCL → programa
JCL → PROC
CICS → programa
```

---

## 7. Zowe como ponte

Zowe é relevante porque aproxima Mainframe de padrões modernos de desenvolvimento e automação.

Possíveis papéis:

- acesso a datasets;
- execução de jobs;
- integração com z/OSMF;
- automação por CLI;
- extensões para VS Code;
- integração com pipelines;
- padronização de APIs.

Arquitetura conceitual:

```text
GitLab / GitHub / Jenkins
          │
          ▼
       Zowe CLI
          │
          ▼
       z/OSMF
          │
          ▼
Datasets / Jobs / USS / Build
```

O objetivo não é transformar z/OS em Linux. É criar uma camada operacional que permita automação segura.

---

## 8. Pipeline de CI para COBOL

Um pipeline conceitual pode ter:

### Stage 1 — Checkout

```text
checkout source
```

### Stage 2 — Validate

- lint;
- naming conventions;
- secrets scanning;
- policy checks.

### Stage 3 — Dependency analysis

Determinar programas afetados.

### Stage 4 — Compile

Executar compilador COBOL no ambiente apropriado.

### Stage 5 — Link-edit

Gerar load modules quando necessário.

### Stage 6 — DB2 bind

Quando aplicável:

```text
precompile
compile
link
bind
```

### Stage 7 — Tests

- unitários;
- integração;
- regressão;
- characterization tests.

### Stage 8 — Package

Produzir artefato versionado.

---

## 9. Exemplo de pipeline declarativo

Pseudo-YAML:

```yaml
stages:
  - validate
  - impact-analysis
  - build
  - test
  - package
  - deploy-test

validate:
  script:
    - scan-source
    - check-policies

impact-analysis:
  script:
    - resolve-cobol-dependencies

build:
  script:
    - compile-affected-programs
    - link-edit
    - db2-bind-if-needed

test:
  script:
    - run-unit-tests
    - run-integration-tests

package:
  script:
    - version-artifacts

deploy-test:
  script:
    - promote-to-test
```

O YAML é ilustrativo. A execução real depende das ferramentas e políticas da organização.

---

## 10. PR como gate de governança

Em ambientes regulados, Pull Request não é apenas colaboração.

Pode ser um controle formal.

Um PR pode exigir:

- autor diferente do aprovador;
- análise estática;
- testes verdes;
- change ticket relacionado;
- evidência de impacto;
- aprovação de DBA;
- aprovação de segurança;
- aprovação de negócio.

Isso transforma segregação de funções em regra de plataforma.

---

## 11. Mainframe DevSecOps

DevOps em banco sem segurança é incompleto.

Gates importantes:

```text
secret scanning
SAST
dependency scanning
access control
artifact signing
approval policy
audit trail
least privilege
```

Pontos específicos Mainframe:

- RACF/ACF2/Top Secret;
- acesso a datasets;
- autorização de job submission;
- bibliotecas de load;
- ambientes CICS;
- DB2 authorities.

A automação nunca deve significar pipeline com credencial privilegiada irrestrita.

---

## 12. Build reproduzível

Pergunta crítica:

> Se eu pegar o mesmo commit amanhã, consigo reproduzir o mesmo build?

Para isso, versionar:

- source;
- copybooks;
- build scripts;
- parâmetros;
- compiler options;
- dependencies;
- bind options quando possível.

Evitar dependência invisível de configuração manual em uma biblioteca compartilhada.

---

## 13. Artifact management

Código-fonte e artefato executável são coisas diferentes.

Fluxo:

```text
commit SHA
   ↓
build ID
   ↓
load module / package
   ↓
deployment ID
```

Um incidente em produção deveria permitir responder:

```text
qual commit gerou este load?
qual pipeline compilou?
quais testes passaram?
quem aprovou?
quando foi promovido?
```

Isso é rastreabilidade ponta a ponta.

---

## 14. Testes automatizados em COBOL

Testes podem existir em diferentes níveis:

### Unit

Rotinas pequenas e regras isoladas.

### Integration

COBOL + DB2 / VSAM / chamadas.

### Batch characterization

```text
input conhecido
   ↓
job
   ↓
output esperado
```

### Regression

Comparar resultados entre versão antiga e nova.

### Contract

Validar interfaces com APIs ou sistemas distribuídos.

---

## 15. Characterization testing para legado

Antes de refatorar código antigo, pode ser mais seguro primeiro registrar comportamento.

Exemplo:

```text
entrada A → saída X
entrada B → saída Y
entrada C → rejeição Z
```

Esses testes não afirmam que a lógica é perfeita. Eles documentam o comportamento atual.

São fundamentais em modernização porque evitam alterar regra de negócio invisível.

---

## 16. Deploy progressivo

Mainframe não precisa adotar deploy irresponsável para ser moderno.

Estratégias:

```text
controlled promotion
pilot region
parallel validation
blue/green conceitual
canary quando arquitetura permitir
feature flags em camadas distribuídas
```

Em batch, pode existir:

```text
shadow processing
parallel run
reconciliation
```

---

## 17. Rollback

Rollback deve ter artefato identificado.

Modelo:

```text
release N
release N+1
```

Se N+1 falhar:

```text
restore N
```

Mas atenção: se houve alteração de dados, rollback de binário pode não ser suficiente.

Perguntas:

- schema DB2 mudou?
- arquivo mudou layout?
- mensagem mudou contrato?
- dados foram processados parcialmente?

---

## 18. DB2 em CI/CD

Mudanças DB2 exigem disciplina adicional.

Possíveis etapas:

```text
DDL review
compatibility check
package/bind validation
access path review
migration script
rollback strategy
```

Código pode estar correto e ainda criar regressão de performance por access path.

---

## 19. CICS em CI/CD

Mudanças CICS podem envolver:

- programa;
- transaction definition;
- resource definition;
- COMMAREA;
- channels/containers;
- DB2 package;
- API integration.

Pipeline deve distinguir deploy de código de ativação operacional.

---

## 20. JCL também é código

JCL deveria ter:

- versionamento;
- revisão;
- testes;
- histórico;
- diff;
- ownership.

Anti-pattern:

```text
alterar JCL direto em produção sem rastreabilidade
```

JCL influencia execução tanto quanto COBOL.

---

## 21. Infrastructure as Code no Mainframe

Nem tudo é facilmente declarativo, mas alguns elementos podem ser tratados como código:

```text
configuration
pipeline
automation scripts
Ansible playbooks
Zowe profiles/templates
resource definitions
```

O objetivo é reduzir conhecimento tribal.

---

## 22. Change Management integrado

Em bancos, DevOps não elimina change management.

Integra.

Exemplo:

```text
PR aprovado
  ↓
pipeline validado
  ↓
change criado/vinculado
  ↓
janela aprovada
  ↓
deploy
  ↓
evidência anexada
```

Isso reduz trabalho duplicado e aumenta auditoria.

---

## 23. Métricas úteis

DORA não precisa ser aplicada mecanicamente, mas algumas métricas ajudam:

- lead time;
- deployment frequency;
- change failure rate;
- MTTR;
- build failure rate;
- test coverage;
- rollback frequency;
- tempo de aprovação.

Para Mainframe, eu adicionaria:

- abends pós-change;
- jobs impactados;
- incidentes por release;
- reprocessamentos;
- divergências de conciliação.

---

## 24. PDS/SCM tradicional x Git

| Tradicional | Git-centric |
|---|---|
| membro | file |
| package/change | branch/PR |
| promotion | pipeline |
| compare | diff |
| history central | distributed history |
| manual gate | policy gate |

O objetivo não é dizer que um lado é “ruim”.

É entender como migrar sem perder controles maduros.

---

## 25. Migração para Git

Estratégia prudente:

### Fase 1

Mirror/read-only.

### Fase 2

Git para novos componentes.

### Fase 3

Git como source of truth em piloto.

### Fase 4

Automated build.

### Fase 5

Automated tests.

### Fase 6

Controlled deployment.

### Fase 7

Expandir por aplicação.

Evitar migração Big Bang.

---

## 26. O papel do Zowe CLI

Exemplo conceitual:

```text
zowe jobs submit
zowe jobs view
zowe files upload
zowe zos-files
```

Isso permite pipelines interagirem com z/OS sem depender de operação manual em ISPF.

Nunca significa ignorar autenticação, autorização ou auditabilidade.

---

## 27. CI/CD não é só ferramenta

Ferramentas possíveis:

```text
GitHub Actions
GitLab CI
Jenkins
Azure DevOps
DBB
Zowe
Ansible
UrbanCode
Wazi Deploy
```

Nenhuma ferramenta sozinha cria DevOps.

O valor está no fluxo:

```text
small change
fast feedback
reproducible build
safe promotion
traceability
```

---

## 28. Cenário bancário

### Situação

Alteração em copybook usado por processamento de pagamentos.

### Fluxo moderno

1. desenvolvedor cria branch;
2. altera copybook;
3. pipeline detecta dependências;
4. recompila programas impactados;
5. executa testes batch;
6. compara conciliação;
7. PR exige aprovação;
8. artefato é versionado;
9. deploy em homologação;
10. smoke tests;
11. janela de produção;
12. deploy controlado;
13. monitoramento de jobs;
14. rollback pronto.

### Risco evitado

Alterar copybook e esquecer consumidor indireto.

---

## 29. Incidente pós-deploy

Se ocorrer ABEND:

```text
release ID
  ↓
commit SHA
  ↓
PR
  ↓
build logs
  ↓
test evidence
```

A investigação ganha contexto imediatamente.

DevOps também melhora Production Support.

---

## 30. Perguntas de entrevista

### “Git substitui Endevor/Changeman?”

Não necessariamente. A arquitetura depende da organização. Git pode ser source control enquanto ferramentas tradicionais continuam em promoção/deploy durante transição.

### “Por que Dependency-Based Build importa?”

Porque COBOL possui dependências indiretas, especialmente copybooks e subprogramas. Build seletivo sem dependency graph pode produzir inconsistência.

### “Zowe substitui ISPF?”

Não é necessário pensar em substituição total. Zowe cria interfaces modernas e automação; ISPF continua valioso para muitas operações.

### “CI/CD não aumenta risco?”

Automação mal governada aumenta. Automação com gates, evidência e rollback reduz variabilidade manual.

### “Como fazer DevOps em ambiente regulado?”

Com segregação de funções, approvals, audit trail, least privilege e change management integrado.

---

## 31. O diferencial de carreira

Um profissional que entende apenas COBOL consegue manter código.

Um profissional que entende:

```text
COBOL
+
JCL
+
DB2
+
Git
+
CI/CD
+
Zowe
+
Production Support
```

consegue participar da modernização do **processo de engenharia** em torno do COBOL.

Esse é um diferencial importante porque muitas empresas não querem necessariamente retirar COBOL; querem entregar mudanças no Mainframe com mais velocidade e segurança.

---

## 32. Minha visão

> **Modernizar Mainframe não é apenas reescrever aplicações. Também é modernizar como essas aplicações são construídas, testadas, promovidas, auditadas e operadas.**

Esse princípio conecta legado, engenharia moderna e governança bancária.

---

## 33. Referências de mercado

Este estudo foi motivado por discussões recentes da comunidade Mainframe sobre:

- Zowe;
- Git no z/OS;
- Dependency Based Build;
- CI/CD;
- automação de deploy;
- integração entre Mainframe e práticas DevOps.

Referências úteis:

- Open Mainframe Project / Zowe — https://www.openmainframeproject.org/
- Zowe — https://www.zowe.org/
- IBM Z DevOps — https://www.ibm.com/products/devops-accelerate

---

## Conclusão

O futuro de COBOL não depende apenas da linguagem.

Depende da capacidade das organizações de integrar aplicações Mainframe a práticas modernas de engenharia sem perder os atributos que tornaram esses ambientes confiáveis: controle, disponibilidade, segurança e auditabilidade.

**Git, Zowe e CI/CD são relevantes porque permitem modernizar o caminho até produção — sem exigir que o core bancário seja reescrito apenas para parecer moderno.**
