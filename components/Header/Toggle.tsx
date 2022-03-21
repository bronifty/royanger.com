import * as React from 'react'
import { ThemeContext } from '../../lib/context/themeContext'
import { SunIcon, MoonIcon } from '../icons'

const Toggle = () => {
   const { theme, setTheme } = React.useContext(ThemeContext)

   const handleThemeChange = (theme: string) => {
      setTheme(theme)
   }

   return (
      <>
         <div className="border-2  p-2 rounded-lg border-zinc-600 dark:border-zinc-200 hover:bg-zinc-100 hover:shadow-lg">
            {theme === 'light' ? (
               <div onClick={() => handleThemeChange('dark')}>
                  <div>
                     <SunIcon className="w-6  text-zinc-600" />
                  </div>
               </div>
            ) : (
               <div onClick={() => handleThemeChange('light')}>
                  <div>
                     <MoonIcon className="w-6 text-zinc-200" />
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

export default Toggle
