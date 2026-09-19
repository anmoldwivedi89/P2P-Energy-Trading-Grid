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
        ? 'bg-[#EEF2F6] border-white/80 shadow-[0_-6px_25px_rgba(209,217,230,0.4)] text-[#475569]'
        : 'bg-[#060913]/95 border-white/10 backdrop-blur-2xl text-slate-400'
    }`}>
      {/* Top / Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-black/[0.06] dark:border-white/[0.08]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${
                  isLightGrid
                    ? 'bg-[#EEF2F6] border border-white/90 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#16A34A]'
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-950/40'
                }`}>
                  <Sun className="w-5 h-5" />
                </div>
                <Link to="/" className="flex flex-col">
                  <span className={`font-semibold text-lg ${
                    isLightGrid ? 'text-[#12372A]' : 'text-white'
                  }`}>
                    Grid<span className="text-emerald-500">P2P</span>
                  </span>
                  <span className={`text-[11px] -mt-0.5 ${
                    isLightGrid ? 'text-[#64748B]' : 'text-slate-400'
                  }`}>
                    Clean Energy Trading Protocol
                  </span>
                </Link>
              </div>

              <p className={`text-sm leading-relaxed max-w-sm mb-6 ${
                isLightGrid ? 'text-[#475569]' : 'text-slate-300'
              }`}>
                Decentralized peer-to-peer solar power network connecting local prosumers directly with consumers through AI-driven demand matching and zero-carbon trading.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[inset_2px_2px_4px_#c8d3e2,inset_-2px_-2px_4px_#ffffff] text-emerald-700'
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
              isLightGrid ? 'text-[#12372A]' : 'text-slate-200'
            }`}>
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/marketplace" className={`transition-colors hover:text-emerald-500 ${isLightGrid ? 'text-[#475569]' : 'text-slate-400'}`}>
                  Live Marketplace
                </Link>
              </li>
              <li>
                <Link to="/register" className={`transition-colors hover:text-emerald-500 ${isLightGrid ? 'text-[#475569]' : 'text-slate-400'}`}>
                  Become Prosumer
                </Link>
              </li>
              <li>
                <LinkPreview
                  url="https://en.wikipedia.org/wiki/Smart_grid"
                  imageSrc="/images/orbit/solar-4.jpg"
                  className={`no-underline hover:text-emerald-500 transition-colors ${isLightGrid ? 'text-[#475569]' : 'text-slate-400'}`}
                >
                  Grid Topology
                </LinkPreview>
              </li>
              <li>
                <LinkPreview
                  url="https://en.wikipedia.org/wiki/Microgrid"
                  imageSrc="/images/orbit/solar-2.jpg"
                  className={`no-underline hover:text-emerald-500 transition-colors ${isLightGrid ? 'text-[#475569]' : 'text-slate-400'}`}
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
                isLightGrid ? 'text-[#12372A]' : 'text-slate-200'
              }`}>
                <Code2 className="w-4 h-4 text-emerald-500" />
                Core Engineering & AI Team
              </h4>
              <span className={`text-xs ${isLightGrid ? 'text-[#64748B]' : 'text-slate-500'}`}>
                Project Architects
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Developer 1: Anmol Dwivedi */}
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[6px_6px_14px_#c8d3e2,-6px_-6px_14px_#ffffff]'
                  : 'bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 backdrop-blur-md'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className={`font-semibold text-sm ${
                      isLightGrid ? 'text-[#12372A]' : 'text-white'
                    }`}>
                      Anmol Dwivedi
                    </h5>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                      Full Stack Developer
                    </p>
                  </div>
                  <div className={`p-1.5 rounded-lg ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] shadow-[inset_2px_2px_4px_#c8d3e2,inset_-2px_-2px_4px_#ffffff] text-[#16A34A]'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className={`text-[12px] leading-relaxed mb-3 ${
                  isLightGrid ? 'text-[#475569]' : 'text-slate-300'
                }`}>
                  Core system architecture, full-stack trading engine, smart contract settlement & responsive UX.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] border border-white/90 text-[#334155]'
                      : 'bg-white/5 border border-white/10 text-slate-300'
                  }`}>
                    Full-Stack
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] border border-white/90 text-[#334155]'
                      : 'bg-white/5 border border-white/10 text-slate-300'
                  }`}>
                    P2P Grid Core
                  </span>
                </div>
              </div>

              {/* Developer 2: Amber Savita */}
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isLightGrid
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[6px_6px_14px_#c8d3e2,-6px_-6px_14px_#ffffff]'
                  : 'bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 backdrop-blur-md'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className={`font-semibold text-sm ${
                      isLightGrid ? 'text-[#12372A]' : 'text-white'
                    }`}>
                      Amber Savita
                    </h5>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                      AI & Machine Learning Engineer
                    </p>
                  </div>
                  <div className={`p-1.5 rounded-lg ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] shadow-[inset_2px_2px_4px_#c8d3e2,inset_-2px_-2px_4px_#ffffff] text-cyan-600'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className={`text-[12px] leading-relaxed mb-3 ${
                  isLightGrid ? 'text-[#475569]' : 'text-slate-300'
                }`}>
                  AI demand forecasting, algorithmic peer matching, energy load prediction & dynamic pricing models.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] border border-white/90 text-[#334155]'
                      : 'bg-white/5 border border-white/10 text-slate-300'
                  }`}>
                    AI / ML Engine
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isLightGrid
                      ? 'bg-[#EEF2F6] border border-white/90 text-[#334155]'
                      : 'bg-white/5 border border-white/10 text-slate-300'
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
                ? 'bg-[#EEF2F6] shadow-[inset_1.5px_1.5px_3px_#c8d3e2,inset_-1.5px_-1.5px_3px_#ffffff] text-emerald-600' 
                : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <p className={isLightGrid ? 'text-[#475569]' : 'text-slate-400'}>
              © {new Date().getFullYear()} <span className="font-semibold">GridP2P Energy Trading Grid</span>. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <LinkPreview
              url="https://en.wikipedia.org/wiki/Microgrid"
              imageSrc="/images/orbit/solar-2.jpg"
              className={`flex items-center gap-1.5 no-underline px-3 py-1.5 rounded-full text-xs transition-all ${
                isLightGrid 
                  ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#16A34A] hover:text-[#15803D]' 
                  : 'bg-white/5 border border-white/10 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Smart Grid Network
            </LinkPreview>
            <a href="#privacy" className={`transition-colors ${isLightGrid ? 'text-[#475569] hover:text-[#12372A]' : 'text-slate-400 hover:text-emerald-400'}`}>Privacy</a>
            <a href="#terms" className={`transition-colors ${isLightGrid ? 'text-[#475569] hover:text-[#12372A]' : 'text-slate-400 hover:text-emerald-400'}`}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
