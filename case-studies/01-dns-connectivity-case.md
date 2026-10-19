# Estudo de Caso 01 — Usuário sem acesso a sites

## Contexto

Cenário simulado de Suporte N1 em uma estação Windows conectada à rede, porém sem conseguir acessar sites por nome.

## Impacto

Usuário impossibilitado de utilizar sistemas web e navegar normalmente.

## Sintomas

- computador recebe endereço IP válido;
- gateway está configurado;
- `ping 8.8.8.8` responde;
- acesso por nome falha;
- `nslookup` apresenta erro.

## Hipóteses

1. falha física de rede;
2. problema no gateway;
3. ausência de conectividade externa;
4. falha de resolução DNS.

## Testes

```bat
ipconfig /all
ping 127.0.0.1
ping <gateway>
ping 8.8.8.8
nslookup google.com
```

## Raciocínio

Como existe comunicação com um IP externo, a conectividade básica está funcionando. A falha passa a ficar concentrada na resolução de nomes.

## Causa simulada

Servidor DNS configurado incorretamente na estação.

## Solução

Corrigir a configuração de DNS conforme o padrão definido para o ambiente de laboratório.

## Validação

```bat
nslookup google.com
ping google.com
```

Depois, validar acesso pelo navegador.

## Aprendizado

O ponto principal deste caso é evitar alterações aleatórias. Testes simples em sequência permitem reduzir rapidamente o escopo da falha.

## Como eu explicaria em uma entrevista

“Primeiro eu confirmaria o impacto e verificaria a configuração com `ipconfig /all`. Depois testaria a pilha local, gateway, conectividade por IP e resolução de nomes. Se o IP externo responde e o nome não resolve, DNS passa a ser uma hipótese forte. Eu confirmaria antes de alterar a configuração e validaria novamente após a correção.”

> Caso de laboratório. Não representa atendimento realizado em ambiente corporativo real.
