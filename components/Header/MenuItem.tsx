import * as React from 'react'
import Link from 'next/link'

type onClickFunction = () => void

type MenuItemProps = {
   link: string
   title: string
   onClick?: onClickFunction
   classes?: string
   currentRoute: string
}

const MenuItem = ({
   link,
   title,
   onClick,
   classes,
   currentRoute,
}: MenuItemProps) => {
   const routeInfo = {
      thisRoute: link.split('/').slice(1, 2)[0],
      currentRoute: currentRoute.split('/').slice(1, 2)[0],
   }

   const isCurrent = routeInfo.currentRoute === routeInfo.thisRoute

   const currentCSS =
      routeInfo.currentRoute === routeInfo.thisRoute
         ? 'border-l-[20px] border-l-blue-200 md:border-l-0 md:border-l-transparent md:bg-transparent md:border-b-[1px] md:border-black-500 md:bg-gradient-to-r via-yellow-400 from-cyan-400 to-cyan-400 md:pb-[1px]'
         : 'border-l-blue pl-[32px] md:pl-0'

   return (
      <>
         <div
            className={`${currentCSS}  md:mx-2 max-w text-grey-200 hover:text-grey-100 md:text-grey-500 dark:md:text-grey-300  md:hover:text-grey-800 dark:md:hover:text-grey-50 hover:bg-blue-400 md:hover:bg-transparent ${
               !isCurrent
                  ? 'md:hover:border-b-[1px] md:hover:border-black dark:md:hover:border-white'
                  : ''
            }  border-b-blue-200 py-4  md:py-0 border-b-[1px] md:border-b-0 inline `}
         >
            <Link href={link}>
               <a
                  onClick={onClick}
                  className="md:bg-white dark:md:bg-black px-3 md:px-1"
               >
                  {title}
               </a>
            </Link>
         </div>
      </>
   )
}

export default MenuItem
