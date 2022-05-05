import * as React from 'react'
import { allPages, allPosts } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import { sortPosts, pageOfPosts } from '../lib/helpers/pagination'
import PostList from '../components/blog/PostList'
import Pagination from '../components/blog/Pagination'
import HTMLHead from '../components/HTMLHead'

export async function getStaticProps() {
   // load titles and meta info from contentlayer
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/reading-material'
   )
   // load blog posts from contentlayer
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
   const meta = {
      title: page.pageTitle,
      keywords: page.pageKeywords,
   }

   return (
      <>
         <HTMLHead pageMeta={meta} />

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
