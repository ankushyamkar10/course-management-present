/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Paths to all your template files
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'min': '430px'}, // Custom breakpoint for screens up to 430px
        // You can include other breakpoints if needed
      },
    },
  },
  plugins: [require('daisyui')],
};