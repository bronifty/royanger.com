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
         <div className="bg-black-700 dark:bg-grey-200 text-white dark:text-grey-800 p-3 mt-16 flex justify-center">
            <div className="max-w-screen-xl w-full">
               <div className="md:flex md:flex-row py-4 text-grey-300 dark:text-grey-800">
                  <div className="text-lg pb-6 md:pb-0">
                     &copy; royanger.com 2022
                  </div>
                  <nav className="grow flex flex-row md:justify-end gap-6">
                     <Link href="https://github.com/royanger" passHref>
                        <a
                           target="_blank"
                           className="hover:text-github"
                           aria-label="GitHub Profile"
                        >
                           <GitHubIcon className="h-8" />
                        </a>
                     </Link>
                     <Link
                        href="https://www.linkedin.com/in/royanger/"
                        passHref
                     >
                        <a
                           target="_blank"
                           className="hover:text-linkedin"
                           aria-label="LinkedIn Profile"
                        >
                           <LinkedInIcon className="h-8" />
                        </a>
                     </Link>
                     <Link href="https://twitter.com/royanger" passHref>
                        <a
                           target="_blank"
                           className="hover:text-twitter"
                           aria-label="Twitter Profile"
                        >
                           <TwitterIcon className="h-8" />
                        </a>
                     </Link>
                     <Link href="https://www.instagram.com/royanger/" passHref>
                        <a
                           target="_blank"
                           className="hover:text-instagram"
                           aria-label="Instagram Profile"
                        >
                           <InstagramIcon className="h-8" />
                        </a>
                     </Link>
                     <Link href="/contact">
                        <a
                           className="hover:text-blue"
                           aria-label="Contact Roy Anger"
                        >
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
