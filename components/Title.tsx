import * as React from 'react'

// Utility for checking membership of an array, and narrowing the type
function includes<S extends string>(
   haystack: readonly S[],
   needle: string
): needle is S {
   return (haystack as readonly string[]).includes(needle)
}

type Title = {
   children: string
   type: string
   className?: string
}

const Title = ({ children, type, className }: Title) => {
   const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
   const safeHeading = type ? type.toLowerCase() : ''
   const Heading = includes(headingLevels, safeHeading) ? safeHeading : 'p'

   return (
      <div className={`${className ? className : ''}`}>
         <Heading>{children}</Heading>
      </div>
   )
}

export default Title
