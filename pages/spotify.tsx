import * as React from 'react'
import Title from '../components/Title'
import { allPages, Page } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import useSWR from 'swr'
import fetcher from '../lib/api/fetcher'
import Track from '../components/Spotify/Track'
import Artist from '../components/Spotify/Artist'
import { TopTracks, TopArtists } from '../lib/types'
import CurrentlyPlaying from '../components/Spotify/CurrentlyPlaying'
import HTMLHead from '../components/HTMLHead'

export async function getStaticProps() {
   // load titles and meta info from contentlayer
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/spotify'
   )

   return {
      props: {
         page,
      },
   }
}

function Spotify({ page }: { page: Page }) {
   const { data: tracks } = useSWR<TopTracks>('/api/top-tracks', fetcher)
   const { data: artists } = useSWR<TopArtists>('/api/top-artists', fetcher)

   const meta = {
      title: page.pageTitle,
      keywords: page.pageKeywords,
   }

   return (
      <>
         <HTMLHead pageMeta={meta} />

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl">
               <article>
                  <Title type="h1">{page.title}</Title>
                  <Title type="h2">{page.subTitle ? page.subTitle : ''}</Title>
               </article>
               <section>
                  <CurrentlyPlaying />
               </section>
               <div className="grid grid-cols-1 xl:grid-cols-2">
                  <section className="mt-8">
                     <Title type="h3" variant="h3ash4">
                        Top Tracks
                     </Title>
                     <ol className="mt-2">
                        {tracks?.tracks?.map((track, index) => {
                           return (
                              <Track
                                 key={index}
                                 title={track.title}
                                 artist={track.artist}
                                 songUrl={track.songUrl}
                                 album={track.album}
                                 image={track.image}
                                 index={index}
                              />
                           )
                        })}
                     </ol>
                  </section>
                  <section className="mt-8">
                     <Title type="h3" variant="h3ash4">
                        Top Artists
                     </Title>
                     <ol className="mt-2">
                        {artists?.artists?.map((artist, index) => {
                           return (
                              <Artist
                                 key={index}
                                 artist={artist.artist}
                                 artistUrl={artist.artistUrl}
                                 genre={artist.genre}
                                 image={artist.image}
                                 index={index}
                              />
                           )
                        })}
                     </ol>
                  </section>
               </div>
            </div>
         </div>
      </>
   )
}

export default Spotify
