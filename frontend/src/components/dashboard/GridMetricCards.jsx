import React from 'react';
import {
  Activity,
  Zap,
  ShoppingCart,
  Leaf,
  Wallet,
  Sun,
  Users,
  TrendingUp,
} from 'lucide-react';

// Role ke according cards ka configuration
const metricConfig = {
  buyer: [
    {
      key: 'totalEnergyConsumed',
      title: 'Energy Consumed',
      suffix: 'kWh',
      icon: Zap,
    },
    {
      key: 'totalEnergyPurchased',
      title: 'Energy Purchased',
      suffix: 'kWh',
      icon: ShoppingCart,
    },
    {
      key: 'carbonSaved',
      title: 'Carbon Saved',
      suffix: 'kg',
      icon: Leaf,
    },
    {
      key: 'activeOrders',
      title: 'Active Orders',
      suffix: '',
      icon: Activity,
    },
  ],
  seller: [
    {
      key: 'totalEnergyGenerated',
      title: 'Energy Generated',
      suffix: 'kWh',
      icon: Sun,
    },
    {
      key: 'totalEnergySold',
      title: 'Energy Sold',
      suffix: 'kWh',
      icon: Zap,
    },
    {
      key: 'totalRevenue',
      title: 'Total Revenue',
      suffix: '',
      icon: Wallet,
    },
    {
      key: 'activeListings',
      title: 'Active Listings',
      suffix: '',
      icon: Activity,
    },
  ],
  admin: [
    {
      key: 'totalUsers',
      title: 'Total Users',
      suffix: '',
      icon: Users,
    },
    {
      key: 'activeSellers',
      title: 'Active Sellers',
      suffix: '',
      icon: Users,
    },
    {
      key: 'activeBuyers',
      title: 'Active Buyers',
      suffix: '',
      icon: ShoppingCart,
    },
    {
      key: 'totalEnergyTraded',
      title: 'Energy Traded',
      suffix: 'kWh',
      icon: TrendingUp,
    },
  ],
};

// Numeric values ko Indian Numbering format (en-IN) aur appropriate units ke sath format karte hain
function formatValue(value, suffix) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const formatted =
    typeof value === 'number'
      ? value.toLocaleString('en-IN', {
          maximumFractionDigits: 2,
        })
      : value;

  return suffix === '₹'
    ? `₹${formatted}`
    : `${formatted}${suffix ? ` ${suffix}` : ''}`;
}

export default function GridMetricCards({
  role,
  data = {},
}) {
  const normalizedRole = (role || '').toLowerCase();
  const metrics = metricConfig[normalizedRole] || metricConfig.buyer;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.key}
            className="rounded-2xl border border-border bg-card p-5 shadow-custom transition-all hover:border-emerald-500/40"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {metric.title}
              </p>

              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Icon size={18} />
              </div>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground font-mono">
              {formatValue(
                data[metric.key],
                metric.suffix
              )}
            </h2>

            <p className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Realtime telemetry from GRID P2P
            </p>
          </div>
        );
      })}
    </div>
  );
}

export { GridMetricCards };
