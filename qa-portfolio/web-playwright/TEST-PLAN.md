# Plano de Testes — QA Web Automation

## Escopo
Validar fluxos críticos de autenticação e carrinho da aplicação pública SauceDemo.

## Riscos priorizados
- usuário autorizado não conseguir acessar o sistema;
- credenciais inválidas serem aceitas;
- item não ser incluído corretamente no carrinho;
- inconsistência entre ação de compra e conteúdo do carrinho.

## Tipos de teste
- Smoke
- Funcional
- Negativo
- Regressão automatizada

## Casos cobertos

| ID | Cenário | Resultado esperado | Prioridade |
|---|---|---|---|
| WEB-001 | Login válido | Usuário acessa inventário | Alta |
| WEB-002 | Login inválido | Sistema bloqueia acesso e exibe erro | Alta |
| WEB-003 | Adicionar produto | Badge do carrinho muda para 1 | Alta |
| WEB-004 | Validar carrinho | Produto selecionado aparece no carrinho | Alta |

## Critério de saída
Todos os cenários críticos devem passar em Chromium. Falhas devem produzir evidência por screenshot/trace conforme configuração do Playwright.

## Fora de escopo nesta versão
- checkout completo;
- performance;
- acessibilidade;
- segurança;
- testes mobile.
