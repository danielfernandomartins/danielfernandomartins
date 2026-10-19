# WCAG 2.2 — acessibilidade como requisito de produto

WCAG 2.2 é uma Recomendação W3C e adiciona novos critérios em relação à WCAG 2.1. Em 2025 foi publicada também uma tradução autorizada para português brasileiro.

## Pontos atuais que um Front-End precisa considerar

WCAG 2.2 amplia a atenção para navegação por teclado, foco, tamanho de alvos e alternativas a interações difíceis.

Na prática, eu verificaria principalmente:

- foco visível e não encoberto;
- ordem de tabulação coerente;
- alvos de interação com tamanho e espaçamento adequados;
- formulários com labels, instruções e erros associados semanticamente;
- alternativas a gestos complexos ou ações de arrastar;
- autenticação que não dependa exclusivamente de desafios cognitivos;
- contraste de texto, componentes e estados;
- semântica HTML antes de recorrer a ARIA.

## Automação ajuda, mas não certifica

Ferramentas como Axe detectam uma parte importante das violações, mas não conseguem avaliar sozinhas qualidade da navegação por teclado, clareza de conteúdo, fluxo com leitor de tela ou experiência cognitiva.

Uma estratégia madura combina:

1. HTML semântico;
2. lint e testes automatizados;
3. Axe/Lighthouse no CI ou E2E;
4. teste manual de teclado e foco;
5. validação com tecnologia assistiva quando o contexto exigir.

## Aplicação no portfólio

O TaskFlow deste repositório já usa Playwright + Axe como gate automatizado no navegador real. Esse tipo de verificação é tratado como camada de qualidade, não como declaração de conformidade WCAG.

## Fontes primárias

- W3C — novidades da WCAG 2.2: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Tradução autorizada pt-BR: https://www.w3.org/WAI/news/2025-03-27/wcag-22-brazilian-portuguese/
