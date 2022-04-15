import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Title from '../components/Title'
import { allPages } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'

// load just one page from contentlayer
export async function getStaticProps() {
   const page = allPages.find(post => post._raw.flattenedPath === 'pages/home')
   return {
      props: {
         page,
      },
   }
}

const Index = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
                  <Title type="h3">
                     Watch for the new site and portfolio - coming soon!
                  </Title>
                  <div className="flex flex-col max-w-4xl mdx-content">
                     <Component components={{ ...components }} as any />
                  </div>
               </article>
            </div>

            <div></div>
         </div>
      </>
   )
}

export default Index
