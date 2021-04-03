import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'

// import components
import WrapperHeader from '../components/Wrapper/WrapperHeader'
import WrapperBody from '../components/Wrapper/WrapperBody'
import IndexCard from '../components/IndexCard'

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

         <WrapperHeader
            styles="h-screen"
            //bgImage="/images/backgrounds/gold-glitter.jpg"
            bgSVG="/images/svgs/layered-waves-haikei.svg"
            bgColor="dark:bg-blue bg-gray"
            bgOpacity="dark:bg-opacity-90 bg-opacity-80"
         >
            <div className="h-full flex flex-col lg:items-center justify-center">
               <h1 className="text-6xl md:text-9xl font-code text-secondary text-blue-500 p-3">
                  Roy Anger
               </h1>
               <h2 className="text-3xl md:text-6xl font-title leading-loose text-accent p-3">
                  Full Stack Web Developer
               </h2>
               <h3 className="text-xl md:text-4xl font-sans text-primary mt-10 bg-opacity-70 font-bold p-3">
                  Watch for the new site and portfolio - coming soon!
               </h3>
            </div>
         </WrapperHeader>
         <WrapperBody
            bgSVG="images/svgs/gradient1.svg"
            bgColor="bg-lightblue-100"
         >
            <div className="border-2 border-red-500 text-white grid grid-cols-2 mt-6 mb-10">
               <IndexCard
                  title="Frontend and Libraries"
                  image="/images/logos/reactjs.png"
                  //content={test}
                  content={[
                     "When it comes to Front End Development, I love React. I've been learning and switching to it over the last 8 months. It has been nothing short of a breath of fresh air coming from WordPress and PHP, and I definitely love the change of pace.",
                     'This is a test.',
                  ]}
               />
               <IndexCard
                  title="APIs And Backend"
                  image="/images/logos/reactjs.png"
                  content={['Test', 'Help']}
               />
               <IndexCard
                  title="Databases"
                  image="/images/logos/reactjs.png"
                  content={['Test', 'Help']}
               />
               <IndexCard
                  title="Tools"
                  image="/images/logos/reactjs.png"
                  content={['Test', 'Help']}
               />
            </div>
         </WrapperBody>
      </>
   )
}

export default Index
