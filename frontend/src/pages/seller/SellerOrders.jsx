import React from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';
import { Receipt, CheckCircle, Clock } from 'lucide-react';

export const SellerOrders = () => {
  const dummyOrders = [
    { id: 'ORD-5501', buyer: 'Bob Residential', energy: 35, total: 4.20, status: 'Completed', date: new Date().toISOString() },
    { id: 'ORD-5502', buyer: 'Local Cafe Hub', energy: 50, total: 6.00, status: 'Completed', date: new Date().toISOString() },
    { id: 'ORD-5503', buyer: 'Green Villa', energy: 20, total: 2.40, status: 'Pending', date: new Date().toISOString() },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Prosumer Energy Sales</h1>
        <p className="text-xs text-slate-400 mt-1">
          Historical and live energy orders fulfilled by your solar/renewable nodes.
        </p>
      </div>

      <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-2xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Buyer Node</th>
              <th className="p-4">Delivered Energy</th>
              <th className="p-4">Payout</th>
              <th className="p-4">Status</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {dummyOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-800/40 transition">
                <td className="p-4 font-mono text-slate-400">{ord.id}</td>
                <td className="p-4 font-medium text-white">{ord.buyer}</td>
                <td className="p-4">{formatEnergy(ord.energy)}</td>
                <td className="p-4 font-semibold text-emerald-400">{formatCurrency(ord.total)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    ord.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {ord.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{formatDate(ord.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
