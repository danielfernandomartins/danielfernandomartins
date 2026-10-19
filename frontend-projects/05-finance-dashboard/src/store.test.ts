import { describe, expect, it } from 'vitest';
import { addTransaction, initialTransactions, transactionsReducer } from './store';

describe('transactionsReducer', () => {
  it('adds a transaction to the beginning of the list', () => {
    const next = transactionsReducer(
      initialTransactions,
      addTransaction({ id: 2, desc: 'Notebook', value: 4500, type: 'out' }),
    );

    expect(next[0]).toEqual({ id: 2, desc: 'Notebook', value: 4500, type: 'out' });
    expect(next).toHaveLength(2);
  });
});
