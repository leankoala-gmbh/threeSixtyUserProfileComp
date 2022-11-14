const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        trans: {
          'black-08': 'rgba(0,0,0,.8)'
        }
      }
    },
  },
  plugins: [
  ],
}
