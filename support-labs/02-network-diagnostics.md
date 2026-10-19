# Laboratório 02 — Diagnóstico de Rede

## Objetivo

Praticar troubleshooting básico de conectividade em uma estação Windows.

## Comandos principais

```bat
ipconfig
ipconfig /all
ping 127.0.0.1
ping <gateway>
ping 8.8.8.8
nslookup google.com
tracert google.com
```

## Cenário — Usuário sem acesso à internet

**Problema:** o computador está conectado à rede, mas não acessa sites.

### Sequência de diagnóstico

1. Verificar endereço IPv4, gateway e DNS com `ipconfig /all`.
2. Testar a pilha TCP/IP com `ping 127.0.0.1`.
3. Testar comunicação com o gateway.
4. Testar conectividade externa por IP.
5. Testar resolução de nomes com `nslookup`.
6. Comparar os resultados para identificar se a falha é local, de rede ou de DNS.

## Exemplo de registro

**Sintoma:** sites não abrem, mas o computador possui endereço IP válido.  
**Teste:** `ping 8.8.8.8` responde, porém `nslookup google.com` falha.  
**Hipótese:** problema de resolução DNS.  
**Ação:** revisar a configuração do servidor DNS no laboratório.  
**Validação:** repetir `nslookup` e testar acesso por nome.

## Conceitos para dominar

- IPv4
- máscara de sub-rede
- gateway padrão
- DNS
- DHCP
- endereço APIPA `169.254.x.x`
- diferença entre conectividade por IP e resolução por nome

## Pergunta de entrevista relacionada

**“O usuário consegue pingar 8.8.8.8, mas não consegue acessar google.com. O que pode estar acontecendo?”**

Uma hipótese forte é falha de resolução DNS, que deve ser confirmada com testes antes de alterar a configuração.
