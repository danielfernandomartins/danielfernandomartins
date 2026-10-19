# Runbook — Conta bloqueada / falha de logon

## Sintoma

Usuário não consegue entrar no ambiente com a senha habitual.

## Perguntas iniciais

- A mensagem indica senha incorreta, conta bloqueada ou senha expirada?
- O usuário está tentando entrar no domínio correto?
- A falha ocorre em um único dispositivo ou em todos?

## Checklist N1

1. Confirmar identidade do usuário conforme procedimento da empresa.
2. Confirmar domínio/usuário utilizado.
3. Verificar se a conta está bloqueada.
4. Verificar expiração de senha.
5. Desbloquear ou redefinir senha somente se autorizado.
6. Solicitar troca no próximo logon quando aplicável.
7. Validar o acesso.
8. Registrar a ação no chamado.

## Boas práticas

- nunca solicitar que o usuário informe sua senha atual;
- não compartilhar senha por canais inadequados;
- respeitar política de identidade e segurança;
- aplicar princípio do menor privilégio.

## Escalonamento

Escalar quando houver suspeita de comprometimento, falha recorrente de autenticação, problema de replicação/domínio ou necessidade de privilégio além do escopo N1.

> Procedimento de estudo. Em ambiente real, sempre seguir a política de identidade e segurança da organização.
