/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D3B1D",
        secondary: "#2F7C1F",
        cream: "#FAF7F2",
        beige: "#F5EFE5",
        dark: "#111827",
        body: "#4B5563",
        success: "#2F7C1F"
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      }
    },
  },
  plugins: [],
}