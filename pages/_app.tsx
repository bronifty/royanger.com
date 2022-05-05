import * as React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../lib/context/themeContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import '../styles/styles.scss'
import '../styles/tailwind.css'

import LogRocket from 'logrocket'
LogRocket.init('kjcuh5/royangercom')

const MyApp = ({ Component, pageProps }: AppProps) => {
   return (
      <ThemeProvider>
         <>
            <div className="min-h-screen  flex flex-col">
               <Header />

               <main id="main" className="px-4 xl:px-0">
                  <Component {...pageProps} />
               </main>
               <Footer />
            </div>
         </>
      </ThemeProvider>
   )
}

export default MyApp
