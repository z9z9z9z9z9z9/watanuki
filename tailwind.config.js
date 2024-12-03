/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5a2e98",
        secondary: "#a885da",
        backGround: "#1c1c1c",
        lightBg: "#1c1c1c",
      },
    },
  },
  plugins: [],
};
