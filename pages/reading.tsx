import * as React from 'react'
import Head from 'next/head'
import { allPages, allPosts } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import Title from '../components/Title'

// load just one page from contentlayer
export async function getStaticProps() {
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/reading-material'
   )
   // load portfolio page and portfolio posts from contentlayer
   const posts = allPosts.sort(
      (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
   )
   return {
      props: {
         page,
         posts,
      },
   }
}

const Reading = ({
   page,
   posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
   // console.log('test', posts)

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
               </article>
            </div>

            <div></div>
         </div>
      </>
   )
}

export default Reading
