module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        'black' : '#1E212D',
        'brown-light' : '#FAF3E0',
        'brown-dark' : '#B68973',
        'brown' : '#EABF9F',
        'white' : '#fff',
        'gray' : '#ccc',
        'sage' : '#B2AB8C',
        'deep-koamoru' : '#293B5F',
        'purple-navy' : '#47597E',
        'azureish-white' : '#DBE6FD'
      },
      fontFamily : {
        'cabin' : ['"Cabin Sketch"', 'ui-sans-serif', 'system-ui']
      },
      letterSpacing : {
        'widest' : '0.3em'
      },
      height : {
        '5-5/6' : '95%'
      },
      width : {
        '120' : '30rem'
      },
      transitionDuration : {
        '2000' : '2000ms'
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
