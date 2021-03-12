const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      gray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      green: colors.lime,
      cyan: colors.cyan,
      lightblue: colors.lightBlue,
      indigo: colors.indigo,
      purple: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
      title: ['Fira Mono', 'sans-serif'],
      code: ['Ubuntu', 'mono'],
    },
    extend: {
      spacing: {
        1440: '1440px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-children'),
    //   require('@tailwindcss/typography'),
  ],
};
