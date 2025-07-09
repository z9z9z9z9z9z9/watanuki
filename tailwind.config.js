/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CC66DA",
        backGround: "#1A0E1F",
        lightBg: "#31193A",
        card: "#31193A",
        btnBg: "#43324a",
        btnBgHover: "#B14BC4",
        yellow: "#F9ED69",
        purple: "#B1B2FF",
        pink: "#F2BED1",
      },
    },
  },
  plugins: [],
};
