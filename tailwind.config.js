//const colors = require('tailwindcss/colors')

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
