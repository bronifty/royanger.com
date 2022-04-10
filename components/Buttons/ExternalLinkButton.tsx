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
            className="relative inline-flex items-center my-2 mr-3 text-lg bg-grey-700 text-white rounded py-1 px-3"
            href={link}
            target="_blank"
         >
            <span className="mr-4">{name}</span>
            <ExternalLinkIcon className="w-auto h-4" />
         </a>
      </div>
   )
}

export default ExternalLinkButton
