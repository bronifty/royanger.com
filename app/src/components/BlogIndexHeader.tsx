import * as React from 'react'

const BlogIndexHeader = () => {
   return (
      <div className="py-3 px-5 dark:text-white text-black mt-5 mb-10">
         <h1 className="dark:text-white text-black font-title text-5xl">
            Articles
         </h1>
         <p className="dark:text-white text-black font-sans leading-loose text-xl">
            My articles are a mix of things I've thought about, solutions to
            problems I've dealt with and explanations of code I've worked on.
         </p>
      </div>
   )
}

export default BlogIndexHeader
