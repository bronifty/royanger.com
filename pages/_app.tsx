import * as React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../lib/context/themeContext'
import Header from '../components/Header/Header'
import TagManager from 'react-gtm-module'
import { GTM } from '../lib/constants/env'
import Toggle from '../components/Header/Toggle'
import '../styles/styles.scss'
import '../styles/tailwind.css'

import LogRocket from 'logrocket'
LogRocket.init('kjcuh5/royangercom')

const tagManagerArgs = { gtmId: 'GTM-K427PD5' }

console.log(tagManagerArgs)

const MyApp = ({ Component, pageProps }: AppProps) => {
   return (
      <ThemeProvider>
         <>
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
            <div className="border border-1 border-blue-100 min-h-screen  flex flex-col">
               <Header />
               <main id="main">
                  <Component {...pageProps} />
               </main>
            </div>
         </>
      </ThemeProvider>
   )
}

export default MyApp
