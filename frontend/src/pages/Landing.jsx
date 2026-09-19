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
import { useTheme } from '../context/ThemeContext';
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
  const { themeMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';

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
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isLightGrid 
          ? 'text-[#12372A] selection:bg-emerald-500/20 selection:text-[#12372A]' 
          : 'text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200'
      }`}>
        <Navbar />

        {/* Hero Section */}
        <section className={`relative overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-16 border-b transition-colors duration-300 ${
          isLightGrid ? 'border-[#D1D9E6]/50' : 'border-white/5'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Live Network Protocol Badge (Professional Enterprise Look) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6 sm:mb-8 transition-all ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#12372A]'
                  : 'bg-slate-900/80 border border-emerald-500/30 text-slate-200 shadow-lg shadow-emerald-950/20 backdrop-blur-md'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-[10.5px] sm:text-[11.5px] uppercase tracking-wider text-slate-300">
                P2P Clean Energy Protocol <span className="opacity-40">•</span> <span className={isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}>Active Network</span>
              </span>
            </motion.div>

            {/* Main Headline (Clean, Luxury Executive Typography) */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.15] sm:leading-[1.12] font-display transition-colors ${
                isLightGrid ? 'text-[#0B241C]' : 'text-white'
              }`}
            >
              Trade Clean Solar Power Locally with{' '}
              <span className={isLightGrid ? 'text-[#15803D]' : 'text-emerald-400'}>
                Autonomous AI Pricing
              </span>
            </motion.h1>

            {/* Secondary Subtitle with high visibility in both themes */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className={`mt-7 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal transition-colors ${
                isLightGrid ? 'text-[#475569]' : 'text-slate-200'
              }`}
            >
              Directly connect{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Prosumer"
                imageSrc="/images/orbit/solar-3.jpg"
                className={`font-semibold no-underline inline-block ${
                  isLightGrid ? 'text-[#16A34A] hover:text-[#15803D]' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                rooftop solar prosumers
              </LinkPreview>{' '}
              with neighborhood consumers. Eliminate grid transmission losses,{' '}
              <LinkPreview
                url="/marketplace"
                imageSrc="/images/orbit/solar-5.jpg"
                className={`font-semibold no-underline inline-block ${
                  isLightGrid ? 'text-[#16A34A] hover:text-[#15803D]' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                monetize surplus generation
              </LinkPreview>
              , and power a sustainable future with{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Renewable_energy"
                imageSrc="/images/orbit/solar-6.jpg"
                className={`font-semibold no-underline inline-block ${
                  isLightGrid ? 'text-[#16A34A] hover:text-[#15803D]' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                zero-carbon energy
              </LinkPreview>
              .
            </motion.p>

            {/* Quick Metrics Badges with Neumorphic styling in light mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm"
            >
              <LinkPreview
                url="/marketplace"
                imageSrc="/images/orbit/solar-5.jpg"
                className="no-underline"
              >
                <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all ${
                  isLightGrid
                    ? 'bg-[#EEF2F6] border border-white/90 shadow-[5px_5px_12px_#c8d3e2,-5px_-5px_12px_#ffffff] hover:shadow-[7px_7px_15px_#bcc7d4,-7px_-7px_15px_#ffffff] text-[#12372A]'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 text-slate-200 shadow-sm'
                }`}>
                  <Zap className={`w-4 h-4 ${isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}`} />
                  <span className="font-semibold">Peer-to-Peer Trading</span>
                </div>
              </LinkPreview>

              <LinkPreview
                url="https://en.wikipedia.org/wiki/Peer-to-peer"
                imageSrc="/images/orbit/solar-7.jpg"
                className="no-underline"
              >
                <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all ${
                  isLightGrid
                    ? 'bg-[#EEF2F6] border border-white/90 shadow-[5px_5px_12px_#c8d3e2,-5px_-5px_12px_#ffffff] hover:shadow-[7px_7px_15px_#bcc7d4,-7px_-7px_15px_#ffffff] text-[#12372A]'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 text-slate-200 shadow-sm'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}`} />
                  <span className="font-semibold">Zero Middlemen</span>
                </div>
              </LinkPreview>

              <LinkPreview
                url="/analytics"
                imageSrc="/images/orbit/solar-2.jpg"
                className="no-underline"
              >
                <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all ${
                  isLightGrid
                    ? 'bg-[#EEF2F6] border border-white/90 shadow-[5px_5px_12px_#c8d3e2,-5px_-5px_12px_#ffffff] hover:shadow-[7px_7px_15px_#bcc7d4,-7px_-7px_15px_#ffffff] text-[#12372A]'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-white/10 hover:border-amber-500/40 text-slate-200 shadow-sm'
                }`}>
                  <Activity className={`w-4 h-4 ${isLightGrid ? 'text-amber-600' : 'text-amber-400'}`} />
                  <span className="font-semibold">Dynamic AI Tariffs</span>
                </div>
              </LinkPreview>
            </motion.div>

            {/* Call to Action Buttons (High-End Enterprise Quality) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/marketplace" className="w-full sm:w-auto">
                <button
                  type="button"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 group active:scale-[0.98] ${
                    isLightGrid
                      ? 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[6px_6px_16px_rgba(22,163,74,0.3),-4px_-4px_12px_#ffffff]'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/25 ring-1 ring-white/20'
                  }`}
                >
                  <span>Explore Energy Market</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <button 
                  type="button"
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] ${
                    isLightGrid 
                      ? 'bg-[#EEF2F6] border border-white/90 shadow-[6px_6px_14px_#c8d3e2,-6px_-6px_14px_#ffffff] active:shadow-[inset_3px_3px_6px_#c8d3e2,inset_-3px_-3px_6px_#ffffff] text-[#12372A] hover:text-[#16A34A]' 
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/15 backdrop-blur-xl shadow-lg hover:border-white/25'
                  }`}
                >
                  Sell Solar Energy
                </button>
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

        {/* Live Network Grid Impact / Metrics Section with Neumorphic Cards */}
        <section className={`py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t transition-colors ${
          isLightGrid ? 'border-[#D1D9E6]/50' : 'border-white/5'
        }`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-2xl transition-all ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[8px_8px_18px_#c8d3e2,-8px_-8px_18px_#ffffff] hover:shadow-[10px_10px_22px_#bcc7d4,-10px_-10px_22px_#ffffff]'
                  : 'bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'
                }`}>Trading Volume</span>
                <TrendingUp className={`w-4 h-4 ${isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}`} />
              </div>
              <div className={`text-3xl font-extrabold font-display ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>1.48 GWh</div>
              <p className={`text-xs mt-1 font-medium ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
                Solar energy traded peer-to-peer
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-2xl transition-all ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[8px_8px_18px_#c8d3e2,-8px_-8px_18px_#ffffff] hover:shadow-[10px_10px_22px_#bcc7d4,-10px_-10px_22px_#ffffff]'
                  : 'bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isLightGrid ? 'text-teal-700' : 'text-teal-400'
                }`}>CO₂ Offset</span>
                <Leaf className={`w-4 h-4 ${isLightGrid ? 'text-teal-700' : 'text-teal-400'}`} />
              </div>
              <div className={`text-3xl font-extrabold font-display ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>620+ Tons</div>
              <p className={`text-xs mt-1 font-medium ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
                Direct carbon footprint avoided
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-2xl transition-all ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[8px_8px_18px_#c8d3e2,-8px_-8px_18px_#ffffff] hover:shadow-[10px_10px_22px_#bcc7d4,-10px_-10px_22px_#ffffff]'
                  : 'bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isLightGrid ? 'text-amber-700' : 'text-amber-400'
                }`}>Active Prosumers</span>
                <BatteryCharging className={`w-4 h-4 ${isLightGrid ? 'text-amber-700' : 'text-amber-400'}`} />
              </div>
              <div className={`text-3xl font-extrabold font-display ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>3,420+</div>
              <p className={`text-xs mt-1 font-medium ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
                Rooftops sharing green energy
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-2xl transition-all ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[8px_8px_18px_#c8d3e2,-8px_-8px_18px_#ffffff] hover:shadow-[10px_10px_22px_#bcc7d4,-10px_-10px_22px_#ffffff]'
                  : 'bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isLightGrid ? 'text-cyan-700' : 'text-cyan-400'
                }`}>Avg. Cost Savings</span>
                <Globe className={`w-4 h-4 ${isLightGrid ? 'text-cyan-700' : 'text-cyan-400'}`} />
              </div>
              <div className={`text-3xl font-extrabold font-display ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>28.4%</div>
              <p className={`text-xs mt-1 font-medium ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
                Cheaper than traditional utility grids
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Pillars with Dynamic Neumorphic 3D Cards */}
        <section className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t transition-colors ${
          isLightGrid ? 'border-[#D1D9E6]/50' : 'border-white/5'
        }`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isLightGrid
                ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#16A34A]'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>How It Works</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold font-display ${
              isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
            }`}>
              Simple, Transparent{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Energy_market"
                imageSrc="/images/orbit/solar-4.jpg"
                className={`font-bold ${isLightGrid ? 'text-[#16A34A] hover:text-[#15803D]' : 'text-emerald-400 hover:text-emerald-300'}`}
              >
                Clean Energy Exchange
              </LinkPreview>
            </h2>
            <p className={`text-sm mt-2 max-w-md mx-auto font-medium ${
              isLightGrid ? 'text-[#475569]' : 'text-slate-300'
            }`}>
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
              className={`p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-2 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[10px_10px_22px_#c8d3e2,-10px_-10px_22px_#ffffff] hover:shadow-[14px_14px_28px_#bcc7d4,-14px_-14px_28px_#ffffff]'
                  : 'bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 shadow-black/40 hover:shadow-emerald-950/30'
              }`}
            >
              <div className={`p-3.5 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] shadow-[inset_3px_3px_6px_#c8d3e2,inset_-3px_-3px_6px_#ffffff] text-amber-500'
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}>
                <Sun className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold mb-3 font-display ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>
                <LinkPreview
                  url="/register"
                  imageSrc="/images/orbit/solar-1.jpg"
                  className={`font-bold no-underline ${
                    isLightGrid ? 'text-[#12372A] hover:text-amber-600' : 'text-slate-100 hover:text-amber-300'
                  }`}
                >
                  1. List Surplus Power
                </LinkPreview>
              </h3>
              <p className={`text-sm leading-relaxed font-normal ${
                isLightGrid ? 'text-[#475569]' : 'text-slate-300'
              }`}>
                Rooftop solar producers list surplus kilowatt-hours in real time with automated grid synchronization.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              variants={fadeInUp}
              className={`p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-2 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[10px_10px_22px_#c8d3e2,-10px_-10px_22px_#ffffff] hover:shadow-[14px_14px_28px_#bcc7d4,-14px_-14px_28px_#ffffff]'
                  : 'bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 shadow-black/40 hover:shadow-emerald-950/30'
              }`}
            >
              <div className={`p-3.5 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] shadow-[inset_3px_3px_6px_#c8d3e2,inset_-3px_-3px_6px_#ffffff] text-[#16A34A]'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold mb-3 font-display ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>
                <LinkPreview
                  url="/analytics"
                  imageSrc="/images/orbit/solar-2.jpg"
                  className={`font-bold no-underline ${
                    isLightGrid ? 'text-[#12372A] hover:text-[#16A34A]' : 'text-slate-100 hover:text-emerald-300'
                  }`}
                >
                  2. AI Rates & Matching
                </LinkPreview>
              </h3>
              <p className={`text-sm leading-relaxed font-normal ${
                isLightGrid ? 'text-[#475569]' : 'text-slate-300'
              }`}>
                Smart machine learning models forecast local demand and match buyers with the lowest cost clean energy.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              variants={fadeInUp}
              className={`p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-2 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[10px_10px_22px_#c8d3e2,-10px_-10px_22px_#ffffff] hover:shadow-[14px_14px_28px_#bcc7d4,-14px_-14px_28px_#ffffff]'
                  : 'bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 shadow-black/40 hover:shadow-emerald-950/30'
              }`}
            >
              <div className={`p-3.5 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] shadow-[inset_3px_3px_6px_#c8d3e2,inset_-3px_-3px_6px_#ffffff] text-cyan-600'
                  : 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20'
              }`}>
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold mb-3 font-display ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>
                <LinkPreview
                  url="/marketplace"
                  imageSrc="/images/orbit/solar-3.jpg"
                  className={`font-bold no-underline ${
                    isLightGrid ? 'text-[#12372A] hover:text-cyan-700' : 'text-slate-100 hover:text-cyan-300'
                  }`}
                >
                  3. Direct Settlement
                </LinkPreview>
              </h3>
              <p className={`text-sm leading-relaxed font-normal ${
                isLightGrid ? 'text-[#475569]' : 'text-slate-300'
              }`}>
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
