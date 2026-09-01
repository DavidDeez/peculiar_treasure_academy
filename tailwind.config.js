/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // blue-700 as a placeholder primary brand color
        secondary: "#facc15", // yellow-400
      }
    },
  },
  plugins: [],
}
