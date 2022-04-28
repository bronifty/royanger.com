import * as React from 'react'
import Head from 'next/head'
import { allPages, allPosts } from '../../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import {
   calculatePages,
   sortPosts,
   pageOfPosts,
} from '../../lib/helpers/pagination'
import PostList from '../../components/blog/PostList'

export async function getStaticPaths() {
   const pages = Array.from(Array(calculatePages()).keys())
      .map(x => x + 1)
      .map((item, index) => {
         return { params: { page: item.toString() } }
      })
   return {
      paths: pages,
      fallback: false,
   }
}

export async function getStaticProps({ params }) {
   console.log('params', params)
   // load just one page from contentlayer
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/reading-material'
   )
   const posts = pageOfPosts(sortPosts(allPosts), params?.page)
   return {
      props: {
         posts,
         page,
      },
   }
}

const Reading = ({
   page,
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

         <PostList posts={posts} page={page} />
      </>
   )
}

export default Reading
