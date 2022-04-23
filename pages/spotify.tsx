import * as React from 'react'
import Head from 'next/head'
import Title from '../components/Title'
import { allPages } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import useSWR from 'swr'
import fetcher from '../lib/api/fetcher'
import Track from '../components/Spotify/Track'
import Artist from '../components/Spotify/Artist'
import { TopTracks, TopArtists } from '../lib/types'
import CurrentlyPlaying from '../components/Spotify/CurrentlyPlaying'

export async function getStaticProps() {
   // load just one page from contentlayer
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/spotify'
   )

   return {
      props: {
         page,
      },
   }
}

const Spotify = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
   const { data: tracks } = useSWR<TopTracks>('/api/top-tracks', fetcher)
   const { data: artists } = useSWR<TopArtists>('/api/top-artists', fetcher)

   return (
      <>
         <Head>
            <title>{page.pageTitle}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={page.pageKeywords} />
         </Head>

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl">
               <article>
                  <Title type="h1">{page.title}</Title>
                  <Title type="h2">{page.subTitle}</Title>
               </article>
               <section>
                  <CurrentlyPlaying />
               </section>
               <div className="grid grid-cols-1 xl:grid-cols-2">
                  <section className="mt-8">
                     <Title type="h3ash4">Top Tracks</Title>
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
                     <Title type="h3ash4">Top Artists</Title>
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
