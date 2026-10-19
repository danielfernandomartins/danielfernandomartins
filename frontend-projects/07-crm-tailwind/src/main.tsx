import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

type ClientStatus = 'Ativo' | 'Risco';
type ClientFilter = 'Todos' | ClientStatus;

type Client = {
  id: number;
  name: string;
  plan: 'Starter' | 'Business' | 'Premium';
  status: ClientStatus;
};

const clients: Client[] = [
  { id: 1, name: 'Ana Souza', plan: 'Premium', status: 'Ativo' },
  { id: 2, name: 'Carlos Lima', plan: 'Business', status: 'Ativo' },
  { id: 3, name: 'Mariana Alves', plan: 'Starter', status: 'Risco' },
  { id: 4, name: 'João Costa', plan: 'Business', status: 'Ativo' },
];

const filters: ClientFilter[] = ['Todos', 'Ativo', 'Risco'];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <strong className="mt-2 block text-2xl">{value}</strong>
    </article>
  );
}

function App() {
  const [filter, setFilter] = useState<ClientFilter>('Todos');

  const visibleClients = useMemo(
    () => clients.filter((client) => filter === 'Todos' || client.status === filter),
    [filter],
  );

  const activeCount = clients.filter((client) => client.status === 'Ativo').length;
  const riskCount = clients.length - activeCount;

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-semibold tracking-widest text-indigo-300">CRM DASHBOARD</p>
            <h1 className="text-4xl font-bold">Clientes em foco</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Carteira demonstrativa com dados locais para explorar estado, filtros e composição de UI.
            </p>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3" aria-label="Resumo da carteira">
          <Stat label="Clientes" value={clients.length} />
          <Stat label="Ativos" value={activeCount} />
          <Stat label="Em risco" value={riskCount} />
        </section>

        <section className="overflow-hidden rounded-2xl bg-slate-900" aria-labelledby="portfolio-title">
          <div className="flex flex-col gap-4 border-b border-slate-800 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="portfolio-title" className="font-semibold">Carteira recente</h2>
              <p className="text-sm text-slate-400" aria-live="polite">
                {visibleClients.length} {visibleClients.length === 1 ? 'cliente visível' : 'clientes visíveis'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Filtrar clientes">
              {filters.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 ${
                    filter === value
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="text-sm text-slate-400">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Cliente</th>
                  <th scope="col" className="px-4 py-3 font-medium">Plano</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleClients.map((client) => (
                  <tr key={client.id} className="border-t border-slate-800">
                    <th scope="row" className="px-4 py-4 font-semibold">{client.name}</th>
                    <td className="px-4 py-4 text-slate-400">{client.plan}</td>
                    <td className={`px-4 py-4 ${client.status === 'Ativo' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {client.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Elemento #root não encontrado.');

createRoot(rootElement).render(<App />);
