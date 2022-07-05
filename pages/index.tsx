import * as React from 'react'
import Link from 'next/link'
import Title from '../components/Title'
import { allPages, allPortfolios, allPosts } from '../.contentlayer/generated'
import type { Page, Portfolio, Post } from '../.contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'
import HTMLHead from '../components/HTMLHead'
import Image from 'next/image'
import ItemContainer from '../components/home/ListContainer'

export async function getStaticProps() {
   // load titles and meta info from contentlayer
   const page = allPages.find(post => post._raw.flattenedPath === 'pages/home')
   const portfolio = allPortfolios
      .sort((a, b) => {
         return (a.index as number) - (b.index as number)
      })
      .slice(0, 4)
   const filteredPosts = allPosts
      .map(p => {
         if (p.postType === 'article') return p
      })
      .filter(p => {
         return p !== undefined
      })

   if (filteredPosts.length < 1) {
      throw new Error('There are no posts')
   }

   let posts

   if (filteredPosts.length === 1) {
      posts = filteredPosts
   } else {
      posts = filteredPosts
         .sort((a, b) => {
            return new Date(a!.date).getTime() - new Date(b!.date).getTime()
         })
         .reverse()
         .slice(0, 4)
   }
   return {
      props: {
         page,
         portfolio,
         posts,
      },
   }
}

function Index({
   page,
   portfolio,
   posts,
}: {
   page: Page
   portfolio: Portfolio
   posts: Post
}) {
   const Component = useMDXComponent(page.body.code)

   const meta = {
      title: page.pageTitle,
      keywords: page.pageKeywords,
   }

   return (
      <>
         <HTMLHead pageMeta={meta} />

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl">
               <article>
                  <Title type="h1">{page.title}</Title>
                  <Title type="h2">{page.subTitle ? page.subTitle : ''}</Title>
                  <div className="flex flex-col max-w-4xl mdx-content mt-12">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex justify-center md:block">
                           <Image
                              alt="Roy Anger"
                              src="/images/static/headshot.png"
                              width={409}
                              height={402}
                           />
                        </div>
                        <div className="col-span-2">
                           <Component components={{ ...components }} as any />
                        </div>
                     </div>
                  </div>
               </article>
               <section>
                  <ItemContainer items={portfolio} slug="/portfolio" />
               </section>
               <section>
                  <ItemContainer
                     items={posts}
                     slug="/reading/article"
                     name="Read post"
                  />
               </section>
            </div>
         </div>
      </>
   )
}

export default Index
