import Link from 'next/link'

export default function Footer() {
   return (
      <footer className="flex flex-col grow justify-end">
         <div className="bg-black-700 text-white p-3 flex justify-center">
            <div className="max-w-screen-xl w-full">
               <div>Copyright &copy; 2021</div>
               <nav>
                  <Link href="/about">
                     <a>
                        <button>About</button>
                     </a>
                  </Link>
                  <Link href="/blog">
                     <a>
                        <button>Blog</button>
                     </a>
                  </Link>
                  <Link href="/portfolio">
                     <a>
                        <button>Portfolio</button>
                     </a>
                  </Link>
                  <Link href="/contact">
                     <a>
                        <button>Contact</button>
                     </a>
                  </Link>
               </nav>
            </div>
         </div>
      </footer>
   )
}
