import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Title from '../components/Title'
import { allPages, allPortfolios } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'
import { RightArrowIcon, RightArrowLongIcon } from '../components/icons'

// load just one page from contentlayer
export async function getStaticProps() {
   const page = allPages.find(post => post._raw.flattenedPath === 'pages/home')
   const portfolio = allPortfolios
      .sort((a, b) => {
         return (a.index as number) - (b.index as number)
      })
      .slice(0, 4)
   return {
      props: {
         page,
         portfolio,
      },
   }
}

const Index = ({
   page,
   portfolio,
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
                  <div className="flex flex-col max-w-4xl mdx-content">
                     <Component components={{ ...components }} as any />
                  </div>
                  <div className="">
                     <Title type="h2">Featured Projects</Title>
                     <ul>
                        {portfolio.map((p, index) => {
                           return (
                              <li
                                 key={index}
                                 className=" max-w-4xl mb-2 border-b-[1px] border-grey-300 last:border-0 "
                              >
                                 <div className="flex flex-row  pb-4">
                                    <div className="flex items-center justify-center w-10 mr-2 text-grey-400 font-code text-xl">
                                       {`0${index + 1}`}
                                    </div>
                                    <div className="grow ">
                                       <Title type="h4">{p.project}</Title>
                                       <p>{p.excerpt}</p>
                                    </div>
                                    <div className="flex items-end ">
                                       <Link href={`/portfolio/${p.slug}`}>
                                          <div className="bg-gradient-to-tr from-yellow-500  via-yellow-700 to-red-600 rounded p-1  mr-4">
                                             <button className="rounded  bg-white px-3 py-1">
                                                Details
                                             </button>
                                          </div>
                                       </Link>
                                       <Link href={p.github}>
                                          <div className="bg-gradient-to-tr from-blue-500  via-cyan-300 to-yellow-500  rounded p-1">
                                             <button className="rounded  bg-white px-3 py-1">
                                                GitHub
                                             </button>
                                          </div>
                                       </Link>
                                    </div>
                                 </div>
                              </li>
                           )
                        })}
                     </ul>
                     <div className="">
                        <Link href="/portfolio">
                           <button
                              type="button"
                              className="flex flex-row items-center relative text-grey-600 text-lg font-code"
                           >
                              See all projects{' '}
                              <RightArrowLongIcon className="ml-2 w-5 h-auto top-[2px] relative" />
                           </button>
                        </Link>
                     </div>
                  </div>
                  <div className="mt-12">
                     <Title type="h2">Articles</Title>
                     <p>some articles</p>
                  </div>
               </article>
            </div>

            <div></div>
         </div>
      </>
   )
}

export default Index
