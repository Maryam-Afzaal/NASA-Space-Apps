/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#070a12',
          900: '#0b0f19',
          850: '#0f172a',
          800: '#151e33',
          750: '#1b253f',
          700: '#223050',
          600: '#334155',
        },
        mars: {
          red: '#ff4d28',
          orange: '#ff6b3d',
          amber: '#f59e0b',
          glow: '#ff8a50',
          surface: '#1a1017',
          soil: '#8d351b',
        },
        tech: {
          cyan: '#00d8f6',
          blue: '#38bdf8',
          emerald: '#10b981',
          rose: '#f43f5e',
          purple: '#a855f7',
          gold: '#fbbf24',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-mars': '0 0 25px rgba(255, 77, 40, 0.35)',
        'glow-cyan': '0 0 25px rgba(0, 216, 246, 0.3)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.3)',
        'glow-gold': '0 0 25px rgba(251, 191, 36, 0.3)',
      }
    },
  },
  plugins: [],
}
