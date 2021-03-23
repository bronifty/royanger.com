import * as React from 'react'
import Head from 'next/head'
import Wrapper from '../components/Wrapper'

const About = () => {
   return (
      <>
         <Head>
            <title>Roy Anger - About Roy</title>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <Wrapper bgColor="bg-blue-500">
            <article className="py-3 px-5 text-white mt-5 mb-10">
               <h1 className="text-white font-title text-5xl mb-24">
                  About Me
               </h1>
               <div className="grid grid-cols-2">
                  <div>
                     <p className="text-white font-sans leading-loose text-xl mb-16">
                        Thanks for taking a moment to visit! I'm a Full Stack
                        Web Developer from Toronto. Recently I've been freelance
                        and remote work, and I'm looking to either continue with
                        the remote work or even transition into a full time
                        in-house position.
                     </p>
                     <p className="text-white font-sans leading-loose text-xl mb-16">
                        I've recently transition into devloping with React,
                        NodeJS, Express, Postgres and Mongo. This site marks the
                        switch from using WordPress to using my new, favourite
                        stacks to develop on.
                     </p>
                     <p className="text-white font-sans leading-loose text-xl mb-16">
                        I spent years creating solutions and site for small
                        business and individuals, uring WordPress as the basis
                        for their sites. I used premade themes, page builders or
                        even created custom themes depending on the client and
                        their needs.
                     </p>
                  </div>
                  <div>Col 2</div>
               </div>
            </article>
         </Wrapper>
      </>
   )
}

export default About
