# TaskFlow — React + TypeScript

Gerenciador de tarefas construído para demonstrar fundamentos de React com tipagem, estado local, filtros, persistência e testes em três camadas: domínio, comportamento da interface e navegador real.

## Problema que resolve
Organizar tarefas de forma simples, permitindo criar, concluir, excluir e filtrar itens sem perder os dados ao recarregar a página.

## O que este projeto demonstra
- componentes funcionais e renderização condicional;
- `useState`, `useEffect` e `useMemo`;
- tipagem de entidades com TypeScript;
- filtros derivados do estado;
- persistência segura com `LocalStorage`;
- interface responsiva e controles acessíveis;
- testes unitários das regras de domínio;
- testes React Testing Library para criar, concluir, filtrar e remover tarefas;
- Playwright E2E em Chromium para validar fluxo completo e persistência após reload;
- auditoria automatizada com Axe no navegador real para detectar violações de acessibilidade que a ferramenta consegue identificar.

## Estratégia de testes

**Domínio:** regras puras de criação, contagem e filtros.  
**Integração/UI:** eventos e estados observados pelo usuário no jsdom.  
**E2E:** navegador real executando o build de produção, criando/concluindo/filtrando tarefas e validando LocalStorage após recarregar a página.  
**Acessibilidade automatizada:** Axe analisa o fluxo preenchido no Chromium e falha o CI quando encontra violações detectáveis automaticamente.

Cada camada cobre um tipo diferente de risco. A análise Axe é uma proteção automatizada importante, mas **não é tratada como certificação de conformidade WCAG** e não substitui revisão manual, teclado, leitor de tela ou testes com usuários.

## Decisões técnicas
O estado permanece local porque o domínio é pequeno. A persistência fica isolada no hook e tolera storage indisponível ou dados inválidos. Os testes de domínio validam regras puras; os testes de interface exercitam o React; o Playwright valida o comportamento conectado no navegador real usando roles e labels acessíveis.

## Stack
React · TypeScript · Vite · LocalStorage · Vitest · React Testing Library · Playwright · Axe · jsdom · ESLint

## Como executar
```bash
npm install
npm run dev
```

## Validação
```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

O CI instala Chromium e executa o fluxo E2E e a checagem Axe em um job dedicado, separado da matriz de testes unitários.
