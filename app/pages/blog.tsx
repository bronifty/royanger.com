import * as React from 'react'
import sanityClient from '../src/client'
import Head from 'next/head'

// import components
import Wrapper from '../src/components/Wrapper'
import BlogHeader from '../src/components/BlogHeader'
import BlogCard from '../src/components/BlogCard'

const Blog = () => {
   const [posts, setPosts] = React.useState(null)

   React.useEffect(() => {
      sanityClient
         .fetch(
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
         .then(data => setPosts(data))
         .catch(console.error)
   }, [])
   console.log(posts)

   return (
      <>
         <Head>
            <title>Roy Anger - Articles</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <Wrapper bgColor="bg-gray-900" bgOpacity={100}>
            <BlogHeader />
            <div className="flex flex-row">
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
                              author={name}
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

export default Blog
