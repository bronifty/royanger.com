import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
// import sanityClient from '../lib/sanity/client'

// import components
import Title from '../components/Title'

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

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl">
               <article>
                  <Title type="h1">Roy Anger</Title>
                  <Title type="h2"># full stack web developer</Title>
                  <Title type="h3">
                     Watch for the new site and portfolio - coming soon!
                  </Title>
               </article>
               <article>
                  <h2># languages and skills</h2>
                  <p className="text-4xl font-code">
                     Almost before we knew it, we had left the gro
                  </p>
               </article>
            </div>

            <div></div>
         </div>

         {/*
               Over the last six months I have been focusing on learning React,
               Node and some of the other technologies involved in the wide
               world of full stack development. I come from a WordPress/PHP
               background before that, but React and Node are much more fun and
               interesting to work with. I've been loving the learning curve and
               the switch to Javascript, React and the related technologies. */}

         <div>
            {/* {posts.map(post => {
                  return <IndexCard key={post._id} post={post} />
               })} */}
         </div>
      </>
   )
}

// export const getStaticProps = async () => {
//    const posts =
//       await sanityClient.fetch(`*[_type == "indexpage" && type == "techstacks"] | order(order){
//       _id,
//       section,
//       description,
//       "featuredImage": featuredImage.asset->url,
//       "featuredImageAlt": featuredImage.alt,
//       "images": images[]{ _key, alt, "src": asset->url }
//     }`)

//    return { props: { posts } }
// }

export default Index
