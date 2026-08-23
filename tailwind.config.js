/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2A4A',
          dark: '#101A30',
          light: '#2C4066',
        },
        cream: {
          DEFAULT: '#F5EFE0',
          dark: '#EAE0C8',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#DEC078',
          dark: '#9C7B2E',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        enamel: '0 4px 0 0 #9C7B2E, 0 8px 16px rgba(16, 26, 48, 0.25)',
      },
    },
  },
  plugins: [],
}
