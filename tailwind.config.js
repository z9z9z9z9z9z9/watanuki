/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "#ffbade",
  background: "#201f31",
  lightbg: "#2b2a3c",
  lightBg: "#2b2a3c",
  card: "#2b2a3c",
  btnbg: "#373646",
  yellow: "#F9ED69",
  purple: "#B1B2FF",
  pink: "#F2BED1",
};
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
};
