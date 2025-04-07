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
          DEFAULT: "#acbac1",
          light: "#ff0000",
          dark: "#ff0000",
        },

        success: {
          DEFAULT: "#00a199",
          light: "#FFD700",
          dark: "#FFD700",
        },

        tertiary: {
          DEFAULT: "black",
          light: "#00a199",
          dark: "#00a199",
        },

        backg: {
          DEFAULT: "#ffffff",
          light: "#f9f9f9",
          dark: "#f9f9f9",
        },

        danger: {
          DEFAULT: "#ff4b5c",
          light: "#ff6b7f",
          dark: "#d9404f",
        },
        "wind-comfort": "#29C0E7",
        "wind-energy": "#ADF29C",
        "thermal-comfort": "#FF8767",
        "air-quality": "#FFE77A",

        // Add more custom colors
      },
      fontFamily: {
        Jost: ["Jost", "sans-serif"],

        // Add more custom fonts
      },
      maxHeight: {
        128: "32rem",
        144: "36rem",
      },
      Width: {
        128: "32rem",
        144: "36rem",
        256: "64rem",
        320: "80rem",
        400: "100rem",
        640: "160rem",
      },
      minWidth: {
        128: "32rem",
        144: "36rem",
      },

      screens: {
        lg: { min: "1025px" },
      },
    },
  },
  plugins: [],
};
