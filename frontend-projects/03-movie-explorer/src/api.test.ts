import { afterEach, describe, expect, it, vi } from 'vitest';
import { searchShows } from './api';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe('searchShows', () => {
  it('encodes the query and returns typed results', async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify([{ show: { id: 1, name: 'The Bear', image: null, summary: 'Drama' } }]), { status: 200 }),
    ) as typeof fetch;

    const results = await searchShows('the bear');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.tvmaze.com/search/shows?q=the%20bear',
      { signal: undefined },
    );
    expect(results[0]?.show.name).toBe('The Bear');
  });

  it('throws when the API returns an HTTP error', async () => {
    globalThis.fetch = vi.fn(async () => new Response(null, { status: 503 })) as typeof fetch;
    await expect(searchShows('offline')).rejects.toThrow('Falha ao consultar a API');
  });
});
