import * as React from 'react'
import MenuItem from './MenuItem'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid'
import Toggle from './Toggle'

const Menu = () => {
   const [menuStatus, setMenuStatus] = React.useState('default')

   const toggleMenu = () => {
      setMenuStatus(prevStatus =>
         prevStatus === 'default' ? 'toggled' : 'default'
      )
   }

   return (
      <nav className="flex flex-grow items-center justify-end font-code text-primary">
         {menuStatus === 'default' ? (
            <div id="menuButton" className="lg:hidden" onClick={toggleMenu}>
               <MenuAlt1Icon className="h-12 w-12" />
            </div>
         ) : (
            ''
         )}
         <div id="menuButton" className="lg:hidden" onClick={toggleMenu}>
            <XIcon className="h-12 w-12" />
         </div>
         {menuStatus === 'default' ? (
            <div
               id="menu"
               className="flex self-start flex-col lg:flex-row bg-lightblue-200 bg-opacity-80 lg:bg-transparent "
            >
               <MenuItem link="/about" title="About" />
               <MenuItem link="/blog" title="Blog" />
               <MenuItem link="/portfolio" title="Portfolio" />
               <MenuItem link="/hire" title="Hire" />
            </div>
         ) : (
            ''
         )}
         <form>
            <Toggle />
         </form>
      </nav>
   )
}

export default Menu
