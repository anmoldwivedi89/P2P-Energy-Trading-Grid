import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import EnergyChart from '../../components/dashboard/EnergyChart';
import DemandChart from '../../components/dashboard/DemandChart';
import PriceChart from '../../components/dashboard/PriceChart';
import UserTable from '../../components/admin/UserTable';
import { Shield, Server, Activity, Users } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Grid Telemetry & Administration</h1>
        <p className="text-xs text-slate-400 mt-1">
          High-level supervisory control, microgrid health monitoring, and system metrics.
        </p>
      </div>

      {/* Admin stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Microgrid Nodes"
          value="48 Online"
          change="99.9% Uptime"
          isPositive={true}
          icon={Server}
          description="Distributed edge nodes"
        />
        <StatsCard
          title="Total Grid Flow"
          value="12.4 MWh"
          change="+15.8%"
          isPositive={true}
          icon={Activity}
          description="Settled peer power"
        />
        <StatsCard
          title="Registered Prosumers"
          value="124 Users"
          change="+8 new"
          isPositive={true}
          icon={Users}
          description="Active participants"
        />
        <StatsCard
          title="Smart Contract Health"
          value="Operational"
          icon={Shield}
          description="Decentralized verification"
        />
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergyChart title="Macro Grid Power Distribution (MWh)" />
        <PriceChart title="Dynamic AI Clearing Tariff ($/kWh)" />
      </div>

      {/* User & Node Management table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Connected Grid Participants</h3>
        <UserTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
