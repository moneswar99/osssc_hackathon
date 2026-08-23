/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kisan: {
          green: '#2D7A2D',
          light: '#4CAF50',
          dark: '#1B5E20',
          earth: '#8B6914',
          sky: '#0288D1',
          warm: '#FF8F00',
          cream: '#FFF8E1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
