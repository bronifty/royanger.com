import * as React from 'react'
import Head from 'next/head'
import { allPages, allPosts } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import {
   calculatePages,
   sortPosts,
   pageOfPosts,
   paginationLinks,
} from '../lib/helpers/pagination'
import PostList from '../components/blog/PostList'
import Pagination from '../components/blog/Pagination'

export async function getStaticProps() {
   // load just one page from contentlayer
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/reading-material'
   )
   // load portfolio page and portfolio posts from contentlayer
   const posts = pageOfPosts(sortPosts(allPosts), 1)
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
         <div className="flex flex-row justify-center mt-20">
            <div className="w-full max-w-7xl">
               <Pagination currentPage="/reading" />
            </div>
         </div>
      </>
   )
}

export default Reading
