import * as React from 'react'
import { ExternalLinkIcon } from '../icons'

type ExternalLinkButton = {
   link: string
   name: string
}

const ExternalLinkButton = ({ link, name }: ExternalLinkButton) => {
   return (
      <div className="block test1">
         <a
            className="relative inline-flex items-center my-2 mr-3 text-lg  bg-grey-700 hover:bg-gradient-to-tr from-grey-700 via-grey-600 to-grey-700 dark:from-grey-200 dark:via-grey-300 dark:to-grey-200 dark:bg-grey-300 text-grey-100 dark:text-grey-800 rounded py-1 px-3 hover:to-yellow-400 hover:via-blue-600 hover:from-blue-900 dark:hover:to-yellow-200 dark:hover:via-blue-300 dark:hover:from-blue-400 dark:hover:bg-grey-100 -1px] transform hover:scale-[1.04] transition-all"
            href={link}
            target="_blank"
            rel="noreferrer"
         >
            <span className="mr-4">{name}</span>
            <ExternalLinkIcon className="w-auto h-4" />
         </a>
      </div>
   )
}

export default ExternalLinkButton
