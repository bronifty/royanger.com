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
}: ArticleCard) => {
   return (
      <Card type={type} tags={tags} title={title} date={date} height="double">
         <div className="flex flex-col h-full">
            <div className="">
               <div className="mt-2 mb-3">
                  <img
                     alt={`Preview of ${title}`}
                     src={`/images/blog/${image}.jpg`}
                     srcSet={`/images/portfolio/${image}-tablet.jpg 1000w, /images/portfolio/${image}-mobile.jpg 680w,  /images/portfolio/${image}.jpg`}
                  />
               </div>
               <div className="">{excerpt}</div>
            </div>
            <div className="grow flex items-end">
               <Button link={`/reading/${slug}`} name="Read" />
            </div>
         </div>
      </Card>
   )
}
export default ArticleCard
