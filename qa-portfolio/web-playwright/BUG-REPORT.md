# Bug Report Example — QA Web

Exemplo de registro de defeito para demonstrar organização, clareza de evidências e comunicação com times de Produto e Desenvolvimento.

## BUG-001 — Produto removido continua contabilizado no carrinho

**Severidade:** Média  
**Prioridade:** Média  
**Ambiente:** Web / Chromium  
**Status:** Exemplo de documentação de portfólio

## Pré-condições

- usuário autenticado;
- pelo menos um produto disponível no catálogo.

## Passos para reproduzir

1. Acessar a lista de produtos.
2. Adicionar um produto ao carrinho.
3. Abrir o carrinho.
4. Remover o produto.
5. Observar o contador do carrinho.

## Resultado esperado

O produto deve ser removido e o contador deve refletir a quantidade real de itens.

## Resultado observado

Neste exemplo didático, o contador permaneceria desatualizado após a remoção.

## Impacto de negócio

Uma divergência entre o carrinho exibido e o estado real pode gerar confusão para o usuário e reduzir confiança no fluxo de compra.

## Evidências recomendadas em cenário real

- screenshot;
- vídeo ou trace;
- console do navegador;
- versão do browser;
- dados usados no teste;
- horário e ambiente da execução.

> Este arquivo é um exemplo de como eu documentaria um defeito. Ele não afirma a existência desse bug no SauceDemo.
