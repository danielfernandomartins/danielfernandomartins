# 05 — Autenticação, Segurança e Testes

## 1. Autenticação x autorização

**Autenticação** responde: quem é você?

**Autorização** responde: o que você pode fazer?

### Resposta de entrevista

> Primeiro autentico a identidade. Depois verifico se aquela identidade possui permissão para a operação solicitada.

---

## 2. Senhas

Nunca salve senha em texto puro.

Fluxo correto:

```text
senha recebida
   ↓
hash com algoritmo apropriado
   ↓
salvar apenas hash
```

No login:

```text
senha informada
   ↓
comparação segura com hash armazenado
   ↓
válida / inválida
```

### Hash x criptografia

Hash de senha é unidirecional por projeto. Não precisamos recuperar a senha original.

Criptografia é reversível com chave.

### Resposta de entrevista

> Para senha uso hash específico para passwords, como bcrypt ou Argon2, e nunca criptografia reversível nem texto puro.

---

## 3. JWT

JWT é um formato de token assinado.

Estrutura conceitual:

```text
header.payload.signature
```

O payload pode conter identificadores e claims, mas não deve carregar segredos apenas porque é assinado.

Exemplo de payload:

```json
{
  "sub": "user-id",
  "role": "user"
}
```

### JWT não é automaticamente seguro

É preciso cuidar de:

- expiração;
- algoritmo;
- chave de assinatura;
- armazenamento;
- revogação/rotação quando necessário;
- validação correta.

---

## 4. Cookies

Cookies podem transportar sessão ou token.

Flags relevantes:

- `HttpOnly`: JavaScript do navegador não acessa diretamente;
- `Secure`: enviado apenas em HTTPS;
- `SameSite`: ajuda no controle de envio entre sites.

### Token em localStorage x cookie HttpOnly

Não existe resposta universal. Para aplicações Web tradicionais, cookies HttpOnly reduzem exposição a roubo direto por JavaScript em XSS, mas exigem atenção a CSRF e configuração de cookie. O desenho depende do modelo de ameaça.

---

## 5. Sessão x JWT

### Sessão server-side

Servidor guarda estado de sessão, cliente guarda identificador.

Vantagens:

- revogação simples;
- controle centralizado.

### JWT stateless

Servidor pode validar assinatura sem consultar uma sessão central em todo request.

Vantagens:

- útil em alguns sistemas distribuídos.

Desvantagens:

- revogação pode ser mais complexa;
- não elimina necessidade de banco ou cache em muitos casos.

### Resposta de entrevista

> Eu não escolheria JWT só porque é popular. Sessão e token resolvem problemas diferentes. A escolha depende de arquitetura, revogação, escala e clientes envolvidos.

---

## 6. CORS

CORS controla acesso do navegador entre origens.

Exemplo:

```ts
app.use(cors({
  origin: 'https://frontend.example.com',
  credentials: true
}));
```

CORS não protege uma API contra clientes fora do navegador.

---

## 7. CSRF

CSRF explora o fato de o navegador enviar credenciais automaticamente, como cookies.

Defesas possíveis:

- `SameSite` adequado;
- token CSRF em certos cenários;
- validação de origem;
- desenho correto de autenticação.

---

## 8. XSS

XSS acontece quando conteúdo não confiável vira script executável no navegador.

No Back-End:

- não confie em input;
- evite retornar HTML inseguro;
- use headers/políticas apropriadas;
- coordene segurança com Front-End.

---

## 9. SQL Injection

Evite concatenação.

Ruim:

```ts
`SELECT * FROM users WHERE email = '${email}'`
```

Use parâmetros ou ORM corretamente.

---

## 10. Rate limiting

Limita quantidade de requisições por janela.

Útil em:

- login;
- recuperação de senha;
- APIs públicas;
- endpoints caros.

Não substitui outras medidas de segurança.

---

## 11. Validação e sanitização

Validação pergunta: o dado está no formato permitido?

Sanitização transforma/limpa conteúdo quando apropriado.

Exemplo:

```ts
const schema = z.object({
  email: z.string().trim().toLowerCase().email()
});
```

Cuidado: não sanitize cegamente dados cuja forma original é importante.

---

## 12. Princípio do menor privilégio

Usuário do banco usado pela aplicação deve ter apenas permissões necessárias.

Também vale para:

