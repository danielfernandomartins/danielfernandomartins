import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from './types';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: [{ id: 1, desc: 'Projeto freelance', value: 1800, type: 'in' }] as Transaction[],
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => { state.unshift(action.payload); },
  },
});

export const { addTransaction } = transactionSlice.actions;
export const store = configureStore({ reducer: { transactions: transactionSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
