import { SocialLink } from '../SocialLink'

type ListItem = {
   label: string
   link: string
   type: string
}

const ListItem = ({ label, link, type }: ListItem) => {
   return (
      <li className="flex flex-col mb-6 md:flex-row">
         <div>
            <div className="flex flex-row items-center">
               <SocialLink type={type} label={label} link={link} />
               <span className="ml-4 text-xl">{label}</span>
            </div>
            <div className="">
               <a
                  className="text-blue-600 dark:text-blue-300 underline decoration-blue-600 dark:decoration-blue-300 decoration-dotted font-bold"
                  href={link}
               >
                  {link}
               </a>
            </div>
         </div>
      </li>
   )
}

export default ListItem
