import * as React from 'react'
import MenuItem from './MenuItem'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid'

// import components, custom hooks, etc
import Toggle from './Toggle'
import useVisible from '../../lib/hooks/useVisible'

const Menu = () => {
   const { ref, isVisible, setIsVisible } = useVisible(false)
   const [displayMobileMenuIcon, setDisplayMobileMenuIcon] =
      React.useState(true)
   const [mobileToggleCSS, setMobileToggleCSS] = React.useState('block')
   const [mobileCloseCSS, setMobileCloseCSS] = React.useState('hidden')

   // handle showing and hiding the menu
   const openMenu = () => {
      setIsVisible(true)
   }
   const closeMenu = () => {
      setIsVisible(false)
   }

   // handle closing menu if a link is clicked on from child component
   const onClick = () => {
      setIsVisible(!isVisible)
   }

   React.useEffect(() => {
      if (displayMobileMenuIcon) {
         setMobileToggleCSS('block')
         setMobileCloseCSS('hidden')
      } else {
         setMobileToggleCSS('hidden')
         setMobileCloseCSS('block')
      }
   }, [displayMobileMenuIcon])

   // use this so useVisible can remain a separate, reusable hook
   React.useEffect(() => {
      setDisplayMobileMenuIcon(isVisible ? false : true)
   }, [isVisible])

   return (
      <nav className="flex flex-grow items-center justify-end font-code text-primary relative">
         <div
            id="menu"
            className="hidden lg:block self-center flex-row bg-transparent "
         >
            <MenuItem link="/about" title="About" />
            <MenuItem link="/blog" title="Blog" />
            <MenuItem link="/portfolio" title="Portfolio" />
            <MenuItem link="/contact" title="Contact" />
         </div>
         <form>
            <Toggle />
         </form>

         {isVisible ? (
            <div
               ref={ref}
               id="mobilemenu"
               className="flex self-start lg:hidden flex-col bg-lightblue-200 bg-opacity-90 rounded-xl absolute "
            >
               <MenuItem link="/about" title="About" onClick={onClick} />
               <MenuItem link="/blog" title="Blog" onClick={onClick} />
               <MenuItem
                  link="/portfolio"
                  title="Portfolio"
                  onClick={onClick}
               />
               <MenuItem link="/contact" title="Contact" onClick={onClick} />
            </div>
         ) : (
            ''
         )}
         <div
            id="menuButton"
            className={`lg:hidden border-2 border-white rounded-xl mr-3 ml-5 ${mobileToggleCSS}`}
            onClick={openMenu}
         >
            <MenuAlt1Icon className="h-12 w-12" />
         </div>

         <div
            id="menuButton"
            className={`lg:hidden z-50 border-2 border-white rounded-xl mr-3 ${mobileCloseCSS} `}
            onClick={closeMenu}
         >
            <XIcon className="h-12 w-12" />
         </div>
      </nav>
   )
}

export default Menu
