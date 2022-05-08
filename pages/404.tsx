import Link from 'next/link'
import Title from '../components/Title'
import {
   EnvelopeIcon,
   PDFIcon,
   SpotifyIcon,
   ReadingIcon,
   PortfolioIcon,
   HomeIcon,
} from '../components/icons'

const icons = {
   home: HomeIcon,
   portfolio: PortfolioIcon,
   skills: PDFIcon,
   reading: ReadingIcon,
   spotify: SpotifyIcon,
   contact: EnvelopeIcon,
}

const links = [
   {
      link: '/',
      label: 'Home',
      icon: 'home',
   },
   {
      link: '/portfolio',
      label: 'Portfolio',
      icon: 'portfolio',
   },
   {
      link: '/skills',
      label: 'Skills & Resume',
      icon: 'skills',
   },
   {
      link: '/reading',
      label: 'Reading Material',
      icon: 'reading',
   },
   {
      link: '/spotify',
      label: 'Spotify',
      icon: 'spotify',
   },
   {
      link: '/contact',
      label: 'Contact',
      icon: 'contact',
   },
]

const fourOhFour = () => {
   return (
      <>
         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl">
               <Title type="h1">404</Title>
               <p className="mt-10 text-xl max-w-4xl">
                  It looks like this page doesn't exist. Perhaps the link is
                  old, or there is an error. Please take a look at one of the
                  following sections to try and find what you're looking:
               </p>
               <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3">
                  {links.map((item, index) => {
                     const Icon = icons[item.icon]
                     return (
                        <Link key={index} href={item.link} passHref>
                           <a>
                              <div className="px-2 py-4">
                                 <div className="flex flex-row p-4 rounded transform hover:scale-[1.02] transition-all bg-gradient-to-t bg-grey-700 from-grey-800 via-grey-600 to-grey-800 dark:bg-grey-300 dark:from-grey-400 dark:via-grey-200 dark:to-grey-400 hover:bg-blue-800 hover:from-blue-800 hover:via-blue-600 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:via-blue-200 dark:hover:to-blue-400 text-grey-100  dark:text-grey-800 dark:hover:bg-grey-100">
                                    <div className="w-24 flex justify-center items-center">
                                       <Icon className="h-10 w-auto" />
                                    </div>
                                    <div className="w-full flex items-center text-2xl">
                                       {item.label}
                                    </div>
                                 </div>
                              </div>
                           </a>
                        </Link>
                     )
                  })}
               </div>
            </div>
         </div>
      </>
   )
}

export default fourOhFour
