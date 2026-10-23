# 06 — Entrevista Back-End: Perguntas e Respostas

Use este arquivo para revisão ativa. Tente responder antes de ler a resposta.

---

## 1. O que acontece quando o Front-End chama uma API?

> O cliente envia uma requisição HTTP para um endpoint. O servidor identifica rota e método, valida os dados, executa a regra de negócio, acessa persistência ou serviços externos quando necessário e devolve uma resposta HTTP com status, headers e normalmente JSON.

---

## 2. O que é uma API REST?

> É uma API inspirada nos princípios REST, normalmente modelando recursos por URLs, usando métodos HTTP semanticamente, status coerentes e comunicação stateless. REST não é simplesmente “retornar JSON”.

---

## 3. GET x POST x PUT x PATCH x DELETE?

> GET busca; POST normalmente cria ou dispara uma operação; PUT substitui a representação completa; PATCH altera parcialmente; DELETE remove.

---

## 4. 401 x 403?

> 401 indica problema de autenticação. 403 indica que o usuário pode estar autenticado, mas não possui autorização para aquela ação.

---

## 5. 400 x 404 x 409 x 500?

> 400 representa requisição inválida; 404, recurso inexistente; 409, conflito de estado, como duplicidade; 500, falha inesperada do servidor.

---

## 6. O que é Node.js?

> É um runtime JavaScript fora do navegador. No Back-End, permite construir APIs e serviços usando JavaScript/TypeScript e APIs de sistema/rede.

---

## 7. Node é single-threaded?

> O JavaScript da aplicação normalmente roda na thread principal do event loop, mas Node e o sistema podem usar outras threads para certas operações. Então “single-threaded” é uma simplificação.

---

## 8. O que é event loop?

> É o mecanismo que coordena a continuação das tarefas assíncronas e callbacks, permitindo que operações de I/O sejam aguardadas sem bloquear a aplicação com espera ativa.

---

## 9. O que é Promise?

> É uma abstração para um resultado assíncrono futuro, que pode ser resolvido ou rejeitado.

---

## 10. `async/await` x Promise?

> `async/await` é uma sintaxe que torna mais legível trabalhar com Promises. Não é um modelo assíncrono diferente.

---

## 11. Quando usar `Promise.all`?

> Quando tenho operações assíncronas independentes que podem ser iniciadas juntas e preciso esperar todas.

---

## 12. Por que TypeScript não substitui validação de entrada?

> Porque os tipos não existem em runtime. Dados recebidos via HTTP podem ter qualquer formato e precisam ser validados de verdade.

---

## 13. Controller x Service x Repository?

> Controller cuida da fronteira HTTP; service concentra regra de negócio; repository encapsula persistência quando essa abstração traz benefício. Nem todo projeto precisa de todas as camadas.

---

## 14. O que é middleware?

> É uma etapa do pipeline da requisição usada para autenticação, logging, validação, autorização, rate limiting ou outras preocupações transversais.

---

## 15. O que é DTO?

> É um contrato de dados usado para transportar informações entre fronteiras ou camadas, ajudando a controlar entrada e saída.

---

## 16. O que é ORM?

> É uma camada que permite manipular dados relacionais por APIs da linguagem. Melhora produtividade, mas não substitui conhecimento de SQL, índices, modelagem e transações.

---

## 17. Primary key x foreign key?

> Primary key identifica uma linha unicamente. Foreign key referencia uma chave de outra tabela e ajuda a manter integridade relacional.

---

## 18. INNER JOIN x LEFT JOIN?

> INNER JOIN retorna apenas correspondências. LEFT JOIN preserva todas as linhas da tabela à esquerda, mesmo sem correspondência à direita.

---

## 19. O que é índice?

> É uma estrutura que pode acelerar consultas, filtros, joins e ordenações. Em troca, consome armazenamento e aumenta custo de escrita.

---

## 20. O que é transação?

> É um conjunto de operações que deve ser confirmado ou revertido como unidade, protegendo consistência quando múltiplas alterações pertencem à mesma regra.

---

## 21. O que é ACID?

> Atomicidade, consistência, isolamento e durabilidade. São propriedades associadas a transações confiáveis em bancos relacionais.

---

## 22. O que é SQL Injection?

> É a exploração de comandos SQL construídos com entrada não confiável. Evito usando parâmetros, APIs seguras de ORM e sem concatenar input diretamente na query.

---

## 23. Autenticação x autorização?

> Autenticação identifica o usuário. Autorização determina o que ele pode fazer.

---

## 24. Por que usar hash de senha?

> Porque a aplicação não precisa recuperar a senha original. Um algoritmo adequado de password hashing reduz o impacto de vazamento e dificulta ataques de força bruta.

---

## 25. Hash x criptografia?

> Hash é projetado como operação unidirecional; criptografia é reversível usando uma chave.

---

## 26. O que é JWT?

> É um formato de token que pode carregar claims e ser assinado para permitir verificação de integridade/autenticidade. JWT comum não significa payload criptografado.

---

## 27. JWT x sessão?

> Sessão normalmente mantém estado no servidor e cliente guarda um identificador. JWT pode ser validado por assinatura sem sessão central em alguns cenários. A escolha depende de revogação, arquitetura, clientes e segurança.

---

## 28. O que é CORS?

> É uma política aplicada pelo navegador para controlar acesso entre origens. Não é autenticação e não bloqueia clientes como Postman.

---

## 29. O que é CSRF?

> É um ataque que explora credenciais enviadas automaticamente pelo navegador para induzir uma ação em nome do usuário. Pode ser mitigado com SameSite, token CSRF e validação de origem conforme o desenho.

---

## 30. O que é XSS?

