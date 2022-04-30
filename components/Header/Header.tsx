import Link from 'next/link'
import Menu from './Menu'
import Toggle from './Toggle'
import { Logo } from '../icons'

export default function Header() {
   return (
      <header className="flex justify-center my-6 px-4 dark:bg-black dark:color-white flex-col items-center">
         <div className="max-w-screen-xl w-full flex flex-row">
            <div className="pr-4">
               <Link href="/">
                  <a
                     className="flex flex-row items-center h-full hover:text-blue-700 dark:hover:text-blue-200"
                     aria-label="Home"
                  >
                     <Logo className="w-10 gradient transform hover:scale-[1.04] transition-all" />
                  </a>
               </Link>
            </div>
            <Menu />
            <div>
               <form>
                  <Toggle />
               </form>
            </div>
         </div>
         {/* TODO TO REMOVE WHEN SITE GOES LIVE  */}
         <div className="bg-grey-100 w-full flex justify-center mt-2">
            <div className="max-w-screen-xl w-full flex flex-row justify-center p-4">
               <p className="text-lg font-code dark:text-black">
                  This site is not quite done and some stuff is still not
                  finished/in perfect shape
               </p>
            </div>
         </div>
      </header>
   )
}
