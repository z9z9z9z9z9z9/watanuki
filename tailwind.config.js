/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffbade",
        backGround: "#201f31",
        lightBg: "#2b2a3c",
      },
    },
  },
  plugins: [],
};
