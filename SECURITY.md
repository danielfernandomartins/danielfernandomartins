# Security Policy

Este repositório é um portfólio educacional/profissional e não processa dados reais de clientes.

## Boas práticas adotadas

- nenhum token, senha ou segredo deve ser versionado;
- APIs públicas devem ser consumidas sem credenciais privadas no cliente;
- dependências são monitoradas pelo Dependabot;
- workflows usam permissões mínimas (`contents: read` quando possível);
- dados usados nos projetos são fictícios ou públicos;
- vulnerabilidades em dependências devem ser tratadas antes de adicionar novas funcionalidades.

## Reporte

Caso encontre uma vulnerabilidade no código demonstrativo, abra uma issue sem incluir credenciais ou informações sensíveis. Se o problema envolver um segredo real, não publique o valor no repositório.
