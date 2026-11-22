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
        <h1 className="text-xl sm:text-2xl font-semibold text-[#292824] dark:text-[#F5E8D8]">My Energy Orders</h1>
        <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1">
          Review all clean energy allocations purchased from local microgrid sellers.
        </p>
      </div>

      <div className="overflow-x-auto bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] rounded-2xl neu-card">
        <table className="w-full text-left text-xs text-[#292824] dark:text-[#F5E8D8]">
          <thead className="bg-[#F0E8DE] dark:bg-[#1C1C1C] text-[#77736B] dark:text-[#B5A898] font-semibold border-b border-[#DCD6CB] dark:border-[#383430]">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Energy Producer</th>
              <th className="p-4">Purchased (kWh)</th>
              <th className="p-4">Total Paid</th>
              <th className="p-4">Status</th>
              <th className="p-4">Order Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCD6CB] dark:divide-[#383430]">
            {loading && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-[#77736B] dark:text-[#B5A898]">
                  Loading your energy orders...
                </td>
              </tr>
            )}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-[#77736B] dark:text-[#B5A898]">
                  No orders placed yet. Visit the Marketplace to purchase clean energy.
                </td>
              </tr>
            )}
            {!loading &&
              orders.map((ord) => (
                <tr key={ord._id || ord.id} className="hover:bg-[#F0E8DE]/60 dark:hover:bg-[#2A2A2A] transition">
                  <td className="p-4 font-mono text-[#77736B] dark:text-[#B5A898]">
                    {ord._id ? ord._id.slice(-6).toUpperCase() : ord.id}
                  </td>
                  <td className="p-4 font-medium text-[#292824] dark:text-[#F5E8D8]">{ord.sellerName || ord.seller?.name || 'Local Solar'}</td>
                  <td className="p-4">{formatEnergy(ord.amountKwh || ord.energy)}</td>
                  <td className="p-4 font-semibold text-[#DAA520] dark:text-[#DAA520]">{formatCurrency(ord.totalPrice || ord.total)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        ord.status === 'Completed' || ord.status === 'Delivered'
                          ? 'bg-[#6B8F71]/15 text-[#6B8F71] dark:bg-[#DAA520]/15 dark:text-[#DAA520]'
                          : 'bg-[#FF6F61]/15 text-[#FF6F61] dark:bg-[#FF6F61]/15 dark:text-[#FF6F61]'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#77736B] dark:text-[#B5A898]">{formatDate(ord.createdAt || ord.date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
