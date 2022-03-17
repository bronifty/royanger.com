import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import sanityClient from '../lib/sanity/client'

// import components
import WrapperHeader from '../components/Wrapper/WrapperHeader'
import WrapperBody from '../components/Wrapper/WrapperBody'
import IndexCard from '../components/IndexCard'
import Title from '../components/Title'

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

         <div>
            <div>
               <Title type="h1">Roy Anger</Title>
               <Title type="h2"># full stack web developer</Title>
               <Title type="h3">
                  Watch for the new site and portfolio - coming soon!
               </Title>
            </div>
         </div>
         <WrapperBody>
            <h2># languages and skills</h2>
            {/*
               Over the last six months I have been focusing on learning React,
               Node and some of the other technologies involved in the wide
               world of full stack development. I come from a WordPress/PHP
               background before that, but React and Node are much more fun and
               interesting to work with. I've been loving the learning curve and
               the switch to Javascript, React and the related technologies. */}

            <div>
               {posts.map(post => {
                  return <IndexCard key={post._id} post={post} />
               })}
            </div>
         </WrapperBody>
      </>
   )
}

export const getStaticProps = async () => {
   const posts =
      await sanityClient.fetch(`*[_type == "indexpage" && type == "techstacks"] | order(order){
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
