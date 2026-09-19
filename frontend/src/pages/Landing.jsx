import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { SplineSceneBasic } from '@/components/ui/demo';
import RadialBurst from '@/components/ui/radial-burst';
import {
  Cpu,
  ShieldCheck,
  Sun,
  ArrowRight,
  Zap,
  Activity,
  BarChart3,
  Flame,
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#060913] flex flex-col text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 border-b border-white/5">
        {/* Subtle Ambient Solar & Grid Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-7 shadow-lg shadow-amber-950/20">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
            <span>Decentralized Solar Microgrid Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15] font-display">
            Trade Solar Energy Locally with{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
              Autonomous AI Pricing
            </span>
          </h1>

          <p className="mt-7 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Directly connect rooftop solar prosumers with neighborhood buyers. Eliminate transmission tariffs, monetize surplus kilowatts, and accelerate the transition to 100% clean power.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-mono text-slate-400">
            <div className="flex items-center gap-2 bg-slate-900/60 px-3.5 py-1.5 rounded-xl border border-white/5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Real-Time P2P Matching</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 px-3.5 py-1.5 rounded-xl border border-white/5">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Zero Intermediary Loss</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 px-3.5 py-1.5 rounded-xl border border-white/5">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Dynamic AI Tariff Engine</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2">
                <span>Explore Energy Market</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                List Solar Panel Output
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Solar Panel Radial Burst Orbit */}
      <RadialBurst scrollLength={115} />

      {/* 3D Interactive Showcase */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SplineSceneBasic />
      </section>

      {/* Features Pillars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/5">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Enterprise Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            How The P2P Grid Marketplace Works
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-lg mx-auto">
            Architected for decentralized residential microgrids, battery banks, and solar communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20 group">
            <div className="p-3.5 bg-amber-500/10 text-amber-400 rounded-2xl w-fit mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Sun className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">1. Solar Prosumers List Power</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Residential and commercial solar panel owners list their surplus generation in real-time kWh units at dynamic rates.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 group">
            <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">2. AI Predicts Optimal Tariffs</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Proprietary machine learning models analyze weather data, regional demand, and storage reserves to establish competitive pricing.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group">
            <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">3. Autonomous Settlement</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Power transfers are matched instantaneously with auditable settlement records and verifiable green energy credits.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
