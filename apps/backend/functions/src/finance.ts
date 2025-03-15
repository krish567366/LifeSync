import * as admin from 'firebase-admin';
import Plaid from 'plaid';

admin.initializeApp();
const plaid = new Plaid({ clientID: process.env.PLAID_CLIENT_ID, secret: process.env.PLAID_SECRET });

export const analyzeSpending = async (userId: string) => {
  const transactions = await plaid.getTransactions({ access_token: userId });
  const spending = transactions.reduce((acc, txn) => ({
    ...acc,
    [txn.category]: (acc[txn.category] || 0) + txn.amount,
  }), {});

  await admin.firestore().doc(`users/${userId}/finance`).set({ spending });
};