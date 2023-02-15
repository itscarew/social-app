/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dodger-blue": {
          50: "#eff7ff",
          100: "#dbecfe",
          200: "#bedfff",
          300: "#92cbfe",
          400: "#5eaefc",
          500: "#3087f8",
          600: "#236ded",
          700: "#1b58da",
          800: "#1c47b1",
          900: "#1d3f8b",
        },
      },
    },
  },
  plugins: [],
};
