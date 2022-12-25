/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      colorxl: "#b73aa0",
      colorlg: "#df9ad2",
      colormd: "#814eae",
      colorsm: "#E5B8F4",
      colorctr :"#dbc3c2",
      colormddk:'#36498f',
      colorlgdk:'#2d7c9d',
      colorsmdk:'	#cccccc',
      pillColor:'#161d20'
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
