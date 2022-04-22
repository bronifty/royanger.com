import Image from 'next/image'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'
import { Current } from '../../lib/types'
import { ExternalLinkIcon } from '../icons'
import SpotifyIcon from '../icons/SpotifyIcon'
import Title from '../Title'

const CurrentlyPlaying = () => {
   const { data: currentlyPlaying } = useSWR<Current>(
      '/api/currently-playing',
      fetcher
   )

   return (
      <div className="mt-12">
         <Title type="h4">Currently Playing</Title>
         <div className="flex flex-row mt-2">
            <div className="text-spotify w-10 flex items-center justify-center">
               <SpotifyIcon className="h-5 w-auto" />
            </div>
            <div className="flex flew-row">
               {currentlyPlaying?.isPlaying ? (
                  <>
                     <div className="">
                        <a
                           className="block w-[50px] h-[50px]"
                           href={currentlyPlaying.songUrl}
                           target="_blank"
                           rel="noreferrer"
                        >
                           <Image
                              src={currentlyPlaying.image.url}
                              width={50}
                              height={50}
                              alt={currentlyPlaying.artist}
                           />
                        </a>
                     </div>
                     <div className="ml-4">
                        <p>
                           <a
                              className="underline decoration-dotted decoration-blue-500 text-blue-500 font-bold flex flex-row"
                              href={currentlyPlaying.songUrl}
                              target="_blank"
                              rel="noreferrer"
                           >
                              {currentlyPlaying.title}{' '}
                              <ExternalLinkIcon className="h-3 w-auto ml-2 mt-[6px]" />{' '}
                           </a>
                        </p>
                        <p>
                           {currentlyPlaying.album}{' '}
                           <span className="italic">from</span>{' '}
                           {currentlyPlaying.artist}
                        </p>
                     </div>
                  </>
               ) : (
                  <div>
                     <p className="text-lg">Not Playing</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default CurrentlyPlaying
