export type PortfolioProject = {
  name: string;
  stack: string;
  outcome: string;
};

export type TechnicalNote = {
  title: string;
  summary: string;
  topic: 'UX' | 'Qualidade' | 'TypeScript';
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
    title: 'Como penso responsividade',
    summary: 'Começo pela hierarquia de conteúdo e adapto layout, tipografia e interação a partir do menor viewport.',
    topic: 'UX',
  },
  {
    title: 'Estados de UI importam',
    summary: 'Loading, vazio, sucesso e erro fazem parte da experiência e precisam ser tratados como requisitos de produto.',
    topic: 'Qualidade',
  },
  {
    title: 'TypeScript no Front-End',
    summary: 'Uso tipos para tornar contratos e estados mais explícitos sem transformar o código em burocracia.',
    topic: 'TypeScript',
  },
];

export function countPortfolioSignals() {
  return {
    projects: projects.length,
    notes: notes.length,
    topics: new Set(notes.map((note) => note.topic)).size,
  };
}
