import React from 'react';
import { cn } from '../../lib/utils';
import { useDashboardNavigation } from './navigation';

export const dashboardPeriods = [
  { value: '1D', label: '1 Day' },
  { value: '1W', label: '1 Week' },
  { value: '1M', label: '1 Month' },
  { value: '1Y', label: '1 Year' },
  { value: 'ALL', label: 'All Time' },
];

export const defaultDashboardPeriod = '1M';

export function useDashboardPeriod() {
  const { period } = useDashboardNavigation();
  return dashboardPeriods.some((p) => p.value === period) ? period : defaultDashboardPeriod;
}

export function toneColor(tone) {
  if (tone === 'positive') return 'var(--chart-4)';
  if (tone === 'negative') return 'var(--destructive)';
  return 'var(--foreground)';
}

export function DashboardCard({ children, className, ...props }) {
  return (
    <article
      className={cn(
        'shadow-custom min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5 text-card-foreground transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}

export function DetailHeader({ title, subtitle, children, className }) {
  return (
    <div className={cn('flex min-w-0 flex-wrap items-start justify-between gap-3 mb-4', className)}>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base sm:text-lg font-semibold leading-tight tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle ? (
          <div className="mt-1 truncate text-xs text-muted-foreground leading-relaxed">
            {subtitle}
          </div>
        ) : null}
      </div>
      {children ? (
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DetailTag({ children, color = 'var(--chart-1)', className }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium leading-none', className)}
      style={{
        color,
        backgroundColor: `color-mix(in oklab, ${color} 12%, transparent)`,
        border: `1px solid color-mix(in oklab, ${color} 24%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

export function DashboardChartTooltip({
  active,
  label,
  payload,
  names,
  colors,
  valueFormatter,
}) {
  const items = payload?.filter((item) => item.value !== undefined && item.value !== null) ?? [];

  if (!active || items.length === 0) {
    return null;
  }

  const header = items[0]?.payload?.name ?? items[0]?.payload?.label ?? label;

  return (
    <div className="rounded-xl border border-border bg-popover/95 backdrop-blur-md p-3 text-xs text-popover-foreground shadow-lg shadow-black/20 z-50">
      {header && <div className="mb-2 text-xs font-semibold text-muted-foreground">{header}</div>}
      <div className="space-y-1.5">
        {items.map((item, idx) => {
          const dataKey = String(item.dataKey ?? item.name ?? idx);
          const color = colors?.[dataKey] ?? item.color ?? item.payload?.fill ?? 'var(--primary)';
          const name = names?.[dataKey] ?? item.name ?? dataKey;
          const value = valueFormatter ? valueFormatter(item.value, dataKey) : item.value;

          return (
            <div key={`${dataKey}-${idx}`} className="grid grid-cols-[1fr_auto] items-center gap-4 leading-none">
              <div className="flex min-w-0 items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-xs" style={{ backgroundColor: color }} />
                <span className="truncate text-xs text-foreground/90">{name}</span>
              </div>
              <span className="text-right font-mono font-semibold text-xs text-foreground">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChartMarker({ color, className }) {
  return (
    <span
      className={cn('size-2.5 shrink-0 rounded-xs inline-block', className)}
      style={{ backgroundColor: color }}
    />
  );
}
