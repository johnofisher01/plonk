/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#3b82f6", // Edelman blue
        brandTeal: "#004d6e", // Dark teal
        brandLightTeal: "#1976d2", // Light teal
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'Roboto', 'sans-serif'], // Clean sans-serif fonts
      },
    },
  },
  plugins: [],
};