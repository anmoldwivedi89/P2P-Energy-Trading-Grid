import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Zap, Activity, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100">
      {/* Auth Header */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <span>GridP2P</span>
        </Link>
        <Link to="/" className="text-xs text-slate-400 hover:text-white transition">
          ← Back to Marketplace
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <Outlet />
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="py-4 text-center text-xs text-slate-500">
        AI-Powered Decentralized Peer-to-Peer Energy Trading Marketplace
      </footer>
    </div>
  );
};

export default AuthLayout;
