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
      <li className="max-w-4xl mb-2 group border-b-[1px] border-b-grey-600 last:border-b-0">
         <div className="flex flex-col md:flex-row pb-4">
            <div className="flex flex-row grow">
               <div className="flex items-center justify-center w-10 mr-2 text-grey-600 dark:text-grey-400 font-code text-xl">
                  {`0${index + 1}`}
               </div>
               <div className="grow">
                  <div className="max-w-xl">
                     <Title type="h3" variant="h3ash4">
                        {title}
                     </Title>
                     <p>{excerpt}</p>
                  </div>
               </div>
            </div>
            <div className="flex ml-10 items-end">
               <Button link={slug} name="Details" />
               {github ? (
                  <ExternalLinkButton link={github} name="GitHub" />
               ) : (
                  ''
               )}
            </div>
         </div>
      </li>
   )
}

export default ListItem
