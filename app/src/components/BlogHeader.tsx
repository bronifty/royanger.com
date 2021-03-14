import * as React from 'react'

const BlogHeader = () => {
   return (
      <div className="py-3 px-5 text-gray-90 mt-5 mb-10">
         <h1 className="text-gray-200 font-title text-5xl">Articles</h1>
         <p className="text-gray-200 font-sans leading-loose text-xl">
            My articles are a mix of things I've thought about, solutions to
            problems I've dealt with and explanations of code I've worked on.{' '}
         </p>
      </div>
   )
}

export default BlogHeader
