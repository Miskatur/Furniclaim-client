/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#359555",
          secondary: "#002E25",
          accent: "#F2F2F2",
          neutral: "#639655",
          warning: "#F6B00D",
        },
      }
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
