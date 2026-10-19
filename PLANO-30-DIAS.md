# Plano de 30 Dias — Primeira Oportunidade em Suporte de TI

Objetivo: em 30 dias, construir prática suficiente para disputar vagas de **Suporte Técnico N1, Help Desk, Service Desk, Assistente de TI e Analista de Suporte Júnior**, usando este GitHub como evidência.

## Regra do plano

Todos os dias devem ter três blocos:

1. **Estudo curto** — aprender apenas o necessário.
2. **Prática** — executar algo no computador/laboratório.
3. **Evidência** — registrar no GitHub ou usar o aprendizado em candidatura/entrevista.

Carga sugerida: **2h a 2h30 por dia**.

---

# Semana 1 — Windows + fundamentos de suporte

## Dia 1 — Preparação

- Instalar VirtualBox ou VMware.
- Criar pasta local para o laboratório.
- Revisar a estrutura deste GitHub.
- Ler o laboratório de Windows.

**Entrega:** ambiente preparado.

## Dia 2 — Windows e usuários

Estudar e praticar:

- usuários locais;
- senha;
- permissões básicas;
- administrador x usuário comum.

**Entrega:** registrar o que foi feito no laboratório Windows.

## Dia 3 — Processos e lentidão

Praticar:

- Gerenciador de Tarefas;
- CPU;
- memória;
- disco;
- programas de inicialização;
- `tasklist`.

Simular um chamado de computador lento.

## Dia 4 — Disco, serviços e eventos

Praticar:

- espaço em disco;
- Windows Update;
- `services.msc`;
- Visualizador de Eventos.

Criar um pequeno checklist de diagnóstico.

## Dia 5 — Hardware básico

Estudar:

- CPU;
- RAM;
- SSD/HDD;
- placa de rede;
- periféricos;
- drivers.

Praticar identificação dos componentes da própria máquina.

## Dia 6 — Service Desk

Estudar:

- incidente x solicitação;
- impacto;
- urgência;
- prioridade;
- escalonamento;
- SLA em nível conceitual.

Criar 3 chamados simulados.

## Dia 7 — Revisão + candidatura

- revisar Windows;
- responder 10 perguntas de entrevista;
- atualizar evidências no GitHub;
- enviar **5 candidaturas**.

---

# Semana 2 — Redes + troubleshooting

## Dia 8 — Fundamentos de rede

Estudar:

- IP;
- máscara;
- gateway;
- DNS;
- DHCP.

## Dia 9 — ipconfig e ping

Praticar:

```bat
ipconfig
ipconfig /all
ping 127.0.0.1
ping <gateway>
ping 8.8.8.8
```

Registrar os resultados.

## Dia 10 — DNS

Praticar:

```bat
nslookup google.com
ping google.com
```

Entender diferença entre conectividade por IP e resolução por nome.

Executar o estudo de caso de DNS do GitHub.

## Dia 11 — tracert e diagnóstico em sequência

Praticar:

```bat
tracert google.com
```

Montar uma sequência de diagnóstico de usuário sem internet.

## Dia 12 — DHCP e APIPA

Estudar:

- concessão DHCP;
- IP automático;
- endereço `169.254.x.x`;
- renovação de IP em laboratório.

## Dia 13 — Chamados de rede

Criar 3 tickets simulados:

- sem internet;
- DNS com problema;
- IP inválido/APIPA.

## Dia 14 — Revisão + candidatura

- revisar redes;
- treinar explicação do caso DNS;
- atualizar GitHub;
- enviar **10 candidaturas**.

---

# Semana 3 — Active Directory + Microsoft 365

## Dia 15 — Conceitos de domínio

Estudar:

- domínio;
- controlador de domínio;
- usuário local x domínio;
- OU;
- grupos.

## Dia 16 — Windows Server / Active Directory

No laboratório:

- instalar ou preparar Windows Server;
- adicionar função AD DS quando possível;
- conhecer Active Directory Users and Computers.

## Dia 17 — Usuários e grupos

Praticar:

- criar usuário;
- criar grupo;
- adicionar usuário a grupo;
- redefinir senha.

Registrar evidências.

## Dia 18 — Conta bloqueada

Simular:

- falha de logon;
- conta bloqueada;
- senha expirada;
- redefinição de senha.

Seguir o runbook deste GitHub.

## Dia 19 — Microsoft 365

Estudar cenários comuns:

- Outlook não sincroniza;
- Teams sem áudio;
- OneDrive não sincroniza;
- autenticação.

## Dia 20 — PowerShell básico

Executar e entender:

- `Get-ComputerInfo`;
- `Get-NetIPConfiguration`;
- `Get-Process`;
- `Get-PSDrive`;
- `Test-NetConnection`.

Executar o script `collect-system-info.ps1` deste GitHub.

## Dia 21 — Revisão + candidatura

- revisar AD e Microsoft 365;
- treinar 15 perguntas de entrevista;
- enviar **10 candidaturas**.

---

# Semana 4 — Entrevista + mercado + consolidação

## Dia 22 — Impressoras e periféricos

Estudar troubleshooting de:

- impressora offline;
- fila de impressão;
- driver;
- USB;
- headset;
- webcam.

Criar 2 tickets simulados.

## Dia 23 — Acesso remoto e segurança

Estudar conceitos de:

- RDP;
- VPN;
- MFA;
- phishing;
- princípio do menor privilégio.

Sem tentar burlar controles ou permissões.

## Dia 24 — Documentação profissional

Criar mais um estudo de caso completo no GitHub usando:

**Problema → Impacto → Diagnóstico → Testes → Solução → Validação**.

## Dia 25 — Currículo

Adaptar currículo para:

- Suporte N1;
- Help Desk;
- Service Desk;
- Assistente de TI.

Usar palavras-chave das vagas reais sem inventar experiência.

## Dia 26 — LinkedIn

Ajustar headline e resumo para refletir:

**Suporte de TI | Help Desk | Service Desk | Windows | Redes | Active Directory | Microsoft 365**

Adicionar link deste GitHub.

## Dia 27 — Simulado de entrevista

Treinar respostas para:

- usuário sem internet;
- computador lento;
- senha bloqueada;
- Outlook com problema;
- prioridade de chamados;
- quando escalar.

## Dia 28 — Candidatura forte

Enviar **15 candidaturas direcionadas**.

Não limitar busca a vagas com “Júnior”. Procurar também:

- Assistente de TI;
- Help Desk;
- Service Desk;
- Suporte Técnico;
- Field Service;
- Técnico de Informática.

## Dia 29 — Revisão do portfólio

Conferir:

- links;
- ortografia;
- evidências;
- laboratórios executados;
- scripts compreendidos;
- clareza para recrutador.

Não manter como concluído algo que ainda não foi praticado.

## Dia 30 — Dia de mercado

- fazer uma revisão geral de 1 hora;
- enviar **15 candidaturas**;
- falar com 5 recrutadores ou profissionais da área no LinkedIn;
- registrar perguntas recebidas em entrevistas;
- transformar lacunas encontradas no próximo ciclo de estudo.

---

# Meta ao final dos 30 dias

Ter pelo menos:

- 5 laboratórios documentados;
- 2 estudos de caso completos;
- 10 chamados simulados;
- 1 script PowerShell compreendido e executado;
- prática de Windows, rede e Active Directory;
- currículo direcionado;
- LinkedIn direcionado;
- **55+ candidaturas direcionadas**;
- respostas treinadas para entrevistas de Suporte N1.

## O princípio mais importante

Não esperar se sentir “pronto” para se candidatar.

A partir da primeira semana, **estudo e busca de vaga acontecem ao mesmo tempo**.
