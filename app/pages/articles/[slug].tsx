import * as React from 'react'
import client from '../../src/client'
import Head from 'next/head'
import BlockContent from '@sanity/block-content-to-react'
// import BaseBlockContent from '../../src/components/BaseBlockContent'
import Wrapper from '../../src/components/Wrapper'
import BlogArticleHeader from '../../src/components/BlogArticleHeader'
import BlogArticleFooter from '../../src/components/BlogArticleFooter'

const Post = ({
   title,
   byline,
   publishedAt,
   name,
   imageUrl,
   categories,
   body,
}) => {
   return (
      <>
         <Head>
            <title>Roy Anger - {title}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <Wrapper
            bgColor="dark:bg-blue-600 bg-grey-100"
            bgOpacity="bg-opacity-100"
         >
            <BlogArticleHeader
               title={title}
               byline={byline}
               author={name}
               publishedAt={publishedAt}
            />

            <img src={imageUrl} />

            <article className="w-full flex flex-row justify-center ">
               {/* <BaseBlockContent
                  blocks={body}
                  imageOptions={{ w: 320, h: 240, fit: 'max' }}
                  {...client.config()}
                  className="text-primary text-xl leading-relaxed w-2/3 mt-5 mb-7"
                  // serializers={{ marks: { codeSerializer } }}
               /> */}
            </article>
            <BlogArticleFooter
               author={name}
               publishedAt={publishedAt}
               categories={categories}
            />
         </Wrapper>
      </>
   )
}

const query = `*[_type == "post" && slug.current == $slug][0]{
   _id,
   title,
   byline,
   publishedAt,
   "name": author->name,
   "categories": categories[]->title,
   "slug": slug.current,
   "imageUrl": mainImage.asset->url,
   body
}`

Post.getInitialProps = async function (context) {
   // default slug to empty string to prevent undefined error
   const { slug = '' } = context.query
   return await client.fetch(query, { slug })
}

export default Post
