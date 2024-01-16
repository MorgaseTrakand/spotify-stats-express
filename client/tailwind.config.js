/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        '85': '85%'
      },
      height: {
        '10': '10%',
      },
      boxShadow: {
        'quarter': '-0.25px 0 0 #FFFFFF',
      },
      colors: {
        background: '#050B10',
        lightGrey: '#141B1F',
        main: '#7B51F2',
        text: '#FFFFFF'
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

