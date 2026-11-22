import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, ShieldCheck, Code2, Sparkles, Cpu, Layers, ExternalLink, GitBranch, Terminal } from 'lucide-react';
import { LinkPreview } from '@/components/ui/link-preview';
import { useTheme } from '../../context/ThemeContext';

export const Footer = () => {
  const { themeMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';

  return (
    <footer className={`w-full border-t font-sans transition-colors duration-300 ${
      isLightGrid
        ? 'bg-[#EAE6DE] border-[#DCD6CB] shadow-[0_-6px_25px_rgba(186,178,166,0.35)] text-[#77736B]'
        : 'bg-[#1C1C1C] border-[#383430] backdrop-blur-2xl text-[#B5A898]'
    }`}>
      {/* Top / Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-black/[0.06] dark:border-[#383430]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
                  isLightGrid
                    ? 'bg-[#EAE6DE] border border-[#DCD6CB] text-[#DAA520] shadow-[2px_2px_5px_rgba(186,178,166,0.4),-2px_-2px_5px_rgba(255,255,255,0.85)]'
                    : 'bg-[#242424] border border-[#383430] text-[#DAA520]'
                }`}>
                  <Sun className="w-5 h-5" />
                </div>
                <Link to="/" className="flex flex-col">
                  <span className={`font-semibold text-lg tracking-tight ${
                    isLightGrid ? 'text-[#292824]' : 'text-[#F5E8D8]'
                  }`}>
                    Grid<span className={isLightGrid ? 'text-[#6B8F71]' : 'text-[#DAA520]'}>P2P</span>
                  </span>
                  <span className={`text-[11px] font-mono tracking-wider -mt-0.5 ${
                    isLightGrid ? 'text-[#77736B]' : 'text-[#B5A898]'
                  }`}>
                    Clean Energy Trading Protocol
                  </span>
                </Link>
              </div>

              <p className={`text-sm leading-relaxed max-w-sm mb-6 ${
                isLightGrid ? 'text-[#77736B]' : 'text-slate-300'
              }`}>
                Decentralized peer-to-peer solar power network connecting local prosumers directly with consumers through AI-driven demand matching and zero-carbon trading.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono ${
                isLightGrid
                  ? 'bg-[#EAE6DE] border border-white/80 shadow-[inset_2px_2px_4px_rgba(186,178,166,0.38),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] text-[#6B8F71]'
                  : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Mainnet Live • 100% Green
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 col-span-1">
            <h4 className={`text-sm font-semibold mb-4 ${
              isLightGrid ? 'text-[#292824]' : 'text-slate-200'
            }`}>
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/marketplace" className={`transition-colors hover:text-emerald-500 ${isLightGrid ? 'text-[#77736B]' : 'text-slate-400'}`}>
                  Live Marketplace
                </Link>
              </li>
              <li>
                <Link to="/register" className={`transition-colors hover:text-emerald-500 ${isLightGrid ? 'text-[#77736B]' : 'text-slate-400'}`}>
                  Become Prosumer
                </Link>
              </li>
              <li>
                <LinkPreview
                  url="https://en.wikipedia.org/wiki/Smart_grid"
                  imageSrc="/images/orbit/solar-4.jpg"
                  className={`no-underline hover:text-emerald-500 transition-colors ${isLightGrid ? 'text-[#77736B]' : 'text-slate-400'}`}
                >
                  Grid Topology
                </LinkPreview>
              </li>
              <li>
                <LinkPreview
                  url="https://en.wikipedia.org/wiki/Microgrid"
                  imageSrc="/images/orbit/solar-2.jpg"
                  className={`no-underline hover:text-emerald-500 transition-colors ${isLightGrid ? 'text-[#77736B]' : 'text-slate-400'}`}
                >
                  Microgrid Protocols
                </LinkPreview>
              </li>
            </ul>
          </div>

          {/* Engineering & Core Team Section */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-sm font-semibold flex items-center gap-2 ${
                isLightGrid ? 'text-[#292824]' : 'text-slate-200'
              }`}>
                <Code2 className="w-4 h-4 text-emerald-500" />
                Core Engineering & AI Team
              </h4>
              <span className={`text-xs ${isLightGrid ? 'text-[#77736B]' : 'text-slate-500'}`}>
                Project Architects
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Developer 1: Anmol Dwivedi */}
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isLightGrid
                  ? 'bg-[#EAE6DE] border border-white/80 shadow-[6px_6px_14px_rgba(186,178,166,0.42),-6px_-6px_14px_rgba(255,255,255,0.9)]'
                  : 'bg-[#242424] border border-[#383430] hover:border-[#FF6F61]/40 backdrop-blur-md'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className={`font-semibold text-sm ${
                      isLightGrid ? 'text-[#292824]' : 'text-[#F5E8D8]'
                    }`}>
                      Anmol Dwivedi
                    </h5>
                    <p className="text-xs font-medium text-emerald-600 dark:text-[#DAA520] mt-0.5">
                      Full Stack Developer
                    </p>
                  </div>
                  <div className={`p-1.5 rounded-lg ${
                    isLightGrid
                      ? 'bg-[#EAE6DE] shadow-[inset_2px_2px_4px_rgba(186,178,166,0.38),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] text-[#DAA520]'
                      : 'bg-[#DAA520]/10 text-[#DAA520] border border-[#DAA520]/20'
                  }`}>
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className={`text-[12px] leading-relaxed mb-3 ${
                  isLightGrid ? 'text-[#77736B]' : 'text-[#B5A898]'
                }`}>
                  Core system architecture, full-stack trading engine, smart contract settlement & responsive UX.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#F0E8DE] border border-[#DCD6CB] text-[#292824]'
                      : 'bg-[#1C1C1C] border border-[#383430] text-[#F5E8D8]'
                  }`}>
                    Full-Stack
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#F0E8DE] border border-[#DCD6CB] text-[#292824]'
                      : 'bg-[#1C1C1C] border border-[#383430] text-[#F5E8D8]'
                  }`}>
                    P2P Grid Core
                  </span>
                </div>
              </div>

              {/* Developer 2: Amber Savita */}
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isLightGrid
                  ? 'bg-[#EAE6DE] border border-white/80 shadow-[6px_6px_14px_rgba(186,178,166,0.42),-6px_-6px_14px_rgba(255,255,255,0.9)]'
                  : 'bg-[#242424] border border-[#383430] hover:border-[#FF6F61]/40 backdrop-blur-md'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className={`font-semibold text-sm ${
                      isLightGrid ? 'text-[#292824]' : 'text-[#F5E8D8]'
                    }`}>
                      Amber Savita
                    </h5>
                    <p className="text-xs font-medium text-emerald-600 dark:text-[#DAA520] mt-0.5">
                      AI & Machine Learning Engineer
                    </p>
                  </div>
                  <div className={`p-1.5 rounded-lg ${
                    isLightGrid
                      ? 'bg-[#EAE6DE] shadow-[inset_2px_2px_4px_rgba(186,178,166,0.38),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] text-[#FF6F61]'
                      : 'bg-[#FF6F61]/10 text-[#FF6F61] border border-[#FF6F61]/20'
                  }`}>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className={`text-[12px] leading-relaxed mb-3 ${
                  isLightGrid ? 'text-[#77736B]' : 'text-[#B5A898]'
                }`}>
                  AI demand forecasting, algorithmic peer matching, energy load prediction & dynamic pricing models.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#F0E8DE] border border-[#DCD6CB] text-[#292824]'
                      : 'bg-[#1C1C1C] border border-[#383430] text-[#F5E8D8]'
                  }`}>
                    AI / ML Engine
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#F0E8DE] border border-[#DCD6CB] text-[#292824]'
                      : 'bg-[#1C1C1C] border border-[#383430] text-[#F5E8D8]'
                  }`}>
                    Smart Matching
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Verified Trust Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-full ${
              isLightGrid 
                ? 'bg-[#EAE6DE] shadow-[inset_1.5px_1.5px_3px_rgba(186,178,166,0.38),inset_-1.5px_-1.5px_3px_rgba(255,255,255,0.9)] text-[#6B8F71]' 
                : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <p className={isLightGrid ? 'text-[#77736B]' : 'text-slate-400'}>
              © {new Date().getFullYear()} <span className="font-semibold">GridP2P Energy Trading Grid</span>. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <LinkPreview
              url="https://en.wikipedia.org/wiki/Microgrid"
              imageSrc="/images/orbit/solar-2.jpg"
              className={`flex items-center gap-1.5 no-underline px-3 py-1.5 rounded-full text-xs transition-all ${
                isLightGrid 
                  ? 'bg-[#EAE6DE] border border-white/80 shadow-[3px_3px_8px_rgba(186,178,166,0.38),-3px_-3px_8px_rgba(255,255,255,0.9)] text-[#6B8F71] hover:text-[#FF6F61]' 
                  : 'bg-white/5 border border-white/10 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Smart Grid Network
            </LinkPreview>
            <a href="#privacy" className={`transition-colors ${isLightGrid ? 'text-[#77736B] hover:text-[#292824]' : 'text-slate-400 hover:text-emerald-400'}`}>Privacy</a>
            <a href="#terms" className={`transition-colors ${isLightGrid ? 'text-[#77736B] hover:text-[#292824]' : 'text-slate-400 hover:text-emerald-400'}`}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
