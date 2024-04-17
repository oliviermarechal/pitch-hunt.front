/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      red: '#FE0505',
      green: '#05FE2D',
      grey: '#6b6b6b',
      'primary': '#141414',
      'secondary': '#fcee07',
      'tertiary': '#02cbff',
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
