import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const CustomCursor = () => {
  const { themeMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';

  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Refs for direct GPU transform without React re-renders on mousemove
  const pointerRef = useRef(null);
  const auraRef = useRef(null);
  const currentTypeRef = useRef('default');
  const currentTextRef = useRef('');

  // Mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current.x = x;
      mousePos.current.y = y;

      // 1. Direct 0-latency hardware accelerated pointer tracking
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (pointerRef.current.style.opacity !== '1') {
          pointerRef.current.style.opacity = '1';
        }
      }

      if (!isVisible) setIsVisible(true);

      // 2. Element detection (only update React state if type/text actually changed)
      const target = e.target;
      if (!target) return;

      let nextType = 'default';
      let nextText = '';

      const customEl = target.closest('[data-cursor]');
      if (customEl) {
        nextType = customEl.getAttribute('data-cursor') || 'default';
        const rawText = customEl.getAttribute('data-cursor-text') || '';
        nextText =
          rawText ||
          (nextType === 'solar'
            ? '⚡ Clean Grid'
            : nextType === 'trade'
            ? '⚡ P2P Trade'
            : nextType === '3d'
            ? '✦ 3D Orbit'
            : nextType === 'view'
            ? '✦ Explore'
            : '');
      } else if (target.closest('canvas') || target.closest('.spline-container')) {
        nextType = '3d';
        nextText = '✦ 3D Orbit';
      } else if (
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.isContentEditable
      ) {
        nextType = 'input';
        nextText = '';
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.clickable')
      ) {
        nextType = 'button';
        nextText = '';
      } else if (target.closest('.neu-card') || target.closest('.nature-card')) {
        nextType = 'card';
        nextText = '';
      }

      // Only trigger React state re-render when hover state actually changes
      if (
        nextType !== currentTypeRef.current ||
        nextText !== currentTextRef.current
      ) {
        currentTypeRef.current = nextType;
        currentTextRef.current = nextText;
        setCursorType(nextType);
        setCursorText(nextText);
      }
    };

    // Buttery smooth 120/144Hz aura animation loop with lerp
    const loop = () => {
      const lerpFactor = 0.2;
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * lerpFactor;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * lerpFactor;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      if (pointerRef.current) pointerRef.current.style.opacity = '0';
      if (auraRef.current) auraRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (pointerRef.current) pointerRef.current.style.opacity = '1';
      if (auraRef.current) auraRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || cursorType === 'input') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Silky Smooth Ambient Glow (Hardware Accelerated with RAF) */}
      <div
        ref={auraRef}
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
        className={`fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none blur-2xl transition-opacity duration-300 ${
          cursorType === 'button' ? 'opacity-80 scale-125' : 'opacity-40 scale-100'
        } ${
          isLightGrid
            ? 'bg-gradient-to-tr from-emerald-400/25 via-teal-400/15 to-transparent'
            : 'bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-transparent'
        }`}
      />

      {/* 2. Direct 0-Latency Pointer (Instant Hardware Transform) */}
      <div
        ref={pointerRef}
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
        className="fixed top-0 left-0 pointer-events-none transition-transform duration-75 filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.6)]"
      >
        <div
          className={`transition-all duration-150 ${
            isClicking ? 'scale-90' : cursorType === 'button' ? 'scale-110 -rotate-6' : 'scale-100 rotate-0'
          }`}
        >
          {cursorType === 'button' ? (
            /* Futuristic Magnetic Corner Brackets on Clickables */
            <div className="relative -top-3 -left-3 flex items-center justify-center w-6 h-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={isLightGrid ? 'text-[#16A34A]' : 'text-emerald-400'}
              >
                <path
                  d="M 6,10 L 6,6 L 10,6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 18,10 L 18,6 L 14,6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 6,14 L 6,18 L 10,18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 18,14 L 18,18 L 14,18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
          ) : (
            /* Ultra-Sleek Clean Energy Arrow */
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="transform -translate-x-[2px] -translate-y-[2px]"
            >
              <path
                d="M3 3L10.5 21L14 13.5L21.5 10L3 3Z"
                fill={isLightGrid ? '#16A34A' : '#10B981'}
                stroke={isLightGrid ? '#0B241C' : '#ECFDF5'}
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 5.5L10 16L12.5 11L17.5 8.5L5.5 5.5Z"
                fill={isLightGrid ? '#22C55E' : '#34D399'}
                opacity="0.8"
              />
            </svg>
          )}

          {/* Floating Context Pill */}
          <AnimatePresence>
            {cursorText && (
              <motion.div
                initial={{ opacity: 0, x: 12, y: 6, scale: 0.88 }}
                animate={{ opacity: 1, x: 18, y: 10, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className={`absolute top-0 left-0 px-2.5 py-1 rounded-lg border text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-xl whitespace-nowrap flex items-center gap-1.5 ${
                  isLightGrid
                    ? 'bg-slate-900/90 text-emerald-300 border-emerald-500/40 shadow-emerald-950/20'
                    : 'bg-slate-950/90 text-emerald-300 border-emerald-400/50 shadow-emerald-950/50'
                }`}
              >
                <span>{cursorText}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
