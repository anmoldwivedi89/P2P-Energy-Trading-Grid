/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"Source Sans 3"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"Source Code Pro"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        neu: {
          bg: '#EAE6DE',
          surface: '#EAE6DE',
          secondary: '#F0E8DE',
          border: '#DCD6CB',
          text: '#292824',
          muted: '#77736B',
          coral: '#FF6F61',
          coralHover: '#E85D50',
          gold: '#DAA520',
          renewable: '#6B8F71',
          storage: '#D69A75',
        },
        warm: {
          bg: '#1C1C1C',
          surface: '#242424',
          elevated: '#2A2A2A',
          border: '#383430',
          text: '#F5E8D8',
          muted: '#B5A898',
          coral: '#FF6F61',
          gold: '#DAA520',
          hover: '#FF4500',
        },
        coral: {
          DEFAULT: '#FF6F61',
          hover: '#E85D50',
          darkHover: '#FF4500',
        },
        gold: {
          DEFAULT: '#DAA520',
        },
        renewable: {
          DEFAULT: '#6B8F71',
        },
        burntOrange: '#FF4500',
        auth: {
          emerald: '#073D30',
          deepEmerald: '#062D24',
          darkBg: '#071B16',
          cream: '#F4EFE3',
          softCream: '#EAE2D2',
          gold: '#B58A45',
          darkText: '#19382F',
          mutedText: '#77796F',
        },
        nature: {
          bg: '#F7FAF8',
          card: '#FFFFFF',
          soft: '#ECFDF3',
          primary: '#16A34A',
          primaryHover: '#15803D',
          dark: '#12372A',
          secondary: '#475569',
          border: '#DDE8E1',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        }
      },
      boxShadow: {
        'neu-raised': '7px 7px 16px rgba(186, 178, 166, 0.42), -7px -7px 16px rgba(255, 255, 255, 0.9)',
        'neu-raised-sm': '4px 4px 10px rgba(186, 178, 166, 0.38), -4px -4px 10px rgba(255, 255, 255, 0.9)',
        'neu-raised-lg': '10px 10px 24px rgba(186, 178, 166, 0.45), -10px -10px 24px rgba(255, 255, 255, 0.95)',
        'neu-inset': 'inset 3.5px 3.5px 7px rgba(186, 178, 166, 0.38), inset -3.5px -3.5px 7px rgba(255, 255, 255, 0.85)',
        'neu-inset-sm': 'inset 2px 2px 5px rgba(186, 178, 166, 0.32), inset -2px -2px 5px rgba(255, 255, 255, 0.85)',
      }
    },
  },
  plugins: [],
}
