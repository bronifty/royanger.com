import Title from '../Title'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../../components/MDXComponents'
import ArticleCard from './ArticleCard'
import BookmarkCard from './BookmarkCard'
import ProjectCard from './ProjectCard'
import SnippetCard from './SnippetCard'

const PostList = ({ posts, page }) => {
   const Component = useMDXComponent(page.body.code)
   return (
      <div className="flex flex-row justify-center">
         <div className="w-full max-w-7xl">
            <article>
               <Title type="h1">{page.title}</Title>
               <Title type="h2">{page.subTitle}</Title>

               <div className="flex flex-col max-w-4xl mdx-content">
                  <Component components={{ ...components }} as any />
               </div>
            </article>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:auto-rows-[350px]">
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
                           imageWidth={post.imageWidth}
                           imageHeight={post.imageHeight}
                        />
                     )
                  if (post.postType === 'snippet')
                     return (
                        <SnippetCard
                           key={index}
                           title={post.title}
                           date={post.date}
                           type={post.postType}
                           tags={post.tags}
                           excerpt={post.excerpt}
                           slug={post.slug}
                        />
                     )
               })}
            </div>
         </div>

         <div></div>
      </div>
   )
}

export default PostList
