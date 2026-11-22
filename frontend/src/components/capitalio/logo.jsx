import React, { useId } from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

/**
 * Official GRID P2P Vector SVG Logo Component
 * 
 * Theme-Adaptive: Automatically adapts between Neumorphic Light Mode (#EAE6DE)
 * and Custom Warm Dark Mode (#1C1C1C) with 100% transparent background.
 * 
 * Faithfully preserves the official GRID P2P brand identity:
 * - Circular microgrid canopy with stylized renewable leaf
 * - Central electric lightning bolt
 * - Perspective 6-cell solar PV array with stand pillar
 * - Prosumer & consumer microgrid household nodes with glowing windows
 * - Peer-to-peer transmission lines connecting microgrid nodes
 * 
 * @param {string} className - Tailwind CSS classes for sizing and positioning
 * @param {'icon' | 'full'} variant - 'icon' for emblem only, 'full' with typography
 * @param {'auto' | 'light' | 'dark'} theme - Theme override ('auto' follows app theme)
 * @param {string} alt - Accessibility label
 */
export function GridLogo({
  className,
  variant = 'icon',
  theme = 'auto',
  alt = 'GRID P2P Clean Energy Trading',
  ...props
}) {
  const reactId = useId();
  const uniqueId = reactId.replace(/:/g, '');
  const themeContext = useTheme();
  const currentThemeMode = themeContext?.themeMode || 'dark';

  // Determine active theme mode ('light' vs 'dark')
  const isLight = theme === 'auto' ? currentThemeMode === 'light-grid' : theme === 'light';

  // Palette values for Neumorphic Light (#EAE6DE) vs Custom Warm Dark (#1C1C1C)
  const colors = isLight
    ? {
        outline: '#292824',
        outlineSecondary: '#77736B',
        leafStroke: '#6B8F71',
        leafFill: '#6B8F71',
        leafVein: '#557B5B',
        wire: '#6B8F71',
        boltStop1: '#E5B232',
        boltStop2: '#DAA520',
        boltStroke: '#292824',
        windowGlow: '#DAA520',
        solarPanelFill: '#F0E8DE',
        solarPanelGrid: '#292824',
        houseFill: 'none',
        wordmarkPrimary: '#292824',
        wordmarkAccent: '#6B8F71',
        wordmarkSub: '#77736B',
      }
    : {
        outline: '#F5E8D8',
        outlineSecondary: '#B5A898',
        leafStroke: '#6B8F71',
        leafFill: '#6B8F71',
        leafVein: '#557B5B',
        wire: '#6B8F71',
        boltStop1: '#E5B232',
        boltStop2: '#DAA520',
        boltStroke: '#F5E8D8',
        windowGlow: '#DAA520',
        solarPanelFill: '#242424',
        solarPanelGrid: '#F5E8D8',
        houseFill: 'none',
        wordmarkPrimary: '#F5E8D8',
        wordmarkAccent: '#6B8F71',
        wordmarkSub: '#B5A898',
      };

  const leafGradId = `grid-p2p-leaf-grad-${uniqueId}`;
  const boltGradId = `grid-p2p-bolt-grad-${uniqueId}`;

  // ViewBox: square 200x200 for icon, 220x250 for full brand lockup
  const viewBox = variant === 'full' ? '0 10 220 240' : '0 15 200 170';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      role="img"
      aria-label={alt}
      className={cn(
        'shrink-0 select-none overflow-visible transition-[colors,transform] duration-200',
        className
      )}
      {...props}
    >
      <title>{alt}</title>
      <defs>
        {/* Leaf Canopy Gradient */}
        <linearGradient id={leafGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.leafStroke} stopOpacity={isLight ? 0.35 : 0.4} />
          <stop offset="100%" stopColor={colors.leafVein} stopOpacity={isLight ? 0.15 : 0.2} />
        </linearGradient>

        {/* Central Lightning Bolt Energy Gradient */}
        <linearGradient id={boltGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.boltStop1} />
          <stop offset="100%" stopColor={colors.boltStop2} />
        </linearGradient>
      </defs>

      {/* ========================================================= */}
      {/* 1. CIRCULAR MICROGRID BOUNDARY & LOWER BASE ARC           */}
      {/* ========================================================= */}
      {/* Lower Microgrid Base connecting prosumer/consumer nodes */}
      <path
        d="M 28,124 C 22,146 44,166 100,166 C 156,166 178,146 172,124"
        stroke={colors.leafStroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Upper-Right Microgrid Boundary Arc */}
      <path
        d="M 124,28 C 148,32 168,54 165,82"
        stroke={colors.leafStroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* ========================================================= */}
      {/* 2. UPPER-LEFT RENEWABLE LEAF CANOPY                       */}
      {/* ========================================================= */}
      {/* Stylized Clean Energy Leaf Fill */}
      <path
        d="M 35,82 C 36,52 62,28 102,26 C 122,25 130,30 134,34 C 116,45 92,54 74,62 C 60,68 45,74 35,82 Z"
        fill={`url(#${leafGradId})`}
      />
      {/* Stylized Leaf Outer Contour */}
      <path
        d="M 35,82 C 36,52 62,28 102,26 C 122,25 130,30 134,34 C 116,45 92,54 74,62 C 60,68 45,74 35,82"
        stroke={colors.leafStroke}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Leaf Internal Rib / Vein Detail */}
      <path
        d="M 54,64 C 76,50 102,40 126,33"
        stroke={colors.leafVein}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* ========================================================= */}
      {/* 3. LEFT HOUSE (PROSUMER MICROGRID NODE)                   */}
      {/* ========================================================= */}
      {/* Gable Roof */}
      <path
        d="M 20,102 L 45,80 L 70,102"
        stroke={colors.outline}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House Body */}
      <path
        d="M 28,102 L 28,124 L 62,124 L 62,102"
        stroke={colors.outline}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={colors.houseFill}
      />
      {/* 4 Glowing Prosumer Window Panes */}
      <rect x="36" y="106" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />
      <rect x="47" y="106" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />
      <rect x="36" y="114" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />
      <rect x="47" y="114" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />

      {/* ========================================================= */}
      {/* 4. RIGHT HOUSE (CONSUMER MICROGRID NODE)                  */}
      {/* ========================================================= */}
      {/* Gable Roof */}
      <path
        d="M 130,102 L 155,80 L 180,102"
        stroke={colors.outline}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House Body */}
      <path
        d="M 138,102 L 138,124 L 172,124 L 172,102"
        stroke={colors.outline}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={colors.houseFill}
      />
      {/* 4 Glowing Consumer Window Panes */}
      <rect x="146" y="106" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />
      <rect x="157" y="106" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />
      <rect x="146" y="114" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />
      <rect x="157" y="114" width="6.5" height="5.5" rx="1" fill={colors.windowGlow} />

      {/* ========================================================= */}
      {/* 5. P2P MICROGRID TRANSMISSION LINES                       */}
      {/* ========================================================= */}
      {/* Left Node to Grid Interconnect */}
      <path
        d="M 62,118 C 70,118 64,132 72,132"
        stroke={colors.wire}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Right Node to Grid Interconnect */}
      <path
        d="M 128,132 C 136,132 130,118 138,118"
        stroke={colors.wire}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* ========================================================= */}
      {/* 6. CENTRAL PERSPECTIVE SOLAR PV ARRAY (6 CELLS)           */}
      {/* ========================================================= */}
      {/* Ground Pillar Stand */}
      <path
        d="M 100,142 L 100,154"
        stroke={colors.outline}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 93,154 L 107,154"
        stroke={colors.outline}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Solar Panel Surface Base */}
      <polygon
        points="76,114 124,114 132,142 68,142"
        fill={colors.solarPanelFill}
        stroke={colors.outline}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Panel Cell Dividing Lines (6 Photovoltaic Cells) */}
      <line
        x1="72"
        y1="128"
        x2="128"
        y2="128"
        stroke={colors.solarPanelGrid}
        strokeWidth="2.4"
      />
      <line
        x1="92"
        y1="114"
        x2="89"
        y2="142"
        stroke={colors.solarPanelGrid}
        strokeWidth="2.4"
      />
      <line
        x1="108"
        y1="114"
        x2="111"
        y2="142"
        stroke={colors.solarPanelGrid}
        strokeWidth="2.4"
      />

      {/* ========================================================= */}
      {/* 7. CENTRAL ELECTRIC LIGHTNING BOLT                        */}
      {/* ========================================================= */}
      <polygon
        points="108,36 85,74 101,74 93,106 121,66 104,66"
        fill={`url(#${boltGradId})`}
        stroke={colors.boltStroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* ========================================================= */}
      {/* 8. OPTIONAL FULL WORDMARK LOCKUP (variant="full")         */}
      {/* ========================================================= */}
      {variant === 'full' && (
        <g className="select-none">
          {/* Main Title: GRID P2P */}
          <text
            x="110"
            y="196"
            textAnchor="middle"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="0.5"
          >
            <tspan fill={colors.wordmarkPrimary}>GRID </tspan>
            <tspan fill={colors.wordmarkAccent} fontWeight="700">P2P</tspan>
          </text>

          {/* Subtitle Accent Line Left */}
          <line
            x1="32"
            y1="216"
            x2="56"
            y2="216"
            stroke={colors.leafStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Subtitle: ENERGY TRADING */}
          <text
            x="110"
            y="219"
            textAnchor="middle"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontWeight="600"
            fontSize="10"
            letterSpacing="3"
            fill={colors.wordmarkSub}
          >
            ENERGY TRADING
          </text>

          {/* Subtitle Accent Line Right */}
          <line
            x1="164"
            y1="216"
            x2="188"
            y2="216"
            stroke={colors.leafStroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

// Named alias
export const GridP2PLogo = GridLogo;

// Backward-compatible alias for any legacy imports
export const CapitalioLogo = GridLogo;

export default GridLogo;
