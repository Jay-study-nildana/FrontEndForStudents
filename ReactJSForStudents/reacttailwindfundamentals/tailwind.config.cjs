module.exports = {
  // Use class strategy so toggling the `dark` class works at runtime
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,tsx}" // scan source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
