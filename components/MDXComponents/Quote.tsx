import * as React from 'react'

type Quote = {
   author: string
   children: React.ReactNode
}

const Quote = ({ author, children }: Quote) => {
   return (
      <div className=" p-4 relative flex flex-row justify-center dark:text-grey-100">
         <div>
            <div className="text-lg quotes max-w-3xl dark:text-grey-100">
               {' '}
               {children}
            </div>
            <div className="italic">{author}</div>
         </div>
      </div>
   )
}

export default Quote
