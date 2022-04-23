import Button from '../Buttons/Button'
import Card from './Card'

type SnippetCard = {
   title: string
   date: string
   type: string
   tags: string[]
   excerpt: string
   slug: string
}

const SnippetCard = ({
   title,
   date,
   type,
   tags,
   excerpt,
   slug,
}: SnippetCard) => {
   return (
      <Card type={type} tags={tags} title={title} date={date} height="single">
         <div className="flex flex-col h-full">
            <div className="grow">
               <div className="">{excerpt}</div>
            </div>
            <div className="flex items-end border-t-[1px] border-grey-300 mt-6">
               <Button link={`/snippet/${slug}`} name="See Code" />
            </div>
         </div>
      </Card>
   )
}
export default SnippetCard
