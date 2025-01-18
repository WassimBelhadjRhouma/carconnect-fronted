/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#1C1C1C",
        invalidPrimary: "#303030",
        darkblue: "#053269", // Indigo
        myindigo: "#221E56", // Teal
        background: "#f9fafb", // Light Gray
        text: "#111827", // Dark Gray
      },
      boxShadow: {
        card: "4px 7px 22px -8px rgba(194, 194, 194, 0.91)",
      },
    },
  },
  plugins: [],
};
