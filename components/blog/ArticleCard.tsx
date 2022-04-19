import Image from 'next/image'
import Button from '../Buttons/Button'
import Card from './Card'

type ArticleCard = {
   title: string
   date: string
   type: string
   tags: string[]
   excerpt: string
   slug: string
   image: string
   imageWidth: number
   imageHeight: number
   // children: React.ReactNode
}

const ArticleCard = ({
   title,
   date,
   type,
   tags,
   excerpt,
   slug,
   image,
   imageWidth,
   imageHeight,
}: ArticleCard) => {
   return (
      <Card type={type} tags={tags} title={title} date={date} height="double">
         <div className="flex flex-col h-full">
            <div className="">
               <div className="mt-2 mb-3">
                  <Image
                     alt={`Preview of ${title}`}
                     src={`/images/blog/${image}`}
                     height={imageHeight / 3}
                     width={imageWidth / 3}
                  />
               </div>
               <div className="">{excerpt}</div>
            </div>
            <div className="grow flex items-end border-t-[1px] border-grey-300 mt-6">
               <Button link={`/reading/${slug}`} name="Read" />
            </div>
         </div>
      </Card>
   )
}
export default ArticleCard
