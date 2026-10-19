import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';
import { searchShows } from './api';

vi.mock('./api', () => ({
  searchShows: vi.fn(),
}));

const mockedSearchShows = vi.mocked(searchShows);

afterEach(() => {
  cleanup();
  mockedSearchShows.mockReset();
});

describe('Movie Explorer interface', () => {
  it('renders API results after a search', async () => {
    mockedSearchShows.mockResolvedValue([
      {
        show: {
          id: 1,
          name: 'Dark Matter',
          summary: '<p>Uma série de ficção científica.</p>',
          genres: ['Drama', 'Sci-Fi'],
          rating: { average: 8.3 },
        },
      },
    ]);

    render(<App />);

    fireEvent.change(screen.getByLabelText('Nome da série'), {
      target: { value: 'dark matter' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(await screen.findByRole('heading', { name: 'Dark Matter' })).toBeTruthy();
    expect(screen.getByText(/Drama • Sci-Fi/)).toBeTruthy();
    expect(screen.getByText('Uma série de ficção científica.')).toBeTruthy();
  });

  it('announces an empty state when no shows are returned', async () => {
    mockedSearchShows.mockResolvedValue([]);

    render(<App />);

    fireEvent.change(screen.getByLabelText('Nome da série'), {
      target: { value: 'resultado inexistente' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Nenhum resultado encontrado.');
  });

  it('shows an accessible error when the API fails', async () => {
    mockedSearchShows.mockRejectedValue(new Error('API unavailable'));

    render(<App />);

    fireEvent.change(screen.getByLabelText('Nome da série'), {
      target: { value: 'matrix' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível carregar os resultados. Tente novamente.');
  });
});
