import * as React from 'react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { ThemeProvider } from '../lib/context/themeContext'
import { HomeIcon } from '@heroicons/react/solid'
import Menu from '../components/Header/Menu'
import TagManager from 'react-gtm-module'
import { GTM } from '../lib/constants/env'
import '../tailwind.css'
import '../styles.scss'

import LogRocket from 'logrocket'
LogRocket.init('kjcuh5/royangercom')

const tagManagerArgs = { gtmId: 'GTM-K427PD5' }

console.log(tagManagerArgs)

const MyApp = ({ Component, pageProps }: AppProps) => {
   // React.useEffect(() => {
   //    TagManager.initialize(tagManagerArgs)
   // }, [])

   // set bg-opacity on header depending on whether user has scrolled or not
   // gives a light BG colour to the header once user scrolls, to header always
   // pops out from the page
   const [scrolledStyles, setScrolledStyles] = React.useState('bg-opacity-0')
   const handleScroll = position => {
      setScrolledStyles(
         position === 0
            ? 'bg-opacity-0 dark:bg-opacity-0'
            : 'bg-opacity-90 dark:bg-opacity-70'
      )
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
               className={`bg-white-100 dark:bg-blue-100 ${scrolledStyles}`}
            >
               <div className="container">
                  <div className="home">
                     <Link href="/">
                        <a className="text">
                           <HomeIcon />
                        </a>
                     </Link>
                  </div>
                  <Menu />
               </div>
            </header>
            <main id="main">
               <Component {...pageProps} />
            </main>
            <footer>
               <div className="container">
                  <div className="copyright">Copyright &copy; 2021</div>
                  <nav>
                     <Link href="/about">
                        <a>
                           <button className="text-large">About</button>
                        </a>
                     </Link>
                     <Link href="/blog">
                        <a>
                           <button className="text-large">Blog</button>
                        </a>
                     </Link>
                     <Link href="/portfolio">
                        <a>
                           <button className="text-large">Portfolio</button>
                        </a>
                     </Link>
                     <Link href="/hire">
                        <a>
                           <button className="text-large">Hire</button>
                        </a>
                     </Link>
                  </nav>
               </div>
            </footer>
         </>
      </ThemeProvider>
   )
}

export default MyApp
