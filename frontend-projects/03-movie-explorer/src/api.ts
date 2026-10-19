import type { SearchResult } from './types';

export async function searchShows(query: string, signal?: AbortSignal): Promise<SearchResult[]> {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`, { signal });
  if (!response.ok) throw new Error('Falha ao consultar a API');
  return response.json() as Promise<SearchResult[]>;
}
