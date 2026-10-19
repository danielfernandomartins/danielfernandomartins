import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Cart } from './Cart';

describe('Cart', () => {
  it('adiciona um item e atualiza quantidade e total', () => {
    render(<Cart />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Adicionar' })[0]);

    expect(screen.getByTestId('count').textContent).toContain('1');
    expect(screen.getByTestId('total').textContent).toContain('R$ 220');
  });
});
