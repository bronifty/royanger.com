type ListItem = {
   label: string
   link: string
}

const ListItem = ({ label, link }: ListItem) => {
   return (
      <li className="flex flex-col mb-4 md:flex-row">
         {label}:{' '}
         <a
            className="text-blue-600 underline decoration-blue-600 decoration-dotted font-bold"
            href={link}
         >
            {link}
         </a>
      </li>
   )
}

export default ListItem
