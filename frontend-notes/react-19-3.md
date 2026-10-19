# React 19.3 — APIs e decisões que importam

React 19.3 é a versão mais recente documentada oficialmente em outubro de 2026. A release estabiliza recursos que afetam transições visuais, integração com SSR e segurança no DOM.

## O que merece atenção

### View Transitions estável

`<ViewTransition>` permite coordenar animações de entrada, saída, atualização e compartilhamento de elementos durante transições. O ponto importante não é “animar por animar”, mas integrar movimento ao fluxo de renderização do React e a estados assíncronos como `Suspense`.

**Aplicação prática:** usar em mudanças de contexto, navegação visual ou revelação de conteúdo quando a animação ajuda o usuário a entender continuidade. Evitar em interações urgentes ou quando movimento excessivo prejudica acessibilidade.

### `browser()` para componentes dependentes do ambiente cliente

Em cenários de SSR, alguns componentes dependem de APIs exclusivas do navegador, como `localStorage` ou timezone local. React 19.3 adiciona uma forma explícita de suspender esse conteúdo no servidor e renderizá-lo apenas no cliente.

**Aplicação prática:** preferir SSR quando existe HTML útil para entregar. Usar opt-out apenas quando o conteúdo realmente não pode ser determinado no servidor.

### Trusted Types

React 19.3 passa a integrar melhor com a API Trusted Types do navegador, importante em políticas de Content Security Policy voltadas à prevenção de XSS baseado em DOM.

**Aplicação prática:** segurança de Front-End não termina em escaping automático. Aplicações que trabalham com HTML dinâmico devem combinar CSP, sanitização e APIs seguras.

### Context em Server Components

Server Components podem renderizar diretamente um Context importado de um módulo cliente, reduzindo wrappers que existiam apenas para repassar valor.

## Decisão de engenharia

Nem toda novidade precisa entrar em um projeto imediatamente. Eu avaliaria adoção por:

- suporte real do framework usado;
- impacto sobre UX e manutenção;
- compatibilidade de navegador;
- custo de migração;
- facilidade de teste.

## Fonte primária

- React 19.3: https://react.dev/blog/2026/09/09/react-19-3
- Versões do React: https://react.dev/versions
