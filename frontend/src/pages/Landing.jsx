import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { SplineSceneBasic } from '@/components/ui/demo';
import RadialBurst from '@/components/ui/radial-burst';
import { GradientBackground } from '@/components/ui/dark-gradient-background';
import { LinkPreview } from '@/components/ui/link-preview';
import {
  Cpu,
  ShieldCheck,
  Sun,
  ArrowRight,
  Zap,
  Activity,
  Leaf,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  BatteryCharging,
  Globe,
} from 'lucide-react';

export const Landing = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Natural Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-7 shadow-lg shadow-emerald-950/20 backdrop-blur-md"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Decentralized Solar & Clean Energy Grid</span>
            </motion.div>

            {/* Main Headline (Clean typography, no link preview) */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.14] font-display"
            >
              Trade Clean Solar Power Locally with{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Autonomous AI Pricing
              </span>
            </motion.h1>

            {/* Secondary Subtitle with subtle distinguished preview words (No Underline) */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className="mt-7 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              Directly connect{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Prosumer"
                imageSrc="/images/orbit/solar-3.jpg"
                className="text-emerald-400 hover:text-emerald-300 font-medium no-underline"
              >
                rooftop solar prosumers
              </LinkPreview>{' '}
              with neighborhood consumers. Eliminate grid transmission losses,{' '}
              <LinkPreview
                url="/marketplace"
                imageSrc="/images/orbit/solar-5.jpg"
                className="text-emerald-400 hover:text-emerald-300 font-medium no-underline"
              >
                monetize surplus generation
              </LinkPreview>
              , and power a sustainable future with{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Renewable_energy"
                imageSrc="/images/orbit/solar-6.jpg"
                className="text-emerald-400 hover:text-emerald-300 font-medium no-underline"
              >
                zero-carbon energy
              </LinkPreview>
              .
            </motion.p>

            {/* Quick Metrics Badges with LinkPreviews & Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300"
            >
              <LinkPreview
                url="/marketplace"
                imageSrc="/images/orbit/solar-5.jpg"
                className="no-underline"
              >
                <div className="flex items-center gap-2 bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-all shadow-sm">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-white">Peer-to-Peer Trading</span>
                </div>
              </LinkPreview>

              <LinkPreview
                url="https://en.wikipedia.org/wiki/Peer-to-peer"
                imageSrc="/images/orbit/solar-7.jpg"
                className="no-underline"
              >
                <div className="flex items-center gap-2 bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-all shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-white">Zero Middlemen</span>
                </div>
              </LinkPreview>

              <LinkPreview
                url="/analytics"
                imageSrc="/images/orbit/solar-2.jpg"
                className="no-underline"
              >
                <div className="flex items-center gap-2 bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:border-amber-500/40 transition-all shadow-sm">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span className="font-medium text-white">Dynamic AI Tariffs</span>
                </div>
              </LinkPreview>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
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
            </motion.div>
          </div>
        </section>

        {/* Interactive Solar Panel Radial Burst Orbit */}
        <RadialBurst scrollLength={115} />

        {/* 3D Interactive Showcase */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <SplineSceneBasic />
        </section>

        {/* Live Network Grid Impact / Metrics Section on Scroll */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">Trading Volume</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-display">1.48 GWh</div>
              <p className="text-xs text-slate-400 mt-1">Solar energy traded peer-to-peer</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase text-teal-400 tracking-wider">CO₂ Offset</span>
                <Leaf className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-display">620+ Tons</div>
              <p className="text-xs text-slate-400 mt-1">Direct carbon footprint avoided</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase text-amber-400 tracking-wider">Active Prosumers</span>
                <BatteryCharging className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-display">3,420+</div>
              <p className="text-xs text-slate-400 mt-1">Rooftops sharing green energy</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase text-cyan-400 tracking-wider">Avg. Cost Savings</span>
                <Globe className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-display">28.4%</div>
              <p className="text-xs text-slate-400 mt-1">Cheaper than traditional utility grids</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Pillars with Dynamic Scroll Appearance */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Simple, Transparent{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Energy_market"
                imageSrc="/images/orbit/solar-4.jpg"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Clean Energy Exchange
              </LinkPreview>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
              Designed for rooftop solar owners, residential battery packs, and local energy consumers.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Feature Card 1 */}
            <motion.div
              variants={fadeInUp}
              className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-950/30 group hover:-translate-y-1.5"
            >
              <div className="p-3.5 bg-amber-500/10 text-amber-400 rounded-2xl w-fit mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Sun className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                <LinkPreview
                  url="/register"
                  imageSrc="/images/orbit/solar-1.jpg"
                  className="text-white hover:text-amber-300 font-bold no-underline"
                >
                  1. List Surplus Power
                </LinkPreview>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rooftop solar producers list surplus kilowatt-hours in real time with automated grid synchronization.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              variants={fadeInUp}
              className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-950/30 group hover:-translate-y-1.5"
            >
              <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                <LinkPreview
                  url="/analytics"
                  imageSrc="/images/orbit/solar-2.jpg"
                  className="text-white hover:text-emerald-300 font-bold no-underline"
                >
                  2. AI Rates & Matching
                </LinkPreview>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Smart machine learning models forecast local demand and match buyers with the lowest cost clean energy.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              variants={fadeInUp}
              className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-950/30 group hover:-translate-y-1.5"
            >
              <div className="p-3.5 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                <LinkPreview
                  url="/marketplace"
                  imageSrc="/images/orbit/solar-3.jpg"
                  className="text-white hover:text-cyan-300 font-bold no-underline"
                >
                  3. Direct Settlement
                </LinkPreview>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Energy transfer is confirmed directly with transparent digital billing and verified carbon offset credits.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Landing;


