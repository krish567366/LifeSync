// src/services/FinanceService.ts

import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Dummy getTransactions function; replace with your actual implementation if available.
export type Transaction = {
  category: string;
  amount: number;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  // Replace this with your actual logic to fetch transactions.
  return Promise.resolve([
    { category: 'Food', amount: 50 },
    { category: 'Entertainment', amount: 20 },
    { category: 'Food', amount: 30 },
    { category: 'Utilities', amount: 100 },
  ]);
};

/**
 * Fetches spending data by aggregating transaction amounts by category.
 */
export const fetchSpending = async (): Promise<Record<string, number>> => {
  const transactions: Transaction[] = await getTransactions();
  return transactions.reduce((acc: Record<string, number>, txn: Transaction) => {
    return {
      ...acc,
      [txn.category]: (acc[txn.category] || 0) + txn.amount,
    };
  }, {});
};

/**
 * Retrieves the default budget from Firestore using the modular API.
 */
export const createBudget = async (): Promise<number> => {
  const budgetRef = doc(db, 'budgets', 'default');
  const snapshot = await getDoc(budgetRef);
  const data = snapshot.data();
  return data?.amount || 0;
};
