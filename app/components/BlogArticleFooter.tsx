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
      <div className="py-3 px-5 border border-gray bg-gray-100 text-blue-800 mt-5 mb-10">
         <p className="text-blue-800 font-sans leading-loose text-xl">
            Written by: {author}
         </p>
         <p className="text-blue-800 font-sans leading-loose text-xl">
            Date Published: {publishedAt}
         </p>
         <p className="text-blue-800 font-sans leading-loose text-xl">
            {/* {categories} */}
            {categories.map((cat: string) => cat)}
         </p>
      </div>
   )
}

export default BlogArticleHeader
