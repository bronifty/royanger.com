import * as React from 'react'
import { ThemeContext } from '../../lib/context/themeContext'
import { SunIcon, MoonIcon } from '../icons'

// TODO track down this type error
const Toggle = () => {
   const { theme, setTheme } = React.useContext(ThemeContext)

   const handleThemeChange = (theme: string) => {
      setTheme(theme)
   }

   return (
      <>
         <div className="bg-black hover:text-blue-700 rounded-lg dark:hover:text-blue-200 border-[2px] border-black hover:border-blue-700 dark:border-white dark:hover:border-blue-200 toggle-container">
            {theme && theme === 'light' ? (
               <div
                  className="p-2 bg-white dark:bg-black rounded-lg border-zinc-600 dark:border-zinc-200 hover:bg-zinc-100 hover:shadow-lg sun-container moon-container cursor-pointer"
                  onClick={() => handleThemeChange('dark')}
               >
                  <div>
                     <div>
                        <SunIcon className="w-6 text-zinc-600 sun-gradient" />
                     </div>
                  </div>
               </div>
            ) : (
               ''
            )}
            {theme && theme === 'dark' ? (
               <div
                  className="p-2 bg-white dark:bg-black rounded-lg border-zinc-600 dark:border-zinc-200 hover:bg-zinc-100 hover:shadow-lg sun-container moon-container cursor-pointer"
                  onClick={() => handleThemeChange('light')}
               >
                  <div>
                     <div>
                        <MoonIcon className="w-6 text-zinc-200 moon-gradient" />
                     </div>
                  </div>
               </div>
            ) : (
               ''
            )}
         </div>
      </>
   )
}

export default Toggle
