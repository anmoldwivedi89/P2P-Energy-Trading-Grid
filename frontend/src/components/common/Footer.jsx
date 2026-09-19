import React from 'react';
import { Sun, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#04060d] border-t border-white/5 py-10 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Sun className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-sm text-slate-200">
            GridP2P <span className="text-amber-400 font-normal">Solar Energy Network</span>
          </span>
        </div>
        <div className="text-center md:text-left text-slate-500">
          <p>© {new Date().getFullYear()} AI-Powered Decentralized Clean Energy Trading Grid. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Microgrid
          </span>
          <a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-amber-400 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
