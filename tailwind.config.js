/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5a2e98",
        secondary: "#a885da",
        backGround: "#050505",
        lightBg: "#1c1c1c",
        green: "#b0e3af",
        blue: "#b9e7ff",
        gray: "#3e3e46",
      },
    },
  },
  plugins: [],
};
