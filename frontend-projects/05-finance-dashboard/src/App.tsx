import { type FormEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, type AppDispatch, type RootState } from './store';
import type { TransactionType } from './types';

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function App() {
  const transactions = useSelector((state: RootState) => state.transactions);
  const dispatch = useDispatch<AppDispatch>();
  const totals = useMemo(() => {
    const income = transactions.filter((item) => item.type === 'in').reduce((sum, item) => sum + item.value, 0);
    const expenses = transactions.filter((item) => item.type === 'out').reduce((sum, item) => sum + item.value, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = Number(data.get('value'));
    if (!Number.isFinite(value) || value <= 0) return;
    dispatch(addTransaction({ id: Date.now(), desc: String(data.get('desc')).trim(), value, type: data.get('type') as TransactionType }));
    form.reset();
  }

  return (
    <main>
      <h1>Finance Dashboard</h1>
      <p>Estado global com Redux Toolkit</p>
      <section className="stats" aria-label="Resumo financeiro">
        <div><small>Saldo</small><b>{money(totals.balance)}</b></div>
        <div><small>Entradas</small><b>{money(totals.income)}</b></div>
        <div><small>Saídas</small><b>{money(totals.expenses)}</b></div>
      </section>
      <form onSubmit={handleSubmit}>
        <input name="desc" placeholder="Descrição" aria-label="Descrição" required />
        <input name="value" type="number" min="0.01" step="0.01" placeholder="Valor" aria-label="Valor" required />
        <select name="type" aria-label="Tipo da transação"><option value="in">Entrada</option><option value="out">Saída</option></select>
        <button>Adicionar</button>
      </form>
      <section className="list" aria-label="Transações">
        {transactions.map((item) => <article key={item.id}><span>{item.desc}</span><b className={item.type}>{item.type === 'out' ? '-' : '+'}{money(item.value)}</b></article>)}
      </section>
    </main>
  );
}
