/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2F5265",
          light: "#16537e",
          dark: "#174A7A",
        },
        secondary: {
          DEFAULT: "#2F5265",
          light: "#FF8387",
          dark: "#CC474C",
        },
        tertiary: {
          DEFAULT: "#00a199",
          light: "#FFD700",
          dark: "#FFD700",
        },
        success: {
          DEFAULT: "black",
          light: "#00a199",
          dark: "#00a199",
        },
        danger: {
          DEFAULT: "#acbac1",
          light: "#ff0000",
          dark: "#ff0000",
        },
        backg: {
          DEFAULT: "#ffffff",
          light: "#f9f9f9",
          dark: "#f9f9f9",
        },

        // Add more custom colors
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        futura: ["FUTURA55", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