- tokens;
- serviços externos;
- CI;
- secrets;
- permissões administrativas.

---

## 13. Logs

Logue contexto útil, mas não segredos.

Nunca logar deliberadamente:

- senhas;
- tokens completos;
- chaves privadas;
- secrets;
- dados pessoais desnecessários.

---

# Testes

## 14. Teste unitário

Testa unidade isolada.

```ts
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

Teste:

```ts
it('calculates total', () => {
  expect(calculateTotal([
    { price: 10, quantity: 2 },
    { price: 5, quantity: 1 }
  ])).toBe(25);
});
```

---

## 15. Teste de integração

Testa componentes trabalhando juntos.

Exemplo:

```text
HTTP → controller → service → banco de teste
```

Com Supertest:

```ts
const response = await request(app)
  .post('/users')
  .send({
    name: 'Daniel',
    email: 'daniel@example.com',
    password: '12345678'
  });

expect(response.status).toBe(201);
```

---

## 16. O que testar numa API?

Para `POST /users`:

- cria usuário válido;
- rejeita e-mail inválido;
- rejeita senha curta;
- rejeita e-mail duplicado;
- não retorna password hash;
- persiste dados esperados.

---

## 17. Arrange, Act, Assert

```ts
it('rejects duplicate email', async () => {
  // Arrange
  await createExistingUser();

  // Act
  const response = await request(app)
    .post('/users')
    .send(validUser);

  // Assert
  expect(response.status).toBe(409);
});
```

---

## 18. Banco de teste

Não rode testes destrutivos contra banco de produção.

Use ambiente isolado:

```env
DATABASE_URL=postgresql://.../app_test
```

Cada teste deve evitar depender de ordem de execução.

---

## 19. Mock

Mock substitui dependência para isolar comportamento.

Exemplo: service de e-mail.

Mas mock em excesso pode testar uma realidade artificial.

### Resposta de entrevista

> Uso mock quando quero isolar uma unidade ou evitar dependência externa instável. Para validar integração real entre API e banco, prefiro testes de integração com infraestrutura isolada.

---

## 20. Pirâmide prática

Em vez de perseguir números arbitrários de cobertura:

- muitos testes rápidos para regras puras;
- testes de integração para caminhos críticos;
- poucos E2E completos.

O foco é confiança, não porcentagem bonita.

---

# Exercícios resolvidos

## 1. Password hash pode voltar na resposta?

Não. Mesmo hash é sensível e não é necessário para o cliente.

---

## 2. JWT criptografa payload?

JWT assinado comum não criptografa. Payload pode ser decodificado. Assinatura garante integridade/autenticidade conforme o esquema usado.

---

## 3. CORS protege de Postman?

Não. É uma política aplicada principalmente pelo navegador.

---

## 4. Por que testar e-mail duplicado?

Porque é regra de negócio importante e também deve ter constraint no banco. O teste prova a resposta esperada da API.

---

## 5. Mockar banco em todos os testes é suficiente?

Não. Você pode perder problemas de schema, migration, query e integração. Tenha testes de integração reais onde fizer sentido.

---

# Mini entrevista resolvida

### Autenticação x autorização?

> Autenticação prova identidade; autorização verifica permissão.

### Por que não guardar senha em texto puro?

> Um vazamento entregaria todas as credenciais. Hash específico para senha torna impraticável recuperar diretamente a senha original e adiciona resistência a ataques de força bruta conforme configuração.

### JWT x sessão?

> Ambos podem autenticar sessões de usuário. Sessão mantém estado no servidor; JWT pode carregar claims assinadas e ser validado sem sessão central em alguns desenhos. Escolho pelo contexto, não pela moda.

### Unitário x integração?

> Unitário isola uma unidade. Integração verifica componentes reais trabalhando juntos, por exemplo rota, service e banco.

### O que você faria para proteger login?

> Hash de senha, validação, mensagens que não vazem informação desnecessária, rate limiting, transporte HTTPS, gestão segura de sessão/token, logs sem segredos e monitoramento.

---

# Checklist

- autenticação x autorização;
- password hashing;
- JWT e sessão;
- cookies HttpOnly/Secure/SameSite;
- CORS;
- CSRF;
- XSS;
- SQL Injection;
- rate limiting;
- menor privilégio;
- unitário x integração;
- Supertest;
- banco isolado de teste;
- mock com propósito.
