import { useMemo, useState } from 'react';
import { filterTickets, getMetrics, tickets } from './tickets';

const statuses = ['Todos', 'Novo', 'Em andamento', 'Resolvido'];

export function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Todos');
  const visibleTickets = useMemo(() => filterTickets(tickets, query, status), [query, status]);
  const metrics = getMetrics(tickets);

  return (
    <main className="shell">
      <header>
        <p className="eyebrow">React + TypeScript + Vitest</p>
        <h1>Support Ops Dashboard</h1>
        <p>Visão operacional de tickets com métricas de fila, prioridade e risco de SLA.</p>
      </header>

      <section className="metrics" aria-label="Indicadores operacionais">
        <article><span>Em aberto</span><strong>{metrics.open}</strong></article>
        <article><span>Alta prioridade</span><strong>{metrics.highPriority}</strong></article>
        <article><span>Risco de SLA</span><strong>{metrics.slaRisk}</strong></article>
      </section>

      <section className="filters" aria-label="Filtros de tickets">
        <label>
          Buscar
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cliente ou assunto" />
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </section>

      <section className="table-wrap" aria-live="polite">
        <table>
          <caption>{visibleTickets.length} tickets exibidos</caption>
          <thead><tr><th>ID</th><th>Cliente</th><th>Assunto</th><th>Status</th><th>Prioridade</th><th>Idade</th></tr></thead>
          <tbody>
            {visibleTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>#{ticket.id}</td><td>{ticket.customer}</td><td>{ticket.subject}</td><td>{ticket.status}</td><td>{ticket.priority}</td><td>{ticket.ageHours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleTickets.length === 0 && <p role="status">Nenhum ticket encontrado.</p>}
      </section>
    </main>
  );
}
