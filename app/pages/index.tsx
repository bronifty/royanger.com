import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import sanityClient from '../lib/sanity/client'

// import components
import WrapperHeader from '../components/Wrapper/WrapperHeader'
import WrapperBody from '../components/Wrapper/WrapperBody'
import IndexCard from '../components/IndexCard'

const Index = ({ posts }) => {
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
               <h1 className="text-6xl md:text-9xl font-code text-secondary p-3">
                  Roy Anger
               </h1>
               <h2 className="text-3xl md:text-6xl font-title leading-loose text-accent p-3">
                  # full stack web developer
               </h2>
               <h3 className="text-xl md:text-4xl font-sans text-primary mt-10 bg-opacity-70 font-bold p-3">
                  Watch for the new site and portfolio - coming soon!
               </h3>
            </div>
         </WrapperHeader>
         <WrapperBody
            bgGradient={{
               direction: 'bg-gradient-to-b',
               from: 'from-blue',
               via: 'via-blue-300',
               to: 'to-blue-100',
            }}
         >
            <h2 className="text-6xl text-secondary font-title mt-10">
               # languages and skills
            </h2>
            {/*
               Over the last six months I have been focusing on learning React,
               Node and some of the other technologies involved in the wide
               world of full stack development. I come from a WordPress/PHP
               background before that, but React and Node are much more fun and
               interesting to work with. I've been loving the learning curve and
               the switch to Javascript, React and the related technologies. */}

            <div className="text-white grid grid-cols-2 mt-6 mb-10">
               {posts.map(post => {
                  return <IndexCard key={post._id} post={post} />
               })}
            </div>
         </WrapperBody>
      </>
   )
}

export const getStaticProps = async () => {
   const posts = await sanityClient.fetch(`*[_type == "indexpage" && type == "techstacks"] | order(order){
      _id,
      section,
      description,
      "featuredImage": featuredImage.asset->url,
      "featuredImageAlt": featuredImage.alt,
      "images": images[]{ _key, alt, "src": asset->url }
    }`)

   return { props: { posts } }
}

export default Index
