import { describe, expect, it } from 'vitest';
import { signupSchema } from './schema';

describe('signupSchema', () => {
  it('accepts a valid signup payload', () => {
    const result = signupSchema.safeParse({
      name: 'Daniel',
      email: 'daniel@example.com',
      password: 'Senha123',
      confirm: 'Senha123',
    });

    expect(result.success).toBe(true);
  });

  it('rejects weak passwords', () => {
    const result = signupSchema.safeParse({
      name: 'Daniel',
      email: 'daniel@example.com',
      password: 'senha',
      confirm: 'senha',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === 'password')).toBe(true);
    }
  });

  it('rejects mismatched confirmation', () => {
    const result = signupSchema.safeParse({
      name: 'Daniel',
      email: 'daniel@example.com',
      password: 'Senha123',
      confirm: 'Senha456',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === 'confirm')).toBe(true);
    }
  });
});
