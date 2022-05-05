import Head from 'next/head'
import { useRouter } from 'next/router'

type HTMLHead = {
   pageMeta: Meta
}

type Meta = {
   title: string
   keywords: string
   date?: Date
   edited?: Date
   image?: string
}

const HTMLHead = ({ pageMeta }: HTMLHead) => {
   const router = useRouter()

   const meta = {
      description:
         'Full Stack Developer specializing in JS, React, TS, NodeJs, Postgres, Mongo and more',
      image: 'https://royanger.com/images/static/banner.jpg',
      ...pageMeta,
   }

   return (
      <Head>
         <title>{meta.title}</title>
         <meta name="robots" content="follow, index" />
         <meta content={meta.description} name="description" />
         <meta name="keywords" content={meta.keywords} />
         <meta
            property="og:url"
            content={`https://royanger.com${router.asPath}`}
         />
         <link rel="canonical" href={`https://royanger.com${router.asPath}`} />
         <meta property="og:type" content="website" />
         <meta property="og:site_name" content="Roy Anger" />
         <meta property="og:description" content={meta.description} />
         <meta property="og:title" content={meta.title} />
         <meta property="og:image" content={meta.image} />
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:site" content="@royanger" />
         <meta name="twitter:title" content={meta.title} />
         <meta name="twitter:description" content={meta.description} />
         <meta name="twitter:image" content={meta.image} />
         {meta.date && (
            <meta
               property="article:published_time"
               content={meta.date.toISOString()}
            />
         )}
         {meta.edited && (
            <meta
               property="article:modified_time"
               content={meta.edited.toISOString()}
            />
         )}

         <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
   )
}

export default HTMLHead
