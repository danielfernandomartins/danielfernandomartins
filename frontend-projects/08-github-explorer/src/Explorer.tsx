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
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Usuário do GitHub" aria-label="Usuário do GitHub" />
        <button disabled={query.isFetching}>{query.isFetching ? 'Buscando...' : 'Buscar'}</button>
      </form>
      {query.isError && <div className="card error" role="alert">Usuário não encontrado ou serviço indisponível.</div>}
      {query.data && <article className="card"><img src={query.data.avatar_url} alt={`Avatar de ${query.data.login}`} /><div><h2>{query.data.name || query.data.login}</h2><p>{query.data.bio || 'Sem bio pública.'}</p><div className="stats"><span><b>{query.data.public_repos}</b> repositórios</span><span><b>{query.data.followers}</b> seguidores</span></div><a href={query.data.html_url} target="_blank" rel="noreferrer">Abrir perfil →</a></div></article>}
    </main>
  );
}
