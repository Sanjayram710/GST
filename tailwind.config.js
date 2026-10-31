/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        brand: {
          DEFAULT: 'var(--brand)',
          soft: 'var(--brand-soft)',
          dark: '#0C2A20',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: '#FEF6EC',
        },
        ok: 'var(--ok)',
        warn: 'var(--warn)',
        risk: 'var(--risk)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        btn: '14px',
        chip: '999px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15,27,20,0.06)',
        lift: '0 8px 24px rgba(15,27,20,0.06)',
        dark: '0 10px 30px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}

