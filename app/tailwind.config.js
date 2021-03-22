//const colors = require('tailwindcss/colors')

module.exports = {
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      screens: {
         sm: '480px',
         md: '768px',
         lg: '976px',
         xl: '1440px',
      },
      colors: {
         // colour pallette based on https://coolors.co/9e0031-e7e7e7-000814-001d3d-003566-ffc300-ffd60a-f0f4ef
         transparent: 'transparent',
         current: 'currentColor',
         blue: {
            50: '#004FA3',
            100: '#04458F',
            200: '#003B7A',
            300: '#003166',
            400: '#002752',
            500: '#001D3D',
            DEFAULT: '#001D3D',
            600: '#001429',
            700: '#000A14',
         },
         lightblue: {
            50: '#0069CC',
            100: '#005FB8',
            200: '#0054A3',
            300: '#004A8F',
            400: '#003F7A',
            500: '#003566',
            DEFAULT: '#003566',
            600: '#002A52',
            700: '#00203D',
            800: '#001529',
            900: '#00B14',
         },

         black: {
            50: '#676765',
            100: '#5D5D5B',
            200: '#525251',
            300: '#484847',
            400: '#3E3E3D',
            500: '#343432',
            600: '#242423',
            DEFAULT: '#242423',
            700: '#1F1F1E',
            800: '#151514',
            900: '#0A0A0A',
         },
         brightyellow: {
            50: '#FFF8D6',
            100: '#FFF1AD',
            200: '#FFEB85',
            300: '#FFE45C',
            400: '#FFDD33',
            500: '#FFD60A',
            DEFAULT: '#FFD60A',
            600: '#E0BB00',
            700: '#B89900',
            800: '#8F7700',
            900: '#665500',
         },
         yellow: {
            50: '#FFF5D6',
            100: '#FFECAD',
            200: '#FFE285',
            300: '#FFD95C',
            400: '#FFCF33',
            500: '#FFC300',
            DEFAULT: '#FFC300',
            600: '#E0AC00',
            700: '#A37D00',
            800: '#7A5E00',
            900: '#523F00',
         },
         white: {
            50: '#FFFFF',
            100: '#F0F4EF',
            DEFAULT: '#F0F4EF',
            200: '#E8EEE7',
            300: '#DDE6DB',
            400: '#D2DECE',
            500: '#C6D6C2',
            600: '#BBCDB6',
            700: '#AFC5AA',
            800: '#A4BD9E',
            900: '#99B592',
         },
         red: {
            50: '#FF0A58',
            100: '#F500$e',
            200: '#E00047',
            300: '#CC0041',
            400: '#B8003A',
            500: '#9E0031',
            DEFAULT: '#9E0031',
            600: '#8F002D',
            700: '#7A0017',
            800: '#660020',
            900: '#52001A',
         },
         gray: {
            50: '#E7E7E7',
            100: '#D6D6D6',
            200: '#C2C2C2',
            300: '#ADADAD',
            400: '#999999',
            500: '#858585',
            DEFAULT: '#858585',
            600: '#707070',
            700: '#5C5C5C',
            800: '#474747',
            900: '#333333',
         },
      },
      fontFamily: {
         sans: ['Nunito Sans', 'sans-serif'],
         title: ['Fira Mono', 'sans-serif'],
         code: ['Ubuntu', 'mono'],
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
      require('tailwindcss-children'),
      //   require('@tailwindcss/typography'),
   ],
}
