import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Zap,
  ArrowRight,
  ArrowLeft,
  Activity,
  ShieldCheck,
  Leaf,
  SunMedium,
  Sparkles,
} from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export const AuthSplitScreen = ({ initialMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mode: false = Login (showcase panel on right), true = Signup (showcase panel on left)
  const [isSignUp, setIsSignUp] = useState(() => {
    if (initialMode) return initialMode === 'register';
    return location.pathname.includes('register');
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const animTimeoutRef = useRef(null);

  // Synchronize state when browser back/forward navigation occurs
  useEffect(() => {
    const isRegisterPath = location.pathname.includes('register');
    if (isRegisterPath !== isSignUp) {
      handleToggle(isRegisterPath, true);
    }
  }, [location.pathname]);

  const handleToggle = (targetSignUp, fromHistory = false) => {
    if (isAnimating && !fromHistory) return;
    if (targetSignUp === isSignUp) return;

    setIsAnimating(true);
    setIsSignUp(targetSignUp);

    if (!fromHistory) {
      const targetRoute = targetSignUp ? '/register' : '/login';
      if (location.pathname !== targetRoute) {
        navigate(targetRoute, { replace: false });
      }
    }

    if (animTimeoutRef.current) {
      clearTimeout(animTimeoutRef.current);
    }

    animTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  return (
    <div className="w-full flex items-center justify-center relative my-4 px-3 sm:px-6">
      {/* ========================================================= */}
      {/* DESKTOP VIEW: SMOOTH CURVED AUTHENTICATION CARD (>= lg)   */}
      {/* Smooth organic curved edges, 100% visible text & no clips */}
      {/* ========================================================= */}
      <div className="hidden lg:block relative w-full max-w-5xl min-h-[720px] lg:h-[760px] bg-[#F4EFE3] rounded-[32px] overflow-hidden auth-curved-card border border-[#B58A45]/30 auth-crisp-text shadow-2xl">
        {/* Subtle Luxury Pinstripe Grid Texture on Cream Surface */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#073D30_1px,transparent_1px),linear-gradient(to_bottom,#073D30_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* --------------------------------------------------------- */}
        {/* BAY 1: LOGIN FORM (LEFT 50% OF CARD)                      */}
        {/* Active when !isSignUp; cleanly inert when isSignUp        */}
        {/* --------------------------------------------------------- */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-8 sm:px-12 xl:px-14 py-8 overflow-y-auto auth-custom-scrollbar transition-all duration-400 ${
            !isSignUp
              ? 'opacity-100 pointer-events-auto z-10 translate-x-0'
              : 'opacity-0 pointer-events-none z-0 -translate-x-3'
          }`}
          inert={isSignUp ? '' : undefined}
          aria-hidden={isSignUp}
        >
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073D30]/10 border border-[#B58A45]/30 text-[#073D30] text-xs font-semibold mb-2.5">
              <Zap className="w-3.5 h-3.5 text-[#B58A45]" />
              <span className="tracking-wider uppercase text-[11px] font-mono font-medium">GRID SECURITY PROTOCOL</span>
            </div>
            <h2 className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-sans font-bold text-[#0F2922] tracking-tight leading-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-[#46524B] mt-1.5 leading-relaxed font-sans font-normal">
              Access your decentralized peer-to-peer energy trading account
            </p>
          </div>

          {/* Login Form Component */}
          <LoginForm onSwitchToRegister={() => handleToggle(true)} />
        </div>

        {/* --------------------------------------------------------- */}
        {/* BAY 2: SIGNUP FORM (RIGHT 50% OF CARD)                    */}
        {/* Active when isSignUp; cleanly inert when !isSignUp        */}
        {/* --------------------------------------------------------- */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-start px-8 sm:px-12 xl:px-14 py-8 overflow-y-auto auth-custom-scrollbar transition-all duration-400 ${
            isSignUp
              ? 'opacity-100 pointer-events-auto z-10 translate-x-0'
              : 'opacity-0 pointer-events-none z-0 translate-x-3'
          }`}
          inert={!isSignUp ? '' : undefined}
          aria-hidden={!isSignUp}
        >
          {/* Header */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073D30]/10 border border-[#B58A45]/30 text-[#073D30] text-xs font-semibold mb-2">
              <SunMedium className="w-3.5 h-3.5 text-[#B58A45]" />
              <span className="tracking-wider uppercase text-[11px] font-mono font-medium">SMART NODE ONBOARDING</span>
            </div>
            <h2 className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-sans font-bold text-[#0F2922] tracking-tight leading-tight">
              Create Your Account
            </h2>
            <p className="text-xs sm:text-sm text-[#46524B] mt-1 leading-relaxed font-sans font-normal">
              Trade clean renewable energy directly with your local community
            </p>
          </div>

          {/* Register Form Component */}
          <RegisterForm onSwitchToLogin={() => handleToggle(false)} />
        </div>

        {/* --------------------------------------------------------- */}
        {/* THE SMOOTH CURVED SHOWCASE PANEL                          */}
        {/* Occupies exactly 50% width without overlapping forms      */}
        {/* Slides with smooth cubic-bezier easing                    */}
        {/* On Login: sits on the RIGHT half with curved left edge    */}
        {/* On Signup: sits on the LEFT half with curved right edge   */}
        {/* --------------------------------------------------------- */}
        <div
          className={`auth-curved-panel ${
            isSignUp ? 'panel-left' : 'panel-right'
          }`}
        >
          {/* Ambient Lighting & Organic Gradient Blurs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#B58A45]/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#10b981]/15 rounded-full blur-3xl" />
            {/* Subtle Animated Organic Curved SVG Wave */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-15 auth-curved-wave"
              preserveAspectRatio="none"
              viewBox="0 0 400 700"
            >
              <path
                d="M0,150 Q100,220 200,160 T400,200 L400,700 L0,700 Z"
                fill="none"
                stroke="#B58A45"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <path
                d="M0,350 Q120,400 240,330 T400,380"
                fill="none"
                stroke="#E5C378"
                strokeWidth="1"
              />
              <path
                d="M0,520 Q150,560 280,500 T400,540"
                fill="none"
                stroke="#B58A45"
                strokeWidth="1"
                opacity="0.6"
              />
              <circle cx="200" cy="160" r="3" fill="#E5C378" />
              <circle cx="240" cy="330" r="3" fill="#E5C378" />
            </svg>
          </div>

          {/* ------------------------------------------------------- */}
          {/* BRANDING PAGE A: LOGIN STATE SHOWCASE (Right Half)      */}
          {/* Prompts visitor: "Already part of the energy revol...?" */}
          {/* ------------------------------------------------------- */}
          <div
            className={`w-full h-full p-8 sm:p-10 xl:p-12 flex flex-col justify-between overflow-y-auto auth-custom-scrollbar relative z-10 transition-all duration-350 ${
              !isSignUp
                ? 'opacity-100 pointer-events-auto translate-x-0'
                : 'opacity-0 pointer-events-none -translate-x-4 absolute inset-0'
            }`}
          >
            {/* Top Branding Pill */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#B58A45]/20 border border-[#B58A45]/40 flex items-center justify-center text-[#E5C378] shadow-md shadow-[#062D24]/40">
                  <Zap className="w-5 h-5 text-[#E5C378]" />
                </div>
                <div>
                  <span className="font-bold text-[#F4EFE3] text-base tracking-wide font-sans">GRID</span>
                  <span className="font-light text-[#E5C378] text-base ml-1 font-sans">P2P</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#B58A45]/15 border border-[#B58A45]/30 text-[#E5C378]">
                🌿 100% RENEWABLE
              </span>
            </div>

            {/* Center Editorial Copy - Fully visible with breathing room */}
            <div className="my-auto py-4 space-y-4 max-w-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#B58A45]/15 border border-[#B58A45]/30 text-[#E5C378] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="tracking-wide">PROSUMER POWER NETWORK</span>
              </div>

              <h3 className="text-[clamp(1.4rem,2vw,2.15rem)] font-serif font-bold text-[#F4EFE3] leading-[1.25] tracking-tight">
                Already part of the energy revolution?
              </h3>

              <p className="text-[#F4EFE3]/80 text-xs xl:text-sm leading-relaxed font-normal">
                Join thousands of verified solar prosumers and conscious buyers trading local kilowatts
                with instant smart meter settlement and zero utility markups.
              </p>

              {/* Editorial Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#F4EFE3]/90">
                  <div className="p-1 rounded-md bg-[#B58A45]/20 text-[#E5C378] border border-[#B58A45]/30 shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span>Cut Grid Utility Intermediary Costs by 35%</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F4EFE3]/90">
                  <div className="p-1 rounded-md bg-[#B58A45]/20 text-[#E5C378] border border-[#B58A45]/30 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Automated Smart Contract Microgrid Settlement</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F4EFE3]/90">
                  <div className="p-1 rounded-md bg-[#B58A45]/20 text-[#E5C378] border border-[#B58A45]/30 shrink-0">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                  <span>Zero Emission Cryptographic Carbon Offsets</span>
                </div>
              </div>
            </div>

            {/* Bottom Switch CTA */}
            <div className="pt-4 border-t border-[#B58A45]/25 flex flex-col gap-2.5">
              <span className="text-xs text-[#F4EFE3]/70">New to peer-to-peer energy trading?</span>
              <button
                type="button"
                onClick={() => handleToggle(true)}
                disabled={isAnimating}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl border border-[#B58A45] bg-[#073D30]/60 hover:bg-[#073D30] text-[#F4EFE3] font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#062D24]/50 hover:shadow-[#B58A45]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 text-[#E5C378] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* BRANDING PAGE B: SIGNUP STATE SHOWCASE (Left Half)      */}
          {/* Prompts visitor: "Join the future of peer-to-peer...?" */}
          {/* ------------------------------------------------------- */}
          <div
            className={`w-full h-full p-8 sm:p-10 xl:p-12 flex flex-col justify-between overflow-y-auto auth-custom-scrollbar relative z-10 transition-all duration-350 ${
              isSignUp
                ? 'opacity-100 pointer-events-auto translate-x-0'
                : 'opacity-0 pointer-events-none translate-x-4 absolute inset-0'
            }`}
          >
            {/* Top Branding Pill */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#B58A45]/20 border border-[#B58A45]/40 flex items-center justify-center text-[#E5C378] shadow-md shadow-[#062D24]/40">
                  <Zap className="w-5 h-5 text-[#E5C378]" />
                </div>
                <div>
                  <span className="font-bold text-[#F4EFE3] text-base tracking-wide font-sans">GRID</span>
                  <span className="font-light text-[#E5C378] text-base ml-1 font-sans">P2P</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#B58A45]/15 border border-[#B58A45]/30 text-[#E5C378]">
                ⚡ AUTONOMOUS GRID
              </span>
            </div>

            {/* Center Editorial Copy - Fully visible with breathing room */}
            <div className="my-auto py-4 space-y-4 max-w-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#B58A45]/15 border border-[#B58A45]/30 text-[#E5C378] text-xs font-semibold">
                <SunMedium className="w-3.5 h-3.5" />
                <span className="tracking-wide">DECENTRALIZED CLEAN POWER</span>
              </div>

              <h3 className="text-[clamp(1.4rem,2vw,2.15rem)] font-serif font-bold text-[#F4EFE3] leading-[1.25] tracking-tight">
                Join the future of peer-to-peer energy trading.
              </h3>

              <p className="text-[#F4EFE3]/80 text-xs xl:text-sm leading-relaxed font-normal">
                Connect your rooftop solar, wind micro-turbines, or battery storage directly to neighbors.
                Earn more for surplus generation and lower localized energy costs.
              </p>

              {/* Editorial Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#F4EFE3]/90">
                  <div className="p-1 rounded-md bg-[#B58A45]/20 text-[#E5C378] border border-[#B58A45]/30 shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span>AI-Driven Dynamic Market Equilibrium</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F4EFE3]/90">
                  <div className="p-1 rounded-md bg-[#B58A45]/20 text-[#E5C378] border border-[#B58A45]/30 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Instant Smart Meter Web3 Wallet Connection</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#F4EFE3]/90">
                  <div className="p-1 rounded-md bg-[#B58A45]/20 text-[#E5C378] border border-[#B58A45]/30 shrink-0">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                  <span>100% Traceable Carbon-Zero Guarantees</span>
                </div>
              </div>
            </div>

            {/* Bottom Switch CTA */}
            <div className="pt-4 border-t border-[#B58A45]/25 flex flex-col gap-2.5">
              <span className="text-xs text-[#F4EFE3]/70">Already registered with GRID P2P?</span>
              <button
                type="button"
                onClick={() => handleToggle(false)}
                disabled={isAnimating}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl border border-[#B58A45] bg-[#073D30]/60 hover:bg-[#073D30] text-[#F4EFE3] font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#062D24]/50 hover:shadow-[#B58A45]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-[#E5C378] transition-transform group-hover:-translate-x-1" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE & TABLET RESPONSIVE LAYOUT (Screens under lg)      */}
      {/* Elegantly styled with cream surface and smooth slider     */}
      {/* ========================================================= */}
      <div className="lg:hidden w-full max-w-xl bg-[#F4EFE3] border border-[#B58A45]/30 rounded-3xl p-6 sm:p-8 auth-curved-card auth-crisp-text overflow-hidden shadow-xl">
        {/* Mobile Header Branding */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#073D30] border border-[#B58A45]/40 text-[#F4EFE3] mb-2 shadow-sm">
            <Zap className="w-4 h-4 text-[#E5C378]" />
            <span className="font-bold text-sm tracking-wide font-sans">
              GRID<span className="text-[#E5C378] font-light ml-0.5">P2P</span>
            </span>
          </div>
          <h2 className="text-2xl font-sans font-bold text-[#0F2922] tracking-tight">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-[#475249] mt-1 font-sans font-normal">
            {isSignUp
              ? 'Join the future of peer-to-peer renewable energy trading.'
              : 'Sign in to access your decentralized energy node.'}
          </p>
        </div>

        {/* Mobile Luxury Pill Switcher */}
        <div className="relative flex bg-[#EAE2D2] p-1 rounded-2xl border border-[#B58A45]/30 mb-6">
          {/* Active Indicator */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#073D30] border border-[#B58A45] rounded-xl transition-transform duration-300 shadow-md shadow-[#062D24]/30 ${
              isSignUp ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
            }`}
          />
          <button
            type="button"
            onClick={() => handleToggle(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl relative z-10 transition-colors cursor-pointer ${
              !isSignUp ? 'text-[#F4EFE3]' : 'text-[#475249] hover:text-[#0F2922]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleToggle(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl relative z-10 transition-colors cursor-pointer ${
              isSignUp ? 'text-[#F4EFE3]' : 'text-[#475249] hover:text-[#0F2922]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Mobile Form View - Stacked cleanly without overlap */}
        <div className="w-full">
          {!isSignUp ? (
            <div className="animate-fadeIn">
              <LoginForm onSwitchToRegister={() => handleToggle(true)} />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <RegisterForm onSwitchToLogin={() => handleToggle(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthSplitScreen;
