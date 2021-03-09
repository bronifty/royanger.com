import type { AppProps } from 'next/app';
// import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className='bg-gray-100 w-full h-28 flex flex-row p-2'>
        <div className='flex flex-col justify-center'>
          <h1 className='text-3xl'>Roy Anger</h1>
          <h2 className='text-xl'>Full Stack Web Developer</h2>
        </div>
        <div className='flex flex-grow items-center justify-end'>
          <button className='p-3 text-xl'>About</button>
          <button className='p-3 text-xl'>Hire</button>
          <button className='p-3 text-xl'>Blog</button>
        </div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer className='bg-gray-100 w-full h-28 flex flex-row p-2'>
        <div className='flex items-center'>Copyright &copy; 2021</div>
        <div className=' flex flex-grow items-center justify-end'>
          <button className='p-3 text-lg'>Home</button>
          <button className='p-3 text-lg'>Blog</button>
          <button className='p-3 text-lg'>Hire</button>
          <button className='p-3 text-gl'>About</button>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
