import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from './types';

export const initialTransactions: Transaction[] = [
  { id: 1, desc: 'Projeto freelance', value: 1800, type: 'in' },
];

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: initialTransactions,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.unshift(action.payload);
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export const transactionsReducer = transactionSlice.reducer;
export const store = configureStore({ reducer: { transactions: transactionsReducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
