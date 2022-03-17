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
      <div>
         <p>Written by: {author}</p>
         <p>Date Published: {publishedAt}</p>
         <p>
            {/* {categories} */}
            {categories.map((cat: string) => cat)}
         </p>
      </div>
   )
}

export default BlogArticleHeader
