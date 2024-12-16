/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff640a",
        backGround: "#1A1A1D",
        lightBg: "#23252b",
        yellow: "#F9ED69",
        purple: "#B1B2FF",
        pink: "#F2BED1",
      },
    },
  },
  plugins: [],
};
