import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Title from '../Title'

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
      <div className="w-full">
         <div className="image">
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
               <Title type="h2">{title}</Title>
            </a>
         </Link>
         <p className="byline text-large">{byline}</p>
         <div className="categories flex flex-row">
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
