import * as React from 'react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { ThemeProvider } from '../lib/context/themeContext'
import { Logo } from '../components/icons'
import Menu from '../components/Header/Menu'
import TagManager from 'react-gtm-module'
import { GTM } from '../lib/constants/env'
import Toggle from '../components/Header/Toggle'
import '../styles/fonts.css'
import '../styles/tailwind.css'

import LogRocket from 'logrocket'
LogRocket.init('kjcuh5/royangercom')

const tagManagerArgs = { gtmId: 'GTM-K427PD5' }

console.log(tagManagerArgs)

const MyApp = ({ Component, pageProps }: AppProps) => {
   return (
      <ThemeProvider>
         <>
            <header className="flex justify-center my-6 px-4 dark:bg-black dark:color-white">
               <div className="max-w-screen-xl w-full flex flex-row">
                  <div className="pr-4">
                     <Link href="/">
                        <a className="font-body text-4xl flex flex-row items-center h-full">
                           <Logo className="w-10" />
                        </a>
                     </Link>
                  </div>
                  <Menu />
                  <div>
                     <form>
                        <Toggle />
                     </form>
                  </div>
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
