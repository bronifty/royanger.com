type ListItem = {
   label: string
   link: string
}

const ListItem = ({ label, link }: ListItem) => {
   return (
      <li className="flex flex-col mb-4 md:flex-row">
         {label}:{' '}
         <a
            className="text-blue-500 underline decoration-blue-500 decoration-dotted font-bold"
            href={link}
         >
            {link}
         </a>
      </li>
   )
}

export default ListItem
