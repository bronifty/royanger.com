import * as React from 'react'
import Head from 'next/head'
import { allPages, allPosts } from '../../.contentlayer/generated'
import type { Page, Post } from '../../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import {
   calculatePages,
   sortPosts,
   pageOfPosts,
} from '../../lib/helpers/pagination'
import PostList from '../../components/blog/PostList'
import Pagination from '../../components/blog/Pagination'
import { useRouter } from 'next/router'

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

const Reading = ({ page, posts }: { page: Page; posts: Post }) => {
   const router = useRouter()
   const { page: currentPage } = router.query

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
               <Pagination currentPage={currentPage} />
            </div>
         </div>
      </>
   )
}

export default Reading
