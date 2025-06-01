/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "390px",
      },
      fontFamily: {
        lora: ["lora", "serif"],
        manrope: ["manrope", "sans-serif"],
        playwriteDEGrund: ["playwriteDEGrund", "cursive"],
      },
    },
  },
  plugins: [],
};
