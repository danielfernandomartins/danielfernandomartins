# Dev City Character Lab — Front-End + IA

Experiência interativa criada a partir de um protótipo em HTML, CSS e JavaScript e refinada para demonstrar competências que aparecem em vagas Front-End: semântica, responsividade, acessibilidade, manipulação do DOM, upload de arquivos, estados assíncronos, validação e integração opcional com IA.

## O que este projeto demonstra

- HTML semântico e navegação por teclado;
- seletor de personagens sem `onclick` inline;
- layout responsivo com estados visuais claros;
- validação de tipo e tamanho de arquivo antes do processamento;
- tratamento de loading, sucesso e erro;
- fallback quando o serviço de IA não estiver disponível;
- `aria-live`, `aria-pressed`, foco visível e suporte a `prefers-reduced-motion`;
- integração browser-side com `puter.ai.txt2img` usando uma imagem de referência;
- personagens locais gerados por SVG, sem depender de assets externos ausentes.

## Decisões de engenharia

### Sem handlers inline
Toda interação foi movida para `addEventListener`, deixando marcação e comportamento separados e mais fáceis de manter e testar.

### IA como enhancement, não dependência
O seletor local continua funcional mesmo se Puter.js falhar, estiver indisponível ou exigir autenticação/créditos. Isso evita que uma integração externa derrube a experiência principal.

### Privacidade explícita
A interface informa que uma foto escolhida pelo usuário só é enviada ao serviço de IA depois da seleção e que o processamento depende do provedor externo.

### Robustez de entrada
O upload aceita PNG, JPG e WEBP e rejeita arquivos acima de 8 MB antes de qualquer chamada de IA.

## Estrutura

- `index.html` — estrutura semântica e conteúdo;
- `styles.css` — design system local, responsividade e acessibilidade visual;
- `scripts.js` — estado da interface, upload, validação e integração de IA.

## Como executar

Abra `index.html` em um navegador moderno. Para usar o modo IA, é necessária conexão com a internet para carregar Puter.js e o usuário pode precisar autenticar ou possuir créditos conforme as regras do serviço.

## Evoluções futuras

- testes automatizados do comportamento de upload e troca de personagem;
- captura de métricas Web Vitals em ambiente publicado;
- opção de download da imagem gerada;
- histórico local de variações geradas pelo usuário.

> Projeto de portfólio e estudo aplicado. Não é apresentado como produto em produção.
