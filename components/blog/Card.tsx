import Tag from '../Tag'

type Card = {
   type: string
   tags: string[]
   height: string
   title: string
   date: string
   children: React.ReactNode
}

const Card = ({ title, date, children, type, tags, height = 'single' }) => {
   return (
      <article
         className={`${
            height === 'double' ? 'row-span-2' : 'row-span-1'
         } shadow shadow-grey-600 mt-6 flex flex-col`}
      >
         <div className="p-1 border-b-[1px] border-grey-300 text-sm font-code">
            {type}
         </div>
         <div className="grow px-2 flex flex-col">
            <h3 className="font-body text-xl pt-2">{title}</h3>
            <p className="pb-2 font-code text-sm">{date?.split('T')[0]}</p>
            <div className=" grow">{children}</div>
         </div>
         <div className="p-1 border-t-[1px] border-grey-300 py-2">
            {tags.map((tag, index) => {
               return <Tag key={index} item={tag} />
            })}
         </div>
      </article>
   )
}
export default Card
