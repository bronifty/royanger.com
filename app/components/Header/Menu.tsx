import * as React from 'react'
import MenuItem from './MenuItem'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid'
import Toggle from './Toggle'

const Menu = () => {
   const [displayMobileMenu, setDisplayMobileMenu] = React.useState(false)
   const [displayMobileToggle, setDisplayMobileToggle] = React.useState(true)
   const [mobileToggleCSS, setMobileToggleCSS] = React.useState('block')
   const [mobileCloseCSS, setMobileCloseCSS] = React.useState('hidden')

   const toggleMenu = () => {
      setDisplayMobileMenu(prevStatus => (prevStatus === false ? true : false))
      setDisplayMobileToggle(prevStatus => (prevStatus === true ? false : true))
   }

   const onClick = () => {
      setDisplayMobileToggle(true)
      setDisplayMobileMenu(false)
   }

   React.useEffect(() => {
      if (displayMobileToggle) {
         setMobileToggleCSS('block')
         setMobileCloseCSS('hidden')
      } else {
         setMobileToggleCSS('hidden')
         setMobileCloseCSS('block')
      }
   }, [displayMobileToggle])

   return (
      <nav className="flex flex-grow items-center justify-end font-code text-primary relative">
         <div
            id="menu"
            className="hidden lg:block self-center flex-row bg-transparent "
         >
            <MenuItem link="/about" title="About" />
            <MenuItem link="/blog" title="Blog" />
            <MenuItem link="/portfolio" title="Portfolio" />
            <MenuItem link="/hire" title="Hire" />
         </div>
         <form>
            <Toggle />
         </form>
         {displayMobileMenu === true ? (
            <div
               id="menu"
               className="flex self-start lg:hidden flex-col bg-lightblue-200 bg-opacity-90 rounded-xl absolute "
            >
               <MenuItem link="/about" title="About" onClick={onClick} />
               <MenuItem link="/blog" title="Blog" onClick={onClick} />
               <MenuItem
                  link="/portfolio"
                  title="Portfolio"
                  onClick={onClick}
               />
               <MenuItem link="/hire" title="Hire" onClick={onClick} />
            </div>
         ) : (
            ''
         )}
         <div
            id="menuButton"
            className={`lg:hidden border-2 border-white rounded-xl mr-3 ml-5 ${mobileToggleCSS}`}
            onClick={toggleMenu}
         >
            <MenuAlt1Icon className="h-12 w-12" />
         </div>

         <div
            id="menuButton"
            className={`lg:hidden z-50 border-2 border-white rounded-xl mr-3 ${mobileCloseCSS} `}
            onClick={toggleMenu}
         >
            <XIcon className="h-12 w-12" />
         </div>
      </nav>
   )
}

export default Menu
