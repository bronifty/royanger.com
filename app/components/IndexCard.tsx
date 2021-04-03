import * as React from 'react'

interface Props {
   title: string
   image: string
   content: string[]
}

const IndexCard = ({ title, image, content }: Props) => {
   console.log(content)
   return (
      <div className="m-5 mt-10 mb-10 grid grid-cols-3">
         <div className="w-36">
            <img src={image} />
         </div>
         <div className="col-span-2">
            <h2 className="text-3xl font-title mb-5">{title}</h2>
            {content.map(paragraph => {
               return <p className="pb-3 text-lg">{paragraph}</p>
            })}
         </div>
      </div>
   )
}

export default IndexCard
