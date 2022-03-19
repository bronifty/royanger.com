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
   const classes = {
      h1: 'text-5xl font-title mt-6 mb-2',
      h2: 'text-4xl font-body mt-4 mb-2 text-slate-600',
      h3: 'text-2xl font-title mt-4 mb-2',
   }

   const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
   const safeHeading = type ? type.toLowerCase() : ''
   const Heading = includes(headingLevels, safeHeading) ? safeHeading : 'p'

   return (
      <div className={`${className ? className : ''} ${classes[safeHeading]}`}>
         <Heading>{children}</Heading>
      </div>
   )
}

export default Title
