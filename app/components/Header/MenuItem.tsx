import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type onClickFunction = () => void
interface Props {
   link: string
   title: string
   onClick?: onClickFunction
}

const MenuItem = ({ link, title, onClick }: Props) => {
   const router = useRouter()
   const classes =
      router.asPath === link ? 'lg:border-b border-lightblue-50' : 'lg:border-0'

   return (
      <>
         <Link href={link}>
            <a onClick={onClick}>
               <button>{title}</button>
            </a>
         </Link>
      </>
   )
}

export default MenuItem
