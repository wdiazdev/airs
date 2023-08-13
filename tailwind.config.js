const { nextui } = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-hover": "#338EF7",
        "custom-black": "#111",
        "custom-text": "DM Sans",
      },
    },
    fontSize: {
      sm: "1rem",
      md: "1.2rem",
      lg: "2rem",
      xl: "3rem",
      "2xl": "4rem",
    },
  },
  plugins: [nextui(), require("@tailwindcss/forms")],
}
