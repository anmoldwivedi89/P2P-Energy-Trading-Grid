import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { SplineSceneBasic } from '@/components/ui/demo';
import RadialBurst from '@/components/ui/radial-burst';
import { GradientBackground } from '@/components/ui/dark-gradient-background';
import {
  Cpu,
  ShieldCheck,
  Sun,
  ArrowRight,
  Zap,
  Activity,
  BarChart3,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

export const Landing = () => {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Natural Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-7 shadow-lg shadow-emerald-950/20 backdrop-blur-md">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Decentralized Solar & Clean Energy Grid</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.14] font-display">
              Trade Clean Solar Power Locally with{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Autonomous AI Pricing
              </span>
            </h1>

            {/* Secondary Subtitle */}
            <p className="mt-7 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Directly connect rooftop solar prosumers with neighborhood consumers. Eliminate grid transmission losses, monetize surplus generation, and power a sustainable future.
            </p>

            {/* Quick Metrics Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-sm">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">Peer-to-Peer Trading</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">Zero Middlemen</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-sm">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="font-medium text-white">Dynamic AI Tariffs</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2">
                  <span>Explore Energy Market</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Sell Solar Energy
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Solar Panel Radial Burst Orbit */}
        <RadialBurst scrollLength={115} />

        {/* 3D Interactive Showcase */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <SplineSceneBasic />
        </section>

        {/* Features Pillars */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/5">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Simple, Transparent Clean Energy Exchange
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
              Designed for rooftop solar owners, residential battery packs, and local energy consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-950/30 group">
              <div className="p-3.5 bg-amber-500/10 text-amber-400 rounded-2xl w-fit mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Sun className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                1. List Surplus Power
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rooftop solar producers list surplus kilowatt-hours in real time with automated grid synchronization.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-950/30 group">
              <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                2. AI Rates & Matching
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Smart machine learning models forecast local demand and match buyers with the lowest cost clean energy.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-950/30 group">
              <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                3. Direct Settlement
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Energy transfer is confirmed directly with transparent digital billing and verified carbon offset credits.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Landing;
