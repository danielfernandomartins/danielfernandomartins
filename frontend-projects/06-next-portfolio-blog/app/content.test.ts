import { describe, expect, it } from 'vitest';
import { countPortfolioSignals, findNoteBySlug, notes, projects } from './content';

describe('portfolio content', () => {
  it('mantém projetos com nome, stack e resultado explícitos', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4);
    expect(projects.every((project) => project.name && project.stack && project.outcome)).toBe(true);
  });

  it('mantém notas técnicas distribuídas por temas', () => {
    const signals = countPortfolioSignals();
    expect(signals.notes).toBe(notes.length);
    expect(signals.topics).toBeGreaterThanOrEqual(3);
  });

  it('mantém slugs únicos e conteúdo suficiente para rotas estáticas', () => {
    const slugs = notes.map((note) => note.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(notes.every((note) => note.body.length >= 2)).toBe(true);
  });

  it('localiza uma nota pelo slug usado no App Router', () => {
    const note = findNoteBySlug('typescript-no-front-end');
    expect(note?.title).toBe('TypeScript no Front-End');
    expect(findNoteBySlug('slug-inexistente')).toBeUndefined();
  });
});
