import * as React from 'react'
import { RightArrowLongIcon } from '../icons'

type SubmitButton = {
   children: React.ReactNode
   className?: string
}
const SubmitButton = ({ children, className }: SubmitButton) => {
   return (
      <div className="block">
         <button type="submit">
            <a className="relative inline-flex items-center my-2 mr-3 text-lg rounded py-1 px-3 bg-gradient-to-tr from-grey-700 via-grey-600 to-grey-700 hover:to-yellow-400 hover:via-blue-600 hover:from-blue-900 text-grey-100 dark:bg-grey-300 dark:text-grey-800 dark:hover:bg-grey-100 transform hover:scale-[1.04] transition-all">
               <span className="mr-4">{children}</span>
               <RightArrowLongIcon className="h-auto w-5 top-[2px] relative" />
            </a>
         </button>
      </div>
   )
}

export default SubmitButton
