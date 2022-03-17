import * as React from 'react'
import MenuItem from './MenuItem'
// import { MenuIcon className="w-10", XIcon } from '@heroicons/react/solid'
import { MenuIcon, CloseIcon } from '../icons'

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
      <nav>
         <div id="menu">
            <MenuItem link="/about" title="About" />
            <MenuItem link="/blog" title="Blog" />
            <MenuItem link="/portfolio" title="Portfolio" />
            <MenuItem link="/contact" title="Contact" />
         </div>
         <form>
            <Toggle />
         </form>

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
