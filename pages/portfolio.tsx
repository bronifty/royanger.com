import * as React from 'react'
import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import Title from '../components/Title'
import { allPages, allPortfolios } from '../.contentlayer/generated'

// load portfolio page and portfolio posts from contentlayer
export async function getStaticProps() {
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/portfolio'
   )
   const portfolio = allPortfolios.sort()
   return {
      props: {
         page,
         portfolio,
      },
   }
}

const Portfolio = ({
   page,
   portfolio,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
                  <div
                     className="page-content"
                     dangerouslySetInnerHTML={{ __html: page.body.html }}
                  />

                  {portfolio.map(item => {
                     return (
                        <div key={item._id}>
                           <h3>{item.project}</h3>
                           <p>{item.description}</p>
                           <p>{item.github}</p>
                           <p>{item.preview}</p>
                           <p>{item.techstack}</p>
                           <div
                              className="page-content"
                              dangerouslySetInnerHTML={{
                                 __html: item.body.html,
                              }}
                           />
                        </div>
                     )
                  })}
               </article>
            </div>

            <div></div>
         </div>
      </>
   )
}

export default Portfolio
