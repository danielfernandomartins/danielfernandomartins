import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Explorer } from './Explorer';
import { fetchGitHubUser } from './api';

vi.mock('./api', () => ({
  fetchGitHubUser: vi.fn(),
}));

const mockedFetchGitHubUser = vi.mocked(fetchGitHubUser);
const clients: QueryClient[] = [];

afterEach(() => {
  cleanup();
  clients.forEach((client) => client.clear());
  clients.length = 0;
  mockedFetchGitHubUser.mockReset();
});

function renderExplorer() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { gcTime: Infinity },
    },
  });
  clients.push(client);

  render(
    <QueryClientProvider client={client}>
      <Explorer />
    </QueryClientProvider>,
  );
}

describe('GitHub Explorer interface', () => {
  it('renders a fetched GitHub profile', async () => {
    mockedFetchGitHubUser.mockResolvedValue({
      login: 'danielfernandomartins',
      name: 'Daniel Fernando Martins',
      avatar_url: 'https://example.com/avatar.png',
      bio: 'Front-End Developer',
      public_repos: 12,
      followers: 34,
      html_url: 'https://github.com/danielfernandomartins',
    });

    renderExplorer();

    expect(await screen.findByRole('heading', { name: 'Daniel Fernando Martins' })).toBeTruthy();
    expect(screen.getByText('Front-End Developer')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Abrir perfil →' }).getAttribute('href')).toBe(
      'https://github.com/danielfernandomartins',
    );
  });

  it('submits another username and renders the new result', async () => {
    mockedFetchGitHubUser.mockImplementation(async (username) => ({
      login: username,
      name: null,
      avatar_url: 'https://example.com/avatar.png',
      bio: null,
      public_repos: 1,
      followers: 2,
      html_url: `https://github.com/${username}`,
    }));

    renderExplorer();
    await screen.findByRole('heading', { name: 'danielfernandomartins' });

    fireEvent.change(screen.getByLabelText('Usuário do GitHub'), {
      target: { value: 'octocat' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(await screen.findByRole('heading', { name: 'octocat' })).toBeTruthy();
    expect(mockedFetchGitHubUser).toHaveBeenCalledWith('octocat');
  });
});
