import * as React from 'react'
import Link from 'next/link'

// import components
import BlogCategory from './BlogCategory'

interface Props {
   title: string
   byline: string
   slug: string
   image: string
   alt: string
   categories?: [title: string, _id: string]
}

const BlogCard = ({ title, byline, slug, image, alt, categories }: Props) => {
   console.log(categories)

   return (
      <div className="w-1/2 border border-gray-900 p-3 m-2">
         <Link href={`/articles/${slug}`}>
            <a>
               <h2 className="text-3xl font-title text-gray-200 mb-2">
                  {title}
               </h2>
            </a>
         </Link>
         <img src={image} alt={alt} />
         <h3 className="text-lg font-sans text-gray-200 my-4">{byline}</h3>
         <div className="flex flex-row">
            {categories
               ? categories.map(cat => (
                    <BlogCategory
                       key={cat._id}
                       title={cat.title}
                       id={cat._id}
                    />
                 ))
               : ''}
         </div>
      </div>
   )
}

export default BlogCard
