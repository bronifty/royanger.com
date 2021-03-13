import * as React from 'react'

interface Props {
   title: string
   id: string
}

const BlogCategory = ({ title, id }: Props) => {
   return (
      <div className="bg-gray-200 font-code text-gray-900 p-2 mr-4">
         {title}
      </div>
   )
}

export default BlogCategory
