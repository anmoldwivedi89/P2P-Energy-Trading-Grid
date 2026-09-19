import React from 'react';
import { formatCurrency, formatEnergy } from '../../utils/formatters';

export const TransactionTable = ({ transactions = [] }) => {
  const dummyTxs = transactions.length > 0 ? transactions : [
    { id: 'TXN-98401', buyer: 'Bob Residential', seller: 'Alice Solar Farm', amount: 45, total: 5.40, txHash: '0x3fe...88ab', status: 'Settled' },
    { id: 'TXN-98402', buyer: 'EcoTech Office', seller: 'Apex Wind Power', amount: 200, total: 20.00, txHash: '0x99c...14ef', status: 'Settled' },
    { id: 'TXN-98403', buyer: 'Local Cafe Hub', seller: 'Alice Solar Farm', amount: 30, total: 3.60, txHash: '0x12d...76aa', status: 'Processing' },
  ];

  return (
    <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-2xl">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
          <tr>
            <th className="p-4">Tx ID</th>
            <th className="p-4">Buyer</th>
            <th className="p-4">Seller</th>
            <th className="p-4">Energy</th>
            <th className="p-4">Total Amount</th>
            <th className="p-4">Blockchain Hash</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {dummyTxs.map((t) => (
            <tr key={t.id} className="hover:bg-slate-800/40 transition">
              <td className="p-4 font-mono text-slate-400">{t.id}</td>
              <td className="p-4 text-white font-medium">{t.buyer}</td>
              <td className="p-4 text-slate-300">{t.seller}</td>
              <td className="p-4 text-slate-200">{formatEnergy(t.amount)}</td>
              <td className="p-4 font-semibold text-emerald-400">{formatCurrency(t.total)}</td>
              <td className="p-4 font-mono text-slate-500">{t.txHash}</td>
              <td className="p-4">
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  t.status === 'Settled' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
