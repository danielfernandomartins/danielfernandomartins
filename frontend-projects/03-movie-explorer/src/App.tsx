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
        <form onSubmit={handleSearch}>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque uma série..." aria-label="Nome da série" />
          <button disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
        </form>
      </header>

      {error && <p role="alert">{error}</p>}
      {!loading && searched && !error && results.length === 0 && <p role="status">Nenhum resultado encontrado.</p>}

      <section aria-live="polite">
        {results.map(({ show }) => (
          <article key={show.id}>
            <div className="poster">{show.image ? <img src={show.image.medium} alt={`Capa de ${show.name}`} /> : '🎬'}</div>
            <div>
              <h2>{show.name}</h2>
              <small>{show.genres.join(' • ') || 'Sem gênero'} · ⭐ {show.rating.average ?? '—'}</small>
              <p>{cleanSummary(show.summary)}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
