import * as React from 'react'
import Link from 'next/link'
import Title from '../components/Title'
import { allPages, allPortfolios, allPosts } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'
import { RightArrowLongIcon } from '../components/icons'
import ListItem from '../components/home/ListItem'
import HTMLHead from '../components/HTMLHead'
import Image from 'next/image'

export async function getStaticProps() {
   // load titles and meta info from contentlayer
   const page = allPages.find(post => post._raw.flattenedPath === 'pages/home')
   const portfolio = allPortfolios
      .sort((a, b) => {
         return (a.index as number) - (b.index as number)
      })
      .slice(0, 4)
   const posts = allPosts
      .map(p => {
         if (p.postType === 'article') return p
      })
      .filter(p => {
         return p !== undefined
      })
      .sort((a, b) => {
         return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      .reverse()
      .slice(0, 4)
   return {
      props: {
         page,
         portfolio,
         posts,
      },
   }
}

const Index = ({
   page,
   portfolio,
   posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
                  <Title type="h2">{page.subTitle}</Title>
                  <div className="flex flex-col max-w-4xl mdx-content mt-12">
                     <div className="grid grid-cols-3 gap-12">
                        <div>
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
                  <div className="mt-12">
                     <Title type="h2">Featured Projects</Title>
                     <ul>
                        {portfolio.map((p, index) => {
                           return (
                              <ListItem
                                 key={index}
                                 index={index}
                                 title={p.project}
                                 excerpt={p.shortExcerpt}
                                 slug={`/portfolio/${p.slug}`}
                                 github={p.github}
                              />
                           )
                        })}
                     </ul>
                     <div className="">
                        <Link href="/portfolio" passHref>
                           <button
                              type="button"
                              className="flex flex-row items-center relative text-grey-600 dark:text-grey-300 text-lg font-code"
                           >
                              See all projects{' '}
                              <RightArrowLongIcon className="ml-2 w-5 h-auto top-[2px] relative" />
                           </button>
                        </Link>
                     </div>
                  </div>
               </section>
               <section>
                  <div className="mt-16">
                     <Title type="h2">Articles</Title>
                     <ul>
                        {posts.map((p, index) => {
                           return (
                              <ListItem
                                 key={index}
                                 index={index}
                                 title={p.title}
                                 excerpt={p.shortExcerpt}
                                 slug={`/reading/${p.slug}`}
                              />
                           )
                        })}
                     </ul>
                     <div className="">
                        <Link href="/portfolio" passHref>
                           <button
                              type="button"
                              className="flex flex-row items-center relative text-grey-600 dark:text-grey-300 text-lg font-code"
                           >
                              See all articles{' '}
                              <RightArrowLongIcon className="ml-2 w-5 h-auto top-[2px] relative" />
                           </button>
                        </Link>
                     </div>
                  </div>
               </section>
            </div>
         </div>
      </>
   )
}

export default Index
