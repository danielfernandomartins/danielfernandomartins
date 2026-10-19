import { FormEvent, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './style.css';

type JobStatus = 'Enviada' | 'Entrevista' | 'Oferta';
type Job = { id: number; company: string; role: string; status: JobStatus };

const initialJobs: Job[] = [
  { id: 1, company: 'Acme', role: 'Front-End Júnior', status: 'Entrevista' },
];

function App() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  function addJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const company = String(data.get('company') ?? '').trim();
    const role = String(data.get('role') ?? '').trim();
    if (!company || !role) return;

    setJobs((current) => [
      ...current,
      { id: Date.now(), company, role, status: 'Enviada' },
    ]);
    form.reset();
  }

  function updateStatus(id: number, status: JobStatus) {
    setJobs((current) =>
      current.map((job) => (job.id === id ? { ...job, status } : job)),
    );
  }

  function Dashboard() {
    const interviews = jobs.filter((job) => job.status === 'Entrevista').length;
    const offers = jobs.filter((job) => job.status === 'Oferta').length;

    return (
      <section aria-labelledby="dashboard-title">
        <h1 id="dashboard-title">Candidaturas</h1>
        <div className="stats" aria-label="Resumo das candidaturas">
          <b>{jobs.length}<small>Total</small></b>
          <b>{interviews}<small>Entrevistas</small></b>
          <b>{offers}<small>Ofertas</small></b>
        </div>
        {jobs.map((job) => (
          <article className="card" key={job.id}>
            <div>
              <h2>{job.role}</h2>
              <p>{job.company}</p>
            </div>
            <label>
              <span className="sr-only">Status de {job.role} na {job.company}</span>
              <select
                value={job.status}
                onChange={(event) => updateStatus(job.id, event.target.value as JobStatus)}
              >
                <option>Enviada</option>
                <option>Entrevista</option>
                <option>Oferta</option>
              </select>
            </label>
          </article>
        ))}
      </section>
    );
  }

  function AddJob() {
    return (
      <section aria-labelledby="new-job-title">
        <form className="card" onSubmit={addJob}>
          <h1 id="new-job-title">Nova candidatura</h1>
          <label>
            Empresa
            <input name="company" autoComplete="organization" required />
          </label>
          <label>
            Vaga
            <input name="role" autoComplete="organization-title" required />
          </label>
          <button type="submit">Salvar candidatura</button>
        </form>
      </section>
    );
  }

  return (
    <main>
      <nav aria-label="Navegação principal">
        <strong>JobTracker</strong>
        <Link to="/">Dashboard</Link>
        <Link to="/nova">Nova vaga</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nova" element={<AddJob />} />
      </Routes>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
