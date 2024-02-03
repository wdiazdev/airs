/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
      },
      backgroundColor: {
        primary: "#f1f5f9",
        customBlue: "#2563eb",
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
}
