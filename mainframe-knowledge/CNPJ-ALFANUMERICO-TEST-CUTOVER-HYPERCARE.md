# CNPJ Alfanumérico — Matriz de Testes, Cutover e Hypercare Bancário

Complemento ao dossiê [CNPJ Alfanumérico no Legado Bancário](CNPJ-ALFANUMERICO-LEGADO-BANCARIO.md).

> Material autoral de laboratório técnico. O objetivo é demonstrar como eu estruturaria testes, implantação e operação assistida em um ambiente bancário legado.

---

## 1. Objetivo

Garantir que CNPJs numéricos e alfanuméricos coexistam sem perda de informação, rejeição indevida, ABEND, erro regulatório, divergência financeira ou quebra de integração.

---

## 2. Critérios de aceite globais

Uma implantação só é considerada pronta quando:

- CNPJ antigo numérico continua funcionando;
- CNPJ novo alfanumérico funciona de ponta a ponta;
- nenhum componente converte o identificador para tipo numérico;
- nenhum componente remove letras ao sanitizar máscara;
- DV é validado conforme especificação oficial;
- consumidores batch processam os novos valores;
- regulatórios aceitam os novos valores;
- KYC/AML recebe o identificador íntegro;
- arquivos e mensagens preservam 14 posições;
- observabilidade consegue localizar e mascarar o novo formato;
- rollback e reprocessamento estão definidos;
- conciliação financeira fecha após o cutover.

---

## 3. Massa mínima de testes

### A — legado numérico válido

```text
00000000000191
```

### B — alfanumérico válido

```text
00000000E08G12
```

### C — lowercase recebido externamente

```text
00000000e08g12
```

Esperado: normalização para uppercase antes de persistência.

### D — máscara de apresentação

```text
00.000.000/E08G-12
```

Esperado: remover pontuação sem remover letras.

### E — letra em posição de DV

```text
00000000E08GA2
```

Esperado: rejeição estrutural.

### F — caracteres especiais

```text
00000000E@8G12
```

Esperado: rejeição.

### G — comprimento inválido

```text
0000000E08G12
```

Esperado: rejeição.

### H — DV inválido

CNPJ com estrutura válida, mas dígitos verificadores incorretos.

Esperado: rejeição pelo cálculo de DV.

---

## 4. Matriz de testes por camada

| Camada | Teste | Evidência esperada |
|---|---|---|
| COBOL | mover CNPJ para `PIC X(14)` | valor íntegro |
| COBOL | eliminar `IS NUMERIC` indevido | novo formato aceito |
| COPYBOOK | recompilar consumidores | sem incompatibilidade |
| DB2 | INSERT/UPDATE/SELECT | 14 caracteres preservados |
| DB2 | índice / PK / FK | joins corretos |
| DB2 | DCLGEN | host variables compatíveis |
| CICS | COMMAREA | conteúdo íntegro entre programas |
| VSAM | READ/WRITE/REWRITE | chave preservada |
| JCL | SYSIN/SORT | sem pressuposto numérico |
| Batch | processamento noturno | sem S0C7/rejeição indevida |
| API | request/response | schema aceita novo domínio |
| XML/XSD | validação | alfanumérico aceito |
| KYC/AML | envio ao motor | documento íntegro |
| Regulatório | geração/remessa | arquivo aceito |
| Data/BI | ingestão | coluna string |
| Logs | busca/masking | CNPJ detectado corretamente |
| Conciliação | totais | sem divergência |

---

## 5. Testes COBOL específicos

Procurar e validar padrões como:

```cobol
PIC 9(14)
PIC 9(12)
IS NUMERIC
COMP-3
REDEFINES
MOVE ... TO campo-numérico
```

Cenários:

1. CNPJ numérico antigo;
2. alfanumérico em primeira posição;
3. letra no meio da raiz;
4. letra em posições próximas ao estabelecimento;
5. lowercase normalizado;
6. DV inválido;
7. arquivo contendo mistura de formatos.

Critério:

```text
ZERO truncamento
ZERO substituição
ZERO conversão implícita
```

---

## 6. Testes DB2

### Persistência

```sql
INSERT INTO CLIENTE (CNPJ) VALUES ('00000000E08G12');
```

### Busca

```sql
SELECT * FROM CLIENTE
WHERE CNPJ = '00000000E08G12';
```

### Join

```sql
SELECT ...
FROM CLIENTE C
JOIN CONTRATO T ON T.CNPJ = C.CNPJ;
```

### Riscos a observar

- cast implícito;
- colunas DECIMAL/BIGINT;
- views com conversão;
- funções que removem letras;
- índices e access paths;
- packages antigos;
- DCLGEN desatualizado.

---

## 7. Teste ponta a ponta bancário

```text
ONBOARDING PJ
    ↓
VALIDAÇÃO CNPJ
    ↓
CICS / API
    ↓
COBOL
    ↓
DB2
    ↓
BATCH NOTURNO
    ↓
KYC / AML
    ↓
REGULATÓRIO
    ↓
DATA / BI
    ↓
CONCILIAÇÃO
```

O teste só termina depois de validar a última etapa.

Um cadastro online funcionando sozinho não prova prontidão.

---

## 8. Teste de regressão do legado

Um risco de migração é corrigir o novo formato e quebrar os CNPJs antigos.

Regression pack obrigatório:

- cadastro PJ antigo;
- consulta por CNPJ;
- alteração cadastral;
- pagamentos;
- cobrança;
- contratos;
- onboarding;
- KYC/AML;
- batch diário;
- relatórios;
- regulatórios;
- integrações externas.

---

## 9. Testes negativos críticos

### Anti-pattern sanitização

Entrada:

```text
00.000.000/E08G-12
```

Código incorreto:

```text
remove caracteres não numéricos
```

