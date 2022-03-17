import * as React from 'react'

interface Props {
   title: string
   id: string
}

const BlogCategory = ({ title, id }: Props) => {
   return <div>{title}</div>
}

export default BlogCategory
