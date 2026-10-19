import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { Cart } from './Cart';

describe('Cart', () => {
  it('starts with an empty cart summary', () => {
    render(<Cart />);

    const summary = screen.getByLabelText('Resumo do carrinho');
    expect(within(summary).getByText(/Itens:/).textContent).toContain('0');
    expect(within(summary).getByText(/Total:/).textContent).toMatch(/0,00/);
  });

  it('adds products and recalculates quantity and total', () => {
    render(<Cart />);

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar Keyboard' }));
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar Mouse' }));

    const summary = screen.getByLabelText('Resumo do carrinho');
    expect(within(summary).getByText(/Itens:/).textContent).toContain('2');
    expect(within(summary).getByText(/Total:/).textContent).toMatch(/340,00/);
  });
});
