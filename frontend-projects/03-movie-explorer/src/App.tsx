import { type FormEvent, useState } from 'react';
import { searchShows } from './api';
import type { SearchResult } from './types';

function cleanSummary(summary: string | null) {
  return summary?.replace(/<[^>]+>/g, '').slice(0, 180) || 'Sem descrição.';
}

export function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      setResults(await searchShows(term));
    } catch {
      setError('Não foi possível carregar os resultados. Tente novamente.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header>
        <p>REST API • React • TypeScript</p>
        <h1>Movie Explorer</h1>
        <form onSubmit={handleSearch} role="search" aria-describedby="search-help">
          <label htmlFor="show-query" className="visually-hidden">Nome da série</label>
          <input
            id="show-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: The Bear"
            autoComplete="off"
          />
          <button type="submit" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
          <small id="search-help" className="visually-hidden">Pesquise pelo título de uma série.</small>
        </form>
      </header>

      <div aria-live="polite" aria-atomic="true">
        {loading && <p role="status">Buscando séries…</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && searched && !error && results.length === 0 && <p role="status">Nenhum resultado encontrado.</p>}
      </div>

      <section aria-labelledby="results-title" aria-busy={loading}>
        <h2 id="results-title" className="visually-hidden">Resultados</h2>
        {results.map(({ show }) => (
          <article key={show.id}>
            <div className="poster">{show.image ? <img src={show.image.medium} alt={`Capa de ${show.name}`} /> : <span aria-label="Sem capa disponível">🎬</span>}</div>
            <div>
              <h3>{show.name}</h3>
              <small>{show.genres.join(' • ') || 'Sem gênero'} · ⭐ {show.rating.average ?? '—'}</small>
              <p>{cleanSummary(show.summary)}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
