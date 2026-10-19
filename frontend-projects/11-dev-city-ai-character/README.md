# Dev City Character Lab — Front-End + IA

Experiência interativa criada a partir de um protótipo em HTML, CSS e JavaScript e refinada para demonstrar competências que aparecem em vagas Front-End: semântica, responsividade, acessibilidade, manipulação do DOM, upload de arquivos, estados assíncronos, validação, modularização e integração opcional com IA.

## O que este projeto demonstra

- HTML semântico e navegação por teclado;
- seletor de personagens sem `onclick` inline;
- layout responsivo com estados visuais claros;
- validação de tipo e tamanho de arquivo antes do processamento;
- tratamento de loading, sucesso e erro;
- fallback quando o serviço de IA não estiver disponível;
- `aria-live`, `aria-pressed`, foco visível e suporte a `prefers-reduced-motion`;
- integração browser-side com `puter.ai.txt2img` usando uma imagem de referência;
- personagens locais gerados por SVG, sem depender de assets externos ausentes;
- regras de domínio extraídas para módulo independente e cobertas por testes nativos do Node.

## Decisões de engenharia

### Sem handlers inline
Toda interação foi movida para `addEventListener`, deixando marcação e comportamento separados e mais fáceis de manter e testar.

### Domínio separado da UI
Validação de arquivos, normalização da resposta da IA e geração dos avatares locais ficam em `domain.mjs`. Isso permite testar regras críticas sem depender do DOM ou de bibliotecas de teste de navegador.

### IA como enhancement, não dependência
O seletor local continua funcional mesmo se Puter.js falhar, estiver indisponível ou exigir autenticação/créditos. Isso evita que uma integração externa derrube a experiência principal.

### Privacidade explícita
A interface informa que uma foto escolhida pelo usuário só é enviada ao serviço de IA depois da seleção e que o processamento depende do provedor externo.

### Robustez de entrada
O upload aceita PNG, JPG e WEBP e rejeita arquivos acima de 8 MB antes de qualquer chamada de IA.

## Testes automatizados

`node --test domain.test.mjs`

A suíte cobre formatos aceitos, limite de tamanho, respostas válidas e inválidas do serviço de IA e geração do avatar SVG. Esses testes também são executados pela auditoria estrutural do repositório no GitHub Actions.

## Estrutura

- `index.html` — estrutura semântica e conteúdo;
- `styles.css` — design system local, responsividade e acessibilidade visual;
- `scripts.js` — estado da interface e integração com o navegador;
- `domain.mjs` — regras puras e reutilizáveis;
- `domain.test.mjs` — testes automatizados com `node:test`.

## Como executar

Por usar módulos ES nativos, sirva a pasta por HTTP local em vez de abrir com `file://`. Exemplo: `python -m http.server 8000` e acesse `http://localhost:8000` dentro desta pasta. Para usar o modo IA, é necessária conexão com a internet para carregar Puter.js e o usuário pode precisar autenticar ou possuir créditos conforme as regras do serviço.

## Evoluções futuras

- teste de integração do DOM em navegador;
- captura de métricas Web Vitals em ambiente publicado;
- opção de download da imagem gerada;
- histórico local de variações geradas pelo usuário.

> Projeto de portfólio e estudo aplicado. Não é apresentado como produto em produção.
