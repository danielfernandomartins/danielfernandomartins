# Commerce Storefront

Projeto Front-End em React + TypeScript que simula uma vitrine de e-commerce com busca, filtro por categoria, carrinho e totalização.

## O que este projeto demonstra
- estado local e estado derivado;
- filtros combinados e busca normalizada;
- regras de negócio isoladas e testáveis;
- acessibilidade básica com labels, foco e `aria-live`;
- layout responsivo;
- TypeScript strict;
- testes unitários com Vitest.

## Executar
```bash
npm install
npm run typecheck
npm test
npm run build
```

## Decisões técnicas
As regras de filtro e cálculo de carrinho ficam fora dos componentes para manter a UI simples, facilitar testes e reduzir acoplamento. O catálogo usa dados locais para concentrar a demonstração em estado, interação e qualidade de código, sem fingir integração produtiva de e-commerce.
