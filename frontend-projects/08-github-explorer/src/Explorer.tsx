import { type FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGitHubUser } from './api';

export function Explorer() {
  const [input, setInput] = useState('danielfernandomartins');
  const [username, setUsername] = useState('danielfernandomartins');
  const query = useQuery({
    queryKey: ['github-user', username],
    queryFn: () => fetchGitHubUser(username),
    retry: 1,
    staleTime: 60_000,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input.trim();
    if (value) setUsername(value);
  }

  return (
    <main>
      <h1>GitHub Explorer</h1>
      <p>Axios + TanStack Query + cache</p>

      <form onSubmit={handleSubmit} role="search" aria-describedby="github-search-help">
        <label htmlFor="github-username">Usuário do GitHub</label>
        <input
          id="github-username"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ex.: danielfernandomartins"
          autoComplete="off"
        />
        <button type="submit" disabled={query.isFetching}>{query.isFetching ? 'Buscando...' : 'Buscar'}</button>
        <small id="github-search-help">Digite um nome de usuário público do GitHub.</small>
      </form>

      <div aria-live="polite" aria-atomic="true">
        {query.isFetching && <p role="status">Buscando perfil…</p>}
        {query.isError && <div className="card error" role="alert">Usuário não encontrado ou serviço indisponível.</div>}
      </div>

      {query.data && (
        <article className="card" aria-labelledby="github-user-name">
          <img src={query.data.avatar_url} alt={`Avatar de ${query.data.login}`} />
          <div>
            <h2 id="github-user-name">{query.data.name || query.data.login}</h2>
            <p>{query.data.bio || 'Sem bio pública.'}</p>
            <dl className="stats">
              <div><dt>Repositórios públicos</dt><dd>{query.data.public_repos}</dd></div>
              <div><dt>Seguidores</dt><dd>{query.data.followers}</dd></div>
            </dl>
            <a href={query.data.html_url} target="_blank" rel="noreferrer">Abrir perfil de {query.data.login} em nova aba →</a>
          </div>
        </article>
      )}
    </main>
  );
}
