# Laboratório 05 — Service Desk e Chamados

## Objetivo

Praticar a forma de pensar e documentar atendimentos de Suporte N1.

## Estrutura de um bom chamado

**Título:** curto e objetivo.  
**Usuário/área:** quem está impactado.  
**Impacto:** o que deixou de funcionar.  
**Sintoma:** mensagem ou comportamento observado.  
**Diagnóstico:** verificações realizadas.  
**Solução:** ação aplicada.  
**Validação:** confirmação de funcionamento.

## Exemplo 1 — Sem acesso à internet

**Título:** Estação sem acesso a sites  
**Impacto:** usuário sem acesso aos sistemas web.  
**Diagnóstico:** IP válido, gateway respondendo, acesso por IP externo funcionando e falha na resolução de nomes.  
**Causa simulada:** configuração DNS incorreta.  
**Solução:** correção do DNS no ambiente de laboratório.  
**Validação:** `nslookup` e navegação por nome funcionando.

## Exemplo 2 — Conta bloqueada

**Título:** Usuário sem acesso ao domínio  
**Impacto:** impossibilidade de iniciar a jornada de trabalho.  
**Diagnóstico:** conta identificada como bloqueada no laboratório de Active Directory.  
**Solução:** desbloqueio conforme procedimento e validação das credenciais.  
**Validação:** novo logon realizado com sucesso.

## Priorização básica

A prioridade deve considerar principalmente **impacto + urgência**. Um problema que paralisa vários usuários ou um serviço crítico tende a exigir prioridade maior do que uma solicitação individual sem bloqueio de trabalho.

## Comunicação

Durante o atendimento:

- evitar termos excessivamente técnicos com o usuário;
- explicar o que está sendo testado quando necessário;
- registrar fatos, não suposições;
- confirmar a solução com o usuário;
- documentar para que outro técnico consiga entender o histórico.

## Meta prática

Criar pelo menos **10 chamados simulados**, cobrindo Windows, rede, acesso, Microsoft 365, impressoras e usuários.
