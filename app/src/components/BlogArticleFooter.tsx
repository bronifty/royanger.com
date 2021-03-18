import * as React from 'react'

interface Props {
   publishedAt: string
   author: string
   authorId?: string
   categories: any
}

const BlogArticleHeader = ({
   publishedAt,
   author,
   authorId,
   categories,
}: Props) => {
   return (
      <div className="py-3 px-5 border border-gray-300 bg-gray-100 text-gray-900 mt-5 mb-10">
         <p className="text-gray-900 font-sans leading-loose text-xl">
            Written by: {author}
         </p>
         <p className="text-gray-900 font-sans leading-loose text-xl">
            Date Published: {publishedAt}
         </p>
         <p className="text-gray-900 font-sans leading-loose text-xl">
            {categories}
            <p>{categories.map(cat => cat)}</p>
         </p>
      </div>
   )
}

export default BlogArticleHeader
