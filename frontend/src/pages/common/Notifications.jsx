import React from 'react';
import { Bell, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const Notifications = () => {
  const dummyNotifications = [
    { id: 1, title: 'Energy Order Fulfilled', desc: 'Your 25 kWh solar energy transfer to Bob Residential was verified.', icon: Zap, color: 'text-emerald-400', time: new Date() },
    { id: 2, title: 'AI Price Surge Alert', desc: 'Local zone peak demand expected at 18:00. Clearing price recommended at $0.18/kWh.', icon: TrendingUp, color: 'text-amber-400', time: new Date() },
    { id: 3, title: 'Smart Contract Settled', desc: 'Transaction TXN-98401 settled via simulated escrow.', icon: ShieldCheck, color: 'text-sky-400', time: new Date() },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">Notifications & Grid Alerts</h1>
        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">Real-time alerts, pricing events, and trading confirmations.</p>
      </div>

      <div className="space-y-3">
        {dummyNotifications.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className="p-4 bg-white dark:bg-slate-900/60 border border-[#DDE8E1] dark:border-slate-800 rounded-2xl flex items-start gap-4 hover:border-emerald-500/40 dark:hover:border-slate-700 transition shadow-xs">
              <div className={`p-2.5 rounded-xl bg-[#ECFDF3] dark:bg-slate-800 border border-[#DDE8E1] dark:border-slate-700 ${n.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#12372A] dark:text-white">{n.title}</h4>
                  <span className="text-[11px] text-[#475569] dark:text-slate-500">{formatDate(n.time)}</span>
                </div>
                <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">{n.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
