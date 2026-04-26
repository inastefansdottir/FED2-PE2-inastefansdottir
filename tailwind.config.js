export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#558c91",
        secondary: "#285260",
        accent: "#b4d8d8",
        brownDark: "#ab9072",
        brownLight: "#e0d7ce",
        background: "#f7f9f9",
      },
      fontFamily: {
        heading: ["Gloock", "serif"],
        body: ["Lexend", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