Teste deve provar que a rotina **não** produz:

```text
000000000812
```

### Cast numérico

Qualquer tentativa de converter o novo CNPJ para integer/decimal deve falhar no teste automatizado ou ser eliminada do desenho.

---

## 10. Testes de SORT e arquivos

Validar:

- `SORT FIELDS`;
- `INCLUDE`;
- `OMIT`;
- `JOINKEYS`;
- `OUTREC/INREC`;
- deduplicação;
- geração de arquivos downstream.

Especial atenção a `FORMAT=ZD`, `PD`, `BI` ou qualquer tratamento numérico de posições que contenham CNPJ.

---

## 11. Testes de performance

Mudanças em índices ou tipos DB2 devem ser comparadas antes/depois:

```text
elapsed time
CPU
getpages
I/O
rows read
access path
```

Para lotes:

```text
registros/minuto
janela batch
CPU total
I/O
sort work
```

A adequação não pode fazer o fechamento bancário ultrapassar a janela operacional.

---

## 12. Estratégia de implantação

### Wave 0 — Preparação

- inventário fechado;
- owners definidos;
- matriz de dependências;
- feature flags quando aplicável;
- rollback desenhado;
- massa pronta.

### Wave 1 — Componentes tolerantes

Primeiro tornar consumidores capazes de receber ambos os formatos.

Princípio:

> **read new before write new**

Antes de começar a produzir CNPJ alfanumérico, todo consumidor crítico precisa saber processá-lo.

### Wave 2 — Produtores

Ativar canais que geram/recebem novo formato.

### Wave 3 — Regulatório e parceiros

Validar integrações externas.

### Wave 4 — Dados e observabilidade

Garantir ingestão, dashboards, logs e SIEM.

---

## 13. Cutover checklist

Antes de ativar:

```text
[ ] todos os consumidores críticos certificados
[ ] batch noturno testado
[ ] CICS/APIs certificados
[ ] DB2 migration concluída
[ ] DCLGENs recompilados
[ ] JCL/SORT revisados
[ ] VSAM revisado
[ ] parceiros confirmados
[ ] regulatórios confirmados
[ ] KYC/AML confirmado
[ ] dashboards de monitoramento prontos
[ ] runbooks publicados
[ ] rollback aprovado
[ ] bridge de war room definido
```

---

## 14. Rollback decision tree

```text
INCIDENTE
   │
   ├─ dado alfanumérico já persistido?
   │       │
   │       ├─ NÃO → rollback de aplicação pode ser possível
   │       │
   │       └─ SIM
   │            │
   │            ├─ versão antiga consegue ler? → avaliar rollback
   │            │
   │            └─ NÃO → roll-forward/correção é mais segura
```

Em muitas situações, depois da persistência de letras, **roll-forward** será mais seguro que rollback.

---

## 15. Hypercare — métricas que eu monitoraria

### Técnicas

```text
ABEND S0C7
S0C4
SQLCODEs anormais
rejeições de arquivo
falhas de schema
mensagens CICS anormais
latência
CPU
batch window
```

### Funcionais

```text
cadastros PJ rejeitados
CNPJs não localizados
KYC pendente
divergências de conciliação
remessas regulatórias rejeitadas
contratos não associados
pagamentos afetados
```

---

## 16. Indicadores de sucesso

```text
0 perda de caracteres
0 regressão em CNPJ numérico
0 rejeição regulatória por formato
0 ABEND causado por conversão de CNPJ
0 divergência financeira atribuída à mudança
100% consumidores críticos certificados
```

---

## 17. Exemplo de War Room

Papéis:

```text
Incident Commander
Mainframe/COBOL
DB2
CICS
Batch/JCL
APIs/Integrações
KYC/AML
Regulatório
Data
Negócio
Operações
```

Perguntas da primeira hora:

1. qual primeiro registro afetado?
2. qual componente rejeitou?
3. dado foi persistido?
4. existe impacto financeiro?
5. existe impacto regulatório?
6. há propagação downstream?
7. podemos isolar o produtor?
8. restart/rerun é seguro?
9. precisamos roll-forward?
10. quais clientes/processos foram afetados?

---

## 18. Cenário de teste de entrevista

**Pergunta:**

> “O cadastro aceita CNPJ alfanumérico, mas o fechamento noturno começa a abendar. O que você faria?”

Resposta estruturada:

1. identificar job/step e ABEND;
2. confirmar se existe conversão numérica;
3. localizar copybook/campo;
4. analisar persistência parcial;
5. quantificar registros afetados;
6. corrigir consumidor batch;
7. executar testes regressivos;
8. decidir restart/rerun com idempotência;
9. reconciliar resultados;
10. ampliar busca para outros consumidores com o mesmo padrão.

O último passo é importante: o problema não deve ser tratado como exceção isolada, mas como evidência de inventário incompleto.

---

## 19. Go / No-Go

### GO

- todos os consumidores críticos suportam os dois formatos;
- regulatórios certificados;
- batch fecha dentro da janela;
- rollback/roll-forward entendidos;
- observabilidade preparada.

### NO-GO

- consumidor crítico ainda depende de `PIC 9`;
- parceiro não aceita letras;
- KYC/AML não certificado;
- arquivo regulatório rejeita novo formato;
- não existe estratégia para dado já persistido;
- batch não passou E2E.

---

## Conclusão

Em um banco, implantar CNPJ alfanumérico não é liberar uma nova máscara. É garantir que um identificador crítico continue íntegro durante todo o ciclo de vida — entrada, persistência, processamento, risco, regulatório, dados e conciliação.

O teste mais importante não é “o campo aceita letra?”.

É:

> **“O banco inteiro consegue reconhecer a mesma empresa do início ao fim sem perder informação?”**
