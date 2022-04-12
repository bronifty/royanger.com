import Link from 'next/link'
import {
   LinkedInIcon,
   TwitterIcon,
   GitHubIcon,
   InstagramIcon,
   EnvelopeIcon,
} from './icons'

export default function Footer() {
   return (
      <footer className="flex flex-col grow justify-end">
         <div className="bg-black-700 text-white p-3 mt-16 flex justify-center">
            <div className="max-w-screen-xl w-full">
               <div className="md:flex md:flex-row py-4 text-grey-300">
                  <div className="text-lg pb-6 md:pb-0">
                     &copy; royanger.com 2022
                  </div>
                  <nav className="grow flex flex-row md:justify-end gap-6">
                     <Link href="https://github.com/royanger">
                        <a target="_blank">
                           <GitHubIcon className="h-8" />
                        </a>
                     </Link>
                     <Link href="https://www.linkedin.com/in/royanger/">
                        <a target="_blank">
                           <LinkedInIcon className="h-8" />
                        </a>
                     </Link>
                     <Link href="https://twitter.com/royanger">
                        <a target="_blank">
                           <TwitterIcon className="h-8" />
                        </a>
                     </Link>
                     <Link href="https://www.instagram.com/royanger/">
                        <a target="_blank">
                           <InstagramIcon className="h-8" />
                        </a>
                     </Link>
                     <Link href="/contact">
                        <a>
                           <EnvelopeIcon className="h-8" />
                        </a>
                     </Link>
                  </nav>
               </div>
            </div>
         </div>
      </footer>
   )
}
