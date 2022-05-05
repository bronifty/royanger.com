import * as React from 'react'
import { ExternalLinkIcon } from '../icons'

type ExternalLinkButton = {
   link: string
   name: string
   label: string
}

const ExternalLinkButton = ({ link, name, label }: ExternalLinkButton) => {
   return (
      <div className="block test1">
         <a
            className="relative inline-flex items-center my-2 mr-3 text-lg rounded py-1 px-3 transform hover:scale-[1.04] transition-all bg-gradient-to-t bg-grey-700 from-grey-800 via-grey-600 to-grey-800 dark:bg-grey-300 dark:from-grey-400 dark:via-grey-200 dark:to-grey-400 hover:bg-blue-800 hover:from-blue-800 hover:via-blue-600 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:via-blue-200 dark:hover:to-blue-400 text-grey-100  dark:text-grey-800 dark:hover:bg-grey-100"
            href={link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${label}`}
         >
            <span className="mr-4">{name}</span>
            <ExternalLinkIcon className="w-auto h-4" />
         </a>
      </div>
   )
}

export default ExternalLinkButton
