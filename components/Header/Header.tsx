import Link from 'next/link'
import Menu from './Menu'
import Toggle from './Toggle'
import { Logo } from '../icons'
import { SOCIALS } from '../../lib/constants/socials'
import { SocialLink } from '../SocialLink'

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
            <div className="hidden lg:flex flex-row items-center">
               {SOCIALS.filter(
                  platform =>
                     platform.type !== 'instagram' &&
                     platform.type !== 'contact'
               ).map(platform => {
                  return (
                     <div key={platform.type} className="mx-2">
                        <SocialLink
                           type={platform.type}
                           label={platform.label}
                           link={platform.link}
                        />
                     </div>
                  )
               })}
            </div>
            <div>
               <form>
                  <Toggle />
               </form>
            </div>
         </div>
      </header>
   )
}
