import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
const SplineSceneBasic = React.lazy(() => import('@/components/ui/demo'));
import RadialBurst from '@/components/ui/radial-burst';
import { GradientBackground } from '@/components/ui/dark-gradient-background';
import { LinkPreview } from '@/components/ui/link-preview';
import { TypewriterText } from '@/components/ui/typewriter-effect';
import { ThreeEnergyGrid } from '@/components/ui/ThreeEnergyGrid';
import { ThreeDTilt } from '@/components/ui/ThreeDTilt';
import { ThreeEnergyCore } from '@/components/ui/ThreeEnergyCore';
import { useTheme } from '../context/ThemeContext';
import {
  Cpu,
  ShieldCheck,
  Sun,
  ArrowRight,
  ArrowLeftRight,
  SlidersHorizontal,
  Leaf,
  Sparkles,
  TrendingUp,
  BatteryCharging,
  BadgePercent,
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

        {/* Hero Section with Interactive 3D Three.js Energy Grid */}
        <section className={`relative overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-16 border-b transition-colors duration-300 ${
          isLightGrid ? 'border-[#D1D9E6]/50' : 'border-white/5'
        }`}>
          {/* 3D Three.js Interactive Particle Grid */}
          <ThreeEnergyGrid />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Live Network Protocol Badge (Professional Enterprise Look) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              data-cursor="solar"
              data-cursor-text="Active Grid"
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium mb-6 sm:mb-8 transition-all cursor-pointer ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#12372A]'
                  : 'bg-slate-900/80 border border-emerald-500/30 text-slate-200 shadow-lg shadow-emerald-950/20 backdrop-blur-md'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className={`text-[11px] sm:text-xs font-medium ${
                isLightGrid ? 'text-slate-800' : 'text-slate-200'
              }`}>
                P2P Clean Energy Protocol <span className={isLightGrid ? 'text-slate-400' : 'opacity-40'}>•</span>{' '}
                <span className={isLightGrid ? 'text-[#16A34A] font-semibold' : 'text-emerald-400'}>
                  Active Network
                </span>
              </span>
            </motion.div>

            {/* Main Headline with 3D Depth & Left-to-Right Typewriter Animation */}
            <ThreeDTilt maxTilt={6} glare={false} className="w-full">
              <h1
                className={`text-3xl sm:text-5xl md:text-6xl font-semibold max-w-4xl mx-auto leading-[1.22] transition-colors ${
                  isLightGrid ? 'text-[#0B241C]' : 'text-white'
                }`}
              >
                <TypewriterText
                  speed={0.065}
                  delay={0.2}
                  words={[
                    { text: 'Trade' },
                    { text: 'Clean' },
                    { text: 'Solar' },
                    { text: 'Power' },
                    { text: 'Locally' },
                    { text: 'with' },
                    {
                      text: 'Autonomous',
                      className: isLightGrid ? 'text-[#15803D]' : 'text-emerald-400',
                    },
                    {
                      text: 'AI',
                      className: isLightGrid ? 'text-[#15803D]' : 'text-emerald-400',
                    },
                    {
                      text: 'Pricing',
                      className: isLightGrid ? 'text-[#15803D]' : 'text-emerald-400',
                    },
                  ]}
                />
              </h1>
            </ThreeDTilt>

            {/* Secondary Subtitle with high visibility in both themes */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className={`mt-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal transition-colors ${
                isLightGrid ? 'text-[#475569]' : 'text-slate-200'
              }`}
            >
              Directly connect{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Prosumer"
                imageSrc="/images/orbit/solar-3.jpg"
                className={`font-medium no-underline inline-block ${
                  isLightGrid ? 'text-[#16A34A] hover:text-[#15803D]' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                rooftop solar prosumers
              </LinkPreview>{' '}
              with neighborhood consumers. Eliminate grid transmission losses,{' '}
              <LinkPreview
                url="/marketplace"
                imageSrc="/images/orbit/solar-5.jpg"
                className={`font-medium no-underline inline-block ${
                  isLightGrid ? 'text-[#16A34A] hover:text-[#15803D]' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                monetize surplus generation
              </LinkPreview>
              , and power a sustainable future with{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Renewable_energy"
                imageSrc="/images/orbit/solar-6.jpg"
                className={`font-medium no-underline inline-block ${
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
                <div
                  data-cursor="trade"
                  data-cursor-text="⚡ Trade"
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] border border-white/90 shadow-[5px_5px_12px_#c8d3e2,-5px_-5px_12px_#ffffff] hover:shadow-[7px_7px_15px_#bcc7d4,-7px_-7px_15px_#ffffff] text-[#12372A]'
                      : 'bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 text-slate-200 shadow-sm'
                  }`}
                >
                  <ArrowLeftRight className={`w-4 h-4 ${isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}`} />
                  <span className="font-medium">Peer-to-Peer Trading</span>
                </div>
              </LinkPreview>

              <LinkPreview
                url="https://en.wikipedia.org/wiki/Peer-to-peer"
                imageSrc="/images/orbit/solar-7.jpg"
                className="no-underline"
              >
                <div
                  data-cursor="view"
                  data-cursor-text="Direct"
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] border border-white/90 shadow-[5px_5px_12px_#c8d3e2,-5px_-5px_12px_#ffffff] hover:shadow-[7px_7px_15px_#bcc7d4,-7px_-7px_15px_#ffffff] text-[#12372A]'
                      : 'bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 text-slate-200 shadow-sm'
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}`} />
                  <span className="font-medium">Zero Middlemen</span>
                </div>
              </LinkPreview>

              <LinkPreview
                url="/analytics"
                imageSrc="/images/orbit/solar-2.jpg"
                className="no-underline"
              >
                <div
                  data-cursor="solar"
                  data-cursor-text="AI Tariffs"
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] border border-white/90 shadow-[5px_5px_12px_#c8d3e2,-5px_-5px_12px_#ffffff] hover:shadow-[7px_7px_15px_#bcc7d4,-7px_-7px_15px_#ffffff] text-[#12372A]'
                      : 'bg-slate-900/80 hover:bg-slate-800/90 backdrop-blur-md border border-white/10 hover:border-amber-500/40 text-slate-200 shadow-sm'
                  }`}
                >
                  <SlidersHorizontal className={`w-4 h-4 ${isLightGrid ? 'text-amber-600' : 'text-amber-400'}`} />
                  <span className="font-medium">Dynamic AI Tariffs</span>
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
                  data-cursor="button"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 group active:scale-[0.98] ${
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
                  data-cursor="button"
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
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

        {/* 3D Interactive Showcase (Lazy Loaded for Instant Page Speed) */}
        <section 
          data-cursor="3d" 
          data-cursor-text="3D Solar"
          className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full spline-container"
        >
          <React.Suspense
            fallback={
              <div className="w-full min-h-[500px] md:h-[520px] bg-slate-900/40 border border-white/10 rounded-3xl flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-xs text-slate-400">Loading 3D Microgrid Simulation...</span>
                </div>
              </div>
            }
          >
            <SplineSceneBasic />
          </React.Suspense>
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
                <span className={`text-xs font-medium ${
                  isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'
                }`}>Trading Volume</span>
                <TrendingUp className={`w-4 h-4 ${isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}`} />
              </div>
              <div className={`text-2xl font-semibold ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>1.48 GWh</div>
              <p className={`text-xs mt-1 ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
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
                <span className={`text-xs font-medium ${
                  isLightGrid ? 'text-teal-700' : 'text-teal-400'
                }`}>CO₂ Offset</span>
                <Leaf className={`w-4 h-4 ${isLightGrid ? 'text-teal-700' : 'text-teal-400'}`} />
              </div>
              <div className={`text-2xl font-semibold ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>620+ Tons</div>
              <p className={`text-xs mt-1 ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
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
                <span className={`text-xs font-medium ${
                  isLightGrid ? 'text-amber-700' : 'text-amber-400'
                }`}>Active Prosumers</span>
                <BatteryCharging className={`w-4 h-4 ${isLightGrid ? 'text-amber-700' : 'text-amber-400'}`} />
              </div>
              <div className={`text-2xl font-semibold ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>3,420+</div>
              <p className={`text-xs mt-1 ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
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
                <span className={`text-xs font-medium ${
                  isLightGrid ? 'text-cyan-700' : 'text-cyan-400'
                }`}>Avg. Cost Savings</span>
                <BadgePercent className={`w-4 h-4 ${isLightGrid ? 'text-cyan-700' : 'text-cyan-400'}`} />
              </div>
              <div className={`text-2xl font-semibold ${
                isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
              }`}>28.4%</div>
              <p className={`text-xs mt-1 ${isLightGrid ? 'text-[#475569]' : 'text-slate-300'}`}>
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
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-3 ${
              isLightGrid
                ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#16A34A]'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>How It Works</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${
              isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
            }`}>
              Simple, Transparent{' '}
              <LinkPreview
                url="https://en.wikipedia.org/wiki/Energy_market"
                imageSrc="/images/orbit/solar-4.jpg"
                className={`font-medium ${isLightGrid ? 'text-[#16A34A] hover:text-[#15803D]' : 'text-emerald-400 hover:text-emerald-300'}`}
              >
                Clean Energy Exchange
              </LinkPreview>
            </h2>
            <p className={`text-base mt-2.5 max-w-lg mx-auto ${
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
            <ThreeDTilt maxTilt={8} glare={true} className="w-full">
              <motion.div
                variants={fadeInUp}
                className={`p-8 rounded-3xl transition-all duration-300 group h-full ${
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
                <h3 className={`text-xl font-semibold mb-3 ${
                  isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
                }`}>
                  <LinkPreview
                    url="/register"
                    imageSrc="/images/orbit/solar-1.jpg"
                    className={`font-medium no-underline ${
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
            </ThreeDTilt>

            {/* Feature Card 2 */}
            <ThreeDTilt maxTilt={8} glare={true} className="w-full">
              <motion.div
                variants={fadeInUp}
                className={`p-8 rounded-3xl transition-all duration-300 group h-full ${
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
                <h3 className={`text-xl font-semibold mb-3 ${
                  isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
                }`}>
                  <LinkPreview
                    url="/analytics"
                    imageSrc="/images/orbit/solar-2.jpg"
                    className={`font-medium no-underline ${
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
            </ThreeDTilt>

            {/* Feature Card 3 */}
            <ThreeDTilt maxTilt={8} glare={true} className="w-full">
              <motion.div
                variants={fadeInUp}
                className={`p-8 rounded-3xl transition-all duration-300 group h-full ${
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
                <h3 className={`text-xl font-semibold mb-3 ${
                  isLightGrid ? 'text-[#12372A]' : 'text-slate-100'
                }`}>
                  <LinkPreview
                    url="/marketplace"
                    imageSrc="/images/orbit/solar-3.jpg"
                    className={`font-medium no-underline ${
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
            </ThreeDTilt>
          </motion.div>
        </section>
        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Landing;
