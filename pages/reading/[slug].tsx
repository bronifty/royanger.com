import * as React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Title from '../../components/Title'
import { allPosts, allPages } from '../../.contentlayer/generated'
import type { Post, Page } from '../../.contentlayer/generated'

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
                     <Title type="h2" className="flex justify-center mt-1">
                        {post.title}
                     </Title>
                  </div>
                  <div className="flex flex-col items-center">
                     <img
                        className="max-w-3xl"
                        alt={`Screenshot of ${post.title} landing page`}
                        src={`/images/portfolio/${post.image}.jpg`}
                        srcSet={`/images/portfolio/${post.image}-tablet.jpg 1000w, /images/portfolio/${post.image}-mobile.jpg 680w,  /images/portfolio/${post.image}.jpg`}
                     />
                  </div>
                  <div className="">
                     <p className="">
                        Posted:{' '}
                        <span className="italic text-blue">
                           {post.date.split('T')[0]}
                        </span>
                     </p>
                     <p className="">
                        By: <span className="italic text-blue">Roy Anger</span>
                     </p>
                  </div>
                  <div className="flex flex-col items-center">
                     <div
                        className="article-content mb-10 flex flex-col items-center "
                        dangerouslySetInnerHTML={{ __html: post.body.html }}
                     />
                  </div>
               </article>
            </div>
         </div>
      </>
   )
}
