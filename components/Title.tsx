import * as React from 'react'

// Utility for checking membership of an array, and narrowing the type
function includes<S extends string>(
   haystack: readonly S[],
   needle: string
): needle is S {
   return (haystack as readonly string[]).includes(needle)
}

type Title = {
   children: React.ReactChild | React.ReactChild[]
   type: string
   className?: string
   variant?: string
}

const Title: React.FC<Title> = ({ children, type, className, variant }) => {
   const classes: any = {
      h1: 'text-4xl md:text-5xl font-title mt-6 mb-2',
      h2: 'text-3xl md:text-4xl font-body mt-4 mb-2 text-slate-600',
      h3: 'text-2xl font-title mt-4 mb-2 p-2',
      h4: 'text-2xl font-body mt-3',
   }

   const variantOptions: any = {
      blog: 'text-3xl md:text-4xl font-body mt-4 mb-2 text-slate-600',
      h3ash4: 'text-2xl font-body mt-3',
      portfolio: '!text-3xl py-1 px-2 flex justify-center font-bold',
      superheading:
         '!text-lg font-code flex justify-center text-blue dark:text-blue-300 mt-8',
   }

   const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
   const safeHeading = type ? type.toLowerCase() : ''
   const Heading = includes(headingLevels, safeHeading) ? safeHeading : 'p'

   return (
      <div
         className={`${classes[safeHeading]} ${className ? className : ''} ${
            variant ? variantOptions[variant] : ''
         }`}
      >
         <Heading>{children}</Heading>
      </div>
   )
}

export default Title
