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
               className="p-2 rounded-tl rounded-bl focus:outline-none bg-gray-200 dark:bg-gray-700"
            >
               <div className="w-4 h-4 svg-icon ">
                  <SunIcon />
               </div>
            </div>
            <div
               onClick={() => handleThemeChange('dark')}
               className="p-2 rounded-tr rounded-br focus:outline-none bg-gray-100 dark:bg-gray-600"
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
