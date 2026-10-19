# Auditoria de contratação Front-End — 110 critérios

Objetivo: avaliar este GitHub com a mentalidade de gestor de RH e recrutador técnico, procurando motivos de reprovação antes que eles apareçam em um processo seletivo.

Status usados: ✅ corrigido/evidenciado · ⚠️ depende de configuração externa do GitHub · 🔄 evolução contínua.

## 1–10 — Clareza para RH
1. ✅ Cargo-alvo explícito: Front-End Developer Júnior / Web Developer.
2. ✅ React + TypeScript aparecem no topo.
3. ✅ Objetivo de primeira oportunidade formal está claro.
4. ✅ Background financeiro é diferencial, não foco principal.
5. ✅ Linguagem evita inflar experiência produtiva.
6. ✅ Contato por LinkedIn e e-mail está visível.
7. ✅ Open to Work aparece sem excesso visual.
8. ✅ Resumo de 30 segundos reduz tempo de triagem.
9. ✅ Formação está visível.
10. ✅ Projetos prioritários são identificados para entrevista.

## 11–20 — Foco e posicionamento
11. ✅ Raiz do perfil é Front-End-first.
12. ✅ Conteúdo legado foi preservado em `legacy-portfolio/`.
13. ✅ Mainframe/COBOL não compete mais visualmente na raiz.
14. ✅ Projetos são separados entre flagships e laboratório.
15. ✅ Stack principal não é uma nuvem infinita de buzzwords.
16. ✅ React e TypeScript têm evidência em código.
17. ✅ Next.js aparece como evolução, não falsa especialização.
18. ✅ Testes aparecem com implementação real.
19. ✅ APIs REST aparecem em projetos reais.
20. ✅ GitHub Actions comprova disciplina de engenharia.

## 21–30 — Credibilidade
21. ✅ README declara que projetos de estudo não são experiência produtiva.
22. ✅ Código executável acompanha as alegações.
23. ✅ Build automatizado cobre projetos modernos.
24. ✅ TypeScript strict é checado no CI.
25. ✅ Teste automatizado é executado no CI.
26. ✅ SECURITY.md demonstra cuidado básico.
27. ✅ Dependabot mantém dependências observáveis.
28. ✅ Pull Request template demonstra fluxo colaborativo.
29. ✅ Definition of Done está documentada.
30. ✅ Auditoria estrutural automatizada reduz regressões.

## 31–40 — HTML/CSS/UX
31. ✅ Projeto vanilla evidencia HTML semântico.
32. ✅ Layout responsivo está documentado.
33. ✅ CSS Grid/Flexbox estão demonstrados.
34. ✅ Mobile-first faz parte do padrão.
35. ✅ Foco visível é considerado.
36. ✅ Skip link existe na landing acessível.
37. ✅ Inputs têm labels acessíveis nos flagships.
38. ✅ Estados vazios foram adicionados onde aplicável.
39. ✅ Estados de loading são comunicados.
40. ✅ Estados de erro têm feedback ao usuário.

## 41–50 — JavaScript/TypeScript
41. ✅ ES6+ aparece em código real.
42. ✅ async/await é usado em consumo de API.
43. ✅ Tipos de domínio foram extraídos de `main.tsx`.
44. ✅ Unions são usadas para estados finitos.
45. ✅ Tipos de Redux são derivados da store.
46. ✅ APIs retornam tipos explícitos.
47. ✅ Formulários têm validação mínima antes de mutar estado.
48. ✅ LocalStorage tem fallback seguro.
49. ✅ `strict` é validado por CI.
50. ✅ Imports de assets Vite têm tipos reconhecidos.

## 51–60 — React
51. ✅ StrictMode está ativado nos flagships refatorados.
52. ✅ Lógica de tarefas foi extraída para hook customizado.
53. ✅ Componentes deixaram de ficar concentrados em um main minificado.
54. ✅ Estado derivado usa memoização onde faz sentido.
55. ✅ Formulários usam handlers nomeados e legíveis.
56. ✅ Botões definem comportamento de submit quando necessário.
57. ✅ Renderização condicional cobre vazio/erro/loading.
58. ✅ React Router é demonstrado em projeto específico.
59. ✅ React Query é demonstrado com cache real.
60. ✅ Redux Toolkit é demonstrado com slice/store reais.

