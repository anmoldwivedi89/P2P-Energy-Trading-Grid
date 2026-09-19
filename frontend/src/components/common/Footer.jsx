import React from 'react';
import { Sun, ShieldCheck } from 'lucide-react';
import { LinkPreview } from '@/components/ui/link-preview';
import { useTheme } from '../../context/ThemeContext';

export const Footer = () => {
  const { themeMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';

  return (
    <footer className={`w-full border-t py-10 text-xs font-sans transition-colors duration-300 ${
      isLightGrid
        ? 'bg-[#EEF2F6] border-white/80 shadow-[0_-6px_20px_rgba(209,217,230,0.35)] text-[#475569]'
        : 'bg-[#060913]/90 border-white/10 backdrop-blur-xl text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg ${
            isLightGrid
              ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#16A34A]'
              : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
          }`}>
            <Sun className="w-4 h-4" />
          </div>
          <LinkPreview
            url="https://en.wikipedia.org/wiki/Smart_grid"
            imageSrc="/images/orbit/solar-4.jpg"
            className={`font-display font-bold text-sm no-underline ${
              isLightGrid
                ? 'text-[#12372A] hover:text-[#16A34A]'
                : 'text-white hover:text-emerald-300'
            }`}
          >
            Grid<span className={isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}>P2P</span>{' '}
            <span className={`font-normal ${isLightGrid ? 'text-[#475569]' : 'text-slate-400'}`}>
              Solar Energy Network
            </span>
          </LinkPreview>
        </div>
        <div className={`text-center md:text-left ${isLightGrid ? 'text-[#475569]' : 'text-slate-500'}`}>
          <p>© {new Date().getFullYear()} AI-Powered Peer-to-Peer Solar Energy Trading Grid. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <LinkPreview
            url="https://en.wikipedia.org/wiki/Microgrid"
            imageSrc="/images/orbit/solar-2.jpg"
            className={`flex items-center gap-1.5 no-underline px-3 py-1.5 rounded-full ${
              isLightGrid 
                ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#16A34A] hover:text-[#15803D]' 
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Microgrid
          </LinkPreview>
          <a href="#privacy" className={`transition-colors ${isLightGrid ? 'text-[#475569] hover:text-[#12372A]' : 'text-slate-400 hover:text-emerald-400'}`}>Privacy</a>
          <a href="#terms" className={`transition-colors ${isLightGrid ? 'text-[#475569] hover:text-[#12372A]' : 'text-slate-400 hover:text-emerald-400'}`}>Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



