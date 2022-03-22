const colors = require('tailwindcss/colors')

module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
   ],
   darkMode: 'class',
   theme: {
      screens: {
         sm: '480px',
         md: '768px',
         lg: '976px',
         xl: '1440px',
      },
      fontFamily: {
         body: ['Hind', 'sans-serif'],
         title: ['Archivo Black', 'sans-serif'],
         code: ['Ubuntu Mono', 'mono'],
      },
      colors: {
         transparent: 'transparent',
         current: 'currentColor',
         blue: {
            50: '#5365ca',
            100: '#3a4dbb',
            200: '#30409c',
            300: '#26337d',
            400: '#1d265e',
            500: '#141b41',
            DEFAULT: '#141b41',
            600: '#131a3e',
            700: '#0e132f',
            800: '#0a0d1f',
            900: '#050610',
         },
         white: {
            DEFAULT: '#ffffff',
         },
         black: {
            50: '#c6ccd2',
            100: '#b0b8bf',
            200: '#8e99a4',
            300: '#778592',
            400: '#64707d',
            500: '#525c66',
            DEFAULT: '#1b1f22',
            600: '#40474f',
            700: '#2d3339',
            800: '#1b1f22',
            900: '#08090a',
         },
         grey: colors.neutral,
      },
      extend: {
         backgroundColor: {
            primary: 'var(--color-bg-primary)',
            secondary: 'var(--color-bg-secondary)',
         },
         textColor: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            accent: 'var(--color-text-accent)',
         },
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
      // require('tailwindcss-children'),
      //   require('@tailwindcss/typography'),
   ],
}
