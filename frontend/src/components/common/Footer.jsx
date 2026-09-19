import React from 'react';
import { Sun, ShieldCheck } from 'lucide-react';
import { LinkPreview } from '@/components/ui/link-preview';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#060913]/90 backdrop-blur-xl border-t border-white/10 py-10 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sun className="w-4 h-4" />
          </div>
          <LinkPreview
            url="https://en.wikipedia.org/wiki/Smart_grid"
            imageSrc="/images/orbit/solar-4.jpg"
            className="font-display font-bold text-sm text-white no-underline hover:text-emerald-300"
          >
            Grid<span className="text-emerald-400">P2P</span> <span className="text-slate-400 font-normal">Solar Energy Network</span>
          </LinkPreview>
        </div>
        <div className="text-center md:text-left text-slate-500">
          <p>© {new Date().getFullYear()} AI-Powered Peer-to-Peer Solar Energy Trading Grid. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 text-slate-400 font-medium">
          <LinkPreview
            url="https://en.wikipedia.org/wiki/Microgrid"
            imageSrc="/images/orbit/solar-2.jpg"
            className="flex items-center gap-1.5 text-emerald-400 no-underline hover:text-emerald-300"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Microgrid
          </LinkPreview>
          <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-emerald-400 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

