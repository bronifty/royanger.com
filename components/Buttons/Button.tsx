import * as React from 'react'
import Link from 'next/link'
import { RightArrowIcon, RightArrowLongIcon } from '../icons'

type Button = {
   link: string
   name: string
}

const Button = ({ link, name }: Button) => {
   return (
      <div className="block">
         <Link href={`${link}`}>
            <a className="relative inline-flex items-center my-2 mr-3 text-lg rounded py-1 px-3 bg-gradient-to-tr from-grey-700 via-grey-600 to-grey-700 dark:from-grey-300 dark:via-grey-400 dark:to-grey-300 dark:hover:to-yellow-200 dark:hover:via-blue-300 dark:hover:from-blue-400 text-grey-100 dark:bg-grey-300 dark:text-grey-800 dark:hover:bg-grey-100 transform hover:scale-[1.04] transition-all">
               <span className="mr-4">{name}</span>
               <RightArrowLongIcon className="h-auto w-5 top-[2px] relative" />
            </a>
         </Link>
      </div>
   )
}

export default Button
