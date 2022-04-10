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
                  <a className="font-body text-4xl flex flex-row items-center h-full">
                     <Logo className="w-10" />
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
