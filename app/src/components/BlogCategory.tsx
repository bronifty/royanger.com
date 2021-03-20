import * as React from 'react'

interface Props {
   title: string
   id: string
}

const BlogCategory = ({ title, id }: Props) => {
   return (
      <div className="bg-white-100 font-code text-blue p-2 mr-4">{title}</div>
   )
}

export default BlogCategory
