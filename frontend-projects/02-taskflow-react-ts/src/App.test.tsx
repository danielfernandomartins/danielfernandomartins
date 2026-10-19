import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './App';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('TaskFlow interface', () => {
  it('creates a task and updates the progress summary', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Nova tarefa'), {
      target: { value: 'Revisar portfólio' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(screen.getByText('Revisar portfólio')).toBeTruthy();
    expect(screen.getByText('0/1 concluídas')).toBeTruthy();
  });

  it('completes a task and filters completed items', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Nova tarefa'), {
      target: { value: 'Praticar React' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Marcar como concluída: Praticar React' }),
    );

    expect(screen.getByText('1/1 concluídas')).toBeTruthy();

    const filters = screen.getByRole('navigation', { name: 'Filtrar tarefas' });
    fireEvent.click(within(filters).getByRole('button', { name: 'Concluídas' }));

    expect(screen.getByText('Praticar React')).toBeTruthy();
  });

  it('removes a task using its accessible action name', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Nova tarefa'), {
      target: { value: 'Remover depois' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Excluir tarefa: Remover depois' }),
    );

    expect(screen.queryByText('Remover depois')).toBeNull();
    expect(screen.getByText('0/0 concluídas')).toBeTruthy();
  });
});
