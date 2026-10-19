import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { App } from './App';
import { transactionsReducer } from './store';

afterEach(() => {
  cleanup();
});

function renderDashboard() {
  const testStore = configureStore({
    reducer: { transactions: transactionsReducer },
  });

  render(
    <Provider store={testStore}>
      <App />
    </Provider>,
  );

  return testStore;
}

describe('Finance Dashboard interface', () => {
  it('adds an expense and updates the visible financial summary', () => {
    renderDashboard();

    fireEvent.change(screen.getByLabelText('Descrição'), {
      target: { value: 'Internet' },
    });
    fireEvent.change(screen.getByLabelText('Valor'), {
      target: { value: '300' },
    });
    fireEvent.change(screen.getByLabelText('Tipo da transação'), {
      target: { value: 'out' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByText('Internet')).toBeTruthy();

    const summary = screen.getByLabelText('Resumo financeiro');
    expect(summary.textContent).toContain('1.500,00');
    expect(summary.textContent).toContain('300,00');
  });

  it('keeps the initial transaction visible', () => {
    renderDashboard();

    expect(screen.getByText('Projeto freelance')).toBeTruthy();
    expect(screen.getByLabelText('Resumo financeiro').textContent).toContain('1.800,00');
  });
});
