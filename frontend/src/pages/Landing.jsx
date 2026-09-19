import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { SplineSceneBasic } from '@/components/ui/demo';
import RadialBurst from '@/components/ui/radial-burst';
import {
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  Sun,
  Wind,
  ArrowRight,
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Cpu className="w-4 h-4" />
            <span>AI-Optimized • Peer-to-Peer • Decentralized</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Trade Clean Energy Locally with{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Smart AI Pricing
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Directly connect solar and renewable energy producers with neighborhood consumers. Cut grid transmission losses, earn fair tariffs, and automate settlements.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/marketplace">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <span>Explore Energy Market</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Become a Prosumer Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Solar Panel Radial Burst Orbit */}
      <RadialBurst scrollLength={280} />

      {/* 3D Interactive Showcase */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SplineSceneBasic />
      </section>

      {/* Features Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How The Grid Marketplace Works</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Built for sustainable, decentralized clean microgrids</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Prosumers List Excess Power</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rooftop solar and wind owners list their excess kWh on the marketplace at dynamic market rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl w-fit mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. AI Predicts Optimal Rates</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Machine learning models forecast demand trends and recommend optimal buy/sell prices dynamically.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Direct P2P Settlement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Energy is routed directly through local grid clusters with secure and transparent digital verification.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
