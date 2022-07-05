import Link from 'next/link'
import PDFIconWrapper from './PDFIconWrapper'

const SmallResumeCallout = () => {
   return (
      <div className="flex mt-12 max-w-4xl">
         <div className="rounded-xl bg-black-50 dark:bg-black-700 bg-opacity-50 ">
            <div className="py-2 px-10 m-2 flex flex-col md:flex-row">
               <div>
                  <div className="text-xl flex flex-row items-center">
                     <Link href="/resume/roy-anger--resume.pdf" passHref>
                        <PDFIconWrapper />
                     </Link>

                     <Link href="/resume/roy-anger--resume.pdf">
                        <a target="_blank">
                           Download my{' '}
                           <span className="text-blue-700 dark:text-blue-300 underline decoration-dotted font-semibold">
                              Resume
                           </span>
                        </a>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SmallResumeCallout
