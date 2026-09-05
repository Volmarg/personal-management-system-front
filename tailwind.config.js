module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '100': '25rem',
        '116': '28rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
