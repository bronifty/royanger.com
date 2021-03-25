import * as React from 'react'

const returnInitialTheme = () => {
   if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme')
      if (typeof storedTheme === 'string') {
         return storedTheme
      }
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
      if (userMedia.matches) {
         return 'dark'
      }
   }
   return 'dark'
}

export const ThemeContext = React.createContext()

interface ThemeContext {
   initialTheme?: 'string'
   children: JSX.Element
}

export const ThemeProvider = ({ initialTheme, children }: ThemeContext) => {
   const [theme, setTheme] = React.useState(returnInitialTheme)

   const rawSetTheme = (theme: string) => {
      const root = window.document.documentElement
      const isDark = theme === 'dark'

      root.classList.remove(isDark ? 'light' : 'dark')
      root.classList.add(theme)

      localStorage.setItem('theme', theme)
   }

   if (initialTheme) {
      rawSetTheme(initialTheme)
   }

   React.useEffect(() => {
      rawSetTheme(theme)
   }, [theme])

   return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   )
}
