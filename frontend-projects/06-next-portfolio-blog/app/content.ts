export type PortfolioProject = {
  name: string;
  stack: string;
  outcome: string;
};

export type TechnicalNote = {
  slug: string;
  title: string;
  summary: string;
  topic: 'UX' | 'Qualidade' | 'TypeScript';
  body: string[];
};

export const projects: PortfolioProject[] = [
  {
    name: 'TaskFlow',
    stack: 'React + TypeScript',
    outcome: 'Estado local, filtros, persistência e testes de domínio.',
  },
  {
    name: 'Movie Explorer',
    stack: 'REST API + React',
    outcome: 'Busca assíncrona com loading, erro e camada HTTP testada.',
  },
  {
    name: 'Finance Dashboard',
    stack: 'Redux Toolkit',
    outcome: 'Estado global e dados derivados para um fluxo financeiro.',
  },
  {
    name: 'GitHub Explorer',
    stack: 'TanStack Query + Axios',
    outcome: 'Cache, requisições e estados assíncronos explícitos.',
  },
];

export const notes: TechnicalNote[] = [
  {
    slug: 'como-penso-responsividade',
    title: 'Como penso responsividade',
    summary: 'Começo pela hierarquia de conteúdo e adapto layout, tipografia e interação a partir do menor viewport.',
    topic: 'UX',
    body: [
      'Responsividade começa antes do media query: primeiro defino o que precisa continuar legível e utilizável quando o espaço diminui.',
      'Depois valido hierarquia, largura de leitura, controles de toque e mudanças de layout sem esconder conteúdo importante.',
    ],
  },
  {
    slug: 'estados-de-ui-importam',
    title: 'Estados de UI importam',
    summary: 'Loading, vazio, sucesso e erro fazem parte da experiência e precisam ser tratados como requisitos de produto.',
    topic: 'Qualidade',
    body: [
      'Uma interface não existe apenas no cenário de sucesso. Requisições atrasam, listas ficam vazias e serviços externos falham.',
      'Tratar esses estados explicitamente reduz ambiguidade para o usuário e também deixa o código mais fácil de revisar e testar.',
    ],
  },
  {
    slug: 'typescript-no-front-end',
    title: 'TypeScript no Front-End',
    summary: 'Uso tipos para tornar contratos e estados mais explícitos sem transformar o código em burocracia.',
    topic: 'TypeScript',
    body: [
      'Tipos são mais valiosos quando documentam contratos reais: respostas de API, estados finitos, props e dados de domínio.',
      'Prefiro tipos simples e próximos do problema a abstrações genéricas que aumentam complexidade sem reduzir risco.',
    ],
  },
];

export function findNoteBySlug(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export function countPortfolioSignals() {
  return {
    projects: projects.length,
    notes: notes.length,
    topics: new Set(notes.map((note) => note.topic)).size,
  };
}
