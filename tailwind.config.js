/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bg1: "url('../assets/images/bg1.jpg')",
        bg: "url('../assets/images/bg.png')",
      },
    },
  },
  plugins: [],
};
