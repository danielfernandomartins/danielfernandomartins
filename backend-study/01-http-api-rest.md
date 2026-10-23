# 01 — HTTP, Cliente, Servidor, API e REST

## 1. Front-End x Back-End

**Front-End** é a parte com a qual o usuário interage diretamente: telas, formulários, botões, feedback visual e navegação.

**Back-End** recebe requisições, executa regras de negócio, valida dados, consulta ou altera o banco e devolve respostas.

Fluxo:

```text
React → HTTP → API Node.js → PostgreSQL
React ← HTTP ← API Node.js ← PostgreSQL
```

### Resposta de entrevista

**Pergunta:** Qual a diferença entre Front-End e Back-End?

**Resposta modelo:**

> O Front-End cuida da interface e da interação com o usuário. O Back-End cuida das regras de negócio, processamento, segurança, persistência e integração com outros serviços. Eles normalmente se comunicam por HTTP usando uma API.

---

## 2. Cliente e servidor

**Cliente** é quem inicia a comunicação. Exemplos: navegador, app mobile, React, Postman ou outro servidor.

**Servidor** recebe requisições e devolve respostas.

Exemplo:

```http
GET /users/10 HTTP/1.1
Host: api.exemplo.com
```

Resposta:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 10,
  "name": "Daniel"
}
```

### Resposta de entrevista

> Cliente é quem faz a requisição. Servidor é quem recebe, processa e responde. Um servidor pode também atuar como cliente quando chama outro serviço externo.

---

## 3. O que é HTTP?

HTTP é um protocolo de comunicação baseado em **requisição e resposta**.

Uma requisição normalmente contém:

- método;
- URL;
- headers;
- body, quando necessário.

Uma resposta normalmente contém:

- status code;
- headers;
- body.

---

## 4. Métodos HTTP

| Método | Uso comum | Exemplo |
|---|---|---|
| GET | buscar | `GET /users` |
| POST | criar | `POST /users` |
| PUT | substituir recurso | `PUT /users/10` |
| PATCH | alteração parcial | `PATCH /users/10` |
| DELETE | remover | `DELETE /users/10` |

### PUT x PATCH

**PUT** representa substituição completa do recurso em um modelo REST mais estrito.

**PATCH** representa alteração parcial.

Exemplo:

```http
PATCH /users/10
Content-Type: application/json

{
  "name": "Daniel Martins"
}
```

### Resposta de entrevista

> Eu uso PATCH quando quero alterar apenas parte de um recurso. PUT é mais apropriado quando a representação enviada substitui o recurso inteiro.

---

## 5. Status HTTP essenciais

### Sucesso

- `200 OK`: operação concluída com resposta.
- `201 Created`: recurso criado.
- `204 No Content`: sucesso sem body de resposta.

### Erro do cliente

- `400 Bad Request`: requisição inválida.
- `401 Unauthorized`: autenticação ausente ou inválida.
- `403 Forbidden`: usuário autenticado, mas sem permissão.
- `404 Not Found`: recurso não encontrado.
- `409 Conflict`: conflito de estado, como e-mail duplicado.
- `422 Unprocessable Content`: dados entendidos, mas semanticamente inválidos.

### Erro do servidor

- `500 Internal Server Error`: erro inesperado no servidor.

### 401 x 403

**401:** não comprovou identidade corretamente.

**403:** identidade conhecida, mas acesso negado.

### Resposta de entrevista

> 401 está ligado a autenticação; 403, a autorização. Um usuário pode estar autenticado e ainda assim não ter permissão para acessar determinado recurso.

---

## 6. URL, rota, path param e query string

URL:

```text
https://api.exemplo.com/users/10?include=orders
```

Partes importantes:

```text
https                  protocolo
api.exemplo.com        host
/users/10              path
10                     path parameter
?include=orders        query string
```

### Path parameter

Identifica um recurso específico:

```http
GET /users/10
```

Em Express:

```ts
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
});
```

### Query string

Serve para filtros, ordenação, paginação e opções:

```http
GET /products?category=books&page=2&limit=20
```

Em Express:

```ts
const { category, page, limit } = req.query;
```

### Resposta de entrevista

> Path params normalmente identificam o recurso; query params modificam a forma como uma coleção ou consulta é retornada, por exemplo filtros e paginação.

---

## 7. Headers

Headers carregam metadados.

Exemplos:

```http
Content-Type: application/json
Authorization: Bearer <token>
Accept: application/json
```

### `Content-Type`

Informa o formato do body enviado.

### `Authorization`

Transporta credenciais ou tokens em muitos tipos de API.

---

## 8. Body

Body é o corpo da requisição.

```http
POST /users
Content-Type: application/json

