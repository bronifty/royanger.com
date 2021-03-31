import * as React from 'react'
import Link from 'next/link'

interface Props {
   link: string
   title: string
}

const MenuItem = ({ link, title }: Props) => {
   return (
      <>
         <Link href={link}>
            <a className="border-b border-lightblue-100 lg:border-0">
               <button className=" px-10 py-5 lg:p-3 text-xl">{title}</button>
            </a>
         </Link>
      </>
   )
}

export default MenuItem
