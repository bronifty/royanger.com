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
            50: '#DCEEFB',
            100: '#B6E0FE',
            200: '#84C5F4',
            300: '#62B0E8',
            400: '#4098D7',
            500: '#2680c2',
            600: '#186FAF',
            700: '#0f609B',
            800: '#0A558C',
            900: '#003E6B',
            DEFAULT: '#003E6B',
         },

         yellow: {
            50: '#FFFBEA',
            100: '#FFF3C4',
            200: '#FCE588',
            300: '#FADB5F',
            400: '#F7C948',
            500: '#F0B429',
            600: '#DE911D',
            700: '#CB6E17',
            800: '#B44D12',
            900: '#8D2B0B',
            DEFAULT: '#F7C948',
         },

         grey: {
            50: '#F0F4F8',
            100: '#D9E2EC',
            200: '#BCCCDC',
            300: '#9FB3C8',
            400: '#829AB1',
            500: '#627D98',
            600: '#486581',
            700: '#334E68',
            800: '#243B53',
            900: '#102A43',
            DEFAULT: '#627D98',
         },

         cyan: {
            50: '#E0FCFF',
            100: '#BEF8FD',
            200: '#87EAF2',
            300: '#54D1DB',
            400: '#38BEC9',
            500: '#2CB1BC',
            600: '#14919B',
            700: '#0E7C86',
            800: '#0A6C74',
            900: '#044E54',
            DEFAULT: '#2CB1BC',
         },

         red: {
            50: '#FFEEEE',
            100: '#FACDCD',
            200: '#F29B9B',
            300: '#E66A6A',
            400: '#D64545',
            500: '#BA2525',
            600: '#A61B1B',
            700: '#911111',
            800: '#780A0A',
            900: '#610404',
            DEFAULT: '#BA2525',
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
         spotify: { DEFAULT: '#43E57D' },
         github: { DEFAULT: '#4078c0' },
         instagram: { DEFAULT: '#405de6' },
         linkedin: { DEFAULT: '#0077B5' },
         twitter: { DEFAULT: '#1da1f2' },
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

      function ({ addBase, theme }) {
         function extractColorVars(colorObj, colorGroup = '') {
            return Object.keys(colorObj).reduce((vars, colorKey) => {
               const value = colorObj[colorKey]

               const newVars =
                  typeof value === 'string'
                     ? { [`--color${colorGroup}-${colorKey}`]: value }
                     : extractColorVars(value, `-${colorKey}`)

               return { ...vars, ...newVars }
            }, {})
         }

         addBase({
            ':root': extractColorVars(theme('colors')),
         })
      },
   ],
}
