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
    const description = String(data.get('desc') ?? '').trim();
    const value = Number(data.get('value'));
    const type = data.get('type') as TransactionType;

    if (!description || !Number.isFinite(value) || value <= 0 || !['in', 'out'].includes(type)) return;

    dispatch(addTransaction({ id: Date.now(), desc: description, value, type }));
    form.reset();
  }

  return (
    <main>
      <h1>Finance Dashboard</h1>
      <p>Estado global com Redux Toolkit</p>

      <section className="stats" aria-labelledby="summary-title" aria-live="polite">
        <h2 id="summary-title" className="visually-hidden">Resumo financeiro</h2>
        <div><small>Saldo</small><b>{money(totals.balance)}</b></div>
        <div><small>Entradas</small><b>{money(totals.income)}</b></div>
        <div><small>Saídas</small><b>{money(totals.expenses)}</b></div>
      </section>

      <section aria-labelledby="new-transaction-title">
        <h2 id="new-transaction-title" className="visually-hidden">Nova transação</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="transaction-description" className="visually-hidden">Descrição</label>
          <input id="transaction-description" name="desc" placeholder="Ex.: pagamento recebido" autoComplete="off" required />

          <label htmlFor="transaction-value" className="visually-hidden">Valor</label>
          <input id="transaction-value" name="value" type="number" min="0.01" step="0.01" inputMode="decimal" placeholder="0,00" required />

          <label htmlFor="transaction-type" className="visually-hidden">Tipo da transação</label>
          <select id="transaction-type" name="type" defaultValue="in">
            <option value="in">Entrada</option>
            <option value="out">Saída</option>
          </select>

          <button type="submit">Adicionar</button>
        </form>
      </section>

      <section className="list" aria-labelledby="transactions-title">
        <h2 id="transactions-title" className="visually-hidden">Transações</h2>
        {transactions.length === 0 && <p role="status">Nenhuma transação cadastrada.</p>}
        {transactions.map((item) => (
          <article key={item.id}>
            <span>{item.desc}</span>
            <b className={item.type}>{item.type === 'out' ? '-' : '+'}{money(item.value)}</b>
          </article>
        ))}
      </section>
    </main>
  );
}
