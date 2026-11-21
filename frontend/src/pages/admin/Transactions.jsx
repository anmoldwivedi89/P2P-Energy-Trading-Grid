import React, { useState, useEffect } from 'react';
import TransactionTable from '../../components/admin/TransactionTable';
import { transactionService } from '../../services/transactionService';

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await transactionService.getAllTransactions();
        const data = Array.isArray(res) ? res : res?.data || [];
        setTransactions(data);
      } catch {
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">System Ledger & Transactions</h1>
        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
          Complete smart contract audit trail of energy transfers and billing.
        </p>
      </div>

      <TransactionTable transactions={transactions} loading={loading} />
    </div>
  );
};

export default Transactions;