import React from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Transactions = () => {
  const dummyTxs = [
    { id: 'TX-701', type: 'Energy Purchase', amount: 25, price: 3.00, hash: '0x3a4b...88fe', status: 'Confirmed', date: new Date().toISOString() },
    { id: 'TX-702', type: 'Energy Purchase', amount: 60, price: 5.40, hash: '0x7b1c...99aa', status: 'Confirmed', date: new Date().toISOString() },
    { id: 'TX-703', type: 'Grid Balancing Fee', amount: 0, price: 0.08, hash: '0x1c8d...3322', status: 'Confirmed', date: new Date().toISOString() },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settlement & Transactions</h1>
        <p className="text-xs text-slate-400 mt-1">
          Decentralized ledger verification of energy transactions.
        </p>
      </div>

      <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-2xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-4">Tx Reference</th>
              <th className="p-4">Transaction Type</th>
              <th className="p-4">Energy (kWh)</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Smart Contract Hash</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {dummyTxs.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                <td className="p-4 font-mono text-slate-400">{tx.id}</td>
                <td className="p-4 text-white font-medium">{tx.type}</td>
                <td className="p-4">{tx.amount ? formatEnergy(tx.amount) : '—'}</td>
                <td className="p-4 font-semibold text-emerald-400">{formatCurrency(tx.price)}</td>
                <td className="p-4 font-mono text-slate-500 flex items-center gap-1">
                  <span>{tx.hash}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 hover:text-emerald-400 cursor-pointer" />
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {tx.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{formatDate(tx.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
