import { describe, expect, it } from 'vitest';
import { calculateCartTotal, filterProducts, products } from './catalog';

describe('catalog domain', () => {
  it('combina busca textual e categoria', () => {
    expect(filterProducts(products, 'fone', 'Áudio')).toHaveLength(1);
  });

  it('calcula o total considerando quantidades', () => {
    const total = calculateCartTotal(products, { 1: 2, 3: 1 });
    expect(total).toBeCloseTo(919.7);
  });
});
