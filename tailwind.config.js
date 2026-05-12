/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        themeBg: 'var(--color-bg)',
        themeCard: 'var(--color-card)',
        themeText: 'var(--color-text)',
        themeTextMuted: 'var(--color-text-muted)',
        themeBorder: 'var(--color-border)',
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primary-hover)',
        
        stat1: 'var(--color-stat-1)',
        stat2: 'var(--color-stat-2)',
        stat3: 'var(--color-stat-3)',
        stat4: 'var(--color-stat-4)',
      }
    },
  },
  plugins: [],
}
