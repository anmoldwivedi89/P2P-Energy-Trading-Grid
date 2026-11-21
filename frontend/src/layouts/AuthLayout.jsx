import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Zap, ArrowLeft, ShieldCheck } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#071B16] flex flex-col justify-between text-[#F4EFE3] relative overflow-hidden transition-colors duration-300 selection:bg-[#B58A45]/30 selection:text-[#E5C378]">
      {/* Background Ambient Luxury Energy Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-[#073D30]/40 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[450px] bg-[#062D24]/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[300px] bg-[#B58A45]/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle Luxury Geometric Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(to_right,#B58A45_1px,transparent_1px),linear-gradient(to_bottom,#B58A45_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Auth Header */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-2.5 text-[#F4EFE3] font-semibold text-lg group">
          <div className="p-2 rounded-xl bg-[#073D30]/80 border border-[#B58A45]/40 text-[#E5C378] group-hover:border-[#B58A45] group-hover:bg-[#073D30] transition-all shadow-md shadow-[#062D24]/40">
            <Zap className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-[#F4EFE3] font-sans">GRID</span>
            <span className="text-[#E5C378] font-light ml-1 font-sans">P2P</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#073D30]/50 border border-[#B58A45]/30 text-[#E5C378] text-[11px] font-medium tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-BIT ENCRYPTION</span>
          </div>

          <Link
            to="/"
            className="text-xs font-medium text-[#EAE2D2] hover:text-[#E5C378] transition-colors flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#B58A45]/30 hover:border-[#B58A45] bg-[#073D30]/40 hover:bg-[#073D30]/70 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto w-full relative z-10 auth-crisp-text">
        <Outlet />
      </main>

      {/* Auth Footer */}
      <footer className="py-4 px-6 text-center text-xs text-[#77796F] relative z-10 border-t border-[#B58A45]/20 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">
        <span>© {new Date().getFullYear()} GRID P2P Protocol. All rights reserved.</span>
        <span className="text-[11px] text-[#77796F]/80">Decentralized Peer-to-Peer Renewable Energy Grid & Automated Clearing House</span>
      </footer>
    </div>
  );
};

export default AuthLayout;
