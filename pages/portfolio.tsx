import * as React from 'react'
import Title from '../components/Title'
import {
   allPages,
   allPortfolios,
   Page,
   Portfolio,
} from '../.contentlayer/generated'
import Card from '../components/Portfolio/Card'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'
import HTMLHead from '../components/HTMLHead'

// load portfolio page and portfolio posts from contentlayer
export async function getStaticProps() {
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/portfolio'
   )
   const portfolio = allPortfolios.sort((a, b) => {
      return (a.index as number) - (b.index as number)
   })
   return {
      props: {
         page,
         portfolio,
      },
   }
}

function Portfolio({ page, portfolio }: { page: Page; portfolio: Portfolio }) {
   const Component = useMDXComponent(page.body.code)

   const meta = {
      title: page.pageTitle,
      keywords: page.pageKeywords,
   }

   return (
      <>
         <HTMLHead pageMeta={meta} />

         <div className="flex flex-row justify-center">
            <div className="w-full max-w-7xl px-4 xl:p-0">
               <section>
                  <Title type="h1">{page.title}</Title>
                  <Title type="h2">{page.subTitle ? page.subTitle : ''}</Title>
                  <div className="flex flex-col max-w-4xl mdx-content">
                     <Component components={{ ...components }} as any />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-16 mt-12">
                     {portfolio.map(item => {
                        return (
                           <Card
                              key={item._id}
                              title={item.project}
                              description={item.excerpt}
                              github={item.github}
                              preview={item.preview}
                              techstack={item.techstack}
                              image={item.image}
                              slug={item.slug}
                           />
                        )
                     })}
                  </div>
               </section>
            </div>

            <div></div>
         </div>
      </>
   )
}

export default Portfolio
