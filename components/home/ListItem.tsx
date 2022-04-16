import Title from '../Title'
import ExternalLinkButton from '../Buttons/ExternalLinkButton'
import Button from '../Buttons/Button'

type ListItem = {
   index: number
   title: string
   excerpt: string
   slug: string
   github?: string
}

const ListItem = ({ index, title, excerpt, slug, github }: ListItem) => {
   return (
      <li className="max-w-4xl mb-2 border-b-[1px] border-grey-300 last:border-0 ">
         <div
            className="bg-gradient-to-r via-yellow-400 from-cyan-400
         to-cyan-400 pb-[2px]"
         >
            <div className="flex flex-row pb-4 bg-white ">
               <div className="flex items-center justify-center w-10 mr-2 text-grey-400 font-code text-xl">
                  {`0${index + 1}`}
               </div>
               <div className="grow ">
                  <div className="max-w-xl">
                     <Title type="h4">{title}</Title>
                     <p>{excerpt}</p>
                  </div>
               </div>
               <div className="flex items-end ">
                  <Button link={slug} name="Details" />
                  {github ? (
                     <ExternalLinkButton link={github} name="GitHub" />
                  ) : (
                     ''
                  )}
               </div>
            </div>
         </div>
      </li>
   )
}

export default ListItem
