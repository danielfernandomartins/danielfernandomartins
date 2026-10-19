# 02 — Node.js, TypeScript, módulos e assíncrono

## 1. O que é Node.js?

Node.js é um runtime JavaScript fora do navegador. Ele permite executar JavaScript no servidor e acessar recursos como filesystem, rede, processos e variáveis de ambiente.

### Resposta de entrevista

> Node.js é um ambiente de execução JavaScript baseado no V8, usado para construir aplicações fora do navegador. No Back-End, ele é muito usado para APIs, integrações, automações e serviços de rede.

---

## 2. O que Node não é

Node.js não é:

- uma linguagem;
- um framework;
- um banco de dados.

A linguagem continua sendo JavaScript ou TypeScript compilado para JavaScript.

---

## 3. `package.json`

É o arquivo central de configuração de um projeto Node.

Exemplo:

```json
{
  "name": "api-study",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### `dependencies` x `devDependencies`

`dependencies`: necessárias em runtime.

`devDependencies`: ferramentas de desenvolvimento, testes, compilação e lint.

---

## 4. Módulos

Com ES Modules:

```ts
export function sum(a: number, b: number) {
  return a + b;
}
```

```ts
import { sum } from './sum.js';
```

### Resposta de entrevista

> Módulos permitem dividir o código em unidades menores e explícitas. Isso melhora organização, reutilização, isolamento e testabilidade.

---

## 5. TypeScript no Back-End

TypeScript adiciona verificação estática de tipos ao JavaScript.

```ts
type User = {
  id: string;
  name: string;
  email: string;
};

function getEmail(user: User): string {
  return user.email;
}
```

### O que TypeScript não faz

TypeScript não valida dados externos em runtime.

Isto compila:

```ts
const body = req.body as User;
```

Mas não prova que o cliente realmente enviou um `User` válido.

Para runtime, use validação explícita, por exemplo Zod.

### Resposta de entrevista

> TypeScript ajuda no desenvolvimento, mas tipos somem em runtime. Dados que chegam por HTTP precisam ser validados em runtime porque vêm de uma fronteira externa não confiável.

---

## 6. `async` / `await`

Muitas operações Back-End são assíncronas: banco, rede, arquivo e filas.

```ts
async function getUser(id: string) {
  const user = await database.user.findUnique({ where: { id } });
  return user;
}
```

`await` pausa aquela função assíncrona até a Promise ser resolvida ou rejeitada. Ele não bloqueia automaticamente todo o processo Node.

---

## 7. Promise

Uma Promise representa um resultado futuro.

```ts
const promise = fetch('https://example.com');
```

Estados conceituais:

- pending;
- fulfilled;
- rejected.

Exemplo:

```ts
try {
  const response = await fetch(url);
  const data = await response.json();
  return data;
} catch (error) {
  console.error(error);
  throw error;
}
```

---

## 8. Concorrência com `Promise.all`

Errado quando duas operações independentes podem rodar em paralelo:

```ts
const user = await getUser();
const settings = await getSettings();
```

Melhor:

```ts
const [user, settings] = await Promise.all([
  getUser(),
  getSettings()
]);
```

### Quando não usar

Não use `Promise.all` quando uma operação depende do resultado da anterior.

---

## 9. Event loop em nível de primeira vaga

Node usa um modelo orientado a eventos. JavaScript normalmente executa em uma thread principal, enquanto certas operações de I/O são delegadas ao sistema/runtime. Quando terminam, seus callbacks/promises voltam para processamento.

### Resposta de entrevista

> Node consegue lidar bem com muitas operações de I/O porque não precisa bloquear a execução esperando banco ou rede. O event loop coordena a continuação dessas tarefas quando ficam prontas. Isso não significa que Node execute todo JavaScript em paralelo.

---

## 10. Código CPU-bound

Tarefas pesadas de CPU podem bloquear a thread principal:

```ts
for (let i = 0; i < 10_000_000_000; i++) {
  // trabalho pesado
}
```

Isso prejudica outras requisições.

Para tarefas realmente pesadas, podem ser usados worker threads, filas ou serviços especializados.

---

## 11. Variáveis de ambiente

Nunca coloque segredo diretamente no código.

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

Uso:

```ts
const databaseUrl = process.env.DATABASE_URL;
```

Valide variáveis obrigatórias no início da aplicação.

```ts
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}
```

### Regra

`.env` real não deve ser versionado. Pode existir `.env.example` sem segredos.

---

## 12. Tratamento de erros

Evite engolir erro:

```ts
try {
  await saveUser();
} catch {
  // ruim: nada acontece
}
```

Melhor:

```ts
try {
  await saveUser();
} catch (error) {
  logger.error(error);
  throw error;
}
```

No nível HTTP, erros devem ser transformados em respostas consistentes.

---

## 13. Erros esperados x inesperados

**Esperado:** usuário não encontrado, e-mail já utilizado, saldo insuficiente.

**Inesperado:** conexão quebrada, bug, exceção de biblioteca.

Isso ajuda a mapear status HTTP e logs.

---

# Exercícios resolvidos

## 1. Por que TypeScript não substitui validação de API?

Porque o cliente pode enviar qualquer conteúdo. Tipos TypeScript só existem durante desenvolvimento/compilação e não garantem o formato recebido em runtime.

---

## 2. O que está errado?

```ts
async function load() {
  const user = await getUser();
  const products = await getProducts();
}
```

Se as duas consultas forem independentes, estão sendo executadas sequencialmente sem necessidade.

Solução:

```ts
const [user, products] = await Promise.all([
  getUser(),
  getProducts()
]);
```

---

## 3. Onde guardar senha do banco?

Em variável de ambiente ou mecanismo de secrets da infraestrutura, nunca hardcoded e nunca em arquivo `.env` versionado.

---

## 4. Node é single-threaded?

Resposta correta para entrevista:

> O JavaScript da aplicação normalmente roda na thread principal do event loop, mas o runtime e o sistema podem usar outras threads para certas operações. Então dizer apenas “Node é single-threaded” é uma simplificação.

---

# Mini entrevista resolvida

### Por que usar TypeScript no Back-End?

> Para detectar incompatibilidades mais cedo, melhorar contratos internos, autocomplete e refatoração. Ainda assim valido entradas externas em runtime.

### `async/await` deixa tudo mais rápido?

> Não. Ele facilita trabalhar com Promises e operações assíncronas. Performance depende da operação e de como a concorrência é organizada.

### O que é uma Promise?

> É uma abstração para um resultado assíncrono futuro, que pode ser resolvido ou rejeitado.

### O que é event loop?

> É o mecanismo que coordena quando tarefas e callbacks podem continuar a execução. Ele permite que a aplicação aguarde I/O sem bloquear a thread principal com espera ativa.

### Quando usar `Promise.all`?

> Quando tenho Promises independentes que podem iniciar juntas e preciso aguardar todas. Não uso quando há dependência sequencial entre os resultados.

---

# Checklist

- Node é runtime, não linguagem.
- `package.json` organiza scripts e dependências.
- módulos isolam responsabilidades.
- TypeScript não valida runtime.
- Promises modelam resultados assíncronos.
- `async/await` simplifica o consumo de Promises.
- `Promise.all` ajuda em concorrência independente.
- I/O e CPU-bound são problemas diferentes.
- secrets ficam fora do código.
