import * as React from 'react'
import { ExternalLinkIcon } from '../icons'

type ExternalLinkButton = {
   link: string
   name: string
}

const ExternalLinkButton = ({ link, name }: ExternalLinkButton) => {
   return (
      <div className="block">
         <a
            className="relative inline-flex items-center my-2 mr-3 text-lg bg-gradient-to-r from-grey-700 via-grey-600 to-grey-700 dark:bg-grey-300 text-grey-100 dark:text-grey-800 rounded py-1 px-3 hover:bg-grey-900 dark:hover:bg-grey-100 hover:shadow-md hover:shadow-black-900 hover:top-[-1px]"
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
