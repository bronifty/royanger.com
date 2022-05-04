import * as React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../lib/context/themeContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { GTM, pageview } from '../lib/constants/env'
import '../styles/styles.scss'
import '../styles/tailwind.css'
import Script from 'next/script'
import { useRouter } from 'next/router'

import LogRocket from 'logrocket'
LogRocket.init('kjcuh5/royangercom')

const MyApp = ({ Component, pageProps }: AppProps) => {
   const router = useRouter()
   React.useEffect(() => {
      router.events.on('routeChangeComplete', pageview)
      return () => {
         router.events.off('routeChangeComplete', pageview)
      }
   }, [router.events])

   return (
      <ThemeProvider>
         <>
            <Script
               id="gtm-base"
               strategy="afterInteractive"
               dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM}');`,
               }}
            />
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
