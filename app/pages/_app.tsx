import * as React from 'react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { ThemeProvider } from '../lib/context/themeContext'
import { HomeIcon } from '@heroicons/react/solid'
import Menu from '../components/Header/Menu'
import TagManager from 'react-gtm-module'
import { GTM } from '../lib/constants/env'
import '../styles/globals.css'

import LogRocket from 'logrocket'
LogRocket.init('kjcuh5/royangercom')

// For now, replaced this with Heroicon version.
//import HomeIcon from '../public/images/svgs/home-lg-alt.svg'

const tagManagerArgs = { gtmId: 'GTM-K427PD5' }

console.log(tagManagerArgs)

const MyApp = ({ Component, pageProps }: AppProps) => {
   // React.useEffect(() => {
   //    TagManager.initialize(tagManagerArgs)
   // }, [])

   // set bg-opacity on header depending on whether user has scrolled or not
   // gives a light BG colour to the header once user scrolls, to header always
   // pops out from the page
   const [scrolledClass, setScrolledClass] = React.useState('bg-opacity-0')
   const handleScroll = position => {
      setScrolledClass(position === 0 ? 'bg-opacity-0' : 'bg-opacity-40')
   }

   React.useEffect(() => {
      window.onscroll = function () {
         handleScroll(window.pageYOffset)
      }
   }, [])

   return (
      <ThemeProvider>
         <>
            <header
               className={`bg-gray-transparent w-full h-20 flex flex-row justify-center p-2 fixed bg-blue-100 ${scrolledClass}`}
            >
               <div className="w-full xl:w-1440 flex flex-row">
                  <div className="flex flex-col justify-center">
                     <Link href="/">
                        <a className="text-primary">
                           <HomeIcon className="h-12 w-12" />
                        </a>
                     </Link>
                  </div>
                  <Menu />
               </div>
            </header>
            <main id="main" className={`w-full flex flex-col justify-center `}>
               <Component {...pageProps} />
            </main>
            <footer
               className={`bg-gray-100 w-full h-28 flex flex-row justify-center p-2`}
            >
               <div className="w-full xl:w-1440 flex flex-row">
                  <div className="flex items-center">Copyright &copy; 2021</div>
                  <div className=" flex flex-grow items-center justify-end">
                     <Link href="/about">
                        <a>
                           <button className="p-3 text-lg">About</button>
                        </a>
                     </Link>
                     <Link href="/blog">
                        <a>
                           <button className="p-3 text-lg">Blog</button>
                        </a>
                     </Link>
                     <Link href="/portfolio">
                        <a>
                           <button className="p-3 text-lg">Portfolio</button>
                        </a>
                     </Link>
                     <Link href="/hire">
                        <a>
                           <button className="p-3 text-lg">Hire</button>
                        </a>
                     </Link>
                  </div>
               </div>
            </footer>
         </>
      </ThemeProvider>
   )
}

export default MyApp
