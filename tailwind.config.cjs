/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkdark: "#0D0D0D",
        dark: "#262626",
        medium: "#727273",
        light: "#D7D8D9",
        lightlight: "#F0F1F2",
      },
    },
  },
  plugins: [],
};
