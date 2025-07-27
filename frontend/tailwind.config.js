/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6A49BA",
        "bg-color": "#F6F9FF",
        "primary-text-color": "#404040",
      },
      fontFamily: {
        sans: ["Albert Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
