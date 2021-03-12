import type { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className='bg-gray-100 w-full h-28 flex flex-row justify-center p-2'>
        <div className='w-full xl:w-1440 flex flex-row'>
          <div className='flex flex-col justify-center'>
            <Link href='/'>
              <a>
                <h1 className='text-3xl font-title text-gray-500'>Roy Anger</h1>
              </a>
            </Link>
            <h2 className='text-xl font-sans text-indigo-500'>
              Full Stack Web Developer
            </h2>
          </div>
          <div className='flex flex-grow items-center justify-end'>
            <Link href='/about'>
              <a>
                <button className='p-3 font-code text-xl'>About</button>
              </a>
            </Link>
            <Link href='/blog'>
              <a>
                <button className='p-3 text-xl'>Blog</button>
              </a>
            </Link>
            <Link href='/portfolio'>
              <a>
                <button className='p-3 text-xl'>Portfolio</button>
              </a>
            </Link>
            <Link href='/hire'>
              <a>
                <button className='p-3 text-xl'>Hire</button>
              </a>
            </Link>
          </div>
        </div>
      </header>
      <main className='flex flex-row justify-center'>
        <div className='w-full xl:w-1440 py-3 px-2 bg-green-50'>
          <Component {...pageProps} />
        </div>
      </main>
      <footer className='bg-gray-100 w-full h-28 flex flex-row justify-center p-2'>
        <div className='w-full xl:w-1440 flex flex-row'>
          <div className='flex items-center'>Copyright &copy; 2021</div>
          <div className=' flex flex-grow items-center justify-end'>
            <Link href='/about'>
              <a>
                <button className='p-3 text-lg'>About</button>
              </a>
            </Link>
            <Link href='/blog'>
              <a>
                <button className='p-3 text-lg'>Blog</button>
              </a>
            </Link>
            <Link href='/portfolio'>
              <a>
                <button className='p-3 text-lg'>Portfolio</button>
              </a>
            </Link>
            <Link href='/hire'>
              <a>
                <button className='p-3 text-lg'>Hire</button>
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
