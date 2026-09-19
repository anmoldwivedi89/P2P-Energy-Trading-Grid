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
  Leaf,
  CheckCircle2,
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col text-[#12372A] font-sans selection:bg-[#ECFDF3] selection:text-[#16A34A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-14 border-b border-[#DDE8E1]">
        {/* Soft natural background circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ECFDF3] rounded-full blur-[100px] pointer-events-none opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Natural Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF3] border border-[#DDE8E1] text-[#16A34A] text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Decentralized Solar & Clean Energy Grid</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#12372A] max-w-4xl mx-auto leading-[1.12]">
            Trade Clean Solar Power Locally with{' '}
            <span className="text-[#16A34A]">
              Smart AI Pricing
            </span>
          </h1>

          {/* Secondary Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            Directly connect rooftop solar prosumers with neighborhood consumers. Cut grid transmission losses, monetize surplus generation, and power a sustainable future.
          </p>

          {/* Quick Metrics Badges */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 text-xs sm:text-sm text-[#475569]">
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#DDE8E1] shadow-xs">
              <Zap className="w-4 h-4 text-[#16A34A]" />
              <span className="font-medium text-[#12372A]">Peer-to-Peer Trading</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#DDE8E1] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span className="font-medium text-[#12372A]">Zero Middlemen</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-[#DDE8E1] shadow-xs">
              <Activity className="w-4 h-4 text-[#16A34A]" />
              <span className="font-medium text-[#12372A]">Dynamic AI Tariffs</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
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

      {/* Features Pillars with Soft Green Background */}
      <section className="py-16 bg-[#ECFDF3] border-t border-[#DDE8E1] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DDE8E1] text-[#16A34A] text-xs font-semibold uppercase tracking-wider mb-3">
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12372A]">
              Simple, Transparent Clean Energy Exchange
            </h2>
            <p className="text-sm text-[#475569] mt-2 max-w-md mx-auto">
              Designed for rooftop solar owners, residential battery packs, and local energy consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* White Card 1 */}
            <div className="p-7 rounded-3xl bg-white border border-[#DDE8E1] hover:border-[#16A34A]/50 transition-all duration-200 shadow-xs hover:shadow-md">
              <div className="p-3 bg-[#ECFDF3] text-[#16A34A] rounded-2xl w-fit mb-5 border border-[#DDE8E1]">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#12372A] mb-2.5">
                1. List Surplus Power
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Rooftop solar producers list surplus kilowatt-hours in real time with automated grid synchronization.
              </p>
            </div>

            {/* White Card 2 */}
            <div className="p-7 rounded-3xl bg-white border border-[#DDE8E1] hover:border-[#16A34A]/50 transition-all duration-200 shadow-xs hover:shadow-md">
              <div className="p-3 bg-[#ECFDF3] text-[#16A34A] rounded-2xl w-fit mb-5 border border-[#DDE8E1]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#12372A] mb-2.5">
                2. AI Rates & Matching
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Smart machine learning models forecast local demand and match buyers with the lowest cost clean energy.
              </p>
            </div>

            {/* White Card 3 */}
            <div className="p-7 rounded-3xl bg-white border border-[#DDE8E1] hover:border-[#16A34A]/50 transition-all duration-200 shadow-xs hover:shadow-md">
              <div className="p-3 bg-[#ECFDF3] text-[#16A34A] rounded-2xl w-fit mb-5 border border-[#DDE8E1]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#12372A] mb-2.5">
                3. Direct Settlement
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Energy transfer is confirmed directly with transparent digital billing and verified carbon offset credits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
