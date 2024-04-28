/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    
    extend: {
      fontFamily:{jersey: ['"Jersey 20", sans-serif']},
      colors: {
        'text': '#152935',
        'button': '#698ea2',
        'topbar':'#e4a576',
        'background':'#ccd5d2',
        'extra':'#fde5d6',
        'white':'#ffffff',
        'beach':'#ffecd1',
        'black':'#001524',
        'orange':'#ff7d00',
        'brown':'#78290f',
        'black2':'#17181d',
        'darkGray':'#292c35',
        'orange2':'#e09145',
        'skin':'#fcd9b8'
      }
      
    },
  },
  plugins: [],
}

