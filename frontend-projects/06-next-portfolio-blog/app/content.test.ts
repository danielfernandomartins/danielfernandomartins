import { describe, expect, it } from 'vitest';
import { countPortfolioSignals, notes, projects } from './content';

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
});
