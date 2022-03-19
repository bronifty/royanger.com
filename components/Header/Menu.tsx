import * as React from 'react'
import MenuItem from './MenuItem'
// import { MenuIcon className="w-10", XIcon } from '@heroicons/react/solid'
import { MenuIcon, CloseIcon } from '../icons'

// import components, custom hooks, etc

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
      <nav className="flex flex-row  flex-grow items-center font-body text-xl">
         <div id="menu" className="flex flex-row flex-grow">
            <MenuItem link="/portfolio" title="Portfolio" />
            <MenuItem link="/skills" title="Skills & Resume" />
            <MenuItem link="/reading" title="Reading Material" />
            <MenuItem link="/contact" title="Contact" />
         </div>

         {isVisible ? (
            <div ref={ref} id="mobilemenu">
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
         <div id="menuButton" onClick={openMenu}>
            <MenuIcon className="w-10" />
         </div>

         <div id="menuButton" onClick={closeMenu}>
            <CloseIcon className="w-10" />
         </div>
      </nav>
   )
}

export default Menu
