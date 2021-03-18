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
      <div className="py-3 px-5 text-gray-90 mt-5 mb-10">
         <h1 className="text-gray-200 font-title text-5xl">{title}</h1>
         <p className="text-gray-200 font-sans leading-loose text-xl">
            {byline}
         </p>
         <p className="text-gray-200 font-sans leading-loose text-xl">
            Written by: {author}
         </p>
         <p className="text-gray-200 font-sans leading-loose text-xl">
            Date Published: {publishedAt}
         </p>
      </div>
   )
}

export default BlogArticleHeader
