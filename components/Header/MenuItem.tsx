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
         ? 'bg-zinc-100 md:bg-transparent md:border-b-[1px] md:border-zinc-500'
         : ''

   return (
      <>
         <Link href={link}>
            <a
               onClick={onClick}
               className={`${classes} ${isActive} px-3 md:mx-2 md:px-1 max-w text-zinc-500 hover:text-zinc-900 text hover:bg-zinc-100 md:hover:bg-transparent md:hover:border-b-[1px] md:hover:border-zinc-900 `}
            >
               {title}
            </a>
         </Link>
      </>
   )
}

export default MenuItem
