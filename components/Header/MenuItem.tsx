import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type onClickFunction = () => void

type MenuItemProps = {
   link: string
   title: string
   onClick?: onClickFunction
   classes?: string
}

const MenuItem = ({ link, title, onClick, classes }: MenuItemProps) => {
   const router = useRouter()
   const isActive =
      router.asPath === link
         ? 'border-l-[20px] border-l-blue-200 md:border-l-0 md:border-l-transparent md:bg-transparent md:border-b-[1px] md:border-black-500'
         : 'border-l-blue pl-[32px]'

   return (
      <>
         <Link href={link}>
            <a
               onClick={onClick}
               className={`${classes} ${isActive} px-3 md:mx-2 md:px-1 max-w text-zinc-500 hover:text-white md:hover:text-black  hover:bg-blue-400 md:hover:bg-transparent md:hover:border-b-[1px] md:hover:border-black  border-b-blue-200 py-4  md:py-0 border-b-[1px] md:border-b-0`}
            >
               {title}
            </a>
         </Link>
      </>
   )
}

export default MenuItem
