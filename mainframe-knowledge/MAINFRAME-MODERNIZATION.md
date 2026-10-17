# Mainframe Modernization — Legado + APIs sem perder o domínio

## Contexto

Modernizar Mainframe não significa necessariamente substituir tudo. Em bancos, uma abordagem frequente é preservar regras críticas e expor capacidades por novas camadas de integração.

## Arquitetura conceitual

```text
Canal Web / Mobile
       |
       v
API Gateway / REST
       |
       v
Serviço Java / Integração
       |
       v
Mainframe / COBOL
   |        |
   |        +--> DB2
   +--> CICS / Batch
```

## Perguntas importantes

- Qual sistema continua sendo o source of truth?
- Onde ficam as regras de negócio?
- Como evitar duplicar lógica entre COBOL e serviços modernos?
- Como tratar timeouts e indisponibilidade?
- Como garantir idempotência em operações financeiras?
- Como manter rastreabilidade ponta a ponta?

## Estratégias possíveis

### Encapsulamento
Manter a regra COBOL e criar uma interface para consumo externo.

### Estrangulamento gradual
Migrar capacidades específicas aos poucos, mantendo coexistência entre legado e novo.

### Modernização de dados
Separar leitura analítica e operacional sem comprometer consistência do sistema transacional.

## Riscos

- duplicação de regra de negócio;
- inconsistência entre sistemas;
- aumento de latência;
- perda de rastreabilidade;
- retry gerando duplicidade financeira;
- dependência forte entre plataformas.

## Como meu portfólio conecta os dois lados

Os cases COBOL demonstram batch, CICS, DB2 e VSAM.

O PayFlow API demonstra Java, Spring Boot, REST, PostgreSQL, concorrência e tratamento de falhas.

Essa combinação permite discutir não apenas código legado, mas também integração e evolução arquitetural.

## Ponto de vista

Mainframe continua valioso quando sustenta processos críticos com estabilidade. Modernização deve reduzir risco e melhorar integração sem ignorar décadas de regras de negócio acumuladas.
