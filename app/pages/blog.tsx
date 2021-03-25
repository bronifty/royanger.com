import * as React from 'react'
import sanityClient from '../lib/sanity/client'
import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

// import components
import Wrapper from '../components/Wrapper'
import BlogIndexHeader from '../components/BlogIndex/BlogIndexHeader'
import BlogCard from '../components/BlogIndex/BlogCard'

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
   //const [posts, setPosts] = React.useState(null)

   // React.useEffect(() => {
   //    sanityClient
   //       .fetch(
   //          `*[_type == "post"]{
   //             _id,
   //             title,
   //             byline,
   //             "name": author->name,
   //             "categories": categories[]->{title,_id},
   //             "slug": slug.current,
   //             "imageUrl": mainImage.asset->url,
   //             "imageAlt": mainImage.alt
   //          }`
   //       )
   //       .then(data => setPosts(data))
   //       .catch(console.error)
   // }, [])

   return (
      <>
         <Head>
            <title>Roy Anger - Articles</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <Wrapper bgColor="bg-primary" bgOpacity="bg-opacity-90">
            <BlogIndexHeader />
            <div className="grid grid-cols-2 gap-6">
               {/* {console.log(posts)} */}
               {posts &&
                  posts.map(
                     ({
                        _id,
                        title,
                        name,
                        byline,
                        slug,
                        imageUrl,
                        imageAlt,
                        categories,
                     }) => {
                        return (
                           <BlogCard
                              key={_id}
                              title={title}
                              byline={byline}
                              slug={slug}
                              image={imageUrl}
                              alt={imageAlt}
                              categories={categories}
                           />
                        )
                     }
                  )}
            </div>
         </Wrapper>
      </>
   )
}

interface Props {
   _id: string
   title: string
   byline: string
   name: string
   categories: any
   slug: string
   imageUrl: string
   imageAlt: string
}

export const getStaticProps = async () => {
   const posts = await sanityClient.fetch(
      `*[_type == "post"]{
               _id,
               title,
               byline,
               "name": author->name,
               "categories": categories[]->{title,_id},
               "slug": slug.current,
               "imageUrl": mainImage.asset->url,
               "imageAlt": mainImage.alt
            }`
   )

   return { props: { posts } }
}

export default Blog
