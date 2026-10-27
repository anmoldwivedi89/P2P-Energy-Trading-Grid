import React, { useState, useEffect } from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';
import { orderService } from '../../services/orderService';
import { ShoppingBag } from 'lucide-react';

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await orderService.getBuyerOrders();
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
        <h1 className="text-xl sm:text-2xl font-semibold text-white">My Energy Orders</h1>
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
            {loading && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">
                  Loading your energy orders...
                </td>
              </tr>
            )}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">
                  No orders placed yet. Visit the Marketplace to purchase clean energy.
                </td>
              </tr>
            )}
            {!loading &&
              orders.map((ord) => (
                <tr key={ord._id || ord.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono text-slate-400">
                    {ord._id ? ord._id.slice(-6).toUpperCase() : ord.id}
                  </td>
                  <td className="p-4 font-medium text-white">{ord.sellerName || ord.seller?.name || 'Local Solar'}</td>
                  <td className="p-4">{formatEnergy(ord.amountKwh || ord.energy)}</td>
                  <td className="p-4 font-semibold text-emerald-400">{formatCurrency(ord.totalPrice || ord.total)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        ord.status === 'Completed' || ord.status === 'Delivered'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-sky-500/10 text-sky-400'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{formatDate(ord.createdAt || ord.date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
