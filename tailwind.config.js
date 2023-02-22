module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#FF4401",
        primaryHover: "#ffe6dd",
        primaryLow: "#ff4e0e",
        secondary: "#858EAD",

        error: "#dc3545",
        success: "#28a745",
        warning: "#ffc107",
        muted: "#6c757d",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
