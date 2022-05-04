import * as React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../lib/context/themeContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import TagMananger from 'react-gtm-module'
import { GTM } from '../lib/constants/env'
import '../styles/styles.scss'
import '../styles/tailwind.css'

import LogRocket from 'logrocket'
LogRocket.init('kjcuh5/royangercom')

const tagManagerArgs = {
   gtmId: GTM,
}

const MyApp = ({ Component, pageProps }: AppProps) => {
   React.useEffect(() => {
      TagMananger.initialize(tagManagerArgs)
   })
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
