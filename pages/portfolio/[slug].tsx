import Head from 'next/head'
import Title from '../../components/Title'
import { allPortfolios } from '../../.contentlayer/generated'
import type { Portfolio } from '../../.contentlayer/generated'

export default function Project({ portfolio }: { portfolio: Portfolio }) {
   return (
      <>
         <Head>
            <title>{portfolio.project}</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={portfolio.project} />
         </Head>

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl px-4 xl:p-0">
               <section>
                  <Title type="h1">{portfolio.project}</Title>

                  <div
                     className="portfolio-content mb-10"
                     dangerouslySetInnerHTML={{ __html: portfolio.body.html }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-16"></div>
               </section>
            </div>

            <div></div>
         </div>
      </>
   )
}
export async function getStaticPaths() {
   return {
      paths: allPortfolios.map(p => ({ params: { slug: p.slug } })),
      fallback: false,
   }
}

export async function getStaticProps({ params }) {
   const portfolio = allPortfolios.find(project => project.slug === params.slug)
   return { props: { portfolio } }
}
