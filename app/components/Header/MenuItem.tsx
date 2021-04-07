import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
   link: string
   title: string
}

const MenuItem = ({ link, title }: Props) => {
   const router = useRouter()
   const classes =
      router.asPath === link ? 'lg:border-b border-lightblue-50' : 'lg:border-0'

   return (
      <>
         <Link href={link}>
            <a className={`border-b border-lightblue-100 ${classes}`}>
               <button className=" px-10 py-5 lg:p-3 text-xl">{title}</button>
            </a>
         </Link>
      </>
   )
}

export default MenuItem
