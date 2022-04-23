import * as React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Title from '../../components/Title'
import { allPosts, allPages } from '../../.contentlayer/generated'
import type { Post, Page } from '../../.contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../../components/MDXComponents'

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
      post => post._raw.flattenedPath === 'pages/reading-material'
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
            <div className="w-full max-w-5xl ">
               <article>
                  <div className="flex flex-col justify-center">
                     <Title type="superheading">a quick code snippet</Title>
                     <Title
                        type="h2"
                        className="flex justify-center mt-0 pt-0 font-title"
                     >
                        {post.title}
                     </Title>
                  </div>

                  <div className="flex flex-col max-w-4xl mdx-content mt-12">
                     <Component components={{ ...components }} as any />
                  </div>
               </article>
            </div>
         </div>
      </>
   )
}
