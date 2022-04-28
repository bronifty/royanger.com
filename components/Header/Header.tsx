import Link from 'next/link'
import Menu from './Menu'
import Toggle from './Toggle'
import { Logo } from '../icons'

export default function Header() {
   return (
      <header className="flex justify-center my-6 px-4 dark:bg-black dark:color-white">
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
      </header>
   )
}
