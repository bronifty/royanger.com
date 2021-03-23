import * as React from 'react'

interface Props {
   title: string
   id: string
}

const BlogCategory = ({ title, id }: Props) => {
   return (
      <div className="dark:bg-white-100 bg-blue-600 dark:text-blue text-white font-code p-2 mr-4">
         {title}
      </div>
   )
}

export default BlogCategory
