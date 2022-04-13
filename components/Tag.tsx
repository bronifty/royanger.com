type Tag = {
   item: string
}

const Tag = ({ item }: Tag) => {
   return (
      <span className="text-blue rounded dark:text-lightblue-300 bg-grey-200 dark:bg-grey-700 py-1 px-2 my-1 mr-2">
         {item}
      </span>
   )
}

export default Tag
