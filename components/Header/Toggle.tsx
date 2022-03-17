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
         <div>
            <div onClick={() => handleThemeChange('light')}>
               <div>
                  <SunIcon />
               </div>
            </div>
            <div onClick={() => handleThemeChange('dark')}>
               <div>
                  <MoonIcon />
               </div>
            </div>
         </div>
      </>
   )
}

export default Toggle
