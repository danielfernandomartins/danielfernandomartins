# BDD Scenarios — QA Web

Cenários em formato **Given / When / Then** para demonstrar design de testes e comunicação clara com Produto, Desenvolvimento e áreas de negócio.

## Feature: Login

### Scenario: login com credenciais válidas
**Given** que o usuário está na página de login  
**And** possui credenciais válidas  
**When** informa usuário e senha  
**And** confirma o login  
**Then** deve acessar a área de produtos  
**And** a URL deve indicar a página de inventário

### Scenario: login com senha inválida
**Given** que o usuário está na página de login  
**When** informa um usuário válido e uma senha inválida  
**And** confirma o login  
**Then** o acesso deve ser bloqueado  
**And** uma mensagem de erro deve ser apresentada

## Feature: Carrinho

### Scenario: adicionar produto ao carrinho
**Given** que o usuário autenticado está na lista de produtos  
**When** adiciona um produto ao carrinho  
**Then** o indicador do carrinho deve ser atualizado  
**And** o produto deve aparecer na página do carrinho

### Scenario: remover produto do carrinho
**Given** que existe um produto no carrinho  
**When** o usuário remove esse produto  
**Then** o item não deve mais aparecer no carrinho  
**And** o contador deve refletir a quantidade atual

## Por que este artefato importa

O objetivo não é apenas automatizar testes. Em times reais, QA também precisa transformar requisitos e comportamentos esperados em cenários compreensíveis por pessoas técnicas e não técnicas.
