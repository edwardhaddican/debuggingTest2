/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {screens: {
      'sm': '600px',
      // => @media (min-width: 992px) { ... }
    },
  },
  },
  plugins: [require('@tailwindcss/forms','@tailwindcss/aspect-ratio'),],
}