import React from 'react';
import { Sun, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-[#DDE8E1] py-10 text-[#475569] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#ECFDF3] border border-[#DDE8E1] text-[#16A34A]">
            <Sun className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-sm text-[#12372A]">
            GridP2P <span className="text-[#16A34A] font-medium">Clean Energy Network</span>
          </span>
        </div>
        <div className="text-center md:text-left text-[#475569]">
          <p>© {new Date().getFullYear()} AI-Powered Peer-to-Peer Solar Energy Trading Grid. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6 text-[#475569] font-medium">
          <span className="flex items-center gap-1.5 text-[#16A34A]">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Microgrid
          </span>
          <a href="#privacy" className="hover:text-[#16A34A] transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-[#16A34A] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
