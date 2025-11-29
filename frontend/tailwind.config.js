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
          dark: '#020602', // Very dark green background
          card: '#0a1a0a', // Dark green card
          accent: '#22c55e', // Vibrant green accent (Green-500)
          text: '#f0fdf4', // Light mint text
          muted: '#86efac' // Muted green
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
