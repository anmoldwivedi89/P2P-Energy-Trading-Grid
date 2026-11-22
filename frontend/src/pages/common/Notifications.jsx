import React from 'react';
import { Bell, Zap, TrendingUp, ShieldCheck, CheckCheck } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

export const Notifications = () => {
  const { themeMode } = useTheme();
  const isLight = themeMode === 'light-grid';

  const dummyNotifications = [
    {
      id: 1,
      title: 'Energy Order Fulfilled',
      desc: 'Your 25 kWh solar energy transfer to Bob Residential was verified on-chain.',
      icon: Zap,
      color: isLight ? 'text-[#6B8F71]' : 'text-[#6B8F71]',
      time: new Date(),
    },
    {
      id: 2,
      title: 'AI Price Surge Alert',
      desc: 'Local zone peak demand expected at 18:00. Clearing price recommended at ₹14.50/kWh.',
      icon: TrendingUp,
      color: 'text-[#DAA520]',
      time: new Date(Date.now() - 3600000),
    },
    {
      id: 3,
      title: 'Smart Contract Settled',
      desc: 'Transaction TXN-98401 settled via simulated autonomous escrow protocol.',
      icon: ShieldCheck,
      color: 'text-[#FF6F61]',
      time: new Date(Date.now() - 7200000),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#292824] dark:text-[#F5E8D8] tracking-tight">
            Notifications & Grid Alerts
          </h1>
          <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1">
            Real-time telemetry alerts, pricing surge triggers, and smart contract trading confirmations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] text-[#DAA520] shadow-2xs">
            <span className="size-2 rounded-full bg-[#DAA520] animate-pulse" />
            3 Active Alerts
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {dummyNotifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="p-4 bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] rounded-2xl flex items-start gap-4 neu-card dark:shadow-md transition-all duration-200 hover:border-[#FF6F61]/40"
            >
              <div
                className={`p-2.5 rounded-xl bg-[#F0E8DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm shrink-0 ${n.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-[#292824] dark:text-[#F5E8D8] truncate">
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-[#77736B] dark:text-[#B5A898] font-mono shrink-0">
                    {formatDate(n.time)}
                  </span>
                </div>
                <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1 leading-relaxed">
                  {n.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
