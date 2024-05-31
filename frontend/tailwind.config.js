/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#000814",
          secondary: "#f9f9f9",
          accent: "#11151D",
          neutral: "#333533",
          "base-100": "white",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

