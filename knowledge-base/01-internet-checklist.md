# Runbook — Usuário sem acesso à internet

## Sintoma

Usuário informa que sites ou sistemas web não abrem.

## Perguntas iniciais

- O problema afeta apenas um usuário ou vários?
- A conexão caiu agora ou nunca funcionou nesta estação?
- O ícone de rede apresenta alerta?
- Outros dispositivos na mesma rede funcionam?

## Checklist seguro

1. Confirmar cabo/Wi-Fi.
2. Executar `ipconfig /all`.
3. Verificar IPv4, gateway e DNS.
4. Testar `ping 127.0.0.1`.
5. Testar o gateway.
6. Testar um IP externo.
7. Testar resolução de nomes com `nslookup`.
8. Registrar resultados.

## Interpretação rápida

- `169.254.x.x`: investigar obtenção de endereço/DHCP.
- Gateway não responde: investigar rede local.
- IP externo responde e nome não resolve: investigar DNS.
- Vários usuários afetados: considerar incidente de maior abrangência e escalar conforme procedimento.

## Validação

Após a correção, repetir os testes que falharam e validar o acesso ao recurso original.

## Escalonamento

Escalar quando a causa estiver fora das permissões ou do escopo N1, quando houver impacto coletivo, falha de infraestrutura ou necessidade de alteração administrativa não autorizada.
