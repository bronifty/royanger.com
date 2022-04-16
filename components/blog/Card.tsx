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
         }  mt-6 flex flex-col`}
      >
         <div
            className="bg-gradient-to-r via-yellow-400 from-cyan-400
         to-cyan-400 pb-[1px]"
         >
            <div className="p-1 border-b-[1px] border-grey-300 text-sm font-code text-grey-500 bg-white">
               {type}
            </div>
         </div>
         <div className="px-2 flex flex-col">
            <h3 className="font-body text-xl pt-2">{title}</h3>
            <p className="pb-2 font-code text-sm">{date?.split('T')[0]}</p>
            <div className="grow">{children}</div>
         </div>
         <div className="p-2">
            {tags.map((tag, index) => {
               return <Tag key={index} item={tag} />
            })}
         </div>
      </article>
   )
}
export default Card
