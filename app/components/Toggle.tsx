import * as React from 'react'
import { ThemeContext } from '../lib/context/themeContext'

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
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                     ></path>
                  </svg>
               </div>
            </div>
            <div
               onClick={() => handleThemeChange('dark')}
               className="p-2 rounded-tr rounded-br focus:outline-none bg-gray-100 dark:bg-gray-600"
            >
               <div className="w-4 h-4 svg-icon ">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                     ></path>
                  </svg>
               </div>
            </div>
         </div>
      </>
   )
}

export default Toggle
