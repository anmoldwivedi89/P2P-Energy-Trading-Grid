import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { User, Shield, Wallet, Cpu } from 'lucide-react';

export const Profile = () => {
  const { user, role } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Account Profile</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your identity, connected node wallet, and energy meter credentials.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{user?.name || 'Energy Participant'}</h3>
            <p className="text-xs text-slate-400 capitalize">{role || 'Prosumer'} Node</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <Input label="Full Name" defaultValue={user?.name || 'Demo User'} readOnly />
          <Input label="Email Address" defaultValue={user?.email || 'user@gridp2p.io'} readOnly />
          <Input label="Grid Cluster Node" defaultValue="Substation Zone 4 - Meter #982" readOnly />
          <Input label="Wallet / Smart Contract Address" defaultValue={user?.walletAddress || '0x71C...3a9F'} readOnly />
        </div>

        <div className="flex justify-end pt-4">
          <Button size="sm">Save Profile Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
