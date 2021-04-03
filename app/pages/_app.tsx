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

   return (
      <ThemeProvider>
         <>
            <header
               className={`bg-gray-transparent w-full h-20 flex flex-row justify-center p-2 fixed `}
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
            <main className={`w-full flex flex-col justify-center `}>
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
