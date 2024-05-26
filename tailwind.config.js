/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,tsx,js,ts,jsx,mdx}",
    "./components/**/*.{html,tsx,js,ts,jsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "gradient-start": "#38bdf8", // Light blue
        "gradient-mid": "#9333ea", // Purple
        "gradient-end": "#6ee7b7", // Light green
      },
    },
  },
  plugins: [],
};
