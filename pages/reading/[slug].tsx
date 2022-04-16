import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import Title from '../../components/Title'
import { allPosts, allPages } from '../../.contentlayer/generated'
import type { Post, Page } from '../../.contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../../components/MDXComponents'
import { displayDate } from '../../lib/helpers/displayDate'

export async function getStaticPaths() {
   return {
      paths: allPosts
         .map(p => {
            if (p.slug) return { params: { slug: p.slug } }
         })
         .filter(p => {
            return p !== undefined
         }),
      fallback: false,
   }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const post = allPosts.find(post => post.slug === params?.slug)

   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/portfolio'
   )

   return { props: { page, post } }
}

export default function Article({ post, page }: { post: Post; page: Page }) {
   const Component = useMDXComponent(post.body.code)

   return (
      <>
         <Head>
            <title>{`${page.pageTitle} > ${post.title}`}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta
               name="keywords"
               content={`${page.pageTitle} - ${post.title}`}
            />
         </Head>

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-5xl px-4 xl:p-0">
               <article>
                  <div className="flex flex-col justify-center">
                     <Title type="superheading">a few thoughts about</Title>
                     <Title
                        type="h2"
                        className="flex justify-center mt-0 pt-0 font-title"
                     >
                        {post.title}
                     </Title>
                  </div>
                  {/* <div className="flex flex-col items-center mt-4">
                     <div className="w-full relative h-full">
                        <Image
                           className="max-w-3xl"
                           width={post.imageWidth}
                           height={post.imageHeight}
                           alt={`Screenshot of ${post.title} landing page`}
                           src={`/images/portfolio/${post.image}.jpg`}
                        />
                     </div>
                  </div>
                  <div className="flex flex-row mt-4 mb-6">
                     <div className="grow flex flex-row">
                        <div className="font-code">Roy Anger</div>
                        <div className="mx-2 text">&bull;</div>
                        <div className="font-code">
                           {displayDate(post.date)}
                        </div>
                     </div>
                     <div className="grow flex flex-row justify-end">
                        <div className="font-code">{post.readingTime.text}</div>
                        <div className="mx-2 text">&bull;</div>
                        <div className="font-code">{post.wordCount} words</div>
                     </div>
                  </div>
                  <div className="flex flex-col max-w-4xl mdx-content mt-12">
                     <Component components={{ ...components }} as any />
                  </div> */}
                  <div className="font-code italic">
                     Last edited: {displayDate(post.lastEdited)}
                  </div>
               </article>
            </div>
         </div>
      </>
   )
}
