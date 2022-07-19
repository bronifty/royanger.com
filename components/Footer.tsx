import { SocialLink } from './SocialLink'
import { SOCIALS } from '../lib/constants/socials'

export default function Footer() {
   return (
      <footer className="flex flex-col grow justify-end">
         <div className="bg-black-700 dark:bg-white text-white dark:text-grey-800 p-3 mt-16 flex justify-center">
            <div className="max-w-screen-xl w-full">
               <div className="md:flex md:flex-row py-4 text-grey-300 dark:text-grey-800">
                  <div className="text-lg pb-6 md:pb-0">
                     &copy; royanger.com 2022
                  </div>
                  <nav className="grow flex flex-row md:justify-end gap-6">
                     {SOCIALS.map(platform => {
                        return (
                           <SocialLink
                              key={platform.type}
                              type={platform.type}
                              label={platform.label}
                              link={platform.link}
                           />
                        )
                     })}
                  </nav>
               </div>
            </div>
         </div>
      </footer>
   )
}
