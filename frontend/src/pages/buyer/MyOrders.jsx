import React from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';

export const MyOrders = () => {
  const dummyOrders = [
    { id: 'ORD-8801', seller: 'Alice Solar Microgrid', energy: 25, total: 3.00, status: 'Delivered', date: new Date().toISOString() },
    { id: 'ORD-8802', seller: 'Coastal Wind Farm', energy: 60, total: 5.40, status: 'Delivered', date: new Date().toISOString() },
    { id: 'ORD-8803', seller: 'EcoHydro Storage', energy: 15, total: 2.10, status: 'In Transit', date: new Date().toISOString() },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Energy Orders</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review all clean energy allocations purchased from local microgrid sellers.
        </p>
      </div>

      <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-2xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Energy Producer</th>
              <th className="p-4">Purchased (kWh)</th>
              <th className="p-4">Total Paid</th>
              <th className="p-4">Status</th>
              <th className="p-4">Order Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {dummyOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-800/40 transition">
                <td className="p-4 font-mono text-slate-400">{ord.id}</td>
                <td className="p-4 font-medium text-white">{ord.seller}</td>
                <td className="p-4">{formatEnergy(ord.energy)}</td>
                <td className="p-4 font-semibold text-emerald-400">{formatCurrency(ord.total)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    ord.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-sky-500/10 text-sky-400'
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

export default MyOrders;
