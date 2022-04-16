import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import Title from '../components/Title'
import { allPages } from '../.contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../components/MDXComponents'

// load just one page from contentlayer
export async function getStaticProps() {
   const page = allPages.find(
      post => post._raw.flattenedPath === 'pages/skills'
   )
   return {
      props: {
         page,
      },
   }
}

const Skills = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
   const Component = useMDXComponent(page.body.code)
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
                  <div className="flex flex-col max-w-4xl mdx-content">
                     <Component components={{ ...components }} as any />
                  </div>
                  <div className="flex mt-12 max-w-4xl">
                     <div className="rounded-xl bg-gradient-to-tr from-blue-600  via-cyan-400 to-blue-900 ">
                        <div className="bg-white pt-6 pb-12 px-20 rounded-xl  m-2 ">
                           <Title type="h2">Resume</Title>
                           <div className="text-xl">
                              Please download my{' '}
                              <Link href="/resume/roy-anger--resume.pdf">
                                 <a className="text-blue-00 underline decoration-dotted font-semibold">
                                    Resume
                                 </a>
                              </Link>
                              <p>
                                 Last updated April 15, 2022. Please{' '}
                                 <Link href="/contact">
                                    <a className="text-blue-200 underline decoration-dotted font-semibold">
                                       drop me a line
                                    </a>
                                 </Link>{' '}
                                 if you are looking for an updated resume.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </article>
            </div>

            <div></div>
         </div>
      </>
   )
}

export default Skills
