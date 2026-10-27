/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Charte tirée du logo : bleu ardoise #587499 (ardoise-500) et corail #EA5D58 (corail-500).
        // Texte et boutons : ardoise-500 à 900 (blanc dessus ≥ 4,8:1) et corail-600/700 (≥ 4,8:1).
        ardoise: {
          50: '#F3F6FA', 100: '#E3EAF2', 200: '#C7D4E3', 300: '#9FB3CC', 400: '#7B94B3',
          500: '#587499', 600: '#465F80', 700: '#384B67', 800: '#2B3B52', 900: '#1F2B3C', 950: '#161F2B',
        },
        corail: {
          50: '#FFF3F2', 100: '#FFE3E1', 200: '#FFC9C6', 300: '#FAA19D', 400: '#F27F7A',
          500: '#EA5D58', 600: '#C9433E', 700: '#B13632', 800: '#8E2C29', 900: '#6B2220',
        },
        // Gris bleutés neutres (fonds, bordures, texte secondaire)
        encre: {
          50: '#F6F8FB', 100: '#EDF1F6', 200: '#DEE5EE', 300: '#C9D3E0', 400: '#8D9BB0',
          500: '#66758C', 600: '#4F5E75', 700: '#3A4960', 800: '#1F2B3C', 900: '#151E2B',
        },
        brume: { 50: '#FAFBFD', 100: '#F3F6FA', 200: '#E8EDF3', 300: '#D6DEE8' },
      },
      fontFamily: {
        sans: ['"Nunito Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(31,43,60,.04), 0 8px 24px -8px rgba(31,43,60,.10)',
        lift: '0 2px 4px rgba(31,43,60,.05), 0 18px 40px -12px rgba(31,43,60,.20)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'none' } },
        'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: { 'fade-up': 'fade-up .6s ease-out both', 'float': 'float 7s ease-in-out infinite' },
    },
  },
  plugins: [],
};
