import * as React from 'react'
import MenuItem from './MenuItem'
import { MenuIcon, CloseIcon } from '../icons'

// import components, custom hooks, etc
import useVisible from '../../lib/hooks/useVisible'
import Title from '../Title'

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
         <div
            id="desktopmenu"
            className="flex flex-row flex-grow hidden md:block"
         >
            <MenuItem link="/portfolio" title="Portfolio" />
            <MenuItem link="/skills" title="Skills & Resume" />
            <MenuItem link="/reading" title="Reading Material" />
            <MenuItem link="/contact" title="Contact" />
         </div>

         {/* {isVisible ? ( */}
         <div
            ref={ref}
            id="mobilemenu"
            className={`flex flex-col absolute top-0 right-0 left-0 bg-blue text-white w-full p-4 h-screen ${
               isVisible ? 'flex' : 'hidden'
            }`}
         >
            <div
               id="menuButton"
               onClick={closeMenu}
               className="md:hidden  absolute top-4 right-4"
            >
               <CloseIcon className={`w-6 ${mobileCloseCSS}`} />
            </div>

            <div className="absolute left-0 right-0 top-14 flex flex-col">
               <div className="px-2 mb-3">
                  <Title type="h2">Menu</Title>
               </div>
               <MenuItem
                  link="/"
                  title="Home"
                  onClick={onClick}
                  classes="border-t-[1px] border-t-blue-200"
               />
               {/* </div> */}
               <MenuItem
                  link="/portfolio"
                  title="Portfolio"
                  onClick={onClick}
               />
               <MenuItem
                  link="/skills"
                  title="Skills & Resume"
                  onClick={onClick}
               />
               <MenuItem
                  link="/reading"
                  title="Reading Material"
                  onClick={onClick}
               />
               <MenuItem link="/contact" title="Contact" onClick={onClick} />
            </div>
         </div>
         <div
            id="menuButton"
            onClick={openMenu}
            className="md:hidden flex-grow flex justify-end"
         >
            <MenuIcon className={`w-6 ${mobileToggleCSS}`} />
         </div>

         <div
            id="menuButton flex-grow flex justify-end"
            onClick={closeMenu}
            className="md:hidden"
         >
            <CloseIcon className={`w-6 ${mobileCloseCSS}`} />
         </div>
      </nav>
   )
}

export default Menu
