/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#F5FCFF",
        secondary: "#DFF6ED",
        primary: "#047857",
      },
    },
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "639px" },

      sml: { max: "380px" },

      xsm: { max: "330px" },
    },
    plugins: [],
  },
}
