import Link from 'next/link'
import { RightArrowLongIcon } from '../icons'
import Title from '../Title'
import ListItem from './ListItem'

interface ItemContainer {
   items: any
   slug: string
   name?: undefined | string
}

const ItemContainer = ({ items, slug, name }: ItemContainer) => {
   return (
      <div className="mt-12">
         <Title type="h2">Featured Projects</Title>
         <ul>
            {items.map((p, index) => {
               return (
                  <ListItem
                     key={index}
                     index={index}
                     title={p.project}
                     excerpt={p.shortExcerpt}
                     slug={`${slug}/${p.slug}`}
                     github={p.github}
                     name={name}
                  />
               )
            })}
         </ul>
         <div className="">
            <Link href="/portfolio" passHref>
               <button
                  type="button"
                  className="flex flex-row items-center relative text-grey-600 dark:text-grey-300 text-lg font-code"
               >
                  See all projects{' '}
                  <RightArrowLongIcon className="ml-2 w-5 h-auto top-[2px] relative" />
               </button>
            </Link>
         </div>
      </div>
   )
}

export default ItemContainer
