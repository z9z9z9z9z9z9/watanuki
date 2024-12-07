/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ADB5",
        backGround: "#222831",
        lightBg: "#49505c81",
        yellow: "#F9ED69",
        purple: "#B1B2FF",
        pink: "#F2BED1",
      },
    },
  },
  plugins: [],
};
