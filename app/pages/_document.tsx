import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
   SITE_NAME,
   SITE_DESCRIPTION,
   SITE_IMAGE,
   SITE_TITLE,
} from '../src/constants/env'

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
   }
   render() {
      return (
         <Html lang="en">
            <Head>
               <meta charSet="utf-8" />

               <meta name="theme-color" content="#000000" />
               <meta property="og_type" content="website" />
               <meta property="og:name" content={SITE_NAME} />
               <meta property="og:title" content={SITE_TITLE} />
               <meta property="og:description" content={SITE_DESCRIPTION} />
               {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
               <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
               <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link
                  href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500&family=Nunito+Sans:ital,wght@0,400;0,700;1,400&family=Ubuntu:wght@700&display=swap"
                  rel="stylesheet"
               />
               <link rel="stylesheet" href="/assets/prism.css" />
               <script src="/assets/prism.js" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument
