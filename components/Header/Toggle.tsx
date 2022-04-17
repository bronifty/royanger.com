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
         <div className="bg-black dark:bg-white hover:bg-gradient-to-br from-yellow-400 via-blue-400 to-blue-900 rounded-lg dark:hover:from-yellow-100 dark:hover:via-blue-100 dark:hover:to-blue-400 p-[2px]">
            <div className="p-2 bg-white dark:bg-black rounded-lg border-zinc-600 dark:border-zinc-200 hover:bg-zinc-100 hover:shadow-lg sun-container moon-container">
               {theme && theme === 'light' ? (
                  <div onClick={() => handleThemeChange('dark')}>
                     <div>
                        <SunIcon className="w-6 text-zinc-600 sun-gradient" />
                     </div>
                  </div>
               ) : (
                  ''
               )}
               {theme && theme === 'dark' ? (
                  <div onClick={() => handleThemeChange('light')}>
                     <div>
                        <MoonIcon className="w-6 text-zinc-200 moon-gradient" />
                     </div>
                  </div>
               ) : (
                  ''
               )}
               <svg
                  style={{ width: 0, height: 0, position: 'absolute' }}
                  aria-hidden="true"
                  focusable="false"
               >
                  <linearGradient id="sun-gradient" x2="1" y2="1">
                     <stop offset="0%" stopColor="#F7C948" />
                     <stop offset="50%" stopColor="#4098D7" />
                     <stop offset="100%" stopColor="#003E6B" />
                  </linearGradient>

                  <linearGradient id="moon-gradient" x2="1" y2="1">
                     <stop offset="0%" stopColor="#FFF3C4" />
                     <stop offset="50%" stopColor="#B6E0FE" />
                     <stop offset="100%" stopColor="#4098D7" />
                  </linearGradient>
               </svg>
            </div>
         </div>
      </>
   )
}

export default Toggle
