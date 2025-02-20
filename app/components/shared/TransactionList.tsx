import React from 'react';
import TransactionItem from './TransactionItem';
import { Transaction } from '@/lib/types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList  = ({ transactions } : TransactionListProps) => (
  <div className="mt-4 border-2 border-base-300 p-5 rounded-xl">
    <h3 className="text-lg font-semibold mb-3">Neueste Transaktionen</h3>
    <ul className="divide-y divide-base-300">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction}></TransactionItem>
      ))}
    </ul>
  </div>
);

export default TransactionList;