import Image from 'next/image'
import { ExternalLinkIcon } from '../icons'
import { Track } from '../../lib/types'

const Track = ({ title, artist, songUrl, album, image, index }: Track) => {
   return (
      <li>
         <div className="mb-2 flex flex-row ">
            <div className="flex justify-center items-center text-lg font-code min-w-[40px]">
               {index + 1}
            </div>
            <div className="w-[50px] flex items-center">
               <a
                  className="block w-[50px] h-[50px]"
                  href={songUrl}
                  target="_blank"
                  rel="noreferrer"
               >
                  <Image src={image.url} width={50} height={50} alt={artist} />
               </a>
            </div>
            <div className="ml-4 ">
               <p>
                  <a
                     className="flex flex-row underline decoration-dotted decoration-blue-600 text-blue-600 font-bold"
                     href={songUrl}
                     target="_blank"
                     rel="noreferrer"
                  >
                     {title}{' '}
                     <ExternalLinkIcon className="h-3 w-auto ml-2 mt-[6px] " />
                  </a>
               </p>
               <p className="text-sm italic">{artist}</p>
            </div>
         </div>
      </li>
   )
}

export default Track
