/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E73BE",
          light: "#16537e",
          dark: "#174A7A",
        },
        secondary: {
          DEFAULT: "#615b7f",
          light: "#FF8387",
          dark: "#CC474C",
        },
        tertiary: {
          DEFAULT: "#00a199",
          light: "#FFD700",
          dark: "#FFD700",
        },
        success: {
          DEFAULT: "#00a7e0",
          light: "#00a199",
          dark: "#00a199",
        },
        danger: {
          DEFAULT: "#c0dbdf",
          light: "#ff0000",
          dark: "#ff0000",
        },
        backg: {
          DEFAULT: "#ffffff",
          light: "#f9f9f9",
          dark: "#f9f9f9",
        },

        // Add more custom colors as needed
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"], // Add Helvetica to the sans family
        futura: ["FUTURA55", "Helvetica", "Arial", "sans-serif"], // Add FUTURA55 custom font
      },
    },
  },
  plugins: [],
};
