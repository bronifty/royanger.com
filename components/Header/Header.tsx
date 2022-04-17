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
                  <a className="font-body text-4xl flex flex-row items-center h-full ">
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
         <svg
            style={{ width: 0, height: 0, position: 'absolute' }}
            aria-hidden="true"
            focusable="false"
         >
            <linearGradient id="logo-gradient" x2="1" y2="1">
               <stop offset="0%" stopColor="#F7C948" />
               <stop offset="50%" stopColor="#4098D7" />
               <stop offset="100%" stopColor="#003E6B" />
            </linearGradient>
         </svg>
      </header>
   )
}