> É a execução de script não confiável no contexto da aplicação no navegador. Back-End e Front-End devem evitar transformar conteúdo não confiável em código executável.

---

## 31. Teste unitário x integração?

> Unitário isola uma unidade. Integração verifica componentes reais trabalhando juntos, como HTTP, regra de negócio e banco.

---

## 32. O que você testaria em `POST /users`?

> Caminho de sucesso, validação, e-mail duplicado, senha inválida, status correto, persistência esperada e garantia de não retornar hash da senha.

---

## 33. Por que não buscar 100% de cobertura a qualquer custo?

> Porque cobertura alta não garante testes úteis. Prefiro priorizar regras críticas, erros e integrações importantes. Métrica deve apoiar confiança, não virar objetivo isolado.

---

## 34. O que é Docker?

> É uma tecnologia de containers que empacota aplicação e dependências em um ambiente reproduzível. Em desenvolvimento, ajuda a subir serviços como PostgreSQL de forma consistente.

---

## 35. Imagem x container?

> Imagem é o template imutável usado para criar containers. Container é uma instância em execução dessa imagem.

---

## 36. O que é migration?

> É uma alteração versionada no schema do banco, como criar tabela, coluna ou índice. Permite reproduzir a evolução do banco entre ambientes.

---

## 37. O que é variável de ambiente?

> É uma configuração fornecida ao processo fora do código, útil para URLs, portas e secrets. Secrets reais não devem ser commitados.

---

## 38. O que você faria se uma API estivesse lenta?

> Primeiro mediria. Verificaria logs, duração por endpoint, queries, chamadas externas e CPU. Depois analisaria índices, N+1 queries, serialização, concorrência, caching quando adequado e gargalos externos. Evitaria otimizar por palpite.

---

## 39. O que é N+1 query?

> É um padrão ineficiente em que faço uma consulta inicial e depois uma consulta adicional para cada item retornado. Pode ser resolvido com joins, eager loading, batching ou mudança de consulta.

---

## 40. O que é cache?

> É guardar temporariamente um resultado para evitar recomputar ou buscar repetidamente. Precisa de estratégia de invalidação, TTL e entendimento de consistência.

---

## 41. Cache sempre melhora sistema?

> Não. Cache adiciona complexidade e risco de dado desatualizado. Só uso quando existe benefício mensurável.

---

## 42. O que é idempotência?

> É a propriedade de repetir uma operação e manter o mesmo efeito final. É importante para retries e integrações distribuídas.

---

## 43. O que é paginação?

> É dividir grandes conjuntos em partes menores. Protege servidor, banco, rede e cliente de respostas gigantes.

---

## 44. Offset x cursor pagination?

> Offset é simples e usa algo como página/limite. Cursor usa uma referência da última posição e costuma ser melhor em grandes conjuntos ou dados mudando frequentemente, mas é mais complexo.

---

## 45. O que é log estruturado?

> É registrar eventos em formato consistente, geralmente com campos como timestamp, nível, requestId e contexto, permitindo busca e correlação.

---

## 46. O que é request ID?

> É um identificador associado à requisição para correlacionar logs entre etapas ou serviços.

---

## 47. Como responder quando não sabe numa entrevista?

> Eu diria o que sei, deixaria claro o limite e explicaria como investigaria. Exemplo: “Ainda não implementei isso em produção. Entendo o conceito X e começaria validando Y na documentação e criando um teste pequeno.”

Essa resposta é melhor do que inventar.

---

## 48. Como explicar um projeto Back-End?

Estrutura recomendada:

> O projeto resolve X. A API usa Node e TypeScript. Separei HTTP, regra de negócio e persistência. PostgreSQL guarda Y e Z com relação 1:N. As entradas são validadas em runtime. Autenticação usa [...]. Testo regras críticas e integração HTTP/banco. A principal decisão foi [...], e a principal limitação atual é [...].

---

# Simulação de entrevista — rodada 1

**Pergunta:** Você recebe `POST /transfers` para mover dinheiro entre duas contas. Como implementaria?

**Resposta modelo:**

> Validaria os IDs e valor positivo, autenticaria o usuário e autorizaria a conta de origem. No service, iniciaria uma transação no banco, bloquearia ou trataria concorrência conforme necessário, verificaria saldo, debitava origem e creditava destino dentro da mesma transação. Se qualquer etapa falhar, rollback. Retornaria resposta sem expor dados sensíveis e teria testes para saldo insuficiente, conta inexistente e caminho de sucesso.

---

# Simulação de entrevista — rodada 2

**Pergunta:** Sua API recebe dois cadastros simultâneos com o mesmo e-mail. Só verificar antes de criar resolve?

**Resposta:**

> Não completamente. Pode haver condição de corrida: as duas verificações podem concluir que o e-mail ainda não existe. Por isso mantenho `UNIQUE` no banco e trato o conflito na aplicação.

---

# Simulação de entrevista — rodada 3

**Pergunta:** Você criaria repository, service, DTO e factory para um CRUD de três endpoints?

**Resposta:**

> Não automaticamente. Começaria simples e separaria responsabilidades onde houver ganho de legibilidade, teste ou evolução. Arquitetura boa reduz complexidade; não deveria adicioná-la sem necessidade.

---

# Frases que demonstram maturidade

- “Eu mediria antes de otimizar.”
- “Colocaria a garantia também no banco, não só na aplicação.”
- “TypeScript não valida a fronteira HTTP em runtime.”
- “Eu não escolheria JWT só por popularidade.”
- “Testaria comportamento e regras críticas, não detalhes internos.”
- “Evitaria arquitetura excessiva para um problema simples.”
- “Não tenho experiência produtiva com isso ainda, mas consigo explicar o princípio e como validaria a solução.”
