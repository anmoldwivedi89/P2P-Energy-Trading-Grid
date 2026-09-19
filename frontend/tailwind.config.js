/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        energy: {
          solar: '#f59e0b',
          wind: '#0ea5e9',
          hydro: '#3b82f6',
          biomass: '#84cc16',
          grid: '#6366f1',
        }
      }
    },
  },
  plugins: [],
}
