import * as React from 'react'
import { RightArrowLongIcon } from '../icons'

type SubmitButton = {
   children: React.ReactNode
   submitted: boolean
   className?: string
}
const SubmitButton = ({ children, className, submitted }: SubmitButton) => {
   const buttonState = submitted
      ? 'bg-grey-300'
      : 'transform hover:scale-[1.04] transition-all bg-gradient-to-t bg-grey-700 from-grey-800 via-grey-600 to-grey-800 dark:bg-grey-300 dark:from-grey-400 dark:via-grey-200 dark:to-grey-400 hover:bg-blue-800 hover:from-blue-800 hover:via-blue-600 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:via-blue-200 dark:hover:to-blue-400 text-grey-100  dark:text-grey-800 dark:hover:bg-grey-100'

   return (
      <div className="block">
         <button type="submit" disabled={submitted}>
            <a
               className={`relative inline-flex items-center my-2 mr-3 text-lg rounded py-1 px-3 ${buttonState}`}
            >
               {!submitted ? (
                  <>
                     <span className="mr-4">{children}</span>
                     <RightArrowLongIcon className="h-auto w-5 top-[2px] relative" />
                  </>
               ) : (
                  <span className="">{children}</span>
               )}
            </a>
         </button>
      </div>
   )
}

export default SubmitButton
