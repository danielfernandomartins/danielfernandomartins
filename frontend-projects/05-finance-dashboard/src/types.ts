export type TransactionType = 'in' | 'out';
export type Transaction = { id: number; desc: string; value: number; type: TransactionType };
