# TypeScript 6.0 — mudanças relevantes para apps modernos

TypeScript 6.0 é uma release de transição importante rumo ao compilador nativo do TypeScript 7.0. Ela também ajusta padrões antigos para refletir o ecossistema atual de ESM, bundlers e runtimes evergreen.

## Mudanças que merecem atenção

### `strict` por padrão

TypeScript 6.0 passa a assumir `strict: true` por padrão. Em aplicações modernas isso reforça uma prática já desejável: tornar contratos explícitos e reduzir estados impossíveis antes do runtime.

### `module` e `target` mais modernos

O padrão de `module` passa para `esnext` e o `target` acompanha uma versão moderna de ECMAScript. Isso reduz a herança de configurações criadas para navegadores e runtimes antigos.

### `types` passa a ser explícito

O carregamento global de pacotes `@types` deixa de ser implícito. Projetos devem declarar apenas os tipos globais realmente necessários, por exemplo Node ou o ambiente do test runner.

**Por que importa:** melhora previsibilidade e pode reduzir custo de type-checking em projetos grandes.

### `moduleResolution node` legado em retirada

Para aplicações empacotadas, `moduleResolution: bundler` passa a ser a estratégia mais alinhada ao fluxo moderno. Para Node.js direto, `nodenext` tende a refletir melhor o runtime.

### ES2025 e APIs modernas

TypeScript 6 adiciona suporte de tipos para APIs recentes, incluindo `RegExp.escape`, novos métodos de coleções e tipos para `Temporal` em `esnext`.

## Decisões práticas

Em aplicações Front-End eu manteria:

- `strict` explícito no `tsconfig` mesmo quando já for padrão;
- tipos de domínio próximos das regras de negócio;
- unions para estados finitos de interface;
- validação de runtime para dados externos — TypeScript não valida respostas de API;
- configuração compatível com o bundler real usado pelo projeto.

Tipagem forte ajuda a engenharia, mas não substitui testes, validação de entrada ou tratamento de erro.

## Fonte primária

- TypeScript 6.0 release notes: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html
