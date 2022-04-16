import * as React from 'react'
import Head from 'next/head'
import { allPages, allPosts } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import Title from '../components/Title'
import BookmarkCard from '../components/blog/BookmarkCard'
import ArticleCard from '../components/blog/ArticleCard'
import ProjectCard from '../components/blog/ProjectCard'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'

export async function getStaticProps() {
   // load just one page from contentlayer
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
               </article>

               <div className="grid grid-cols-4 gap-6 auto-rows-[350px]">
                  {posts.map((post, index) => {
                     if (post.postType === 'bookmark')
                        return (
                           <BookmarkCard
                              key={index}
                              title={post.title}
                              date={post.date}
                              type={post.postType}
                              tags={post.tags}
                              link={post.link}
                           >
                              {post.excerpt}
                           </BookmarkCard>
                        )
                     if (post.postType === 'project')
                        return (
                           <ProjectCard
                              key={index}
                              title={post.title}
                              date={post.date}
                              type={post.postType}
                              tags={post.tags}
                              link={post.link}
                           >
                              {post.excerpt}
                           </ProjectCard>
                        )
                     if (post.postType === 'article')
                        return (
                           <ArticleCard
                              key={index}
                              title={post.title}
                              date={post.date}
                              type={post.postType}
                              tags={post.tags}
                              excerpt={post.excerpt}
                              slug={post.slug}
                              image={post.image}
                           />
                        )
                  })}
               </div>
            </div>

            <div></div>
         </div>
      </>
   )
}

export default Reading
