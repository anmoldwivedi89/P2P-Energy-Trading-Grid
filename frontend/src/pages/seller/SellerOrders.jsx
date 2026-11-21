import React, { useState, useEffect } from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';
import { orderService } from '../../services/orderService';

export const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await orderService.getSellerOrders();
        const data = res.data || res;
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">Prosumer Energy Sales</h1>
        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
          Historical and live energy orders fulfilled by your solar/renewable nodes.
        </p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900/60 border border-[#DDE8E1] dark:border-slate-800 rounded-2xl shadow-xs">
        <table className="w-full text-left text-xs text-[#12372A] dark:text-slate-300">
          <thead className="bg-[#F8FAFC] dark:bg-slate-950/60 text-[#475569] dark:text-slate-400 font-semibold border-b border-[#DDE8E1] dark:border-slate-800">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Buyer Node</th>
              <th className="p-4">Delivered Energy</th>
              <th className="p-4">Payout</th>
              <th className="p-4">Status</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60">
            {loading && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-[#475569] dark:text-slate-400">
                  Loading your fulfilled orders...
                </td>
              </tr>
            )}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-[#475569] dark:text-slate-400">
                  No orders fulfilled yet. Active listings will appear here once purchased by buyers.
                </td>
              </tr>
            )}
            {!loading &&
              orders.map((ord) => (
                <tr key={ord._id || ord.id} className="hover:bg-[#F1F5F9] dark:hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono text-[#475569] dark:text-slate-400">
                    {ord._id ? ord._id.slice(-6).toUpperCase() : ord.id}
                  </td>
                  <td className="p-4 font-medium text-[#12372A] dark:text-white">{ord.buyerName || ord.buyer?.name || 'Local Buyer'}</td>
                  <td className="p-4">{formatEnergy(ord.amountKwh || ord.energy)}</td>
                  <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(ord.subtotal || ord.totalPrice || ord.total)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        ord.status === 'Completed'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#475569] dark:text-slate-400">{formatDate(ord.createdAt || ord.date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
