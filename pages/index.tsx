import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Title from '../components/Title'
import { allPages, Page } from '../.contentlayer/generated'

// load just one page from contentlayer
export async function getStaticProps() {
   const page: Page = allPages.find(
      post => post._raw.flattenedPath === 'pages/home'
   )
   return {
      props: {
         page,
      },
   }
}

const Index = ({ page }: { page: Page }) => {
   return (
      <>
         <Head>
            <title>Roy Anger - Full Stack Developer</title>
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
                  <Title type="h3">
                     Watch for the new site and portfolio - coming soon!
                  </Title>
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

export default Index
