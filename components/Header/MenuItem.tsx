import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type onClickFunction = () => void

type MenuItemProps = {
   link: string
   title: string
   onClick?: onClickFunction
}

const MenuItem = ({ link, title, onClick }: MenuItemProps) => {
   const router = useRouter()
   const classes =
      router.asPath === link ? 'lg:border-b border-lightblue-50' : 'lg:border-0'

   return (
      <>
         <Link href={link}>
            <a onClick={onClick} className="px-3">
               {title}
            </a>
         </Link>
      </>
   )
}

export default MenuItem
