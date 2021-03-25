import * as React from 'react'

interface Props {
   title: string
   publishedAt: string
   byline: string
   author: string
   authorId?: string
}

const BlogArticleHeader = ({
   title,
   publishedAt,
   byline,
   author,
   authorId,
}: Props) => {
   return (
      <div className="py-3 px-5 text-primary mt-5 mb-10">
         <h1 className="text-primary font-title text-5xl">{title}</h1>
         <p className="text-primary font-sans leading-loose text-xl">
            {byline}
         </p>
         <p className="text-primary font-sans leading-loose text-xl">
            Written by: {author}
         </p>
         <p className="text-primary font-sans leading-loose text-xl">
            Date Published: {publishedAt}
         </p>
      </div>
   )
}

export default BlogArticleHeader