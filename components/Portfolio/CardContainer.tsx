import Card from './Card'

const CardContainer = ({ items }) => {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-16 mt-12">
         {items.map(item => {
            return (
               <Card
                  key={item._id}
                  title={item.project}
                  description={item.excerpt}
                  github={item.github}
                  preview={item.preview}
                  techstack={item.techstack}
                  image={item.image}
                  slug={item.slug}
               />
            )
         })}
      </div>
   )
}

export default CardContainer
