import * as React from 'react'
import Head from 'next/head'
import sanityClient from '../lib/sanity/client'

// import componenets
import WrapperHeader from '../components/Wrapper/WrapperHeader'
import BaseBlockContent from '../components/BaseBlockContent'
import AboutSection from '../components/About/AboutSection'

const About = ({ posts }) => {
   return (
      <>
         <Head>
            <title>Roy Anger - About Roy</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <WrapperHeader bgColor="bg-blue-500">
            <article className="py-3 px-5 text-white mt-5 mb-10">
               <h1 className="text-white font-title text-5xl mb-24">
                  About Me
               </h1>
               {posts.map(post => {
                  return <AboutSection key={post._id} content={post} />
               })}
            </article>
         </WrapperHeader>
      </>
   )
}

export const getStaticProps = async () => {
   const posts = await sanityClient.fetch(`*[_type == "about"] | order(order){
      _id,
      "title": section,
      "images": images[]{ _key, alt, "src": asset->url},
      description
   }`)

   return { props: { posts } }
}

export default About
