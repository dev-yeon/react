/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // extend: {},
    extend: {
    colors:{
      myColor :{
        100: '#7272ff'
      },
      spacing : {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    },
  },
},
  plugins: [],
}

