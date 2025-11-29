/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amadeus: {
          dark: '#0a0a0a',
          card: '#1a1a1a',
          accent: '#3b82f6', // Blue accent
          text: '#e5e5e5',
          muted: '#a3a3a3'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
