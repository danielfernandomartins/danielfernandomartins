<div align="center">

# Daniel Fernando Martins

### COBOL / Mainframe Developer • Systems Analyst • Application Support • Banking Technology

**+20 anos no mercado financeiro + tecnologia aplicada a sistemas bancários críticos.**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Daniel%20Fernando%20Martins-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielfernandomartins)
[![Email](https://img.shields.io/badge/Email-Contato-0078D4?style=for-the-badge&logo=microsoftoutlook&logoColor=white)](mailto:dfernandom@outlook.com)
[![Open to Work](https://img.shields.io/badge/Open%20to-COBOL%20%2F%20Mainframe-2EA44F?style=for-the-badge)](https://github.com/danielfernandomartins)

</div>

---

## ⭐ Projeto em destaque — CNPJ Alfanumérico no Legado Bancário

### [CNPJ Alfanumérico no Legado Bancário — implantação em COBOL/Mainframe](mainframe-knowledge/CNPJ-ALFANUMERICO-LEGADO-BANCARIO.md)

> **Case autoral de transformação regulatória em sistemas bancários legados**, conectando COBOL, copybooks, DB2, VSAM, CICS, batch, JCL/SORT, APIs, KYC/AML, regulatórios, Data/BI, cutover, rollback e hypercare.

**Por que este case importa:** o CNPJ continua com 14 posições, mas passa a aceitar caracteres alfanuméricos nas 12 primeiras posições. Em bancos, isso pode afetar milhares de pontos do legado sem alterar necessariamente o tamanho físico do campo — criando risco de incompatibilidade semântica em sistemas que ainda tratam CNPJ como número.

**Tese central:** `CNPJ é identificador, não número.`

**Principais implicações exploradas:**

`PIC 9 → PIC X` · `COMP-3` · `COPYBOOK` · `DCLGEN` · `DB2` · `VSAM/KSDS` · `CICS/COMMAREA` · `Batch` · `JCL/SORT` · `KYC/AML` · `Regulatory Change` · `Cutover` · `Rollback` · `Hypercare` · `Reconciliation`

[📘 Abrir dossiê técnico](mainframe-knowledge/CNPJ-ALFANUMERICO-LEGADO-BANCARIO.md) · [🧪 Ver matriz de testes, cutover e hypercare](mainframe-knowledge/CNPJ-ALFANUMERICO-TEST-ROLL%20OUT.md)

---

## 🎯 Objetivo profissional

Busco minha **primeira oportunidade formal em Tecnologia** com foco principal em:

**COBOL Developer · Mainframe Developer · Analista Mainframe · Systems Analyst · Application Support / Production Support**

Tenho interesse especial em **bancos, instituições financeiras, meios de pagamento, seguradoras e consultorias de tecnologia com ambientes Mainframe**.

> **Não estou começando minha carreira do zero. Estou levando mais de duas décadas de experiência no mercado financeiro para dentro da tecnologia bancária.**

---

## ⚡ Recrutador: avalie meu perfil em 60 segundos

| Prioridade | Evidência | O que demonstra |
|---|---|---|
| **1 — Mudança Regulatória / Legado Bancário** | [🏦 CNPJ Alfanumérico no Legado Bancário](mainframe-knowledge/CNPJ-ALFANUMERICO-LEGADO-BANCARIO.md) | COBOL · DB2 · VSAM · CICS · batch · KYC/AML · cutover · hypercare |
| **2 — COBOL Batch Banking** | [🏦 Liquidação Bancária](cobol-portfolio/batch-liquidacao-bancaria/) | COBOL · JCL · DB2/SQL · batch · conciliação · incidentes |
| **3 — COBOL Online / CICS** | [💻 Conta Corrente CICS](cobol-portfolio/conta-corrente-online-cics/) | COBOL · CICS · COMMAREA · DB2 · SQLCODE · fluxo online |
| **4 — VSAM / Operação Mainframe** | [🗂️ VSAM + Restart](cobol-portfolio/vsam-restart-bancario/) | VSAM/KSDS · IDCAMS · DFSORT · checkpoint · restart/recovery |
| **5 — Production Support / ABENDs** | [🚨 Guia de ABENDs](mainframe-knowledge/ABENDS-PRODUCTION-GUIDE.md) | S0C7 · S0C4 · S806 · SB37 · S322 · SQLCODE -911/-913 · RCA |
| **6 — JCL Troubleshooting** | [🧩 Guia de JCL em Produção](mainframe-knowledge/JCL-PRODUCTION-TROUBLESHOOTING.md) | RCs · GDG · DISP · DCB · SPACE · PROC · SYSIN · restart/rerun |
| **7 — Conteúdo técnico** | [📚 Mainframe Knowledge Base](mainframe-knowledge/) | COBOL · JCL · DB2 · CICS · VSAM · batch · modernização |
| **8 — Modernização / Integração** | [💳 PayFlow API](https://github.com/danielfernandomartins/payflow-api) | Java · Spring Boot · REST · PostgreSQL · payments · testes |

➡️ [Guia de preparação técnica para entrevistas Mainframe](MAINFRAME-INTERVIEW-GUIDE.md)

---

## 🏦 COBOL / Mainframe Banking Portfolio

### [1. Batch de Liquidação Bancária — COBOL + JCL + DB2/SQL](cobol-portfolio/batch-liquidacao-bancaria/)
Case inspirado em processamento financeiro de grandes instituições. Faz leitura de transações, validação, rejeições, totalização e conciliação.

**Demonstra:** `COBOL` `JCL` `DB2/SQL` `Batch` `File Processing` `Reconciliation` `Incident Analysis`

### [2. Consulta de Conta Corrente — COBOL + CICS + DB2](cobol-portfolio/conta-corrente-online-cics/)
Case online para demonstrar fluxo transacional, COMMAREA, `EXEC CICS`, `EXEC SQL`, tratamento de `SQLCODE` e códigos de retorno.

**Demonstra:** `COBOL` `CICS` `COMMAREA` `DB2` `SQL` `Online Processing`

### [3. VSAM + Restart/Recovery Bancário](cobol-portfolio/vsam-restart-bancario/)
Case batch com arquivo mestre indexado, acesso por chave, `REWRITE`, conceitos VSAM/KSDS, IDCAMS, DFSORT, checkpoint, restart/recovery e reconciliação.

**Demonstra:** `COBOL` `VSAM` `KSDS` `IDCAMS` `DFSORT` `JCL` `Restart/Recovery` `Batch Operations`

> Os componentes JCL/CICS/DB2/VSAM são laboratórios técnicos orientados a mainframe. Não apresento experiência produtiva em z/OS, Control-M, TSO/ISPF ou ferramentas proprietárias que ainda não utilizei profissionalmente.

---

## 🚨 Destaque: ABENDs & Production Troubleshooting

[**Mainframe ABENDs — Production Troubleshooting Guide**](mainframe-knowledge/ABENDS-PRODUCTION-GUIDE.md)

Material específico de sustentação com diagnóstico de `S0C7`, `S0C4`, `S806`, `SB37/SD37/SE37`, `S322`, `SQLCODE -911/-913`, return codes, restart/rerun, prevenção de duplicidade e exemplo de RCA.

O foco não é decorar códigos: é demonstrar como eu estruturaria uma investigação de produção considerando **job/step, evidências, impacto, persistência parcial, recuperação segura, conciliação e causa-raiz**.

---

## 🧩 Destaque: JCL Production Troubleshooting

[**JCL Production Troubleshooting — Mainframe Operations Guide**](mainframe-knowledge/JCL-PRODUCTION-TROUBLESHOOTING.md)

Material voltado a leitura e investigação de fluxos batch em produção, cobrindo RCs, GDG, DISP, DCB, SPACE, PROC, SYSIN, DFSORT e restart/rerun.

A preocupação central é operacional: **entender estado parcial, dependências e efeitos persistidos antes de reexecutar um job**.

---

## 📚 Mainframe Knowledge Base

Além de código, mantenho materiais técnicos autorais para demonstrar raciocínio, documentação e preparação para sustentação e desenvolvimento Mainframe:

- [⭐ CNPJ Alfanumérico no Legado Bancário — case principal](mainframe-knowledge/CNPJ-ALFANUMERICO-LEGADO-BANCARIO.md)
- [🧪 CNPJ Alfanumérico — Testes, Cutover e Hypercare](mainframe-knowledge/CNPJ-ALFANUMERICO-TEST-ROLL%20OUT.md)
- [🚨 Mainframe ABENDs — Production Troubleshooting Guide](mainframe-knowledge/ABENDS-PRODUCTION-GUIDE.md)
- [🧩 JCL Production Troubleshooting](mainframe-knowledge/JCL-PRODUCTION-TROUBLESHOOTING.md)
- [COBOL + JCL + DB2 + CICS + VSAM — Cheat Sheet](mainframe-knowledge/COBOL-MAINFRAME-CHEATSHEET.md)
- [Runbook de Abend, Restart e Rerun](mainframe-knowledge/ABEND-RESTART-RUNBOOK.md)
- [Batch Banking — do arquivo à conciliação](mainframe-knowledge/BATCH-BANKING-FLOW.md)
- [Mainframe Modernization — legado + APIs](mainframe-knowledge/MAINFRAME-MODERNIZATION.md)
- [Perguntas técnicas de entrevista](mainframe-knowledge/INTERVIEW-QUESTIONS.md)

**Temas:** `CNPJ Alfanumérico` `Regulatory Change` `Legacy Modernization` `COBOL` `JCL` `DB2` `CICS` `VSAM` `KYC` `AML` `Cutover` `Hypercare` `ABEND` `Restart` `Rerun` `Production Support` `Banking`

---

## ✅ Código verificável

Este portfólio possui **GitHub Actions** para validar automaticamente os programas COBOL executáveis com **GnuCOBOL** e verificar código Python de apoio.

O objetivo é oferecer evidência técnica reproduzível, e não apenas documentação.

---

## 🧠 Por que meu background financeiro importa em Mainframe

Sistemas Mainframe em bancos sustentam processos nos quais contexto de negócio é crítico. Minha experiência anterior adiciona familiaridade real com operações financeiras, clientes, risco, controles, ambientes regulados, conciliação e análise de divergências.

Essa combinação me ajuda a entender **por que uma rotina existe**, e não apenas como codificá-la.

---

## 🔄 Modernização como diferencial

Vagas Mainframe atuais também valorizam integração entre legado e plataformas distribuídas. Por isso mantenho conhecimento complementar em **Java / Spring Boot, REST APIs, PostgreSQL / SQL, Docker, Git e GitHub Actions**.

### [PayFlow API](https://github.com/danielfernandomartins/payflow-api)
Case de pagamentos com Java/Spring Boot, persistência, concorrência, tratamento de falhas e integração externa — útil para discutir coexistência entre sistemas legados e arquitetura distribuída.

---

## 🛠️ Stack principal

**Mainframe / Banking:** COBOL · JCL · DB2/SQL · CICS concepts · COMMAREA · VSAM concepts · KSDS · IDCAMS · DFSORT · Batch · Restart/Recovery  
**Modernização:** Java · Spring Boot · REST APIs · PostgreSQL · Docker  
**Engenharia:** Git · GitHub · GitHub Actions · testes · documentação técnica · análise de incidentes

### Conhecimentos complementares
Python · Pandas · Data Analysis · Playwright · Postman · API Testing

---

## 🔍 Palavras-chave para recrutamento

`COBOL Developer` · `Mainframe Developer` · `Mainframe Analyst` · `COBOL` · `JCL` · `DB2` · `CICS` · `VSAM` · `CNPJ Alfanumérico` · `Legacy Modernization` · `Regulatory Change` · `KYC` · `AML` · `Cutover` · `Hypercare` · `ABEND` · `Batch Processing` · `Restart Recovery` · `Application Support` · `Production Support` · `Root Cause Analysis` · `Banking Systems` · `Financial Services` · `Payments` · `Java` · `REST API`

---

## 📚 Formação

**Análise e Desenvolvimento de Sistemas — Universidade São Judas Tadeu**

A formação técnica complementa mais de duas décadas de experiência profissional em mercado financeiro, clientes, risco, operações e negócios.

---

## 🤝 Open to Work — Mainframe

Procuro oportunidades para atuar e evoluir como:

**COBOL Developer · Mainframe Developer · Analista Mainframe · Systems Analyst · Application Support / Production Support**

Especial interesse em empresas com **sistemas bancários críticos, legado em modernização, processamento batch/online e integração Mainframe ↔ plataformas distribuídas**.

<div align="center">

### Vamos conversar sobre COBOL, Mainframe e tecnologia bancária?

[LinkedIn](https://www.linkedin.com/in/danielfernandomartins) • [E-mail](mailto:dfernandom@outlook.com) • [GitHub](https://github.com/danielfernandomartins)

</div>
