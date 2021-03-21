import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'

// import components
import Wrapper from '../src/components/Wrapper'

const Index = () => {
   return (
      <>
         <Head>
            <title>Roy Anger - Full Stack Developer</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>

         <Wrapper
            styles="h-screen"
            bgImage="/images/backgrounds/gold-glitter.jpg"
            bgColor="dark:bg-blue-500 bg-white"
            bgOpacity="dark:bg-opacity-90 bg-opacity-80"
         >
            <div className="h-full flex flex-col lg:items-center justify-center">
               <h1 className="text-6xl md:text-9xl font-code dark:text-yellow-500 text-blue-500 p-3">
                  Roy Anger
               </h1>
               <h2 className="text-3xl md:text-6xl font-title leading-loose dark:text-red-300 text-red-800 p-3">
                  Full Stack Web Developer
               </h2>
               <h3 className="text-xl md:text-4xl font-sans dark:text-white text-black mt-10 bg-opacity-70 font-bold p-3">
                  Watch for the new site and portfolio - coming soon!
               </h3>
            </div>
         </Wrapper>
      </>
   )
}

export default Index
