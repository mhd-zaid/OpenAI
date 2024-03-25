/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottomRight': '0 0 0 2px var(--box-shadow-color), 10px 10px 0 var(--box-shadow-color)',
        'bottomLeft': '0 0 0 2px var(--box-shadow-color), -10px 10px 0 var(--box-shadow-color)',
        'topRight': '0 0 0 2px var(--box-shadow-color), 10px -10px 0 var(--box-shadow-color)',
        'topLeft': '0 0 0 2px var(--box-shadow-color), -10px -10px 0 var(--box-shadow-color)',
      },
    },
  },
  plugins: [],
}

