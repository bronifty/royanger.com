import type { AppProps } from 'next/app'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <header className="bg-gray-transparent w-full h-20 flex flex-row justify-center p-2 fixed">
            <div className="w-full xl:w-1440 flex flex-row">
               <div className="flex flex-col justify-center">
                  <Link href="/">
                     <a className="text-gray-200">
                        <Image
                           src="/images/svgs/home-lg-alt.svg"
                           alt="Home Page"
                           width={35}
                           height={35}
                        />
                     </a>
                  </Link>
               </div>
               <div className="flex flex-grow items-center justify-end font-code text-gray-200">
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
               </div>
            </div>
         </header>
         <main className="w-full flex flex-row justify-center">
            <Component {...pageProps} />
         </main>
         <footer className="bg-gray-100 w-full h-28 flex flex-row justify-center p-2">
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
      </>
   )
}

export default MyApp
