# Laboratório 01 — Windows e Troubleshooting

## Objetivo

Praticar diagnóstico de problemas comuns em estações Windows 10/11.

## Cenário 1 — Aplicativo não abre

**Problema:** usuário informa que um aplicativo deixou de abrir.

**Checklist de diagnóstico:**

1. Confirmar mensagem de erro.
2. Verificar se o processo ficou travado no Gerenciador de Tarefas.
3. Reiniciar o aplicativo.
4. Reiniciar a estação, quando apropriado.
5. Validar espaço em disco.
6. Verificar permissões do usuário.
7. Testar execução como administrador apenas quando necessário.
8. Consultar Visualizador de Eventos se o erro persistir.

**Resultado esperado:** identificar se a causa está relacionada a processo travado, instalação, permissão ou recurso da máquina.

---

## Cenário 2 — Computador lento

**Ferramentas:**

- Gerenciador de Tarefas
- `tasklist`
- `systeminfo`
- `wmic logicaldisk get caption,freespace,size`
- Configurações de armazenamento
- Windows Update

**Itens para verificar:** CPU, memória, disco, processos, programas de inicialização, tempo de atividade e espaço livre.

---

# Evidência prática — Dia 1

**Data da prática:** 19/10/2026  
**Ambiente:** Windows 10 em estação física de estudo  
**Cenário simulado:** usuário relata lentidão durante o uso do computador.

## 1. Triagem inicial

Foi aberto o Gerenciador de Tarefas para verificar se havia saturação de recursos no momento da análise.

**Leitura observada:**

| Recurso | Resultado observado |
|---|---:|
| CPU | aproximadamente 10% na análise detalhada |
| Memória RAM | 4,5 GB de 7,9 GB — aproximadamente 57% |
| Disco | 0% de atividade no momento da captura |
| Rede | sem tráfego relevante no momento |
| GPU | aproximadamente 0–2% |
| Processos | 177 |
| Tempo de atividade | aproximadamente 13h17min |

Na primeira verificação, o Google Chrome apareceu como o principal consumidor de memória entre os aplicativos visíveis, sem evidência de saturação do sistema.

## 2. Hardware identificado

- **Processador:** Intel Core i5-5257U @ 2.70 GHz
- **Núcleos:** 2
- **Processadores lógicos:** 4
- **Memória instalada utilizável:** aproximadamente 7,9 GB
- **Armazenamento:** SSD SATA
- **Capacidade apresentada no Gerenciador de Tarefas:** aproximadamente 447 GB formatados

Durante a análise, a CPU operava perto de 2,97 GHz, acima da frequência base de 2,70 GHz, sem uso elevado sustentado.

## 3. Verificação do armazenamento

O SSD apresentou:

- 0% de tempo de atividade no momento da captura;
- 0 ms de tempo médio de resposta;
- ausência de leitura/gravação relevante durante a medição.

Também foi executado:

```bat
wmic logicaldisk get caption,freespace,size
```

Resultado para a unidade `C:`:

```text
FreeSpace      Size
423927631872   479351271424
```

Isso representa aproximadamente **423,9 GB livres em 479,4 GB totais**, ou cerca de **88% de espaço livre**.

## 4. Diagnóstico

No momento da análise não foi identificada saturação evidente de:

- CPU;
- memória RAM;
- armazenamento;
- rede;
- GPU.

O SSD possuía amplo espaço livre e não apresentava atividade anormal. A memória estava em uso moderado, sem indicar por si só um gargalo.

## 5. Conclusão do chamado

**Problema:** usuário relata computador lento.  
**Impacto:** lentidão durante o uso normal da estação.  
**Diagnóstico:** CPU sem saturação, memória em aproximadamente 57%, SSD sem atividade anormal e com cerca de 88% de espaço livre.  
**Ferramentas utilizadas:** Gerenciador de Tarefas, `tasklist`, `systeminfo` e `wmic logicaldisk`.  
**Causa:** não identificada durante a janela de observação.  
**Ação recomendada:** reproduzir a lentidão no momento em que ocorrer e correlacionar o sintoma com CPU, RAM, disco e processos ativos.  
**Status:** diagnóstico concluído sem falha evidente no momento da medição.

## 6. Aprendizado

O principal aprendizado deste laboratório foi evitar conclusões sem evidência. Um relato de “computador lento” deve ser tratado como um sintoma, não como um diagnóstico.

Sequência aplicada:

```text
Entender o sintoma
        ↓
Medir os recursos
        ↓
Criar hipóteses
        ↓
Testar
        ↓
Corrigir quando houver causa identificada
        ↓
Validar
        ↓
Documentar
```

## Pergunta de entrevista relacionada

**“Um usuário diz que o computador está muito lento. O que você verifica primeiro?”**

Resposta prática: primeiro entender quando a lentidão ocorre e qual atividade o usuário está executando. Em seguida verificar CPU, memória, disco, processos, espaço livre e tempo de atividade. Se não houver saturação no momento, tentar reproduzir o problema e coletar evidências antes de propor uma solução.

> Este registro é uma prática de laboratório e não representa atendimento realizado em ambiente corporativo real.
