import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';

// import components
import Wrapper from '../src/components/Wrapper';
import { red } from 'tailwindcss/colors';

const Index = () => {
  return (
    <>
      <Head>
        <title>Roy Anger - Full Stack Developer</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <Wrapper styles='h-screen' bgImage='/images/backgrounds/gold-glitter.jpg'>
        {/* <Wrapper styles='h-screen'> */}
        <div className='h-full flex flex-col items-center justify-center'>
          <h1 className='text-9xl font-code text-gray-800 '>Roy Anger</h1>
          <h2 className='text-6xl font-title leading-loose text-indigo-500'>
            Full Stack Web Developer
          </h2>
        </div>
      </Wrapper>
    </>
  );
};

export default Index;
