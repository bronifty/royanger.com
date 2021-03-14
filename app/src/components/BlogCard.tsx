import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// import components
import BlogCategory from './BlogCategory'

interface Props {
   title: string
   byline: string
   slug: string
   image: string
   alt: string
   categories?: { title: string; _id: string }[]
}

const BlogCard = ({ title, byline, slug, image, alt, categories }: Props) => {
   return (
      <div className="w-full border border-gray-900 p-3 m-2 relative">
         {/* <img src={image} alt={alt} /> */}
         <div className="relative w-full h-72">
            <Image
               src={image}
               layout="fill"
               objectFit="cover"
               alt={alt}
               sizes="500px"
            />
         </div>
         <Link href={`/articles/${slug}`}>
            <a>
               <h2 className="text-3xl font-title text-gray-200 mt-6 mb-1">
                  {title}
               </h2>
            </a>
         </Link>
         <h3 className="text-lg font-sans text-gray-200 mt-2 mb-4">{byline}</h3>
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
