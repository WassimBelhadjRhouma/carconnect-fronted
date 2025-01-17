/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        darkblue: "#053269", // Indigo
        myindigo: "#221E56", // Teal
        background: "#f9fafb", // Light Gray
        text: "#111827", // Dark Gray
      },
    },
  },
  plugins: [],
};
