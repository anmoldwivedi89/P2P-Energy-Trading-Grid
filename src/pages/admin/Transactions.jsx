import React from 'react';
import TransactionTable from '../../components/admin/TransactionTable';

export const Transactions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Ledger & Transactions</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete smart contract audit trail of energy transfers and billing.
        </p>
      </div>

      <TransactionTable />
    </div>
  );
};

export default Transactions;
