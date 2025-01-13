/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "sans-serif"],
      },
      scrollbar: {
        rounded: true,
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    extend: {
      scrollbar: ["hover", "rounded", "dark"],
    },
  },
};
