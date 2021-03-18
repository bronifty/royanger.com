import * as React from 'react'
import client from '../../src/client'
import Head from 'next/head'
import BlockContent from '@sanity/block-content-to-react'
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
         <Wrapper bgColor="bg-gray-900" bgOpacity={100}>
            <BlogArticleHeader
               title={title}
               byline={byline}
               author={name}
               publishedAt={publishedAt}
            />

            <img src={imageUrl} />
            <p>{categories.map(cat => cat)}</p>
            <BlockContent
               blocks={body}
               imageOptions={{ w: 320, h: 240, fit: 'max' }}
               {...client.config()}
               className="text-gray-100 text-xl leading-relaxed py-5"
            />
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
