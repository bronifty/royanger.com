import * as React from 'react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { ThemeProvider } from '../src/context/themeContext'
import Toggle from '../src/components/Toggle'
import TagManager from 'react-gtm-module'
import { GTM } from '../src/constants/env'
import '../styles/globals.css'

import HomeIcon from '../public/images/svgs/home-lg-alt.svg'

const tagManagerArgs = { gtmId: 'GTM-K427PD5' }

console.log(tagManagerArgs)

const MyApp = ({ Component, pageProps }: AppProps) => {
   //const [theme, setTheme] = React.useState('dark')

   React.useEffect(() => {
      TagManager.initialize(tagManagerArgs)
   }, [])

   // const onChange = () => {
   //    if (theme === 'dark') {
   //       setTheme('light')
   //    } else {
   //       setTheme('dark')
   //    }
   // }
   const theme = 'sadfsdaf'

   return (
      <ThemeProvider>
         <header
            className={`bg-gray-transparent w-full h-20 flex flex-row justify-center p-2 fixed ${theme}`}
         >
            <div className="w-full xl:w-1440 flex flex-row">
               <div className="flex flex-col justify-center">
                  <Link href="/">
                     <a className="dark:text-white text-black">
                        <HomeIcon style={{ width: '35px', height: '35px' }} />
                     </a>
                  </Link>
               </div>
               <div className="flex flex-grow items-center justify-end font-code dark:text-white text-black">
                  <Link href="/about">
                     <a>
                        <button className="p-3  text-xl">About</button>
                     </a>
                  </Link>
                  <Link href="/blog">
                     <a>
                        <button className="p-3 text-xl">Blog</button>
                     </a>
                  </Link>
                  <Link href="/portfolio">
                     <a>
                        <button className="p-3 text-xl">Portfolio</button>
                     </a>
                  </Link>
                  <Link href="/hire">
                     <a>
                        <button className="p-3 text-xl">Hire</button>
                     </a>
                  </Link>
                  <form>
                     <Toggle />
                     {/* <label id="theme">Set Theme</label>
                     <input
                        type="checkbox"
                        id="theme"
                        value={theme}
                        onChange={onChange}
                     /> */}
                  </form>
               </div>
            </div>
         </header>
         <main className={`w-full flex flex-row justify-center ${theme}`}>
            <Component {...pageProps} />
         </main>
         <footer
            className={`bg-gray-100 w-full h-28 flex flex-row justify-center p-2 ${theme}`}
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
      </ThemeProvider>
   )
}

export default MyApp
