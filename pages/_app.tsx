import * as React from 'react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { ThemeProvider } from '../lib/context/themeContext'
// import { HomeIcon } from '@heroicons/react/solid'
// import HomeIcon from '../components/icons/HomeIcon'
import { Logo, HomeIcon } from '../components/icons'
import Menu from '../components/Header/Menu'
import TagManager from 'react-gtm-module'
import { GTM } from '../lib/constants/env'
import '../tailwind.css'

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
   // const [scrolledStyles, setScrolledStyles] = React.useState('bg-opacity-0')
   // const handleScroll = position => {
   //    setScrolledStyles(
   //       position === 0
   //          ? 'topOfPage'
   //          : 'scrolled'
   //    )
   // }

   // React.useEffect(() => {
   //    window.onscroll = function () {
   //       handleScroll(window.pageYOffset)
   //    }
   // }, [])

   return (
      <ThemeProvider>
         <>
            <header>
               <div>
                  <div>
                     <Link href="/">
                        <a>
                           <HomeIcon className="w-10" />
                           <Logo className="w-48" />
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
               <div>
                  <div>Copyright &copy; 2021</div>
                  <nav>
                     <Link href="/about">
                        <a>
                           <button>About</button>
                        </a>
                     </Link>
                     <Link href="/blog">
                        <a>
                           <button>Blog</button>
                        </a>
                     </Link>
                     <Link href="/portfolio">
                        <a>
                           <button>Portfolio</button>
                        </a>
                     </Link>
                     <Link href="/contact">
                        <a>
                           <button>Contact</button>
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
