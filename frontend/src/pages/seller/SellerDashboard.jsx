import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { orderService } from '../../services/orderService';
import { listingService } from '../../services/listingService';
import { predictionService } from '../../services/predictionService';
import { getSellerDashboard } from '../../services/dashboardService';
import GridMetricCards from '../../components/dashboard/GridMetricCards';
import {
  DashboardCard,
  DetailHeader,
  DetailTag,
  DashboardChartTooltip,
  ChartMarker,
  useDashboardPeriod,
} from '../../components/capitalio/shared';
import {
  DashboardMoneyBagIcon,
  DashboardAnalyticsUpIcon,
  DashboardPieChartIcon,
  Dashboard3dScaleIcon,
  DashboardReloadHorizontalIcon,
} from '../../components/capitalio/icons';
import {
  SunMedium,
  Zap,
  Plus,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  BatteryCharging,
  Layers,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const SellerDashboard = () => {
  const period = useDashboardPeriod();
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // AI pricing state
  const [aiPrice, setAiPrice] = useState(6.5);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSource, setAiSource] = useState('ml_model');
  const marketAverageRate = 7.2;

  const fetchSellerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, ordersRes, listingsRes] = await Promise.allSettled([
        getSellerDashboard(),
        orderService.getSellerOrders(),
        listingService.getMyListings(),
      ]);

      if (dashRes.status === 'fulfilled') {
        const d = dashRes.value?.data || dashRes.value;
        setDashboardData(d);
        if (d?.orders && Array.isArray(d.orders) && d.orders.length > 0) {
          setOrders(d.orders);
        }
        if (d?.listings && Array.isArray(d.listings) && d.listings.length > 0) {
          setListings(d.listings);
        }
      }
      if (ordersRes.status === 'fulfilled') {
        const raw = ordersRes.value;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        if (list.length > 0) setOrders(list);
      }
      if (listingsRes.status === 'fulfilled') {
        const raw = listingsRes.value;
        const list = Array.isArray(raw) ? raw : raw?.data || [];
        if (list.length > 0) setListings(list);
      }
    } catch (err) {
      setError(err.message || 'Failed to load seller dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAiPrice = async () => {
    setAiLoading(true);
    try {
      const res = await predictionService.getPriceRecommendation({ energyType: 'Solar' });
      const price =
        res?.data?.recommendedPricePerKwh ||
        res?.recommendedPricePerKwh ||
        res?.data?.recommended_price_per_kwh ||
        res?.recommended_price_per_kwh;

      if (price !== undefined && price !== null && !isNaN(Number(price))) {
        setAiPrice(Number(price));
        setAiSource(res?.data?.source || res?.source || 'ml_model');
      }
    } catch {
      setAiSource('baseline');
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerData();
    fetchAiPrice();
  }, []);

  // Compute metrics from actual orders and listings
  const metrics = useMemo(() => {
    const totalSoldKwh = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

    const totalRevenueInr = orders
      .filter((o) => o.status === 'Completed' || o.status === 'Dispatched')
      .reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);

    const activeListingsCount = listings.filter((l) => l.status === 'Active' || !l.status).length;

    const totalListedCapacityKwh = listings.reduce(
      (sum, l) => sum + (Number(l.amount) || Number(l.availableAmount) || 0),
      0
    );

    // Estimate solar generation from listed capacity + sold volume (minimum baseline)
    const estimatedGenerationKwh = Math.max(
      totalSoldKwh + totalListedCapacityKwh,
      totalSoldKwh > 0 ? totalSoldKwh * 1.35 : 120.0
    );

    const clearanceRate =
      estimatedGenerationKwh > 0
        ? Math.min(100, Math.round((totalSoldKwh / estimatedGenerationKwh) * 100))
        : 0;

    return {
      totalSoldKwh: totalSoldKwh.toFixed(1),
      totalRevenueInr: totalRevenueInr.toFixed(2),
      activeListingsCount,
      totalListedCapacityKwh: totalListedCapacityKwh.toFixed(1),
      estimatedGenerationKwh: estimatedGenerationKwh.toFixed(1),
      clearanceRate,
    };
  }, [orders, listings]);

  // Hourly solar curve: typical solar bell curve across daylight hours
  const solarHourlyData = useMemo(() => {
    const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    const genCoefficients = [0.08, 0.35, 0.78, 1.0, 0.85, 0.45, 0.12, 0.0];
    const peakGen = Math.max(Number(metrics.estimatedGenerationKwh) / 5.5, 24);

    return hours.map((h, i) => {
      const gen = Math.round(peakGen * genCoefficients[i] * 10) / 10;
      const feedIn = Math.round(gen * 0.72 * 10) / 10;
      return {
        time: h,
        generation: gen,
        gridFeedIn: feedIn,
      };
    });
  }, [metrics.estimatedGenerationKwh]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="capitalio-dashboard space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Prosumer Seller Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Meter Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time solar telemetry, automated grid dispatch, and AI smart clearing prices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSellerData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition shadow-custom"
            title="Refresh telemetry"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            to="/seller/create-listing"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-custom transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Energy Listing</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs">
          {error}
        </div>
      )}

      {/* KPI Cards Row */}
      <GridMetricCards
        role="seller"
        data={{
          totalEnergyGenerated: dashboardData?.totalEnergyGenerated ?? metrics.estimatedGenerationKwh,
          totalEnergySold: dashboardData?.totalEnergySold ?? metrics.totalSoldKwh,
          totalRevenue: dashboardData?.totalRevenue ?? `₹${metrics.totalRevenueInr}`,
          activeListings: dashboardData?.activeListings ?? metrics.activeListingsCount,
        }}
      />

      {/* Charts & AI Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Solar Generation History Chart */}
        <DashboardCard className="lg:col-span-2 p-5 sm:p-6">
          <DetailHeader
            title="Solar Generation vs Grid Feed-in"
            description="Hourly solar generation profile (kWh) compared to actual dispatched peer energy"
            actions={
              <div className="flex items-center gap-3 text-xs">
                <ChartMarker color="#10b981" label="Total Solar Output" />
                <ChartMarker color="#3b82f6" label="Grid Dispatched" />
              </div>
            }
          />

          <div className="h-[280px] sm:h-[320px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={solarHourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorFeedIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
                <XAxis
                  dataKey="time"
                  stroke="currentColor"
                  className="text-[11px] opacity-60"
                  tickLine={false}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-[11px] opacity-60"
                  tickLine={false}
                  unit=" kWh"
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-border bg-card p-3 shadow-custom text-xs">
                          <p className="font-semibold text-foreground mb-1.5">{label}</p>
                          <div className="space-y-1">
                            <p className="text-emerald-500 font-medium flex items-center justify-between gap-4">
                              <span>Solar Output:</span>
                              <span className="font-bold">{payload[0]?.value} kWh</span>
                            </p>
                            <p className="text-blue-500 font-medium flex items-center justify-between gap-4">
                              <span>Grid Feed-in:</span>
                              <span className="font-bold">{payload[1]?.value} kWh</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="generation"
                  name="Solar Output"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorGeneration)"
                />
                <Area
                  type="monotone"
                  dataKey="gridFeedIn"
                  name="Grid Feed-in"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFeedIn)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Telemetry Bar */}
          <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground block text-[11px]">Peak Solar Time</span>
              <span className="font-semibold text-foreground">12:00 PM – 02:00 PM</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Inverter Efficiency</span>
              <span className="font-semibold text-primary">98.4% Active</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Storage Battery SOC</span>
              <span className="font-semibold text-foreground">84% (4.2 kWh reserved)</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Grid Frequency</span>
              <span className="font-semibold text-foreground">50.02 Hz Stable</span>
            </div>
          </div>
        </DashboardCard>

        {/* Right Col: AI Recommended Price & Solar Target */}
        <div className="space-y-6">
          {/* AI Pricing Card */}
          <DashboardCard className="p-5 sm:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>AI Smart Pricing Signal</span>
              </div>
              <button
                type="button"
                onClick={fetchAiPrice}
                disabled={aiLoading}
                className="text-muted-foreground hover:text-foreground transition p-1 rounded-md hover:bg-muted"
                title="Recalculate AI rate"
              >
                <RefreshCw className={cn('w-3.5 h-3.5', aiLoading && 'animate-spin')} />
              </button>
            </div>

            <h3 className="text-sm font-semibold text-foreground">Dynamic Grid Tariff</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Machine learning analyzes local solar irradiance, neighborhood demand curves, and grid congestion.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-muted/40 border border-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Market Average Tariff:</span>
                <span className="font-semibold text-foreground">₹{marketAverageRate.toFixed(2)}/kWh</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Demand Forecast Index:</span>
                <span className="font-semibold text-primary flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> High Demand (+14%)
                </span>
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-foreground font-medium block">
                    Recommended Price:
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono inline-block mt-0.5">
                    {aiSource === 'ml_model' ? 'ML MODEL LIVE' : 'SMART GRID BASE'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-primary">
                    {aiLoading ? '...' : `₹${aiPrice.toFixed(2)}`}
                  </span>
                  <span className="text-[11px] text-muted-foreground block">/ kWh</span>
                </div>
              </div>
            </div>

            <Link
              to="/seller/create-listing"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-custom transition"
            >
              <span>Publish Listing with AI Rate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </DashboardCard>

          {/* Daily Generation Target Progress */}
          <DashboardCard className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-foreground">Daily Solar Export Target</span>
              <span className="text-xs font-bold text-primary">{metrics.clearanceRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, Math.min(100, metrics.clearanceRate))}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{metrics.totalSoldKwh} kWh exported</span>
              <span>Target: {metrics.estimatedGenerationKwh} kWh</span>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Energy Selling History / Recent Orders Table */}
      <DashboardCard className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <DetailHeader
            title="Energy Selling History & Orders"
            description="Verified peer purchases fulfilled by your solar generation feed"
          />
          <Link
            to="/seller/orders"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Seller Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-muted-foreground">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
            Loading selling records...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">No Sales Orders Yet</h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              You haven't received energy purchases yet. List surplus power to start selling to neighboring homes.
            </p>
            <Link
              to="/seller/create-listing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground shadow-custom hover:bg-primary/90 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Energy Listing</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-3 font-semibold">Order / Tx ID</th>
                  <th className="p-3 font-semibold">Buyer</th>
                  <th className="p-3 font-semibold">Energy Type</th>
                  <th className="p-3 font-semibold">Volume</th>
                  <th className="p-3 font-semibold">Rate</th>
                  <th className="p-3 font-semibold">Total Revenue</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 6).map((order) => {
                  const id = order._id || order.id || 'N/A';
                  const buyerName =
                    typeof order.buyer === 'object' && order.buyer?.name
                      ? order.buyer.name
                      : 'Peer Prosumer';
                  const buyerEmail =
                    typeof order.buyer === 'object' && order.buyer?.email
                      ? order.buyer.email
                      : '';
                  const energyType = order.listing?.energyType || 'Solar PV';
                  const amount = Number(order.amount) || 0;
                  const price = Number(order.pricePerKwh) || 0;
                  const total = Number(order.totalPrice) || amount * price;
                  const status = order.status || 'Completed';
                  const date = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Recent';

                  return (
                    <tr key={id} className="hover:bg-muted/30 transition">
                      <td className="p-3 font-mono text-[11px] text-foreground">
                        #{id.slice(-6).toUpperCase()}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-foreground">{buyerName}</div>
                        {buyerEmail && (
                          <div className="text-[11px] text-muted-foreground">{buyerEmail}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <SunMedium className="w-3 h-3" />
                          {energyType}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-foreground">
                        {amount.toFixed(1)} kWh
                      </td>
                      <td className="p-3 text-muted-foreground">
                        ₹{price.toFixed(2)}/kWh
                      </td>
                      <td className="p-3 font-bold text-primary">
                        ₹{total.toFixed(2)}
                      </td>
                      <td className="p-3">
                        <DetailTag
                          tone={
                            status === 'Completed'
                              ? 'positive'
                              : status === 'Cancelled'
                              ? 'negative'
                              : 'neutral'
                          }
                        >
                          {status}
                        </DetailTag>
                      </td>
                      <td className="p-3 text-[11px] text-muted-foreground whitespace-nowrap">
                        {date}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(id, id)}
                          className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition"
                          title="Copy Order ID"
                        >
                          {copiedId === id ? (
                            <Check className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>

      {/* Active Listings Quick Overview */}
      <DashboardCard className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <DetailHeader
            title="My Active Power Listings"
            description="Active energy offers currently broadcasted to the decentralized marketplace"
          />
          <Link
            to="/seller/listings"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Manage All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="p-6 rounded-2xl bg-muted/20 border border-dashed border-border text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              You do not have any published energy listings right now.
            </p>
            <Link
              to="/seller/create-listing"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-custom"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Listing</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.slice(0, 3).map((l) => {
              const id = l._id || l.id;
              const title = l.title || `${l.energyType || 'Solar'} Energy Offer`;
              const amount = Number(l.amount) || Number(l.availableAmount) || 0;
              const price = Number(l.pricePerKwh) || 0;
              const location = l.location || 'Microgrid Zone A';

              return (
                <div
                  key={id}
                  className="p-4 rounded-xl border border-border bg-card/60 hover:border-primary/40 transition shadow-custom flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                        <SunMedium className="w-3 h-3" />
                        {l.energyType || 'Solar'}
                      </span>
                      <DetailTag tone={l.status === 'Sold' ? 'neutral' : 'positive'}>
                        {l.status || 'Active'}
                      </DetailTag>
                    </div>
                    <h4 className="text-xs font-semibold text-foreground line-clamp-1">{title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{location}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[11px] text-muted-foreground block">Available</span>
                      <span className="font-bold text-foreground">{amount} kWh</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-muted-foreground block">Unit Price</span>
                      <span className="font-bold text-primary">₹{price.toFixed(2)}/kWh</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default SellerDashboard;