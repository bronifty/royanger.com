import Link from 'next/link'
import { paginationLinks } from '../../lib/helpers/pagination'

type PaginationItem = {
   label: string
   page: number | string
   current: boolean
}

const PaginationItem = ({ label, page, current }: PaginationItem) => {
   let currentCSS = current
      ? 'bg-grey-700 dark:bg-blue-300'
      : 'bg-grey-800 dark:bg-blue-100'

   return (
      <div
         className={`group text-grey-100  dark:text-black w-10 first:w-32 last:w-32 flex items-center justify-center h-full border-r-[1px] last:border-r-0 border-blue-500 first:rounded-l-lg last:rounded-r-lg ${currentCSS}`}
      >
         <Link href={`/reading/${page}`} passHref>
            <button className="w-full h-full flex items-center justify-center group-hover:underline group-hover:decoration-dotted group-hover:text-grey-200 dark:group-hover:text-black-500 group-hover:decoration-grey-200 dark:group-hover:decoration-black-500 group-hover:decoration-1">
               {label}
            </button>
         </Link>
      </div>
   )
}

const Pagination = ({ currentPage }) => {
   const pages = paginationLinks(
      currentPage === '/reading' ? 1 : parseInt(currentPage as string)
   )

   return (
      <>
         <div className="w-full flex items-center justify-center font-code text-xl h-10">
            {pages.map((item, index) => {
               return (
                  <PaginationItem
                     key={index}
                     label={item.label}
                     page={item.page}
                     current={item.current}
                  />
               )
            })}
         </div>
      </>
   )
}

export default Pagination
