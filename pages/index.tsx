import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Title from '../components/Title'
import { allPages, allPortfolios, allPosts } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'
import { RightArrowLongIcon } from '../components/icons'
import ListItem from '../components/home/ListItem'

export async function getStaticProps() {
   // load just one page from contentlayer
   const page = allPages.find(post => post._raw.flattenedPath === 'pages/home')
   const portfolio = allPortfolios
      .sort((a, b) => {
         return (a.index as number) - (b.index as number)
      })
      .slice(0, 4)
   const posts = allPosts
      .map(p => {
         if (p.slug) return p
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
   return (
      <>
         <Head>
            <title>{page.pageTitle}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={page.pageKeywords} />
         </Head>

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl">
               <article>
                  <Title type="h1">{page.title}</Title>
                  <Title type="h2">{page.subTitle}</Title>
                  <div className="flex flex-col max-w-4xl mdx-content mt-12">
                     <Component components={{ ...components }} as any />
                  </div>
                  {/* <a href="https://accounts.spotify.com/authorize?client_id=b1b4f2c30e824b1bb4eccc1bafa9f79e&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:5000&scope=user-read-currently-playing%20user-top-read&user-read-recently-played">
                     Spotify
                  </a> */}
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
