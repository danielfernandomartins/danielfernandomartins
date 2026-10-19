import { type FormEvent, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './style.css';

type JobStatus = 'Enviada' | 'Entrevista' | 'Oferta';

type Job = {
  id: number;
  company: string;
  role: string;
  status: JobStatus;
};

type NewJobFormProps = {
  onAdd: (job: Omit<Job, 'id' | 'status'>) => void;
};

type DashboardProps = {
  jobs: Job[];
  onStatusChange: (jobId: number, status: JobStatus) => void;
};

const initialJobs: Job[] = [
  {
    id: 1,
    company: 'Acme',
    role: 'Front-End Júnior',
    status: 'Entrevista',
  },
];

function NewJobForm({ onAdd }: NewJobFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const company = String(formData.get('company') ?? '').trim();
    const role = String(formData.get('role') ?? '').trim();

    if (!company || !role) return;

    onAdd({ company, role });
    form.reset();
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit} aria-labelledby="new-job-title">
      <h2 id="new-job-title">Nova candidatura</h2>

      <label htmlFor="company">Empresa</label>
      <input id="company" name="company" autoComplete="organization" required />

      <label htmlFor="role">Vaga</label>
      <input id="role" name="role" autoComplete="off" required />

      <button type="submit">Salvar candidatura</button>
    </form>
  );
}

function Dashboard({ jobs, onStatusChange }: DashboardProps) {
  const totals = useMemo(
    () => ({
      total: jobs.length,
      interviews: jobs.filter((job) => job.status === 'Entrevista').length,
      offers: jobs.filter((job) => job.status === 'Oferta').length,
    }),
    [jobs],
  );

  return (
    <section aria-labelledby="dashboard-title">
      <h2 id="dashboard-title" className="section-title">Candidaturas</h2>

      <div className="stats" aria-label="Resumo das candidaturas">
        <div><strong>{totals.total}</strong><span>Total</span></div>
        <div><strong>{totals.interviews}</strong><span>Entrevistas</span></div>
        <div><strong>{totals.offers}</strong><span>Ofertas</span></div>
      </div>

      {jobs.length === 0 ? (
        <p className="card" role="status">Nenhuma candidatura cadastrada.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <article className="card" key={job.id}>
              <div>
                <h3>{job.role}</h3>
                <p>{job.company}</p>
              </div>

              <label className="status-control">
                <span>Status de {job.role}</span>
                <select
                  value={job.status}
                  onChange={(event) => onStatusChange(job.id, event.target.value as JobStatus)}
                >
                  <option value="Enviada">Enviada</option>
                  <option value="Entrevista">Entrevista</option>
                  <option value="Oferta">Oferta</option>
                </select>
              </label>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function App() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  function addJob(job: Omit<Job, 'id' | 'status'>) {
    setJobs((current) => [
      ...current,
      {
        id: Date.now(),
        ...job,
        status: 'Enviada',
      },
    ]);
  }

  function updateStatus(jobId: number, status: JobStatus) {
    setJobs((current) => current.map((job) => (job.id === jobId ? { ...job, status } : job)));
  }

  return (
    <main>
      <nav aria-label="Navegação principal">
        <strong>JobTracker</strong>
        <Link to="/">Dashboard</Link>
        <Link to="/nova">Nova vaga</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard jobs={jobs} onStatusChange={updateStatus} />} />
        <Route path="/nova" element={<NewJobForm onAdd={addJob} />} />
      </Routes>
    </main>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Elemento #root não encontrado.');

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