{
  "name": "Daniel",
  "email": "daniel@example.com"
}
```

O servidor não deve confiar automaticamente nesses dados. Deve validar tipos, obrigatoriedade, formatos e regras de negócio.

---

## 9. O que é uma API?

API é uma interface que permite a comunicação entre softwares.

Uma API Web pode expor endpoints como:

```text
GET    /users
GET    /users/:id
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

### Endpoint

É uma combinação relevante de método + caminho.

`GET /users` e `POST /users` usam o mesmo caminho, mas representam operações diferentes.

---

## 10. REST

REST é um estilo arquitetural para sistemas distribuídos. Em APIs Web, costuma inspirar:

- recursos representados por URLs;
- uso semântico dos métodos HTTP;
- respostas com status apropriados;
- comunicação stateless entre requisições;
- representações como JSON.

### URL melhor

```text
GET /users/10/orders
```

Em vez de:

```text
GET /getOrdersFromUser?id=10
```

O primeiro modelo comunica recursos e relações de forma mais consistente.

### Stateless

Cada requisição deve carregar as informações necessárias para ser processada. O servidor não deve depender de “lembrar” uma requisição HTTP anterior apenas porque veio do mesmo cliente.

---

## 11. JSON

JSON é um formato textual de dados muito usado em APIs.

```json
{
  "id": 1,
  "name": "Daniel",
  "active": true,
  "roles": ["user"]
}
```

JSON não suporta diretamente `undefined`, funções, classes ou `Date` como tipo nativo. Datas geralmente trafegam como strings.

---

# Exercícios resolvidos

## Exercício 1

**Pergunta:** Qual método usar para cadastrar um produto?

**Resposta:** `POST`.

```http
POST /products
```

---

## Exercício 2

**Pergunta:** Um usuário pediu `/users/999`, mas não existe. Qual status?

**Resposta:** `404 Not Found`.

```json
{
  "message": "User not found"
}
```

---

## Exercício 3

**Pergunta:** O usuário enviou e-mail em formato inválido.

**Resposta:** Pode ser `400` ou `422`, de acordo com a convenção definida pela API. O importante é manter consistência e explicar a decisão.

---

## Exercício 4

**Pergunta:** Usuário fez login, mas tentou acessar rota exclusiva de administrador.

**Resposta:** `403 Forbidden`.

---

## Exercício 5

**Pergunta:** Diferencie estes dois endpoints.

```text
GET /users/10
GET /users?active=true
```

**Resposta:** O primeiro busca um usuário identificado por path param. O segundo busca uma coleção de usuários filtrada por query string.

---

# Mini entrevista resolvida

### O que acontece quando o Front-End chama uma API?

> O Front-End envia uma requisição HTTP para um endpoint. Ela contém método, URL, headers e eventualmente body. O Back-End recebe, valida os dados, executa regras de negócio, pode consultar ou modificar o banco e devolve uma resposta HTTP com status e normalmente JSON.

### O que é REST?

> É um estilo arquitetural. Em APIs Web, eu aplico recursos bem definidos, métodos HTTP com significado, status coerentes e requisições stateless. REST não significa apenas devolver JSON.

### O que é um endpoint?

> É um ponto de acesso da API. Na prática, método e rota juntos definem uma operação, por exemplo `GET /users/:id`.

### GET pode ter body?

> Alguns componentes técnicos até podem aceitar, mas não é a forma interoperável e usual para APIs HTTP. Para filtros em GET, prefiro path e query parameters.

### POST é apenas para criar?

> Criação é o uso mais comum em REST, mas POST também pode representar operações que não se encaixam bem em métodos idempotentes. A semântica deve ser documentada.

---

# Checklist de domínio

Você está pronto para avançar quando conseguir explicar sem olhar:

- cliente e servidor;
- request e response;
- GET, POST, PUT, PATCH e DELETE;
- 200, 201, 204, 400, 401, 403, 404 e 500;
- path param x query param;
- header x body;
- API x endpoint;
- o significado de REST e stateless.
