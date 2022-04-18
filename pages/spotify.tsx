import * as React from 'react'
import Head from 'next/head'
import Title from '../components/Title'
import { allPages } from '../.contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

type TopTracks = {
   tracks: Song[]
}

type Song = {
   artist: string
   songUrl: string
   title: string
}

export async function getStaticProps() {
   // load just one page from contentlayer
   const page = allPages.find(post => post._raw.flattenedPath === 'pages/home')

   return {
      props: {
         page,
      },
   }
}

const Spotify = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
   const { data } = useSWR<TopTracks>('/api/top-tracks', fetcher)

   // const Component = useMDXComponent(page.body.code)
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
                  <ol>
                     {data?.tracks?.map((track, index) => {
                        return (
                           <li key={index}>
                              {track.artist} - {track.title}
                           </li>
                        )
                     })}
                  </ol>
               </section>
            </div>
         </div>
      </>
   )
}

export default Spotify
