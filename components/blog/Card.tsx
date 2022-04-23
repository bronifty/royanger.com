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
         }  mt-6 flex flex-col group bg-white dark:bg-grey-800 rounded-lg shadow-md  shadow-black-50 dark:shadow-black-600`}
      >
         <div
            className="group-hover:bg-gradient-to-r group-hover:via-yellow-400 group-hover:from-cyan-400
            group-hover:to-cyan-400 pb-[1px] rounded-t-lg"
         >
            <div className="p-1 border-b-[1px] border-grey-300 text-sm font-code text-grey-500 bg-white dark:bg-grey-800 dark:text-grey-300 rounded-t-lg ">
               :{type}
            </div>
         </div>
         <div className="grow px-2 flex flex-col">
            <h3 className="font-body text-xl pt-2">{title}</h3>
            <p className="pb-2 font-code text-sm">{date?.split('T')[0]}</p>
            <div className="grow">{children}</div>
         </div>
         <div className="p-2 pb-4 flex flex-row flex-wrap">
            {tags.map((tag, index) => {
               return <Tag key={index} item={tag} />
            })}
         </div>
      </article>
   )
}
export default Card
