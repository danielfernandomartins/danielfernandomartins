import { describe, expect, it } from 'vitest';
import { buildUserPath } from './api';

describe('buildUserPath', () => {
  it('normaliza espaços e codifica o username com segurança', () => {
    expect(buildUserPath(' daniel dev ')).toBe('/users/daniel%20dev');
  });

  it('mantém usernames simples legíveis', () => {
    expect(buildUserPath('danielfernandomartins')).toBe('/users/danielfernandomartins');
  });
});