## 61–70 — APIs e dados
61. ✅ TVmaze é consumida por camada `api.ts` separada.
62. ✅ GitHub API é consumida por cliente Axios dedicado.
63. ✅ Query strings são codificadas.
64. ✅ Erros HTTP viram estado de interface.
65. ✅ Timeout é configurado no cliente GitHub.
66. ✅ React Query tem staleTime definido.
67. ✅ Refetch desnecessário em foco é desabilitado no demo.
68. ✅ Dados derivados não são armazenados duplicadamente no Redux.
69. ✅ Valores financeiros inválidos são rejeitados.
70. ✅ Formatação monetária usa `Intl` via `toLocaleString`.

## 71–80 — Testes e qualidade
71. ✅ Vitest está configurado.
72. ✅ React Testing Library está configurado.
73. ✅ Teste verifica comportamento, não implementação interna.
74. ✅ Seletores acessíveis são priorizados no teste.
75. ✅ CI impede merge confiante de build quebrado.
76. ✅ Matriz de projetos reduz validação manual.
77. ✅ Auditoria estrutural roda automaticamente.
78. ✅ Workflow usa permissões mínimas (`contents: read`).
79. ✅ Dependabot cobre npm e GitHub Actions.
80. 🔄 Aumentar cobertura de testes é evolução, não requisito fingido.

## 81–90 — Manutenibilidade
81. ✅ Tipos, API, store e UI estão separados nos flagships principais.
82. ✅ Funções têm nomes que explicam intenção.
83. ✅ Código crítico deixou de ser minificado em uma linha.
84. ✅ Constantes compartilhadas evitam strings mágicas onde relevante.
85. ✅ READMEs explicam decisões técnicas.
86. ✅ Estrutura de pastas é simples o suficiente para nível júnior.
87. ✅ Não foi introduzida arquitetura excessiva para apps pequenos.
88. ✅ Componentização serve legibilidade, não quantidade artificial de arquivos.
89. ✅ Padrão de projeto está documentado.
90. ✅ Histórico anterior foi preservado sem contaminar a leitura principal.

## 91–100 — Prontidão para processo seletivo
91. ✅ Quatro projetos têm prioridade clara para entrevista.
92. ✅ Cada flagship possui roteiro de explicação técnica no README.
93. ✅ Stack de cada projeto é explícita.
94. ✅ Comandos de execução são simples.
95. ✅ CI cria prova pública de build/test.
96. ✅ Há link para Recruiter Brief.
97. ✅ Há link para auditoria de qualidade.
98. ⚠️ Descrição curta do repositório ainda depende de permissão de configuração não disponível na integração atual.
99. ⚠️ Pins de repositórios dependem da interface/configuração do GitHub e não podem ser alterados por esta integração.
100. 🔄 Demos públicas individuais são o próximo maior ganho de conversão para recrutadores.

## 101–110 — Camada extra: júnior forte / pleno inicial
101. ✅ Arquitetura dos flagships separa bootstrap, domínio e integrações.
102. ✅ Uso de React Query demonstra estado assíncrono moderno.
103. ✅ Uso de Redux Toolkit demonstra estado global sem boilerplate manual.
104. ✅ Acessibilidade está incorporada aos componentes, não apenas citada no README.
105. ✅ Estados de interface críticos são tratados explicitamente.
106. ✅ Código ficou adequado para code review humano.
107. ✅ CI e documentação tornam decisões verificáveis.
108. ✅ O portfólio diferencia domínio atual de histórico legado.
109. 🔄 Para competir como pleno, ampliar testes, performance, Design System e deploy é a evolução correta.
110. 🔄 Para pleno consistente, experiência colaborativa/produção real continua sendo mais importante que adicionar novas tecnologias ao README.

## Resultado da auditoria

**Reprovações críticas corrigidas:** posicionamento contraditório, raiz multi-stack, CI ausente/fragilizado, erros de TypeScript, teste incompatível com tipos, READMEs superficiais, código flagship concentrado/minificado, ausência de estados vazios e separação insuficiente entre integração e UI.

**Pendências externas honestamente declaradas:** descrição curta do repositório/perfil, pins e publicação de demos dependem de configurações que a conexão atual não expõe para escrita.

**Princípio final:** este portfólio deve vender profundidade verificável, não quantidade de tecnologias.
