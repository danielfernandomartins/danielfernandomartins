# Padrão de qualidade dos projetos Front-End

Todos os projetos desta trilha devem buscar os mesmos critérios, com maior rigor nos projetos principais.

- **Semântica:** HTML e componentes com estrutura clara.
- **Responsividade:** uso confortável em desktop e mobile.
- **Acessibilidade:** labels, foco visível, teclado, estados dinâmicos anunciados quando necessário e mensagens compreensíveis.
- **TypeScript:** `strict: true` nos projetos TypeScript e versões compatíveis com o restante do toolchain.
- **Lint:** projetos principais devem expor `npm run lint`, usar configuração versionada e falhar com warnings.
- **Estados de UI:** loading, erro, vazio e sucesso quando aplicável.
- **Organização:** nomes legíveis, funções pequenas e responsabilidades claras entre UI, domínio, dados e bootstrap.
- **Dados:** nunca versionar credenciais, tokens, segredos ou dados reais de clientes.
- **Testes:** testar regras, integrações de camada e comportamentos que podem quebrar sem serem percebidos visualmente.
- **CI:** executar auditoria estrutural, lint, typecheck, build e testes antes de integrar mudanças relevantes.
- **Dependências:** evitar `latest`, não mascarar conflitos com `--force`/`legacy-peer-deps` sem justificativa e preferir combinações oficialmente suportadas.
- **Documentação:** explicar objetivo, stack, execução, decisões técnicas, limitações e pontos para entrevista.
- **Honestidade:** não apresentar projeto de estudo como experiência de produção nem inventar métricas, usuários ou resultados.
- **Recrutador:** cada projeto deve provar uma competência específica, evitando repetição sem propósito.

## Prioridade de evolução

1. corrigir regressões e incompatibilidades;
2. melhorar testabilidade e acessibilidade;
3. fortalecer quality gates e reprodutibilidade;
4. adicionar evidências de performance/deploy quando forem reais;
5. só então ampliar stack ou quantidade de projetos.
