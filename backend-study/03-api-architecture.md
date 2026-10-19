# 03 — APIs, Arquitetura, Validação e Erros

## 1. Estrutura mínima de uma API

Uma API simples pode começar assim:

```text
src/
  server.ts
  routes/
  controllers/
  services/
  repositories/
  schemas/
  errors/
```

Não é obrigatório usar exatamente essa estrutura. O objetivo é separar responsabilidades.

---

## 2. Router

A rota conecta método + URL a uma operação.

```ts
router.post('/users', createUserController);
```

Responsabilidade principal:

- definir endpoint;
- aplicar middlewares locais;
- encaminhar para controller.

---

## 3. Controller

Controller lida com a camada HTTP.

```ts
export async function createUserController(req, res) {
  const input = createUserSchema.parse(req.body);
  const user = await createUserService(input);
  return res.status(201).json(user);
}
```

Ele não deveria concentrar regras de negócio grandes.

### Resposta de entrevista

> Controller traduz HTTP para a aplicação: lê params/body, chama a regra de negócio e transforma o resultado em resposta HTTP.

---

## 4. Service

Service concentra regra de negócio.

```ts
export async function createUserService(input: CreateUserInput) {
  const exists = await userRepository.findByEmail(input.email);

  if (exists) {
    throw new ConflictError('Email already in use');
  }

  return userRepository.create(input);
}
```

O service idealmente não deveria depender diretamente de `req` e `res`.

### Resposta de entrevista

> Eu separo regra de negócio da camada HTTP para reduzir acoplamento e facilitar testes. Assim consigo testar um service sem precisar simular uma requisição real.

---

## 5. Repository

Repository encapsula acesso a dados.

```ts
export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  create(data: CreateUserInput) {
    return prisma.user.create({ data });
  }
};
```

Não é obrigatório em toda aplicação. Em sistemas pequenos, chamar o ORM diretamente no service pode ser suficiente. O importante é evitar arquitetura por moda.

---

## 6. Middleware

Middleware executa lógica antes ou depois de outra etapa da requisição.

Usos comuns:

- autenticação;
- autorização;
- logging;
- rate limiting;
- validação;
- tratamento global de erros.

Exemplo conceitual:

```ts
function authMiddleware(req, res, next) {
  // valida token
  // adiciona usuário autenticado
  next();
}
```

---

## 7. Validação de entrada

Nunca confie em `req.body`.

Exemplo com Zod:

```ts
const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});
```

Uso:

```ts
const input = createUserSchema.parse(req.body);
```

### O que validar?

- tipos;
- obrigatoriedade;
- formato;
- limites;
- enums;
- regras simples de entrada.

Regras que dependem de banco ou contexto costumam pertencer ao service.

---

## 8. DTO

DTO é um objeto usado para transportar dados entre fronteiras/camadas.

Exemplo:

```ts
type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};
```

Evite expor diretamente entidades internas se isso vazar campos sensíveis.

---

## 9. Nunca retornar senha

Errado:

```json
{
  "id": "1",
  "email": "user@example.com",
  "passwordHash": "$2b$..."
}
```

Correto:

```json
{
  "id": "1",
  "email": "user@example.com"
}
```

Hash de senha também é dado sensível.

---

## 10. Tratamento centralizado de erros

Crie erros de aplicação:

```ts
class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
  }
}
```

```ts
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}
```

Middleware global:

```ts
function errorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error'
  });
}
```

### Benefício

Evita vários `try/catch` repetidos em controllers.

---

## 11. Não vazar detalhes internos

Ruim:

```json
{
  "message": "ECONNREFUSED postgres://admin:secret@10.0.0.2:5432"
}
```

Melhor resposta externa:

```json
{
  "message": "Internal server error"
}
```

Detalhes técnicos ficam em logs internos.

---

## 12. Paginação

Endpoint:

```http
GET /users?page=2&limit=20
```

Resposta possível:

```json
{
  "data": [],
  "page": 2,
  "limit": 20,
  "total": 87
}
```

Nunca permita limites absurdos sem controle.

```ts
const limit = Math.min(Number(req.query.limit ?? 20), 100);
```

---

## 13. Idempotência

Uma operação idempotente pode ser repetida e produzir o mesmo efeito final esperado.

Exemplo intuitivo:

```http
PUT /users/10/status
{ "active": true }
```

Executar duas vezes ainda deixa `active=true`.

`POST` normalmente não é considerado idempotente por padrão.

---

## 14. CORS

CORS é uma política de navegador para controlar requisições entre origens diferentes.

Não é mecanismo de autenticação.

Configuração muito aberta:

```ts
origin: '*'
```

pode ser inadequada quando há credenciais ou política restrita.

### Resposta de entrevista

> CORS controla quais origens no navegador podem acessar o recurso. Ele não substitui autenticação nem autorização.

---

## 15. Versionamento de API

Exemplo:

```text
/api/v1/users
```

Nem toda API precisa começar versionada, mas mudanças incompatíveis exigem estratégia.

---

# Exemplo completo de fluxo

Requisição:

```http
POST /users
Content-Type: application/json

{
  "name": "Daniel",
  "email": "daniel@example.com",
  "password": "12345678"
}
```

Fluxo:

```text
router
  ↓
controller
  ↓
validação de schema
  ↓
service
  ↓
verifica e-mail duplicado
  ↓
hash da senha
  ↓
repository
  ↓
PostgreSQL
  ↓
DTO sem senha
  ↓
201 Created
```

---

# Exercícios resolvidos

## 1. Onde verificar e-mail duplicado?

No service/regra de negócio, consultando o repositório. A restrição `UNIQUE` também deve existir no banco como proteção final.

---

## 2. Onde validar `email()`?

Na fronteira de entrada, usando schema/runtime validation.

---

## 3. Controller pode acessar banco direto?

Pode tecnicamente, mas conforme a complexidade cresce isso mistura HTTP, regras e persistência. Para projetos de portfólio profissional, uma separação simples geralmente melhora clareza e teste.

---

## 4. Todo projeto precisa repository pattern?

Não. Adicionar camadas sem necessidade gera complexidade. Use quando houver benefício real de isolamento, testes ou múltiplas fontes de dados.

---

## 5. Por que erro global?

Para centralizar formato de resposta, logs e status, evitando repetição e inconsistência.

---

# Mini entrevista resolvida

### O que é middleware?

> É uma função que participa do pipeline da requisição. Pode autenticar, registrar logs, validar, limitar tráfego ou encaminhar para a próxima etapa.

### Controller x Service?

> Controller cuida de HTTP; service cuida da regra de negócio. Essa separação deixa o domínio menos dependente do framework e facilita testes.

### Por que validar input se uso TypeScript?

> Porque TypeScript não existe em runtime e o cliente pode enviar qualquer valor.

### O que é DTO?

> É um contrato de dados usado entre fronteiras ou camadas. Também ajuda a controlar o que entra e o que sai da API.

### O que é idempotência?

> É a propriedade de poder repetir uma operação sem mudar o efeito final além da primeira aplicação. É importante em APIs por causa de retries e confiabilidade.

---

# Checklist

- Router define endpoints.
- Controller traduz HTTP.
- Service concentra regra de negócio.
- Repository encapsula persistência quando faz sentido.
- Middleware atua no pipeline.
- Entradas externas precisam de validação runtime.
- Erros devem ser consistentes.
- Dados sensíveis nunca devem vazar.
- Paginação precisa de limites.
- Arquitetura deve resolver problemas, não decorar o projeto.
