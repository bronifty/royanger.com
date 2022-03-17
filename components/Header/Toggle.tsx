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
         <div>
            <div onClick={() => handleThemeChange('light')}>
               <div>
                  <SunIcon className="w-10" />
               </div>
            </div>
            <div onClick={() => handleThemeChange('dark')}>
               <div>
                  <MoonIcon className="w-10" />
               </div>
            </div>
         </div>
      </>
   )
}

export default Toggle
