import * as React from 'react'
import Document, {
   Html,
   Head,
   Main,
   NextScript,
   DocumentContext,
} from 'next/document'
import { GTM } from '../lib/constants/env'

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
               <link
                  rel="apple-touch-icon"
                  sizes="180x180"
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
               <link
                  rel="manifest"
                  href="%PUBLIC_URL%/images/favicons/site.webmanifest"
               />
               <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
               <link
                  rel="preload"
                  href="/fonts/archivo-black-v16-latin-regular.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
               />
               <link
                  rel="preload"
                  href="/fonts/hind-v15-latin-regular.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
               />
               <link
                  rel="preload"
                  href="/fonts/hind-v15-latin-500.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
               />
               <link
                  rel="preload"
                  href="/fonts/ubuntu-mono-v14-latin-regular.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
               />
            </Head>
            <body className="dark:bg-black dark:text-white bg-white text-black overflow-x-hidden">
               <noscript
                  dangerouslySetInnerHTML={{
                     __html: `
                  <iframe
                     src={https://www.googletagmanager.com/ns.html?id=${GTM}}
                     height="0"
                     width="0"
                     style={{ display: 'none', visibility: 'hidden' }}
                  />`,
                  }}
               />
               <Main />
               <div id="modal-root"></div>
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument
