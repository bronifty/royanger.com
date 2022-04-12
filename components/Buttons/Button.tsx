import * as React from 'react'
import Link from 'next/link'
import { RightArrowIcon } from '../icons'

type Button = {
   link: string
   name: string
}

const Button = ({ link, name }: Button) => {
   return (
      <div className="block">
         <Link href={`/portfolio/${link}`}>
            <a className="relative inline-flex items-center my-2 mr-3 text-lg bg-grey-700 dark:bg-grey-300 text-grey-100 dark:text-grey-800 rounded py-1 px-3 hover:bg-grey-900 dark:hover:bg-grey-100 hover:shadow-md hover:shadow-black-900 hover:top-[-1px]">
               <span className="mr-4">{name}</span>
               <RightArrowIcon className="w-auto h-4" />
            </a>
         </Link>
      </div>
   )
}

export default Button
