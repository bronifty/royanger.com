import * as React from 'react'
import sanityClient from '../../lib/sanity/client'
import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import BlockContent from '@sanity/block-content-to-react'
// import BaseBlockContent from '../../src/components/BlogArticle/BaseBlockContent'
import Wrapper from '../../components/Wrapper'
import BlogArticleHeader from '../../components/BlogArticle/BlogArticleHeader'
import BlogArticleFooter from '../../components/BlogArticle/BlogArticleFooter'

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
   const {
      title,
      byline,
      publishedAt,
      name,
      imageUrl,
      categories,
      body,
   } = post[0]
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

export const getStaticPaths = async () => {
   //const slugs = ['test-post-number-2', 'another-post-for-testing']

   const slugs = await sanityClient.fetch(`*[_type == "post"]{
      "slug": slug.current
   }`)

   const paths = slugs.map(slug => ({
      params: { slug: slug.slug },
   }))

   return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
   const post = await sanityClient.fetch(`*[_type == "post" && '${params.slug}' == slug.current]{
      _id,
      title,
      byline,
      publishedAt,
      "name": author->name,
      "categories": categories[]->title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      body
   }`)
   return { props: { post } }
}

export default Post
