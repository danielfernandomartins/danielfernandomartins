import { type FormEvent } from 'react';
import { useTasks } from './useTasks';
import type { TaskFilter } from './types';

const filters: Array<{ value: TaskFilter; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'open', label: 'Abertas' },
  { value: 'done', label: 'Concluídas' },
];

export function App() {
  const { tasks, visibleTasks, completed, filter, setFilter, addTask, toggleTask, removeTask } = useTasks();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get('task') ?? '').trim();
    if (!text) return;
    addTask(text);
    form.reset();
  }

  return (
    <main>
      <header>
        <p>React + TypeScript</p>
        <h1>TaskFlow</h1>
        <span aria-live="polite">{completed}/{tasks.length} concluídas</span>
      </header>

      <section className="panel" aria-label="Gerenciador de tarefas">
        <form onSubmit={handleSubmit}>
          <input name="task" placeholder="Nova tarefa" aria-label="Nova tarefa" autoComplete="off" />
          <button type="submit">Adicionar</button>
        </form>

        <nav aria-label="Filtrar tarefas">
          {filters.map(({ value, label }) => (
            <button type="button" className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} key={value}>
              {label}
            </button>
          ))}
        </nav>

        {visibleTasks.length === 0 && <p role="status">Nenhuma tarefa neste filtro.</p>}
        {visibleTasks.map((task) => (
          <article key={task.id} className={task.done ? 'done' : ''}>
            <input aria-label={`Concluir ${task.text}`} type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
            <span>{task.text}</span>
            <button type="button" className="ghost" onClick={() => removeTask(task.id)} aria-label={`Excluir ${task.text}`}>Excluir</button>
          </article>
        ))}
      </section>
    </main>
  );
}
