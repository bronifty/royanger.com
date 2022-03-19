import * as React from 'react'
import Document, {
   Html,
   Head,
   Main,
   NextScript,
   DocumentContext,
} from 'next/document'
import {
   SITE_NAME,
   SITE_DESCRIPTION,
   SITE_IMAGE,
   SITE_TITLE,
} from '../lib/constants/env'

class MyDocument extends Document {
   static async getInitialProps(ctx: DocumentContext) {
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
               <link rel="icon" href="/images/favicons/favicon.ico" />
               <link
                  rel="apple-touch-icon"
                  href="/images/favicons/apple-touch-icon.png"
               />
               <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/images/favicons/favicon-32x32.png"
               />
               <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/images/favicons/favicon-16x16.png"
               />
               <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
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
