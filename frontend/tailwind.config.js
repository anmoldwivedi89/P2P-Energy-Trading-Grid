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
      }
    },
  },
  plugins: [],
}
