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
      <div>
         <h1>{title}</h1>
         <p>{byline}</p>
         <p>Written by: {author}</p>
         <p>Date Published: {publishedAt}</p>
      </div>
   )
}

export default BlogArticleHeader
