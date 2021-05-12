import * as React from 'react'
import { ThemeContext } from '../../lib/context/themeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'

const Toggle = () => {
   const { theme, setTheme } = React.useContext(ThemeContext)

   const handleThemeChange = (theme: string) => {
      setTheme(theme)
   }

   return (
      <>
         <div className="flex items-center text-gray-900 rounded-full cursor-pointer select-none dark:text-gray-100">
            <div
               onClick={() => handleThemeChange('light')}
               className="p-2 rounded-tl-xl rounded-bl-xl focus:outline-none bg-lightblue-100 text-yellow-50 dark:bg-white-200 dark:text-lightblue-500"
            >
               <div className="w-4 h-4 svg-icon ">
                  <SunIcon />
               </div>
            </div>
            <div
               onClick={() => handleThemeChange('dark')}
               className="p-2 rounded-tr-xl rounded-br-xl focus:outline-none bg-lightblue-700 text-yellow-50 dark:bg-brightyellow-500 dark:text-lightblue-500"
            >
               <div className="w-4 h-4 svg-icon ">
                  <MoonIcon />
               </div>
            </div>
         </div>
      </>
   )
}

export default Toggle
